import {
  __, all, any, curry, isEmpty, map, union
} from "ramda";
import { Maybe } from "true-myth";

import {
  Comparison,
  Condition,
  DropsHaveDragsComparison,
  GuideCompletedComparison,
  logicalOperator,
  RadioSelectionComparison,
  SharedDataValComparison,
  SharedDataToSharedDataComparison,
  TextLengthComparison,
  TrackValComparison,
  WidgetValComparison,
  IsTeacherComparison,
  DraggablesComparison
} from "@/data models/conditionModels";
import { widgetValPrimitive } from "@/data models/widgetModels";
import {
  logError,
  logMessage,
  logWarning
} from "@/helpers/debugHelpers";
import { runEffect } from "@/helpers/effectHelpers";
import { sendResponse } from "@/helpers/responseHelpers";
import { getStore } from "@/helpers/storeHelpers";

import {
  readWidgetPropVal
} from "@/store/modules/appData";

import {
  SharedDataProjectEntryOverride,
  useTeacherView,
  WidgetPropEntryOverride
} from "@/helpers/widgetHelpers";
import { readModulesState, readWidgetEntryVal } from "@/store/modules/userData";
import { EnvironmentOptions, getEnv } from "./envHelpers";

export function conditionMatchesChangedEntity(
  pageID: string,
  widgetID: string,
  key: string,
  condition: Condition
): boolean {
  if (!condition.comparisons) return false;

  return comparisonsMatchChangedEntity(
    pageID,
    widgetID,
    key,
    condition.comparisons
  );
}

function comparisonsMatchChangedEntity(
  pageID: string,
  widgetID: string,
  key: string,
  comparisons: Comparison[]
): boolean {
  if (!comparisons) return false;

  for (const comp of comparisons) {
    switch (comp.comparisonData.comparisonType) {
      case "widgetVal":
        if (
          comp.comparisonData.widgetID === widgetID
          && comp.comparisonData.key === key
        ) return true;
        break;
      case "radioSelection":
        if (widgetID === comp.comparisonData.group) return true;
        break;
      case "textLength":
        if (comp.comparisonData.textID === widgetID && key === "text") return true;
        break;
      case "dropsHaveDrags":
        if (
          comp.comparisonData.dropIDs.findIndex(dID => dID === widgetID) !== -1
        ) return true;
        break;
      case "nestedComparisons":
        if (
          any(curry(comparisonsMatchChangedEntity)(pageID, widgetID, key), [
            comp.comparisonData.comparisons
          ])
        ) return true;
    }
  }

  return false;
}

export function sharedConditionMatchesChangedKey(
  sharedDataKey: string,
  condition: Condition
): boolean {
  if (!condition.comparisons) return false;

  for (const comp of condition.comparisons) {
    switch (comp.comparisonData.comparisonType) {
      case "sharedDataVal":
        if (comp.comparisonData.sharedDataKey === sharedDataKey) return true;
        break;
      case "sharedDataToSharedData":
        if (comp.comparisonData.sharedDataKey1 === sharedDataKey) return true;
        if (comp.comparisonData.sharedDataKey2 === sharedDataKey) return true;
    }
  }

  return false;
}

