// import gql from "graphql-tag";
import {
  append, curry, dissoc, filter, isEmpty, path, without
} from "ramda";
import { Maybe } from "true-myth";
import Vue from "vue";
import WidgetPopperCollapsible from "@/components/WidgetPopperCollapsible.vue";

import { getStoreAccessors } from "vuex-typescript";

//Models
import { ConditionsList } from "@/data models/conditionModels";
import { modules } from "@/data models/projectModels";
import {
  RubricRevision,
  RubricState,
  RubricStatus
} from "@/data models/rubricModels";
import {
  openableModules
} from "@/data models/userModels";
import {
  AddRemoveClassDict,
  widgetValPrimitive
} from "@/data models/widgetModels";
import { StoreDelayedEffect } from "@/data models/effectModels";

//Helpers
import {
  conditionMatchesChangedEntity,
  queueConditions,
  sharedConditionMatchesChangedKey
} from "@/helpers/conditionHelpers";

import {
  logMessage,
  logError,
} from "@/helpers/debugHelpers";
import { getTrackGroupByID } from "@/helpers/projectHelpers";

import { getSimManager } from "@/helpers/simHelpers";
import { getStore } from "@/helpers/storeHelpers";
import { readAttemptId, readSessionId } from "@/store/modules/authData";
import { getTime } from "@/helpers/timeHelpers";
import { useTeacherView } from "@/helpers/widgetHelpers";
import { RootState } from "@/store";

import { readPageConditions, readWidgetPropVal } from "@/store/modules/appData";


import { action_getInitialUserData } from "@/store/modules/userData/actions/getInitialUserData";
import { action_mutateActivityResponse } from '@/store/modules/userData/actions/mutateActivityResponse';
import { action_mutateActivityProgress } from '@/store/modules/userData/actions/mutateActivityProgress';

import { UserDataState, defaultState, userDataContext } from "@/store/modules/userData/userDataState";


