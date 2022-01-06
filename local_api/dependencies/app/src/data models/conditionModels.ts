import { Effect } from "@/data models/effectModels";
import { Response } from "@/data models/responseModels";
import { widgetValPrimitive } from "@/data models/widgetModels";

export interface Comparison {
  comparisonData:
  | WidgetValComparison
  | DraggablesComparison
  | SharedDataValComparison
  | SharedDataToSharedDataComparison
  | RadioSelectionComparison
  | TextLengthComparison
  | TrackValComparison
  | GuideCompletedComparison
  | DropsHaveDragsComparison
  | NestedComparisons
  | IsTeacherComparison;
}

export type equalityOperatorString = "equals" | "notEquals";

export type equalityOperator =
  | "equals"
  | "notEquals"
  | "lessThan"
  | "greaterThan"
  | "equals_cs"
  | "notEquals_cs";


export interface DraggablesComparison {
  readonly comparisonType: "evalDraggables";
  groupID: string;
}

export interface WidgetValComparison {
  readonly comparisonType: "widgetVal";
  widgetID: string;
  key: string;
  comparison: equalityOperator;
  val?: widgetValPrimitive;
}

export interface SharedDataValComparison {
  readonly comparisonType: "sharedDataVal";
  sharedDataKey: string;
  comparison: equalityOperator;
  val?: widgetValPrimitive;
}

export interface SharedDataToSharedDataComparison {
  readonly comparisonType: "sharedDataToSharedData";
  sharedDataKey1: string;
  comparison: equalityOperator;
  sharedDataKey2: string;
}

export type radioSelectedOperator =
  | "any"
  | "none"
  | "radioIDEquals"
  | "radioIDNotEquals";

export interface RadioSelectionComparison {
  readonly comparisonType: "radioSelection";
  group: string;
  selected: radioSelectedOperator;
  radioID: string;
}

export interface TextLengthComparison {
  readonly comparisonType: "textLength";
  textID: string;
}

export interface TrackValComparison {
  readonly comparisonType: "trackVal";
  comparison: equalityOperatorString;
  trackID: string;
}

export interface GuideCompletedComparison {
  readonly comparisonType: "guideCompleted";
}

export interface DropsHaveDragsComparison {
  readonly comparisonType: "dropsHaveDrags";
  dropIDs: string[];
}

export interface NestedComparisons {
  readonly comparisonType: "nestedComparisons";
  comparisons: Comparison[];
  comparisonsLogic: logicalOperator;
}

export interface IsTeacherComparison {
  readonly comparisonType: "isTeacher";
}

export type logicalOperator = "and" | "or";

export type evaluationTimes =
  | "widgetsChange"
  | "pageLoads"
  | "sharedDataChanges";

export interface Condition {
  evaluateWhen: evaluationTimes;
  comparisons: Comparison[];
  comparisonsLogic: logicalOperator;
  effectsPass: Effect[];
  effectsFail: Effect[];
  responsesPass: Response[];
  responsesFail: Response[];
  parentWidgetID: string; // the widget this condition was a prop of
}

export interface ConditionsList {
  conditionList: Condition[];
}

export interface PagesConditionsDict {
  [key: string]: ConditionsList; // key = pageID
}