// returns false if we recieve a break event
export function evaluateCondition(
  condition: Condition,
  pageID: string
): boolean {
  let conditionPass = false;

  if (condition.comparisons === undefined || isEmpty(condition.comparisons)) {
    // assuming this is an event (eg click) where we want to run effects without a condition
    conditionPass = true;
  }

  if (
    (condition.effectsPass === undefined || isEmpty(condition.effectsPass))
    && (condition.effectsFail === undefined || isEmpty(condition.effectsFail))
    && (condition.responsesPass === undefined
      || isEmpty(condition.responsesPass))
    && (condition.responsesFail === undefined || isEmpty(condition.responsesFail))
  ) {
    if (getEnv() !== EnvironmentOptions.production) {
      logWarning("condition has no effects or responses:", condition);
    }
    return true;
  }

  if (!conditionPass) {
    conditionPass = evaluateComparisions(
      condition.comparisons,
      condition.comparisonsLogic,
      pageID
    );
  }

  // run effects
  if (conditionPass) {
    if (condition.effectsPass != undefined) {
      logMessage("effectsPass");
      for (const effect of condition.effectsPass) {
        if (effect.effectData.effectType === "break") {
          logMessage("effectsPass runEffect: break");
          return false;
        } runEffect(effect, pageID, condition.parentWidgetID);
      }
    }
  } else if (condition.effectsFail != undefined) {
    for (const effect of condition.effectsFail) {
      if (effect.effectData.effectType === "break") {
        logMessage("effectsFail runEffect: break");
        return false;
      } runEffect(effect, pageID, condition.parentWidgetID);
    }
  }

  // send responses
  if (conditionPass) {
    if (condition.responsesPass != undefined) {
      map(
        curry(sendResponse)(__, pageID, condition.parentWidgetID),
        condition.responsesPass
      );
    }
  } else if (condition.responsesFail != undefined) {
    map(
      curry(sendResponse)(__, pageID, condition.parentWidgetID),
      condition.responsesFail
    );
  }

  return true;
}

function evaluateComparisions(
  comparisons: Comparison[],
  compLogic: logicalOperator,
  pageID: string
): boolean {
  let conditionsPass = false;
  if (compLogic === undefined) compLogic = "and";

  switch (compLogic) {
    case "and":
      conditionsPass = all(curry(evaluateComparison)(__, pageID), comparisons);
      break;
    case "or":
      conditionsPass = any(curry(evaluateComparison)(__, pageID), comparisons);
      break;
  }

  logMessage(
    "comparisons:",
    comparisons,
    "logic:",
    compLogic,
    "evaluates:",
    conditionsPass
  );

  return conditionsPass;
}

export function evaluateComparison(
  comparison: Comparison,
  pageID: string
): boolean {
  switch (comparison.comparisonData.comparisonType) {
    case "widgetVal":
      return widgetValComparison(comparison.comparisonData, pageID);
    case "evalDraggables":
      return evalDraggables(comparison.comparisonData, pageID);
    case "sharedDataVal":
      return sharedDataValComparison(comparison.comparisonData, pageID);
    case "sharedDataToSharedData":
      return sharedDataToSharedDataComparison(comparison.comparisonData, pageID);
    case "radioSelection":
      return radioSelectionComparison(comparison.comparisonData, pageID);
    case "textLength":
      return textLengthComparision(comparison.comparisonData, pageID);
    case "trackVal":
      return trackValComparison(comparison.comparisonData, pageID);
    case "guideCompleted":
      return guideCompletedComparison(comparison.comparisonData);
    case "dropsHaveDrags":
      return dropsHaveDragsComparison(comparison.comparisonData, pageID);
    case "nestedComparisons":
      return evaluateComparisions(
        comparison.comparisonData.comparisons,
        comparison.comparisonData.comparisonsLogic,
        pageID
      );
    case "isTeacher":
      return isTeacherComparison(comparison.comparisonData);
  }
}

