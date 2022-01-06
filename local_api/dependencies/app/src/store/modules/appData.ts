import {
  curry, filter, isEmpty, path, union
} from "ramda";
import { Maybe } from "true-myth";
import Vue from "vue";
import { ActionContext, Store } from "vuex";
import { getStoreAccessors } from "vuex-typescript";

import {
  ConditionsList,
  PagesConditionsDict
} from "@/data models/conditionModels";
import {
  GlossaryModule,
  modules,
  Page,
  Project,
  ProjectModule,
  Sim,
  Track,
  TrackGroup
} from "@/data models/projectModels";
import { openableModules } from "@/data models/userModels";
import {
  EntriesDict,
  PagesWidgetsEntriesDict,
  widgetValPrimitive
} from "@/data models/widgetModels";
import {
  queueConditions,
  sharedConditionMatchesChangedKey
} from "@/helpers/conditionHelpers";
import { logMessage, logError } from "@/helpers/debugHelpers";
import { getSectionAndPageIndexes, getTrack } from "@/helpers/projectHelpers";
import { getSimManager } from "@/helpers/simHelpers";
import { RootState } from "@/store";
import { debouncedPageLoad } from "@/helpers/pageHelper";
import WidgetPopperCollapsible from "./WidgetPopperCollapsible.vue";

/** stores app data from the case pages that we needs access to in vuex
 * so far we need:
 *  the props from each widget so we can compare if their value has been changed
 *  the conditions from each widget so we can evaluate them when something changes
 *  project config from the project.json file
 */
export interface AppDataState {
  props: PagesWidgetsEntriesDict;
  conditions: PagesConditionsDict;
  project: Project;
  sharedData: EntriesDict;
  player_git_version: string;
  project_git_version: string;
}

export type appDataContext = ActionContext<AppDataState, RootState>;

