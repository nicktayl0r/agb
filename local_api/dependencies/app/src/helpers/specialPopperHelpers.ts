// side effect functions that will handle next page and module poppers
import { readModulesState } from "@/store/modules/userData";
import { getStore } from "@/helpers/storeHelpers";
import {
  getModulePopperMessage,
  getNextPagePopperMessage,
} from "@/helpers/projectHelpers";
import WidgetPopperCollapsible from "@/components/WidgetPopperCollapsible.vue";

import Vue from "vue";

import { getNextPageID, isPageUnlocked } from "@/helpers/userHelpers";

type ModuleType = "guide" | "case";

let specialPopper: WidgetPopperCollapsible | null = null;

export let casePopperFlag: boolean = false;

export const setCasePopperFlag = function (val: boolean) {
  casePopperFlag = val;
};

export const getSpecialPopper = function () {
  return specialPopper;
};

export const setSpecialPopper = function (payload: {
  popper: WidgetPopperCollapsible;
}) {
  specialPopper = payload.popper;
  return specialPopper;
};

export const resetSpecialPopper = function () {
  if (specialPopper !== null) {
    specialPopper.$destroy();
    specialPopper = null;
  }
  return null;
};

function getTrackGroupType(trackGroupId: string): string {
  const trackGroupStrings = trackGroupId.split("_");

  return trackGroupStrings[trackGroupStrings.length - 2];
}

function permitNextPagePopper(): boolean {
  const pageId = getNextPageID().unsafelyUnwrap();
  const popperContentExists = !!(pageId && getNextPagePopperMessage(pageId));
  const pageIsUnlocked = pageId && isPageUnlocked(pageId);
  const isNoSpecialPopper = getSpecialPopper() === null;

  return !!(popperContentExists && isNoSpecialPopper && pageIsUnlocked);
}

function permitGuidePopper(): boolean {
  // shows in case trackgroups, when directing the user to the HB at the beginning of the IC
  const userModuleState = readModulesState(getStore());

  const guideUnlocked = !userModuleState.guideState.locked;
  const caseOpen = userModuleState.moduleOpen === "case";
  const isNotExpandedHandbook =
    getTrackGroupType(userModuleState.currentTrackGroupID) !== "guide";
  const popperText = getModulePopperMessage("guide");
  const popperContentExists = !!popperText;
  const isNoModulePopper = !specialPopper;

  return (
    guideUnlocked &&
    caseOpen &&
    isNotExpandedHandbook &&
    popperContentExists &&
    isNoModulePopper
  );
}

function permitCasePopper(): boolean {
  // shows in case TrackGroups, when directing the user back to the case at the end of the HB
  const userModuleState = readModulesState(getStore());

  const caseUnlocked = !userModuleState.caseState.locked;
  const guideOpen = userModuleState.moduleOpen === "guide";
  const isNotExpandedHandbook =
    getTrackGroupType(userModuleState.currentTrackGroupID) !== "guide";
  const popperText = getModulePopperMessage("case");
  const popperContentExists = !!popperText;
  const isNoModulePopper = !specialPopper;

  return (
    caseUnlocked &&
    guideOpen &&
    isNotExpandedHandbook &&
    popperContentExists &&
    isNoModulePopper
  );
}

function showSpecialPopper(anchor: string, message: string) {
  const specialPopper = new WidgetPopperCollapsible({
    propsData: {
      id: "progressBarPopper",
      anchorId: anchor,
      options: {
        placement: "left",
        modifiers: {
          flip: { enabled: false },
          preventOverflow: {
            boundariesElement: document.getElementById("app"),
            escapeWithReference: false,
          },
        },
      },
    },
  });

  specialPopper.$slots.default = [
    specialPopper.$createElement(Vue.compile(`<span>${message}</span>`)),
  ];

  specialPopper.$mount();

  const boundariesEl = document.getElementById("app");

  if (specialPopper && boundariesEl) {
    boundariesEl.appendChild(specialPopper.$el);
  }

  setSpecialPopper({
    popper: specialPopper,
  });
}

export function showNextPagePopper(currentModule: ModuleType): void {
  const pageId = getNextPageID().unsafelyUnwrap();
  const popperMessage = getNextPagePopperMessage(pageId);
  const anchorId = {
    case: pageId,
    guide: "guideNextPage",
  }[currentModule];

  if (permitNextPagePopper()) {
    showSpecialPopper(anchorId, popperMessage);
  }
}

export function showModulePopper(currentModule: ModuleType): void {
  const [mayShowPopper, anchorId] = {
    guide: [permitGuidePopper(), "guideRadio"],
    case: [permitCasePopper(), "caseRadio"],
  }[currentModule] as [boolean, string];
  const popperMessage = getModulePopperMessage(currentModule);

  if (mayShowPopper) {
    showSpecialPopper(anchorId, popperMessage);
  }
}

export function killSpecialPopper(): void {
  resetSpecialPopper();
}
