import { openableModules } from "@/data models/userModels";
import { widgetValPrimitive } from "@/data models/widgetModels";

export interface Effect {
  effectData:
    | UpdateWidget
    | UpdateWidgetWithSharedData
    | NextPage
    | PreviousPage
    | Break
    | GoToPage
    | GoToGlossary
    | AddClasses
    | RemoveClasses
    | UnlockNextPage
    | UnlockPage
    | UnlockGuide
    | UnlockCase
    | LockPage
    | SetGuideCompleted
    | IncrementSharedData
    | SetSharedDataNumber
    | SetSharedDataToRadioGroupValue
    | PlaySound
    | StopSound
    | SetSectionVisibility
    | SetPageVisibility
    | ResetDraggables
    | ResetDraggable
    | EvalDragGroup
    | UpdateRadioGroupSelection;
  fireOnceID: string; // If you want the effect to only fire once, give it an ID to write into the store
  delay: number; // time in seconds to delay before applying the effect
}


export interface ResetDraggable {
  readonly effectType: "resetDraggable";
  dragID: string;
}

export interface EvalDragGroup {
  readonly effectType: "evalDragGroup";
  groupID: string;
}

export interface ResetDraggables {
  readonly effectType: "resetDraggables";
  groupID: string;
}
export interface UpdateWidget {
  readonly effectType: "updateWidget";
  widgetID: string;
  key: string;
  val: widgetValPrimitive;
}

export interface UpdateWidgetWithSharedData {
  readonly effectType: "updateWidgetWithSharedData";
  widgetID: string;
  key: string;
  sharedDataKey: string;
}

export interface NextPage {
  readonly effectType: "nextPage";
}

export interface PreviousPage {
  readonly effectType: "previousPage";
}

export interface Break {
  readonly effectType: "break";
}

export interface GoToPage {
  readonly effectType: "goToPage";
  pageID: string;
}

export interface GoToGlossary {
  readonly effectType: "goToGlossary";
  pageID: string;
}

export interface AddClasses {
  readonly effectType: "addClasses";
  widgetID: string;
  classes: string;
}

export interface RemoveClasses {
  readonly effectType: "removeClasses";
  widgetID: string;
  classes: string;
}

export interface UnlockNextPage {
  readonly effectType: "unlockNextPage";
}

export interface UnlockPage {
  readonly effectType: "unlockPage";
  pageID: string;
}

export interface UnlockGuide {
  readonly effectType: "unlockGuide";
}

export interface UnlockCase {
  readonly effectType: "unlockCase";
}

export interface LockPage {
  readonly effectType: "lockPage";
  pageID: string;
}

export interface SetGuideCompleted {
  readonly effectType: "setGuideCompleted";
}

export interface IncrementSharedData {
  readonly effectType: "incrementSharedData";
  sharedDataKey: string;
  incrementValue: number;
}

export interface SetSharedDataNumber {
  readonly effectType: "setSharedDataNumber";
  sharedDataKey: string;
  setValue: number;
}

export interface SetSharedDataToRadioGroupValue {
  readonly effectType: "setSharedDataToRadioGroupValue";
  radioGroupId: string;
  sharedDataKey: string;
}

export type soundType = "sfxOneShot" | "sfxContinuous" | "bgMusic";

export interface PlaySound {
  readonly effectType: "playSound";
  type: soundType;
  srcWebm: string;
  srcMp3: string;
}

export interface StopSound {
  readonly effectType: "stopSound";
  srcWebm: string;
  srcMp3: string;
}

export interface StoreDelayedEffect {
  time: number;
  effect: Effect;
  pageID: string;
  parentWidgetID: string;
}

export interface SetSectionVisibility {
  readonly effectType: "setSectionVisibility";
  moduleName: openableModules;
  sectionName: string;
  visible: boolean;
}

export interface SetPageVisibility {
  readonly effectType: "setPageVisibility";
  pageID: string;
  visible: boolean;
}

export interface UpdateRadioGroupSelection {
  readonly effectType: "updateRadioGroupSelection";
  group: string;
  radioID: string;
}