export const appDataStore = {
  namespaced: true,

  state: {
    props: {},
    conditions: {},
    project: {},
    sharedData: {},
    player_git_version: "",
    project_git_version: ""
  },

  getters: {
    getProjectDataExists(state: AppDataState): boolean {
      logMessage("getProjectDataExists", state.project);
      return state.project != undefined && !isEmpty(state.project);
    },
    getWidgetPropVal(state: AppDataState) {
      return (
        pageID: string,
        widgetID: string,
        key: string
      ): Maybe<widgetValPrimitive> => {
        return Maybe.of(path(
          ["props", pageID, widgetID, key],
          state
        ) as widgetValPrimitive);
      };
    },
    getPageConditions(state: AppDataState) {
      return (pageID: string): Maybe<ConditionsList> => {
        return Maybe.of(path(["conditions", pageID], state));
      };
    },
    getTrackByIndex(state: AppDataState) {
      return (moduleName: modules, trackIndex: number): Maybe<Track> => {
        return Maybe.of(
          path(["project", moduleName, "tracks", trackIndex], state)
        );
      };
    },
    getPageListByIndex(state: AppDataState) {
      return (
        moduleName: modules,
        trackIndex: number,
        sectionIndex: number
      ): Maybe<Page[]> => {
        return Maybe.of(
          path(
            [
              "project",
              moduleName,
              "tracks",
              trackIndex,
              "sections",
              sectionIndex,
              "pages"
            ],
            state
          )
        );
      };
    },
    getPreviousPageID() {
      return (
        moduleName: openableModules,
        trackID: string,
        currentPageID: string
      ): Maybe<string> => {
        const maybeTrack = getTrack(moduleName, trackID);
        if (maybeTrack.isJust()) {
          const trackData: Track = Maybe.unsafelyUnwrap(maybeTrack);
          const maybePageIndexes = getSectionAndPageIndexes(
            trackData,
            currentPageID
          );
          if (maybePageIndexes.isJust()) {
            const pageIndexes = Maybe.unsafelyUnwrap(maybePageIndexes);
            if (pageIndexes.pageIndex !== 0) {
              return Maybe.of(
                trackData.sections[pageIndexes.sectionIndex].pages[
                  pageIndexes.pageIndex - 1
                ].pageID
              );
            }
            // maybe go to the prev section
            const prevSection = trackData.sections[pageIndexes.sectionIndex - 1];
            if (prevSection) {
              const lastPage = prevSection.pages.length - 1;
              return Maybe.of(prevSection.pages[lastPage].pageID);
            }
          }
        }
        return new Maybe.Nothing<string>();
      };
    },
    getNextPageID() {
      return (
        moduleName: openableModules,
        trackID: string,
        currentPageID: string
      ): Maybe<string> => {
        const maybeTrack = getTrack(moduleName, trackID);
        if (maybeTrack.isJust()) {
          const trackData: Track = Maybe.unsafelyUnwrap(maybeTrack);
          const maybePageIndexes = getSectionAndPageIndexes(
            trackData,
            currentPageID
          );
          if (maybePageIndexes.isJust()) {
            const pageIndexes = Maybe.unsafelyUnwrap(maybePageIndexes);
            if (
              pageIndexes.pageIndex
              !== trackData.sections[pageIndexes.sectionIndex].pages.length - 1
            ) {
              return Maybe.of(
                trackData.sections[pageIndexes.sectionIndex].pages[
                  pageIndexes.pageIndex + 1
                ].pageID
              );
            }
            // maybe go to the next section
            const section = trackData.sections[pageIndexes.sectionIndex + 1];
            if (section) {
              return Maybe.of(section.pages[0].pageID);
            }
          }
        }
        return new Maybe.Nothing<string>();
      };
    },
    getPageVisible() {
      return (
        moduleName: openableModules,
        trackID: string,
        pageID: string
      ): Maybe<boolean> => {
        const maybeTrack = getTrack(moduleName, trackID);
        if (maybeTrack.isJust()) {
          const trackData: Track = Maybe.unsafelyUnwrap(maybeTrack);
          const maybePageIndexes = getSectionAndPageIndexes(trackData, pageID);
          if (maybePageIndexes.isJust()) {
            const pageIndexes = Maybe.unsafelyUnwrap(maybePageIndexes);
            return Maybe.of(
              trackData.sections[pageIndexes.sectionIndex].pages[
                pageIndexes.pageIndex
              ].visible
            );
          }
        }
        return new Maybe.Nothing<boolean>();
      };
    },
    getSimByName(state: AppDataState, name: string): Sim | undefined {
      if (state.project.sims != undefined) return state.project.sims.find(s => s.name == name);
      return undefined;
    },
    getProjectSharedDataValue(state: AppDataState) {
      return (sharedDataID: string): Maybe<widgetValPrimitive> => {
        const sharedIndex = state.project.sharedData.findIndex(
          sharedData => sharedData.sharedDataID == sharedDataID
        );
        return Maybe.of(
          path(["project", "sharedData", sharedIndex, "value"], state)
        );
      };
    },
    getProjectAppSharedDataValue(state: AppDataState) {
      return (sharedDataID: string): Maybe<widgetValPrimitive> => {
        if (state.project.appSharedData == undefined) Vue.set(state.project, "appSharedData", []);
        const sharedIndex = state.project.appSharedData.findIndex(
          sharedData => sharedData.sharedDataID == sharedDataID
        );
        return Maybe.of(
          path(["project", "appSharedData", sharedIndex, "value"], state)
        );
      };
    },
    getModule(state: AppDataState) {
      return (moduleName: openableModules): ProjectModule => {
        return state.project[moduleName];
      };
    },
    getGlossary(state: AppDataState): GlossaryModule {
      return state.project.glossary;
    },
    getTrackGroups(state: AppDataState): Maybe<TrackGroup[]> {
      return Maybe.of(state.project.trackGroups);
    },
    getProjectName(state: AppDataState): string {
      return state.project.name;
    },
    getPlayerGitVersion(state: AppDataState): string {
      return state.player_git_version;
    },
    getProjectGitVersion(state: AppDataState): string {
      return state.project_git_version;
    },
    getSharedDataValue(state: AppDataState) {
      return (sharedDataID: string): Maybe<widgetValPrimitive> => {
        return Maybe.of(path(
          ["sharedData", sharedDataID],
          state
        ) as widgetValPrimitive);
      };
    }
  },

  mutations: {
    initWidgetProps(
      state: AppDataState,
      payload: {
        pageID: string;
        widgetID: string;
        props: EntriesDict;
        conditionsProp: ConditionsList;
      }
    ) {
      // logMessage("commit init widget props", payload.pageID, payload.widgetID);
      // these should never change, so if we've already added this widget then we're good.
      if (
        path(["props", payload.pageID, payload.widgetID], state) == undefined
      ) {
        if (state.props[payload.pageID] === undefined) {
          Vue.set(state.props, payload.pageID, {});
        }

        if (state.props[payload.pageID][payload.widgetID] === undefined) {
          Vue.set(state.props[payload.pageID], payload.widgetID, {});
        }

        for (const key in payload.props) {
          if (key === "id" || key === "conditions") continue;

          Vue.set(
            state.props[payload.pageID][payload.widgetID],
            key,
            payload.props[key]
          );
        }

        if (payload.props.conditions != undefined) {
          if (state.conditions[payload.pageID] === undefined) {
            Vue.set(state.conditions, payload.pageID, {});
          }

          if (state.conditions[payload.pageID].conditionList === undefined) {
            Vue.set(state.conditions[payload.pageID], "conditionList", []);
          }

          // logMessage("prop conditions", payload.props.conditions);

          const newConditions: ConditionsList = payload.conditionsProp;
          for (const cond of newConditions.conditionList) {
            cond.parentWidgetID = payload.widgetID;
            if (cond.comparisons) {
              for (const comp of cond.comparisons) {
                if (
                  comp.comparisonData.comparisonType === "widgetVal"
                  && comp.comparisonData.widgetID === undefined
                ) {
                  comp.comparisonData.widgetID = payload.widgetID; // If a widgetID wasn't specified, assume the condition applies to the widget it was added to
                }
              }
            }
          }

          // logMessage("newConditions", newConditions.conditionList);

          Vue.set(
            state.conditions[payload.pageID],
            "conditionList",
            union(
              state.conditions[payload.pageID].conditionList,
              newConditions.conditionList
            )
          );
        }
      }

      debouncedPageLoad(payload.pageID);
    },
    initProjectConfig(state: AppDataState, projectConfig: Project) {
      // logMessage("project: ", projectConfig);
      Vue.set(state, "project", projectConfig);
    },
    setSharedDataValue(
      state: AppDataState,
      payload: { sharedDataID: string; value: widgetValPrimitive }
    ) {
      Vue.set(state.sharedData, payload.sharedDataID, payload.value);
    },
    setPlayerGitVersion(state: AppDataState, version: string) {
      logMessage("setPlayerGitVersion", version);
      Vue.set(state, "player_git_version", version);
    },
    setProjectGitVersion(state: AppDataState, version: string) {
      logMessage("setProjectGitVersion", version);
      Vue.set(state, "project_git_version", version);
    }
  },
  actions: {
    /** In most cases you want updateSharedData when changing a shared data.
     * It calls the mutation to sets the value in the store,
     * and also will evaluate conditions based on the changed entry.
     */
    async updateSharedData(
      context: appDataContext,
      payload: {
        pageID: string;
        sharedDataID: string;
        value: widgetValPrimitive;
      }
    ): Promise<void> {
      try {
        commitAppSharedDataEntryVal(context, {
          sharedDataID: payload.sharedDataID,
          value: payload.value
        });

        getSimManager().PassSharedData(payload.sharedDataID, payload.value);

        // run conditions
        const maybePageConditions = readPageConditions(context)(payload.pageID);

        if (maybePageConditions.isJust()) {
          const pageConditions: ConditionsList = Maybe.unsafelyUnwrap(
            maybePageConditions
          );

          const sharedDataChangeConditions = pageConditions.conditionList.filter(
            condition => condition.evaluateWhen === "sharedDataChanges"
          );

          //logMessage(`appData sharedDataChanges: ${sharedDataChangeConditions}`);

          const relevantConditions = filter(
            curry(sharedConditionMatchesChangedKey)(payload.sharedDataID),
            sharedDataChangeConditions
          );
          queueConditions(relevantConditions, payload.pageID);
        }
      } catch (err) {
        logError("Error in appData.updateSharedData:", err);
      }
    }
  }
};