export const userDataStore = {
  namespaced: true,

  state: defaultState,

  getters: {
    getWidgetEntryVal(state: UserDataState) {
      return (
        pageID: string,
        widgetID: string,
        key: string
      ): Maybe<widgetValPrimitive> => {
        // here I'm wrapping the return value of trying to get the widget val with Maybe.of
        // it will either return Just(value) or Nothing
        // this gives us some extra safety for values that are likely to be undefined or null
        // by forcing us to deal with the Nothing case in some way
        return Maybe.of(
          // this tries to get the value in state from the path specified by the list of strings
          path(["pages", pageID, widgetID, key], state) as widgetValPrimitive
        );
      };
    },
    getModulesState(state: UserDataState) {
      return state.modules;
    },
    getSharedDataValue(state: UserDataState) {
      return (sharedDataID: string): Maybe<widgetValPrimitive> => {
        return Maybe.of(path(["sharedData", sharedDataID], state));
      };
    },
    getWidgetAddRemoveClasses(state: UserDataState) {
      return (pageID: string, widgetID: string): Maybe<AddRemoveClassDict> => {
        // here I'm wrapping the return value of trying to get the widget val with Maybe.of
        // it will either return Just(value) or Nothing
        // this gives us some extra safety for values that are likely to be undefined or null
        // by forcing us to deal with the Nothing case in some way
        return Maybe.of(
          // this tries to get the value in state from the path specified by the list of strings
          path(["pages", pageID, widgetID, "AddRemoveClasses"], state)
        );
      };
    },
    getRubricState(state: UserDataState) {
      return (rubricID: string): Maybe<RubricState> => {
        return Maybe.of(path(["rubrics", rubricID], state));
      };
    },
    getAllRubricStates(state: UserDataState) {
      return state.rubrics;
    },
    getAudioMuted(state: UserDataState): boolean {
      return state.audio.muted;
    },
    getBGMusic(state: UserDataState): string[] {
      return state.audio.bgMusic;
    },
    getAllDelayedEffects(state: UserDataState): StoreDelayedEffect[] {
      return state.delayedEffects;
    },
    getSectionVisible(state: UserDataState) {
      return (moduleName: string, sectionName: string): Maybe<boolean> => {
        const moduleState = `${moduleName}State`;
        return Maybe.of(
          path(
            ["modules", moduleState, "sections", sectionName, "visible"],
            state
          )
        );
      };
    },
    getPageVisible(state: UserDataState) {
      return (moduleName: string, pageID: string): Maybe<boolean> => {
        const moduleState = `${moduleName}State`;
        return Maybe.of(
          path(["modules", moduleState, "pages", pageID, "visible"], state)
        );
      };
    }
  },

  mutations: {
    /** just sets the value in the store
     * In most cases you want the updateWidget action,
     * it will evaluate conditions based on the changed entry
     * and can do async operations, probably we will want it to send responses
     */
    setWidgetEntry(
      state: UserDataState,
      payload: {
        pageID: string;
        widgetID: string;
        key: string;
        value: widgetValPrimitive;
      }
    ) {
      //logMessage(payload);
      if (state.pages[payload.pageID] === undefined) {
        Vue.set(state.pages, payload.pageID, {});
      }

      if (state.pages[payload.pageID][payload.widgetID] === undefined) {
        Vue.set(state.pages[payload.pageID], payload.widgetID, {});
      }

      Vue.set(
        state.pages[payload.pageID][payload.widgetID],
        payload.key,
        payload.value
      );
      Vue.set(state, "timestamp", getTime());
    },
    removeWidgetEntry(
      state: UserDataState,
      payload: {
        pageID: string;
        widgetID: string;
        key: string;
      }
    ) {
      if (
        state.pages[payload.pageID] === undefined
        || state.pages[payload.pageID][payload.widgetID] === undefined
      ) {
        return;
      }

      Vue.set(
        state.pages[payload.pageID],
        payload.widgetID,
        dissoc(payload.key, state.pages[payload.pageID][payload.widgetID])
      );

      if (isEmpty(state.pages[payload.pageID][payload.widgetID])) {
        Vue.set(
          state.pages,
          payload.pageID,
          dissoc(payload.widgetID, state.pages[payload.pageID])
        );
      }

      if (isEmpty(state.pages[payload.pageID])) {
        Vue.set(state, "pages", dissoc(payload.pageID, state.pages));
      }
      Vue.set(state, "timestamp", getTime());
    },
    setModuleCurrentPage(
      state: UserDataState,
      payload: {
        moduleName: modules;
        pageID: string;
      }
    ) {
      logMessage(
        "set current page",
        payload.pageID,
        "module",
        payload.moduleName
      );

      if (payload.moduleName === "glossary") Vue.set(state.modules, "currentGlossaryPageID", payload.pageID);
      else {
        let moduleState = state.modules.caseState;
        if (payload.moduleName === "guide") moduleState = state.modules.guideState;

        Vue.set(moduleState, "currentPageID", payload.pageID);

        if (moduleState.pages[payload.pageID] === undefined) {
          Vue.set(moduleState.pages, payload.pageID, {});
        }
        if (!useTeacherView()) {
          // in teacherView never set visited so we get the popper in the progress bar every time a page is unlocked
          Vue.set(moduleState.pages[payload.pageID], "visited", true);
        } else {
          Vue.set(moduleState.pages[payload.pageID], "teacherVisited", true);
        }
      }

      Vue.set(state, "timestamp", getTime());
    },
    setCurrentTrack(
      state: UserDataState,
      payload: {
        module: modules;
        trackID: string;
      }
    ) {
      switch (payload.module) {
        case "case":
          Vue.set(state.modules.caseState, "currentTrackID", payload.trackID);
          break;
        case "guide":
          Vue.set(state.modules.guideState, "currentTrackID", payload.trackID);
          break;
        case "glossary":
          Vue.set(state.modules, "currentGlossaryTrackID", payload.trackID);
          break;
      }
      Vue.set(state, "timestamp", getTime());
    },
    setCurrentTrackGroup(state: UserDataState, trackGroupID: string) {
      logMessage("setCurrentTrackGroup", trackGroupID);
      Vue.set(state.modules, "currentTrackGroupID", trackGroupID);
      const maybeTrackGroup = getTrackGroupByID(trackGroupID);
      if (maybeTrackGroup.isJust()) {
        const trackGroup = Maybe.unsafelyUnwrap(maybeTrackGroup);
        logMessage("setting other modules", trackGroup);
        if (trackGroup.caseID == "") {
          logMessage("userData.setCurrentTrackGroup set moduleOpen: guide");
          Vue.set(state.modules, "moduleOpen", "guide");
        } else {
          logMessage("userData.setCurrentTrackGroup set moduleOpen: case");
          Vue.set(state.modules, "moduleOpen", "case");
        }

        Vue.set(state.modules.caseState, "currentTrackID", trackGroup.caseID);
        Vue.set(state.modules.guideState, "currentTrackID", trackGroup.guideID);
        Vue.set(state.modules, "currentGlossaryTrackID", trackGroup.glossaryID);
      }
      Vue.set(state, "timestamp", getTime());
    },
    /** just sets the value in the store
     * In most cases you want the updateSharedData action,
     * it will evaluate conditions based on the changed entry,
     * pass the value to sims, and can do async operations
     */
    setSharedDataValue(
      state: UserDataState,
      payload: { sharedDataID: string; value: widgetValPrimitive }
    ) {
      Vue.set(state.sharedData, payload.sharedDataID, payload.value);
      Vue.set(state, "timestamp", getTime());
    },
    clickNext(state: UserDataState, payload: { pageID: string, moduleName: string }) {
      let moduleState = state.modules.caseState;
      if (payload.moduleName === "guide") moduleState = state.modules.guideState;

      if (useTeacherView()) {
        Vue.set(moduleState.pages[payload.pageID], "GuideNextClicked", true);
      }

    },
    setCurrentModule(state: UserDataState, module: modules) {
      Vue.set(state.modules, "moduleOpen", module);
      Vue.set(state, "timestamp", getTime());
    },
    setWidgetAddRemoveClass(
      state: UserDataState,
      payload: {
        pageID: string;
        widgetID: string;
        className: string;
        value: boolean; // true == add, false == remove
      }
    ) {
      //logMessage(payload);
      if (state.pages[payload.pageID] === undefined) {
        Vue.set(state.pages, payload.pageID, {});
      }

      if (state.pages[payload.pageID][payload.widgetID] === undefined) {
        Vue.set(state.pages[payload.pageID], payload.widgetID, {});
      }

      if (state.pages[payload.pageID][payload.widgetID].AddRemoveClasses === undefined) {
        Vue.set(
          state.pages[payload.pageID][payload.widgetID],
          "AddRemoveClasses",
          {}
        );
      }

      const classesObj: object | undefined = path(
        ["pages", payload.pageID, payload.widgetID, "AddRemoveClasses"],
        state
      );

      if (classesObj) Vue.set(classesObj, payload.className, payload.value);
      Vue.set(state, "timestamp", getTime());
    },
    unlockPage(
      state: UserDataState,
      payload: { moduleName: openableModules; pageID: string }
    ) {
      logMessage("unlockPage", payload.moduleName, payload.pageID);
      if (payload.moduleName === "case") {
        if (state.modules.caseState.pages[payload.pageID] === undefined) {
          Vue.set(state.modules.caseState.pages, payload.pageID, {});
        }
        Vue.set(
          state.modules.caseState.pages[payload.pageID],
          "unlocked",
          true
        );
        Vue.set(state.modules.caseState, "lastUnlockedPageID", payload.pageID);
      } else if (payload.moduleName === "guide") {
        if (state.modules.guideState.pages[payload.pageID] === undefined) {
          Vue.set(state.modules.guideState.pages, payload.pageID, {});
        }
        Vue.set(
          state.modules.guideState.pages[payload.pageID],
          "unlocked",
          true);
        Vue.set(state.modules.guideState, "lastUnlockedPageID", payload.pageID);
      }
      Vue.set(state, "timestamp", getTime());
    },
    unlockModule(state: UserDataState, moduleName: modules) {
      switch (moduleName) {
        case "guide":
          if (state.modules.guideState.locked) {
            Vue.set(state.modules.guideState, "locked", false);
            Vue.set(state.modules.caseState, "locked", true);
          }
          break;
        case "case":
          Vue.set(state.modules.caseState, "locked", false);
          break;
      }
      Vue.set(state, "timestamp", getTime());
    },
    lockPage(
      state: UserDataState,
      payload: { moduleName: openableModules; pageID: string }
    ) {
      logMessage("lockPage", payload.moduleName, payload.pageID);
      if (payload.moduleName === "case") {
        if (state.modules.caseState.pages[payload.pageID] === undefined) {
          Vue.set(state.modules.caseState.pages, payload.pageID, {});
        }
        Vue.set(
          state.modules.caseState.pages[payload.pageID],
          "unlocked",
          false
        );
      } else if (payload.moduleName === "guide") {
        if (state.modules.guideState.pages[payload.pageID] === undefined) {
          Vue.set(state.modules.guideState.pages, payload.pageID, {});
        }
        Vue.set(
          state.modules.guideState.pages[payload.pageID],
          "unlocked",
          false
        );
      }
      Vue.set(state, "timestamp", getTime());
    },
    setGuideCompleted(state: UserDataState) {
      Vue.set(state.modules, "guideCompleted", true);
      Vue.set(state, "timestamp", getTime());
    },
    updateRubricStateRevision(
      state: UserDataState,
      payload: { rubricID: string; header: string; response: string }
    ) {
      if (state.rubrics[payload.rubricID] == undefined) {
        const revisions = [];
        const revision: RubricRevision = {};
        revision[payload.header] = payload.response;
        revisions.push(revision);
        const rubricState: RubricState = {
          revisions,
          status: RubricStatus.resubmit
        };
        Vue.set(state.rubrics, payload.rubricID, rubricState);
      } else {
        const revIndex = state.rubrics[payload.rubricID].revisions.findIndex(
          x => {
            return x[payload.header] != undefined;
          }
        );
        if (revIndex != -1) {
          Vue.set(
            state.rubrics[payload.rubricID].revisions[revIndex],
            payload.header,
            payload.response
          );
        } else {
          const revision: RubricRevision = {};
          revision[payload.header] = payload.response;
          const { revisions } = state.rubrics[payload.rubricID];
          revisions.push(revision);
          Vue.set(state.rubrics[payload.rubricID], "revisions", revisions);
        }
      }
      Vue.set(state, "timestamp", getTime());
    },
    updateRubricReceived(
      state: UserDataState,
      payload: { rubricID: string; responseID: number }
    ) {
      if (state.rubrics[payload.rubricID] == undefined) {
        state.rubrics[payload.rubricID] = {
          revisions: [],
          status: RubricStatus.received,
          userActivityResponseID: payload.responseID
        };
      } else {
        state.rubrics[payload.rubricID].status = RubricStatus.received;
        state.rubrics[payload.rubricID].userActivityResponseID = payload.responseID;
      }
    },
    updateRubricRejected(
      state: UserDataState,
      payload: { rubricID: string }
    ) {
      if (state.rubrics[payload.rubricID] == undefined) {
        state.rubrics[payload.rubricID] = {
          revisions: [],
          status: RubricStatus.rejected,
          userActivityResponseID: undefined
        };
      } else {
        state.rubrics[payload.rubricID].status = RubricStatus.rejected;
      }
    },
    updateRubricStateResponse(
      state: UserDataState,
      payload: {
        rubricID: string;
        status: RubricStatus;
        response: string;
        responseData: string;
      }
    ) {
      if (state.rubrics[payload.rubricID] == undefined) {
        state.rubrics[payload.rubricID] = {
          revisions: [],
          status: payload.status,
          response: payload.response,
          responseData: payload.responseData
        };
      } else {
        state.rubrics[payload.rubricID].status = payload.status;
        state.rubrics[payload.rubricID].response = payload.response;
        state.rubrics[payload.rubricID].responseData = payload.responseData;
      }
    },
    setGlossaryOpenState(state: UserDataState, openState: boolean) {
      Vue.set(state.modules, "glossaryOpen", openState);
      Vue.set(state, "timestamp", getTime());
    },
    setAudioMuted(state: UserDataState, val: boolean) {
      Vue.set(state.audio, "muted", val);
      Vue.set(state, "timestamp", getTime());
    },
    setBGMusic(state: UserDataState, src: string[]) {
      Vue.set(state.audio, "bgMusic", src);
      Vue.set(state, "timestamp", getTime());
    },
    addDelayedEffect(state: UserDataState, delayedEffect: StoreDelayedEffect) {
      Vue.set(
        state,
        "delayedEffects",
        append(delayedEffect, state.delayedEffects)
      );
      Vue.set(state, "timestamp", getTime());
    },
    removeDelayedEffect(
      state: UserDataState,
      delayedEffect: StoreDelayedEffect
    ) {
      Vue.set(
        state,
        "delayedEffects",
        without([delayedEffect], state.delayedEffects)
      );
      Vue.set(state, "timestamp", getTime());
    },
    removeAllDelayedEffects(state: UserDataState) {
      Vue.set(state, "delayedEffects", []);
      Vue.set(state, "timestamp", getTime());
    },
    unlockSection(state: UserDataState,
      payload: {
        moduleName: openableModules;
        sectionName: string;
      }) {
      const moduleStateObj = (payload.moduleName === "case")
        ? state.modules.caseState
        : state.modules.guideState;

      if (moduleStateObj.sections[payload.sectionName]) {
        Vue.set(
          moduleStateObj.sections[payload.sectionName],
          "unlocked",
          true
        );
      } else {
        Vue.set(moduleStateObj.sections, payload.sectionName, {});
        Vue.set(
          moduleStateObj.sections[payload.sectionName],
          "unlocked",
          true
        );
      }
    },
    setSectionVisiblity(
      state: UserDataState,
      payload: {
        moduleName: openableModules;
        sectionName: string;
        visible: boolean;
      }
    ) {
      logMessage(
        "setSectionVisiblity",
        payload.moduleName,
        payload.sectionName,
        payload.visible
      );
      let moduleStateObj = state.modules.caseState;
      if (payload.moduleName == "guide") moduleStateObj = state.modules.guideState;

      if (moduleStateObj.sections[payload.sectionName] == undefined) {
        Vue.set(moduleStateObj.sections, payload.sectionName, {});
      }
      Vue.set(
        moduleStateObj.sections[payload.sectionName],
        "visible",
        payload.visible
      );
      Vue.set(state, "timestamp", getTime());
    },
    setPageVisiblity(
      state: UserDataState,
      payload: { moduleName: openableModules; pageID: string; visible: boolean }
    ) {
      logMessage(
        "setPageVisiblity",
        payload.moduleName,
        payload.pageID,
        payload.visible
      );
      let moduleStateObj = state.modules.caseState;
      if (payload.moduleName == "guide") moduleStateObj = state.modules.guideState;

      if (moduleStateObj.pages[payload.pageID] == undefined) {
        Vue.set(moduleStateObj.pages, payload.pageID, {});
      }
      Vue.set(moduleStateObj.pages[payload.pageID], "visible", payload.visible);
      Vue.set(state, "timestamp", getTime());
    },
    updateTimestamp(state: UserDataState) {
      Vue.set(state, "timestamp", getTime());
    }
  },

  actions: {
    /** In most cases you want updateWidget when changing a widget entry value.
     * It calls the mutation to sets the value in the store,
     * and also will evaluate conditions based on the changed entry.
     * Actions can do async operations, probably we will want it to send responses
     */
    async updateWidget(
      context: userDataContext,
      payload: {
        pageID: string;
        widgetID: string;
        key: string;
        value: widgetValPrimitive;
      }
    ): Promise<void> {
      // logMessage("updateWidget", payload);

      const maybeCurrentVal = readWidgetEntryVal(getStore())(
        payload.pageID,
        payload.widgetID,
        payload.key
      );

      const maybePropVal = readWidgetPropVal(getStore())(
        payload.pageID,
        payload.widgetID,
        payload.key
      );

      // in these two scenarios nothing meaningful is changing so we should return
      // otherwise we risk entering an infinite loop
      if (
        maybeCurrentVal.isJust()
        && payload.value === Maybe.unsafelyUnwrap(maybeCurrentVal)
      ) {
        // the value is already set
        logMessage("updateWidget value is already set", payload);
        return;
      }

      const maybeSharedRead = readWidgetPropVal(getStore())(
        payload.pageID,
        payload.widgetID,
        "sharedDataReadKey"
      );

      if (
        maybeCurrentVal.isNothing()
        && maybePropVal.isJust()
        && payload.value === Maybe.unsafelyUnwrap(maybePropVal)
        && maybeSharedRead.isNothing() //if relying on sharing data, then it's important to keep your prop changes in the store
      ) {
        // the value matches the prop, and has already been removed
        // logMessage(
        // 	"updateWidget value matches prop but doesn't exist",
        // 	payload
        // );
        return;
      }

      if (
        maybePropVal.isJust()
        && payload.value === Maybe.unsafelyUnwrap(maybePropVal)
        && maybeSharedRead.isNothing() //if relying on sharing data, then it's important to keep your prop changes in the store
      ) {
        //remove because val matches prop
        // logMessage("updateWidget value matches prop, remove", payload);
        commitRemoveWidgetEntry(context, {
          pageID: payload.pageID,
          widgetID: payload.widgetID,
          key: payload.key
        });
      } else {
        // set it!
        // logMessage("updateWidget set", payload);
        commitSetWidgetEntry(context, {
          pageID: payload.pageID,
          widgetID: payload.widgetID,
          key: payload.key,
          value: payload.value
        });
      }

      // run conditions
      const maybePageConditions = readPageConditions(getStore())(
        payload.pageID
      );

      if (maybePageConditions.isJust()) {
        const pageConditions: ConditionsList = Maybe.unsafelyUnwrap(
          maybePageConditions
        );

        const widgetChangeConditions = pageConditions.conditionList.filter(
          condition => condition.evaluateWhen === "widgetsChange"
            || condition.evaluateWhen === undefined // for backwards compatibility for now
        );

        const relevantConditions = filter(
          curry(conditionMatchesChangedEntity)(
            payload.pageID,
            payload.widgetID,
            payload.key
          ),
          widgetChangeConditions
        );
        queueConditions(relevantConditions, payload.pageID);
      }
    },
    /** In most cases you want updateSharedData when changing a shared data.
     * It calls the mutation to sets the value in the store,
     * and also will evaluate conditions based on the changed entry.
     */
    async updateSharedData(
      context: userDataContext,
      payload: {
        pageID: string;
        sharedDataID: string;
        value: widgetValPrimitive;
      }
    ): Promise<void> {
      try {
        commitUserSharedDataEntryVal(context, {
          sharedDataID: payload.sharedDataID,
          value: payload.value
        });

        getSimManager().PassSharedData(payload.sharedDataID, payload.value);

        // run conditions
        const maybePageConditions = readPageConditions(getStore())(
          payload.pageID
        );

        if (maybePageConditions.isJust()) {
          const pageConditions: ConditionsList = Maybe.unsafelyUnwrap(
            maybePageConditions
          );

          const sharedDataChangeConditions = pageConditions.conditionList.filter(
            condition => condition.evaluateWhen === "sharedDataChanges"
          );
          //logMessage(`userData sharedDataChanges: ${sharedDataChangeConditions}`);

          const relevantConditions = filter(
            curry(sharedConditionMatchesChangedKey)(payload.sharedDataID),
            sharedDataChangeConditions
          );
          queueConditions(relevantConditions, payload.pageID);
        }
      } catch (err) {
        logError("Error in userData.updateSharedData:", err);
      }
    },
    async getInitialUserData
      (context: userDataContext) {
      const payload = { attemptId: readAttemptId(getStore()), sessionId: readSessionId(getStore()) };
      return (await action_getInitialUserData(context, payload));
    },

    async mutateProgress(
      context: userDataContext,
      payload: {
        attemptId: number;
        stateHistoryJSON: string;
        quitting: boolean;
      }
    ): Promise<void> {
      return action_mutateActivityProgress(context, payload);
    },
    async mutateActivityResponse(
      context: userDataContext,
      payload: {
        attemptId: number;
        rubricId: string;
        response: string;
        responseData: string;
      }
    ) {
      return (action_mutateActivityResponse(context, payload));
    }
  }
};