function evalDraggables(
  comparisionData: DraggablesComparison,
  pageId: string
): boolean {
  const groupId: string = comparisionData.groupID;
  let allCorrect: boolean = null!;
  // get all draggables
  const draggables: string[] = Array
  .from(document.querySelectorAll("fieldset.drag"))
  .map(node => node.id);
  
  // for each drag, check corresponding drop correctness if its in the correct group
  for(const d of draggables) {
    const setGroupId = readWidgetPropVal(getStore())(pageId, d, "groupId");
    const _groupId = setGroupId.isJust() ? setGroupId.unsafelyUnwrap() : "";
    // if not in the given group, ignore
    if (groupId === _groupId) {
      // get dropId, get correctDropIds
      const maybeCorrectDropIds = readWidgetPropVal(getStore())(
        pageId,
        d,
        "correctDropIds"
        );
        //@ts-ignore
        const correctDropIds: string[] = maybeCorrectDropIds.isJust() && maybeCorrectDropIds.unsafelyUnwrap() !== "" ? JSON.parse(maybeCorrectDropIds.unsafelyUnwrap().replace(/'/g, '"')) : [];
        
        const maybeDropId = readWidgetEntryVal(getStore())(
          pageId,
          d,
          "dropId"
          );
          const dropId: string = maybeDropId.isJust() ? maybeDropId.unsafelyUnwrap() + "" : "";
          
          if(correctDropIds.length && !correctDropIds.includes(dropId)) {
            allCorrect = false;
          }
          // if any drags do not match, set allCorrect to false
        }
      }
      if(allCorrect === null) {
        allCorrect = true;
      }
  return allCorrect;
}
function widgetValComparison(
  comparisonData: WidgetValComparison,
  pageID: string
) {
  logMessage(
    "evaluate WidgetVal Comparison",
    pageID,
    comparisonData.widgetID,
    comparisonData.key,
    comparisonData.val
  );

  const maybeWidgetVal = WidgetPropEntryOverride(
    pageID,
    comparisonData.widgetID,
    comparisonData.key
  );

  if (maybeWidgetVal.isNothing()) {
    logMessage(
      "comparison returning false, no entry or prop for",
      pageID,
      comparisonData.widgetID,
      comparisonData.key
    );
    return false;
  }

  const widgetVal = Maybe.unsafelyUnwrap(maybeWidgetVal);
  const returnVal = evalCompType(widgetVal, comparisonData, comparisonData.val, pageID);

  logMessage(
    "compared",
    comparisonData.key,
    comparisonData.val,
    comparisonData.comparison,
    "with widgetVal:",
    widgetVal,
    "evaluates",
    returnVal
  );

  return returnVal;
}

function sharedDataValComparison(
  comparisonData: SharedDataValComparison,
  pageID: string
) {
  logMessage(
    "evaluate SharedDataVal Comparison",
    pageID,
    comparisonData.sharedDataKey,
    comparisonData.val
  );

  // get shared data value
  const maybeSharedVal = SharedDataProjectEntryOverride(
    comparisonData.sharedDataKey
  );

  if (maybeSharedVal.isNothing()) {
    logMessage(
      "comparison returning false, no shared data for key:",
      comparisonData.sharedDataKey
    );
    return false;
  }

  const sharedVal = maybeSharedVal.unsafelyUnwrap();
  const returnVal = evalCompType(sharedVal, comparisonData, comparisonData.val, pageID);

  logMessage(
    "compared",
    comparisonData.sharedDataKey,
    comparisonData.val,
    comparisonData.comparison,
    "with sharedDataVal:",
    maybeSharedVal,
    "evaluates",
    returnVal
  );

  return returnVal;
}

function sharedDataToSharedDataComparison(
  comparisonData: SharedDataToSharedDataComparison,
  pageID: string
) {
  logMessage(
    "evaluate SharedDataToSharedData Comparison",
    pageID,
    comparisonData.sharedDataKey1,
    comparisonData.sharedDataKey2
  );

  // get shared data value
  const maybeSharedVal1 = SharedDataProjectEntryOverride(
    comparisonData.sharedDataKey1
  );

  if (maybeSharedVal1.isNothing()) {
    logMessage(
      "comparison returning false, no shared data for key:",
      comparisonData.sharedDataKey1
    );
    return false;
  }

  const maybeSharedVal2 = SharedDataProjectEntryOverride(
    comparisonData.sharedDataKey2
  );

  if (maybeSharedVal2.isNothing()) {
    logMessage(
      "comparison returning false, no shared data for key:",
      comparisonData.sharedDataKey1
    );
    return false;
  }

  const sharedVal1 = maybeSharedVal1.unsafelyUnwrap();
  const sharedVal2 = maybeSharedVal2.unsafelyUnwrap();
  const returnVal = evalCompType(sharedVal1, comparisonData, sharedVal2, pageID);

  logMessage(
    "compared",
    comparisonData.sharedDataKey1,
    "with sharedDataVal:",
    maybeSharedVal1,
    comparisonData.comparison,
    comparisonData.sharedDataKey2,
    "with sharedDataVal:",
    maybeSharedVal2,
    "evaluates",
    returnVal
  );

  return returnVal;
}

function evalCompType(
  val: widgetValPrimitive,
  comparisonData: WidgetValComparison | SharedDataValComparison | SharedDataToSharedDataComparison,
  val2: widgetValPrimitive | undefined,
  pageID: string
): boolean {
  let returnVal = false;
  let compType = comparisonData.comparison;
  if (compType === undefined) compType = "equals";

  switch (compType) {
    case "equals":
      returnVal = convertToLowercase(val) === convertToLowercase(val2);
      break;
    case "notEquals":
      returnVal = convertToLowercase(val) !== convertToLowercase(val2);
      break;
    case "lessThan":
      returnVal = evalLessThan(val, comparisonData, val2, pageID);
      break;
    case "greaterThan":
      returnVal = evalGreaterThan(val, comparisonData, val2, pageID);
      break;
    case "equals_cs":
      returnVal = val === val2;
      break;
    case "notEquals_cs":
      returnVal = val !== val2;
      break;
  }

  return returnVal;
}

function evalLessThan(
  val: widgetValPrimitive,
  comparisonData: WidgetValComparison | SharedDataValComparison | SharedDataToSharedDataComparison,
  val2: widgetValPrimitive | undefined,
  pageID: string
): boolean {
  const valNum = parseFloat(val.toString());
  let compValNum = NaN;
  if (val2 !== undefined) compValNum = parseFloat(val2.toString());

  if (!isNaN(valNum) && !isNaN(compValNum)) return valNum < compValNum;

  logError(
    "lessThan comparison on non number. val:",
    val,
    "val2:",
    val2,
    "pageID:",
    pageID,
    "comparison:",
    comparisonData
  );
  return false;
}

function evalGreaterThan(
  val: widgetValPrimitive,
  comparisonData: WidgetValComparison | SharedDataValComparison | SharedDataToSharedDataComparison,
  val2: widgetValPrimitive | undefined,
  pageID: string
): boolean {
  const valNum = parseFloat(val.toString());
  let compValNum = NaN;
  if (val2 !== undefined) compValNum = parseFloat(val2.toString());

  if (!isNaN(valNum) && !isNaN(compValNum)) return valNum > compValNum;

  logError(
    "greaterThan comparison on non number. val:",
    val,
    "val2:",
    val2,
    "pageID:",
    pageID,
    "comparison:",
    comparisonData
  );
  return false;
}

function convertToLowercase(
  toConvert: widgetValPrimitive | undefined
): widgetValPrimitive | undefined {
  if (typeof toConvert === "string") {
    return toConvert.toLowerCase(); //toLowerCase returns a new string
  } return toConvert;
}

function radioSelectionComparison(
  comparisonData: RadioSelectionComparison,
  pageID: string
) {
  logMessage(
    "evaluate Radio Select Comparison",
    pageID,
    comparisonData.group,
    comparisonData.selected,
    comparisonData.radioID
  );

  const widgetComp: WidgetValComparison = {
    comparisonType: "widgetVal",
    widgetID: comparisonData.group,
    key: "selected",
    comparison: "equals",
    val: undefined
  };

  switch (comparisonData.selected) {
    case "any":
      widgetComp.comparison = "notEquals"; // selected notEquals undefined === something is selected
      break;
    case "none": // seleted equals undefined === nothing is selected
      break;
    case "radioIDEquals":
      widgetComp.val = comparisonData.radioID;
      break;
    case "radioIDNotEquals":
      widgetComp.val = comparisonData.radioID;
      widgetComp.comparison = "notEquals";
      break;
  }

  return widgetValComparison(widgetComp, pageID);
}

function textLengthComparision(
  comparisonData: TextLengthComparison,
  pageID: string
) {
  logMessage("evaluate Text Length Comparison", pageID, comparisonData.textID);

  const maybeWidgetVal = WidgetPropEntryOverride(
    pageID,
    comparisonData.textID,
    "text"
  );

  if (maybeWidgetVal.isNothing()) {
    logMessage(
      "text length comparison returning false, no text entry val",
      pageID,
      comparisonData.textID
    );
    return false;
  }

  const widgetVal = Maybe.unsafelyUnwrap(maybeWidgetVal);

  if (typeof widgetVal !== "string") {
    logWarning(
      "text length comparison returning false, entry text is not a string",
      pageID,
      comparisonData.textID
    );
    return false;
  }

  let returnVal = false;

  let maybeWidgetFilter = WidgetPropEntryOverride(
    pageID,
    comparisonData.textID,
    "filter"
  );
  if (maybeWidgetFilter.isNothing()) maybeWidgetFilter = Maybe.of<widgetValPrimitive>("text"); //widget should default to "text", but in case not set to the default "text".
  if (maybeWidgetFilter.isJust()) {
    const filterVal = Maybe.unsafelyUnwrap(maybeWidgetFilter);
    if (filterVal != "text") {
      if (widgetVal === "") returnVal = false;
      else returnVal = true;
    } else returnVal = widgetVal.length >= 5; // TODO: pull this character length from somewhere else, probably the project.json
  }

  logMessage(
    "compared",
    comparisonData.textID,
    widgetVal,
    "evaluates",
    returnVal
  );

  return returnVal;
}

function trackValComparison(
  comparisonData: TrackValComparison,
  pageID: string
) {
  // logMessage("trackValComparison start: ", comparisonData);
  const modulesState = readModulesState(getStore());
  let trackID = modulesState.caseState.currentTrackID;
  if (modulesState.moduleOpen == "guide") trackID = modulesState.guideState.currentTrackID;
  if (pageID == modulesState.currentGlossaryPageID) trackID = modulesState.currentGlossaryTrackID;
  let returnVal = false;
  let compType = comparisonData.comparison;
  if (compType == undefined) compType = "equals";
  switch (compType) {
    case "equals":
      returnVal = trackID === comparisonData.trackID;
      break;
    case "notEquals":
      returnVal = trackID !== comparisonData.trackID;
  }
  logMessage(
    "trackValComparison: ",
    trackID,
    " ",
    compType,
    " ",
    comparisonData.trackID,
    " = ",
    returnVal
  );
  return returnVal;
}

function guideCompletedComparison(comparisonData: GuideCompletedComparison) {
  const modulesState = readModulesState(getStore());
  // logMessage("guideCompletedComparison return: ", modulesState.guideCompleted);
  return modulesState.guideCompleted;
}

function dropsHaveDragsComparison(
  comparisonData: DropsHaveDragsComparison,
  pageID: string
) {
  for (const dropID of comparisonData.dropIDs) {
    const maybeStoreVal = readWidgetEntryVal(getStore())(
      pageID,
      dropID,
      "dragId"
    );
    if (maybeStoreVal.isJust()) {
      const val = Maybe.unsafelyUnwrap(maybeStoreVal);
      if (typeof val === "string") {
        logMessage("dropsHaveDragsComparison", dropID, val, val === "");
        if (val === "") return false;
      } else if (Array.isArray(val)) {
        logMessage("dropsHaveDragsComparison", dropID, val, val.length == 0);
        if (val.length == 0) return false;
      }
    } else return false;
  }
  return true;
}

let conditionQueue: Condition[] = [];

export function queueConditions(conditions: Condition[], pageID: string) {
  if (!isEmpty(conditions)) {
    if (isEmpty(conditionQueue)) {
      // start running conditions
      conditionQueue = conditions;
      // logMessage(
      //   "Start userData.updateWidget evaluating conditions",
      //   updateWidgetsConditionQueue
      // );
      for (let i = 0; i < conditionQueue.length; i++) {
        const condition = conditionQueue[i];
        logMessage("running condition", i);
        try {
          if (!evaluateCondition(condition, pageID)) {
            logMessage("userData.updateWidget break");
            break;
          }
        } catch (err) {
          logError(
            "error evaluating condition in queue:",
            err,
            "condition",
            condition,
            "from page",
            pageID
          );
        }
      }
      conditionQueue = [];
      logMessage("End userData.updateWidget evaluating conditions");
    } else {
      // conditions are already running elsewhere, throw more on the queue
      conditionQueue = union(conditionQueue, conditions);
      // logMessage(
      //   "added more conditions to the queue",
      //   relevantConditions,
      //   updateWidgetsConditionQueue
      // );
    }
  }
}

function isTeacherComparison(comparisonData: IsTeacherComparison) {
  return useTeacherView();
}