const { commit, read, dispatch } = getStoreAccessors<AppDataState, RootState>(
  "appDataStore"
); // We pass namespace here, if we make the module namespaced: true.

export const readProjectDataExists = read(appDataStore.getters.getProjectDataExists);
export const readWidgetPropVal = read(appDataStore.getters.getWidgetPropVal);
export const readPageConditions = read(appDataStore.getters.getPageConditions);
export const readPageListByIndex = read(appDataStore.getters.getPageListByIndex);
export const readTrackByIndex = read(appDataStore.getters.getTrackByIndex);
export const readPreviousPageID = read(appDataStore.getters.getPreviousPageID);
export const readNextPageID = read(appDataStore.getters.getNextPageID);
export const readPageVisibleApp = read(appDataStore.getters.getPageVisible);
export const readModule = read(appDataStore.getters.getModule);
export const readGlossary = read(appDataStore.getters.getGlossary);
export const readProjectUserSharedDataVal = read(appDataStore.getters.getProjectSharedDataValue);
export const readProjectAppSharedDataVal = read(appDataStore.getters.getProjectAppSharedDataValue);
export const readTrackGroups = read(appDataStore.getters.getTrackGroups);
export const readProjectName = read(appDataStore.getters.getProjectName);
export const readPlayerGitVersion = read(appDataStore.getters.getPlayerGitVersion);
export const readProjectGitVersion = read(appDataStore.getters.getProjectGitVersion);
export const readAppSharedDataEntryVal = read(appDataStore.getters.getSharedDataValue);

export const commitInitWidgetProps = commit(appDataStore.mutations.initWidgetProps);
export const commitInitProjectConfig = commit(appDataStore.mutations.initProjectConfig);
export const commitAppSharedDataEntryVal = commit(appDataStore.mutations.setSharedDataValue);
export const commitPlayerGitVersion = commit(appDataStore.mutations.setPlayerGitVersion);
export const commitProjectGitVersion = commit(appDataStore.mutations.setProjectGitVersion);

export const dispatchAppUpdateSharedData = dispatch(appDataStore.actions.updateSharedData);