const { commit, read, dispatch } = getStoreAccessors<UserDataState, RootState>(
  "userDataStore"
); // We pass namespace here, if we make the module namespaced: true.

export const readWidgetEntryVal = read(userDataStore.getters.getWidgetEntryVal);
export const readModulesState = read(userDataStore.getters.getModulesState);
export const readUserSharedDataEntryVal = read(
  userDataStore.getters.getSharedDataValue
);
export const readWidgetAddRemoveClasses = read(
  userDataStore.getters.getWidgetAddRemoveClasses
);
export const readRubricState = read(userDataStore.getters.getRubricState);
export const readAllRubricStates = read(
  userDataStore.getters.getAllRubricStates
);
export const readAudioMuted = read(userDataStore.getters.getAudioMuted);
export const readBGMusic = read(userDataStore.getters.getBGMusic);
export const readAllDelayedEffects = read(
  userDataStore.getters.getAllDelayedEffects
);
export const readSectionVisibleUser = read(
  userDataStore.getters.getSectionVisible
);
export const readPageVisibleUser = read(userDataStore.getters.getPageVisible);

export const commitSetWidgetEntry = commit(
  userDataStore.mutations.setWidgetEntry
);
export const commitRemoveWidgetEntry = commit(
  userDataStore.mutations.removeWidgetEntry
);
export const commitSetModuleCurrentPage = commit(
  userDataStore.mutations.setModuleCurrentPage
);
export const commitSetCurrentTrack = commit(
  userDataStore.mutations.setCurrentTrack
);
export const commitSetCurrentTrackGroup = commit(
  userDataStore.mutations.setCurrentTrackGroup
);
export const commitUserSharedDataEntryVal = commit(
  userDataStore.mutations.setSharedDataValue
);
export const commitCurrentModule = commit(
  userDataStore.mutations.setCurrentModule
);
export const commitWidgetAddRemoveClass = commit(
  userDataStore.mutations.setWidgetAddRemoveClass
);
export const commitRubricStateRevision = commit(
  userDataStore.mutations.updateRubricStateRevision
);
export const commitRubricReceived = commit(
  userDataStore.mutations.updateRubricReceived
);
export const commitRubricRejected = commit(
  userDataStore.mutations.updateRubricRejected
);
export const commitRubricStateResponse = commit(
  userDataStore.mutations.updateRubricStateResponse
);
export const commitUnlockPage = commit(userDataStore.mutations.unlockPage);
export const commitUnlockModule = commit(userDataStore.mutations.unlockModule);
export const commitLockPage = commit(userDataStore.mutations.lockPage);
export const commitGuideCompleted = commit(
  userDataStore.mutations.setGuideCompleted
);
export const commitClickedNext = commit(userDataStore.mutations.clickNext);
export const commitGlossaryOpenState = commit(
  userDataStore.mutations.setGlossaryOpenState
);
export const commitAudioMuted = commit(userDataStore.mutations.setAudioMuted);
export const commitBGMusic = commit(userDataStore.mutations.setBGMusic);
export const commitAddDelayedEffect = commit(
  userDataStore.mutations.addDelayedEffect
);
export const commitRemoveDelayedEffect = commit(
  userDataStore.mutations.removeDelayedEffect
);
export const commitRemoveAllDelayedEffects = commit(
  userDataStore.mutations.removeAllDelayedEffects
);
export const commitSetSectionVisiblity = commit(
  userDataStore.mutations.setSectionVisiblity
);
export const commitSectionUnlock = commit(
  userDataStore.mutations.unlockSection
);
export const commitSetPageVisiblity = commit(
  userDataStore.mutations.setPageVisiblity
);
export const commitUpdateTimestamp = commit(
  userDataStore.mutations.updateTimestamp
);
export const dispatchUpdateWidget = dispatch(
  userDataStore.actions.updateWidget
);
export const dispatchUserUpdateSharedData = dispatch(
  userDataStore.actions.updateSharedData
);
export const dispatchGetInitialUserData = dispatch(
  userDataStore.actions.getInitialUserData
);
export const dispatchMutateProgress = dispatch(
  userDataStore.actions.mutateProgress
);
export const dispatchMutateActivityResponse = dispatch(
  userDataStore.actions.mutateActivityResponse
);
