import { Maybe } from "true-myth";
import Vue from "vue";


import Widget from "@/components/Widget";
import { ConditionsList } from "@/data models/conditionModels";
import { widgetValPrimitive } from "@/data models/widgetModels";
import { evaluateCondition } from "@/helpers/conditionHelpers";
import { isDebug, logError, logMessage, logWarningSecurely } from "@/helpers/debugHelpers";
import { getStore } from "@/helpers/storeHelpers";
import {
  readPageConditions,
  readProjectUserSharedDataVal,
  readTrackGroups,
  readWidgetPropVal
} from "@/store/modules/appData";
import {
  commitSetCurrentTrackGroup,
  readModulesState,
  readUserSharedDataEntryVal,
  readWidgetEntryVal
} from "@/store/modules/userData";

import { getGlossary } from "@/helpers/glossaryHelper";
import { unlockAndSetFirstPages } from "./userHelpers";

const appUiIds: string[] = [
  "startButton",
  "glossaryCloseButton",
  "glossarySearchClearButton",
  "guidePreviousPage",
  "guideNextPage"
];
export function getPageID(vm: Vue): string {
  if (notGrapes()) {
    const moduleState = readModulesState(vm.$store);

    // logMessage("parent", vm.$parent);
    if (vm.$props && appUiIds.indexOf(vm.$props.id) > -1) {
      return "appUI";
    }
    let parent = vm.$parent;
    do {
      if (
        parent != undefined
        && parent.$el
        && parent.$el.classList.contains("glossaryPage")
      ) {
        // console.log("parent", parent.$el);
        // console.log("widget is on glossary page", vm.$props.id);
        return moduleState.currentGlossaryPageID;
      }
      if (parent != undefined) parent = parent.$parent;
    } while (parent);
    if (vm.$route) return vm.$route.params.pageID;
    return "";
  }
  return "GrapesEditor";
}

export function WidgetPropEntryOverride(
  pageID: string,
  widgetID: string,
  key: string
): Maybe<widgetValPrimitive> {
  const maybeWidgetEntryVal = readWidgetEntryVal(getStore())(
    pageID,
    widgetID,
    key
  );

  if (maybeWidgetEntryVal.isJust()) {
    return maybeWidgetEntryVal;
  }

  return readWidgetPropVal(getStore())(pageID, widgetID, key);
}

export function SharedDataProjectEntryOverride(
  sharedDataID: string
): Maybe<widgetValPrimitive> {
  const maybeSharedDataVal = readUserSharedDataEntryVal(getStore())(
    sharedDataID
  );
  if (Maybe.isNothing(maybeSharedDataVal)) {
    return readProjectUserSharedDataVal(getStore())(sharedDataID);
  } return maybeSharedDataVal;
}

export function runWidgetEventConditions(
  widget: Widget,
  conditionsData: ConditionsList,
  parentWidgetID: string
) {
  if (conditionsData === undefined) return;

  const widgetChangeConditions = conditionsData.conditionList.filter(
    condition => condition.evaluateWhen === "widgetsChange"
      || condition.evaluateWhen === undefined // for backwards compatibility for now
  );

  // logMessage(
  //   "run conditions on widget event",
  //   widgetChangeConditions,
  //   parentWidgetID
  // );

  if (widgetChangeConditions.length === 0) return;

  logMessage("Start runWidgetEventConditions evaluating conditions");
  for (const condition of widgetChangeConditions) {
    condition.parentWidgetID = parentWidgetID;
    if (!evaluateCondition(condition, widget.pageID)) break;
  }
  logMessage("End runWidgetEventConditions evaluating conditions");
}

export function runPageLoadConditions(pageID: string) {
  const maybeConditionsList = readPageConditions(getStore())(pageID);
  if (maybeConditionsList.isNothing()) {
    logMessage("No page load conditions on", pageID);
    return;
  }
  const conditionsData = Maybe.unsafelyUnwrap(maybeConditionsList);

  // logMessage("page load conditions", conditionsData.conditionList);

  const pageLoadConditions = conditionsData.conditionList.filter(
    condition => condition.evaluateWhen === "pageLoads"
  );

  // logMessage("run conditions on page load", pageLoadConditions);

  if (pageLoadConditions.length === 0) return;

  for (const condition of pageLoadConditions) {
    if (!evaluateCondition(condition, pageID)) break;
  }
}

export function handleRootPath(widget: Vue) {
  if (widget.$route.path === "/") {
    let moduleState = readModulesState(widget.$store);
    let trackGroupID = moduleState.currentTrackGroupID;
    logMessage("handleRootPath trackGroupID: ", trackGroupID);
    if (!trackGroupID) {
      logMessage("trackGroupID is false");
      let foundTrack = false;
      const maybeTrackGroups = readTrackGroups(widget.$store);
      if (maybeTrackGroups.isJust()) {
        const trackGroups = Maybe.unsafelyUnwrap(maybeTrackGroups);
        if (trackGroups.length > 0) {
          foundTrack = true;
          trackGroupID = trackGroups[0].trackGroupID;
          if (!isDebug()) logWarningSecurely ("handleRootPath: no trackGroupID in widget store. set first trackGroupID as current", `first trackGroupID: ${trackGroupID}`, moduleState);
          commitSetCurrentTrackGroup(widget.$store, trackGroupID);
          unlockAndSetFirstPages();
          moduleState = readModulesState(widget.$store); // read again because we just changed it
          // open first case page without specifying the track so the user gets asked which one to use
          if (moduleState.moduleOpen == "guide") {
            widget.$router.push(
              `${trackGroupID}/pages/${moduleState.guideState.currentPageID}`
            );
          } else {
            widget.$router.push(
              `${trackGroupID}/pages/${moduleState.caseState.currentPageID}`
            );
          }
          return;
        }
      }
      if (!foundTrack) logError("couldn't find any track groups!");
    }

    if (
      moduleState.guideState.currentTrackID == ""
      || moduleState.caseState.currentTrackID == ""
    ) {
      commitSetCurrentTrackGroup(widget.$store, trackGroupID);
      unlockAndSetFirstPages();
      moduleState = readModulesState(widget.$store); // read again because we just changed it
    } else if (
      moduleState.guideState.currentPageID == ""
      || moduleState.caseState.currentPageID == ""
    ) {
      unlockAndSetFirstPages();
      moduleState = readModulesState(widget.$store); // read again because we just changed it
    }

    if (moduleState.moduleOpen == "guide") {
      widget.$router.push(
        `${trackGroupID}/pages/${moduleState.guideState.currentPageID}`
      );
    } else {
      widget.$router.push(
        `${trackGroupID}/pages/${moduleState.caseState.currentPageID}`
      );
    }
  }
}

export function useTeacherView(): boolean {
  return window.location.href.includes("?teacherView=true");
}



export function toggleGlossary() {
  const glossary = getGlossary();
  // @ts-ignore not sure why the linter is complaining about this, it works fine
  if (glossary) glossary.toggleShow();
}

export function glossaryShowHide(show: boolean) {
  const glossary = getGlossary();
  // @ts-ignore not sure why the linter is complaining about this, it works fine
  if (glossary) glossary.showHide(show);
}

export function glossaryHideIfOpen() {
  const glossary = getGlossary();
  // @ts-ignore not sure why the linter is complaining about this, it works fine
  if (glossary) glossary.hideIfOpen();
}

export function notGrapes() {
  return (<any>window).grapesjs === undefined;
}
