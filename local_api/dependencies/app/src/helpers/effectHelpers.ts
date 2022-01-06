import { sortBy } from "ramda";
import { Maybe } from "true-myth";

import { Effect, StoreDelayedEffect } from "@/data models/effectModels";
import { openableModules } from "@/data models/userModels";
import { logError, logMessage, logWarning } from "@/helpers/debugHelpers";
import {
  getPageExistsInTrack,
  getPageExistsInTrackGroup,
  getPageModule,
  getPageSection,
  tryCatch,
} from "@/helpers/projectHelpers";
import {
  getSharedDataUserOrAppVal,
  setSharedDataUserOrAppVal,
} from "@/helpers/sharedDataHelpers";
import { getStore } from "@/helpers/storeHelpers";
import { getTime, delay } from "@/helpers/timeHelpers";
import { getCurrentPageID, isPageUnlocked } from "@/helpers/userHelpers";
import { glossaryShowHide, useTeacherView } from "@/helpers/widgetHelpers";
import { playSound, stopSound } from "@/managers/audioManager";
import router from "@/router";
import {
  readNextPageID,
  readPageVisibleApp,
  readPreviousPageID,
  readWidgetPropVal,
} from "@/store/modules/appData";
import {
  commitAddDelayedEffect,
  commitGuideCompleted,
  commitClickedNext,
  commitRemoveAllDelayedEffects,
  commitRemoveDelayedEffect,
  commitSetPageVisiblity,
  commitSetSectionVisiblity,
  commitSetWidgetEntry,
  commitUnlockModule,
  commitUnlockPage,
  commitSectionUnlock,
  commitLockPage,
  commitSetModuleCurrentPage,
  commitWidgetAddRemoveClass,
  dispatchUpdateWidget,
  readAllDelayedEffects,
  readModulesState,
  readPageVisibleUser,
  readWidgetEntryVal,
  readSectionVisibleUser,
} from "@/store/modules/userData";

import { widgetValPrimitive } from "@/data models/widgetModels";
import {
  killSpecialPopper,
  setCasePopperFlag,
  showModulePopper,
  showNextPagePopper,
} from "./specialPopperHelpers";

export async function runEffect(
  effect: Effect,
  pageID: string,
  parentWidgetID: string
) {
  if (effect.fireOnceID !== undefined && effect.fireOnceID !== "") {
    //check the store to see if it's been fired already
    const maybeFired = readWidgetEntryVal(getStore())(
      pageID,
      parentWidgetID,
      effect.fireOnceID
    );

    if (maybeFired.isJust()) {
      logMessage(`effect ${effect.fireOnceID} has already fired`);
      return;
    }
  }

  // get these before delaying in case user navigates to a different page
  const modulesState = readModulesState(getStore());
  const widgetModule = getPageModule(pageID);
  let widgetTrackID = modulesState.caseState.currentTrackID;

  if (widgetModule === "guide") {
    widgetTrackID = modulesState.guideState.currentTrackID;
  }

  if (effect.delay) {
    logMessage(
      "delay effect",
      effect.delay,
      "seconds",
      effect.effectData.effectType
    );

    const currentTime = await getTime();
    const delayedEffectETA = currentTime + effect.delay * 1000;
    const storeDelayedEffect: StoreDelayedEffect = {
      time: delayedEffectETA,
      effect,
      pageID,
      parentWidgetID,
    };

    commitAddDelayedEffect(getStore(), storeDelayedEffect);

    await delay(effect.delay);

    commitRemoveDelayedEffect(getStore(), storeDelayedEffect);
  }

  logMessage("runEffect:", pageID, effect.effectData.effectType);
  tryCatch(() => {
    const userModuleState = readModulesState(getStore());

    switch (effect.effectData.effectType) {
      case "resetDraggables":
        resetDraggables(effect?.effectData?.groupID);
        break;
      case "resetDraggable":
        resetDraggable(effect?.effectData?.dragID);
        break;
      case "evalDragGroup":
        evalDragGroup(effect?.effectData?.groupID);
        break;
      case "previousPage":
        previousPage(pageID, widgetModule, widgetTrackID);
        break;
      case "nextPage":
        killSpecialPopper();
        setCasePopperFlag(false);
        nextPage(pageID, widgetModule, widgetTrackID);
        break;
      case "updateWidget":
        dispatchUpdateWidget(getStore(), {
          pageID,
          widgetID: effect.effectData.widgetID,
          key: effect.effectData.key,
          value: effect.effectData.val,
        });
        break;
      case "updateWidgetWithSharedData":
        const sharedDataValue = getSharedDataValue(
          effect.effectData.sharedDataKey
        );
        if (sharedDataValue !== undefined) {
          let sharedDataPrimitiveVal: widgetValPrimitive = sharedDataValue;
          const widgetPropVal = readWidgetPropVal(getStore())(
            pageID,
            effect.effectData.widgetID,
            effect.effectData.key
          );
          if (widgetPropVal.isJust()) {
            switch (typeof widgetPropVal.unsafelyUnwrap()) {
              case "string":
                sharedDataPrimitiveVal = String(sharedDataValue);
                break;
              case "number":
                sharedDataPrimitiveVal = Number(sharedDataValue);
                break;
              case "boolean":
                sharedDataPrimitiveVal = Boolean(sharedDataValue);
                break;
              default:
                sharedDataPrimitiveVal = sharedDataValue;
            }
          }
          dispatchUpdateWidget(getStore(), {
            pageID,
            widgetID: effect.effectData.widgetID,
            key: effect.effectData.key,
            value: sharedDataPrimitiveVal,
          });
        }
        break;
      case "break":
        // happens when evaluating conditions, to break the loop there
        break;
      case "goToPage":
        goToPage(effect.effectData.pageID, pageID);
        break;
      case "goToGlossary":
        commitSetModuleCurrentPage(getStore(), {
          moduleName: "glossary",
          pageID: effect.effectData.pageID,
        });
        glossaryShowHide(true);
        break;
      case "addClasses":
        addClass(pageID, effect.effectData.widgetID, effect.effectData.classes);
        break;
      case "removeClasses":
        removeClass(
          pageID,
          effect.effectData.widgetID,
          effect.effectData.classes
        );
        break;
      case "unlockNextPage":
        unlockNextPage(pageID, widgetModule, widgetTrackID);
        const isGuide = userModuleState.moduleOpen === "guide";

        if (isGuide) {
          showNextPagePopper(readModulesState(getStore()).moduleOpen);
        }

        const isCase = userModuleState.moduleOpen === "case";

        if (isCase) {
          setCasePopperFlag(true);
        }

        break;
      case "unlockPage":
        unlockPage(effect.effectData.pageID);
        break;
      case "unlockGuide":
        commitUnlockModule(getStore(), "guide");
        showModulePopper("guide");
        break;
      case "unlockCase":
        unlockCase();
        break;
      case "lockPage":
        lockPage(effect.effectData.pageID);
        break;
      case "setGuideCompleted":
        setGuideCompleted();
        break;
      case "incrementSharedData":
        incrementSharedData(
          pageID,
          effect.effectData.sharedDataKey,
          effect.effectData.incrementValue
        );
        break;
      case "setSharedDataNumber":
        setSharedDataNumber(
          pageID,
          effect.effectData.sharedDataKey,
          effect.effectData.setValue
        );
        break;
      case "setSharedDataToRadioGroupValue":
        const selectedID = readWidgetEntryVal(getStore())(
          pageID,
          effect.effectData.radioGroupId,
          "selected"
        );
        if (selectedID.isJust()) {
          const radioPropValue = readWidgetPropVal(getStore())(
            pageID,
            selectedID.unsafelyUnwrap() as string,
            "value"
          );
          if (radioPropValue.isJust()) {
            setSharedDataUserOrAppVal(
              pageID,
              effect.effectData.sharedDataKey,
              radioPropValue.unsafelyUnwrap()
            );
          } else {
            logWarning(
              "setSharedDataToRadioGroupValue effect cannot find value of radioWidget with id: ",
              selectedID.unsafelyUnwrap()
            );
          }
        } else {
          logWarning(
            "setSharedDataToRadioGroupValue effect cannot find selected of radioGroupID: ",
            effect.effectData.radioGroupId
          );
        }
        break;
      case "playSound":
        playSound(
          effect.effectData.srcWebm,
          effect.effectData.srcMp3,
          effect.effectData.type
        );
        break;
      case "stopSound":
        stopSound(effect.effectData.srcWebm, effect.effectData.srcMp3);
        break;
      case "setSectionVisibility":
        setSectionVisibilty(
          effect.effectData.moduleName,
          effect.effectData.sectionName,
          effect.effectData.visible
        );

        break;
      case "setPageVisibility":
        setPageVisibility(effect.effectData.pageID, effect.effectData.visible);
        break;
      case "updateRadioGroupSelection":
        dispatchUpdateWidget(getStore(), {
          pageID,
          widgetID: effect.effectData.group,
          key: "selected",
          value: effect.effectData.radioID,
        });
        break;
      default:
        console.log("how did you do that?");
    }
  });

  if (effect.fireOnceID != undefined && effect.fireOnceID !== "") {
    commitSetWidgetEntry(getStore(), {
      pageID,
      widgetID: parentWidgetID,
      key: effect.fireOnceID,
      value: true,
    });
  }
}

function resetDraggables(targetGroupId: string) {
  const pageId = getCurrentPageID().unsafelyUnwrap();
  // for each widget drag on the page, return it to its starting point.

  const draggables: string[] = Array.from(
    document.querySelectorAll("fieldset.drag")
  ).map((node) => node.id);

  for (const d of draggables) {
    const initialDropId = readWidgetPropVal(getStore())(pageId, d, "dropId");

    let initialDropChildrenLength: number = 0;
    let initialDropMaxChildren: number = 0;
    if (initialDropId.isJust()) {
      const initialDropSlot = document.querySelector(
        `#${initialDropId.unsafelyUnwrap()} .dragSlot`
      );
      initialDropChildrenLength =
        typeof initialDropSlot?.childElementCount === "number"
          ? initialDropSlot?.childElementCount
          : Infinity;

      const _initialDropMaxChildren = readWidgetPropVal(getStore())(
        pageId,
        initialDropId.unsafelyUnwrap() as string,
        "maxChildren"
      );
      initialDropMaxChildren = _initialDropMaxChildren.isJust()
        ? (_initialDropMaxChildren.unsafelyUnwrap() as number)
        : 0;
    }

    const _groupId = readWidgetPropVal(getStore())(pageId, d, "groupId");
    const groupId = _groupId.isJust() ? _groupId.unsafelyUnwrap() : "";

    const _enabledAppData = readWidgetPropVal(getStore())(pageId, d, "enabled");
    const _enabledProp = _enabledAppData.isJust()
      ? _enabledAppData.unsafelyUnwrap()
      : 0;
    const _enabledUserData = readWidgetEntryVal(getStore())(
      pageId,
      d,
      "enabled"
    );
    const enabled = Maybe.unwrapOr(_enabledProp, _enabledUserData);

    // if this widget isn't disabled, and has the same groupID field that was passed

    if (
      initialDropId.isJust() &&
      (targetGroupId === groupId || targetGroupId.trim() === "") &&
      enabled &&
      initialDropChildrenLength < initialDropMaxChildren
    ) {
      dispatchUpdateWidget(getStore(), {
        pageID: pageId,
        widgetID: d,
        key: "dropId",
        value: initialDropId.unsafelyUnwrap(),
      });
    }
  }
}

function resetDraggable(draggableId: string): void {
  const pageId = getCurrentPageID().unsafelyUnwrap();
  // return widget drag to its initial position
  const initialDropId = readWidgetPropVal(getStore())(
    pageId,
    draggableId,
    "dropId"
  );

  let initialDropChildrenLength: number = 0;
  let initialDropMaxChildren: number = 0;
  if (initialDropId.isJust()) {
    const initialDropSlot = document.querySelector(
      `#${initialDropId.unsafelyUnwrap()} .dragSlot`
    );
    initialDropChildrenLength =
      typeof initialDropSlot?.childElementCount === "number"
        ? initialDropSlot?.childElementCount
        : Infinity;

    const _initialDropMaxChildren = readWidgetPropVal(getStore())(
      pageId,
      initialDropId.unsafelyUnwrap() as string,
      "maxChildren"
    );
    initialDropMaxChildren = _initialDropMaxChildren.isJust()
      ? (_initialDropMaxChildren.unsafelyUnwrap() as number)
      : 0;
  }

  const _enabledAppData = readWidgetPropVal(getStore())(
    pageId,
    draggableId,
    "enabled"
  );
  const _enabledProp = _enabledAppData.isJust()
    ? _enabledAppData.unsafelyUnwrap()
    : 0;
  const _enabledUserData = readWidgetEntryVal(getStore())(
    pageId,
    draggableId,
    "enabled"
  );
  const enabled = Maybe.unwrapOr(_enabledProp, _enabledUserData);

  if (
    initialDropId.isJust() &&
    enabled &&
    initialDropChildrenLength < initialDropMaxChildren
  ) {
    dispatchUpdateWidget(getStore(), {
      pageID: pageId,
      widgetID: draggableId,
      key: "dropId",
      value: initialDropId.unsafelyUnwrap(),
    });
  }
}

function evalDragGroup(groupId: string): void {
  // get all draggables by group
  const pageId = getCurrentPageID().unsafelyUnwrap();

  const draggables: string[] = Array.from(
    document.querySelectorAll("fieldset.drag")
  ).map((node) => node.id);

  for (const d of draggables) {
    const setGroupId = readWidgetPropVal(getStore())(pageId, d, "groupId");
    const _groupId = setGroupId.isJust() ? setGroupId.unsafelyUnwrap() : "";
    // if not in the given group, ignore
    if (groupId !== _groupId) {
      continue;
    }
    const correctDropIds = readWidgetPropVal(getStore())(
      pageId,
      d,
      "correctDropIds"
    );

    const currentDrop = readWidgetEntryVal(getStore())(pageId, d, "dropId");
    //@ts-ignore
    const correctDropIdList = correctDropIds.isJust() && correctDropIds.unsafelyUnwrap() !== ""
      ? //@ts-ignore
        JSON.parse(correctDropIds.unsafelyUnwrap().replace(/'/g, '"'))
      : [];
    //@ts-ignore
    const correct: boolean = correctDropIdList.includes(
      currentDrop.isJust() ? currentDrop.unsafelyUnwrap() + "" : ""
    );
    // if correct, disable this drag and its current drop
    if (correct) {
      // disable this drag
      dispatchUpdateWidget(getStore(), {
        pageID: pageId,
        widgetID: d,
        key: "enabled",
        value: false,
      });

      // disable its current drop
      if (currentDrop.isJust()) {
        dispatchUpdateWidget(getStore(), {
          pageID: pageId,
          //@ts-ignore
          widgetID: currentDrop.unsafelyUnwrap(),
          key: "enabled",
          value: false,
        });
      }
    }
    // if incorrect, set drag to its initialDropId, but only if the initial dropId can take on a new drag
    if (!correct) {
      const initialDropId = readWidgetPropVal(getStore())(pageId, d, "dropId");

      let initialDropChildrenLength: number = 0;
      let initialDropMaxChildren: number = 0;
      if (initialDropId.isJust()) {
        const initialDropSlot = document.querySelector(
          `#${initialDropId.unsafelyUnwrap()} .dragSlot`
        );
        initialDropChildrenLength =
          typeof initialDropSlot?.childElementCount === "number"
            ? initialDropSlot?.childElementCount
            : Infinity;

        const _initialDropMaxChildren = readWidgetPropVal(getStore())(
          pageId,
          initialDropId.unsafelyUnwrap() as string,
          "maxChildren"
        );
        initialDropMaxChildren = _initialDropMaxChildren.isJust()
          ? (_initialDropMaxChildren.unsafelyUnwrap() as number)
          : 0;
      }
      // return drag to its starting point
      if (
        initialDropId.isJust() &&
        initialDropChildrenLength < initialDropMaxChildren
      ) {
        dispatchUpdateWidget(getStore(), {
          pageID: pageId,
          widgetID: d,
          key: "dropId",
          value: initialDropId.unsafelyUnwrap(),
        });
      }
    }
  }
}

function previousPage(
  widgetpageID: string,
  widgetModule: openableModules,
  widgetTrack: string
) {
  const maybePrevPageID = getPrevVisiblePageID(
    widgetpageID,
    widgetModule,
    widgetTrack
  );
  if (maybePrevPageID.isJust()) {
    const prevPageID = Maybe.unsafelyUnwrap(maybePrevPageID);
    const maybeCurrentPage = getCurrentPageID();
    if (maybeCurrentPage.isJust()) {
      const currentpageID = maybeCurrentPage.unsafelyUnwrap();
      // to prevent unexpected navigation after a delay,
      // only route if the user is still on the page this effect came from
      unlockPage(prevPageID);
      if (currentpageID === widgetpageID) {
        const modulesState = readModulesState(getStore());
        router.push(`/${modulesState.currentTrackGroupID}/pages/${prevPageID}`);
      }
    }
  }
}

function clickedNext(pageID: string, moduleName: string) {
  commitClickedNext(getStore(), {
    pageID,
    moduleName,
  });
}

function nextPage(
  widgetpageID: string,
  widgetModule: openableModules,
  widgetTrack: string
) {
  const maybeNextPageID = getNextVisiblePageID(
    widgetpageID,
    widgetModule,
    widgetTrack
  );
  if (maybeNextPageID.isJust()) {
    const nextPageID = maybeNextPageID.unsafelyUnwrap();
    const maybeCurrentPage = getCurrentPageID();
    if (maybeCurrentPage.isJust()) {
      const currentpageID = maybeCurrentPage.unsafelyUnwrap();
      // prevent guidePopper from showing when the user clicks nextState
      // set currentPage
      clickedNext(widgetpageID, widgetModule);

      // to prevent unexpected navigation after a delay,
      // only route if the user is still on the page this effect came from
      unlockPage(nextPageID);
      if (currentpageID === widgetpageID) {
        const modulesState = readModulesState(getStore());
        router.push(`/${modulesState.currentTrackGroupID}/pages/${nextPageID}`);
      }
    }
  }
}

function goToPage(goTopageID: string, widgetpageID: string) {
  const modulesState = readModulesState(getStore());
  const resourceActivity = modulesState.currentTrackGroupID;

  const pageExists = getPageExistsInTrackGroup(resourceActivity, goTopageID);
  if (pageExists) {
    const maybeCurrentPage = getCurrentPageID();
    if (maybeCurrentPage.isJust()) {
      const currentpageID = maybeCurrentPage.unsafelyUnwrap();
      //if the glossary is trying to go to a page, let it.
      if (
        modulesState.glossaryOpen &&
        widgetpageID === modulesState.currentGlossaryPageID
      ) {
        widgetpageID = currentpageID;
        glossaryShowHide(false);
      }
      // to prevent unexpected navigation after a delay,
      // only route if the user is still on the page this effect came from
      unlockPage(goTopageID);
      if (currentpageID === widgetpageID) {
        router.push(`/${resourceActivity}/pages/${goTopageID}`);
      }
    }
  } else {
    logWarning(
      "Can not goToPage. ",
      goTopageID,
      " does not exists in the ",
      resourceActivity,
      " track group."
    );
  }
}

function addClass(pageID: string, widgetID: string, newClasses: string) {
  logMessage("addClasses", pageID, widgetID, newClasses);

  const classesArray = newClasses.split(" ");
  for (const className of classesArray) {
    if (className === "") continue;
    commitWidgetAddRemoveClass(getStore(), {
      pageID,
      widgetID,
      className,
      value: true,
    });
  }
}

function removeClass(pageID: string, widgetID: string, newClasses: string) {
  logMessage("removeClasses", pageID, widgetID, newClasses);

  const classesArray = newClasses.split(" ");
  for (const className of classesArray) {
    if (className === "") continue;
    commitWidgetAddRemoveClass(getStore(), {
      pageID,
      widgetID,
      className,
      value: false,
    });
  }
}

export function unlockPage(pageID: string) {
  if (isPageUnlocked(pageID) && !useTeacherView()) return;
  // in teacherView always unlock so we get the popper in the progress bar every time

  const modulesState = readModulesState(getStore());

  let moduleName: openableModules = "case";
  const isGuidePage = getPageExistsInTrack(
    "guide",
    modulesState.guideState.currentTrackID,
    pageID
  );
  if (isGuidePage) moduleName = "guide";

  commitUnlockPage(getStore(), {
    moduleName,
    pageID,
  });
}

function unlockNextPage(
  widgetpageID: string,
  widgetModule: openableModules,
  widgetTrack: string
) {
  logMessage("unlock the page after", widgetpageID, widgetModule, widgetTrack);
  const maybeNextPageID = getNextVisiblePageID(
    widgetpageID,
    widgetModule,
    widgetTrack
  );
  if (maybeNextPageID.isJust()) {
    const nextPageID = Maybe.unsafelyUnwrap(maybeNextPageID);
    logMessage("the page to unlock after", widgetpageID, "is", nextPageID);
    unlockPage(nextPageID);
  }

  // if the page is in a new section, in a caseunlock that section
  console.info(widgetModule);
  if (widgetModule === "case") {
    const currentPageId = widgetpageID;
    const nextPageId = maybeNextPageID.isJust()
      ? Maybe.unsafelyUnwrap(maybeNextPageID)
      : "";

    const nextPageSectionMaybe = getPageSection(
      widgetModule,
      widgetTrack,
      nextPageId
    );
    const currentPageSectionMaybe = getPageSection(
      widgetModule,
      widgetTrack,
      currentPageId
    );

    const currentPageSection = currentPageSectionMaybe.isJust()
      ? Maybe.unsafelyUnwrap(currentPageSectionMaybe)
      : { name: null };
    const nextPageSection = nextPageSectionMaybe.isJust()
      ? Maybe.unsafelyUnwrap(nextPageSectionMaybe)
      : { name: null };

    const isNextPageNewSection =
      currentPageSection.name !== nextPageSection.name;

    if (
      isNextPageNewSection &&
      currentPageSection.name &&
      nextPageSection.name
    ) {
      const store = getStore();
      commitSectionUnlock(getStore(), {
        moduleName: "case",
        sectionName: nextPageSection.name,
      });
      console.info("section unlocked");
    }
  }
}

function unlockCase() {
  const modulesState = readModulesState(getStore());
  if (modulesState.caseState.locked) {
    commitUnlockModule(getStore(), "case");
    showModulePopper("case");
  }
}

export function lockPage(pageID: string) {
  if (!isPageUnlocked(pageID)) return;

  const modulesState = readModulesState(getStore());

  let moduleName: openableModules = "case";
  const isGuidePage = getPageExistsInTrack(
    "guide",
    modulesState.guideState.currentTrackID,
    pageID
  );
  if (isGuidePage) moduleName = "guide";
  commitLockPage(getStore(), {
    moduleName,
    pageID,
  });
}

function setGuideCompleted() {
  // logMessage("setGuideCompleted");
  commitGuideCompleted(getStore());
}

function incrementSharedData(
  pageID: string,
  sharedDataKey: string,
  increment: number
) {
  const maybeSharedData = getSharedDataUserOrAppVal(getStore(), sharedDataKey);
  if (maybeSharedData != undefined) {
    let value = maybeSharedData;
    if (typeof value === "number") {
      value += increment;
      setSharedDataUserOrAppVal(pageID, sharedDataKey, value);
    } else {
      logError(
        `Cannot IncrementSharedData, shared data is not a number. key: ${sharedDataKey}`
      );
    }
  } else {
    logError(
      `Cannot IncrementSharedData, shared data is nothing. key: ${sharedDataKey}`
    );
  }
}

function getSharedDataValue(sharedDataKey: string) {
  return getSharedDataUserOrAppVal(getStore(), sharedDataKey);
}

function setSharedDataNumber(
  pageID: string,
  sharedDataKey: string,
  value: number
) {
  setSharedDataUserOrAppVal(pageID, sharedDataKey, value);
}

export function applyStoreDelayedEffects() {
  const storeDelayedEffects = readAllDelayedEffects(getStore());
  if (storeDelayedEffects && storeDelayedEffects.length > 0) {
    const sorted = sortBy((x) => x.time, storeDelayedEffects);
    logMessage("sorted store delayed effects", sorted);
    for (const sde of sorted) {
      sde.effect.delay = 0;
      runEffect(sde.effect, sde.pageID, sde.parentWidgetID);
    }
    commitRemoveAllDelayedEffects(getStore());
  }
}

function setSectionVisibilty(
  moduleName: openableModules,
  sectionName: string,
  visible: boolean
) {
  commitSetSectionVisiblity(getStore(), {
    moduleName,
    sectionName,
    visible,
  });
}

function setPageVisibility(pageID: string, visible: boolean) {
  const modulesState = readModulesState(getStore());

  let moduleName: openableModules = "case";
  const isGuidePage = getPageExistsInTrack(
    "guide",
    modulesState.guideState.currentTrackID,
    pageID
  );
  if (isGuidePage) moduleName = "guide";

  commitSetPageVisiblity(getStore(), { moduleName, pageID, visible });
}

export function pageVisibleUserOverrideApp(
  pageID: string,
  moduleName: openableModules,
  trackName: string
): Maybe<boolean> {
  const maybePageVisibleUser = readPageVisibleUser(getStore())(
    moduleName,
    pageID
  );
  // logMessage("maybePageVisibleUser", maybePageVisibleUser);
  if (maybePageVisibleUser.isJust()) return maybePageVisibleUser;

  const maybePageVisibleApp = readPageVisibleApp(getStore())(
    moduleName,
    trackName,
    pageID
  );
  // logMessage("maybePageVisibleApp", maybePageVisibleApp);
  if (maybePageVisibleApp.isJust()) return maybePageVisibleApp;
  return new Maybe.Nothing<boolean>();
}

export function getPrevVisiblePageID(
  pageID: string,
  moduleName: openableModules,
  trackName: string
): Maybe<string> {
  const currentPageID = pageID;
  let maybePrevPageID = readPreviousPageID(getStore())(
    moduleName,
    trackName,
    currentPageID
  );
  while (maybePrevPageID.isJust()) {
    const prevPageID = maybePrevPageID.unsafelyUnwrap();
    const maybePageVisibilty = pageVisibleUserOverrideApp(
      prevPageID,
      moduleName,
      trackName
    );
    const maybePageSection = getPageSection(moduleName, trackName, prevPageID);
    if (maybePageSection.isJust()) {
      const pageSection = maybePageSection.unsafelyUnwrap();
      const maybeSectionVisibleUser = readSectionVisibleUser(getStore())(
        moduleName,
        pageSection.name
      );
      let sectionVisible;
      if (maybeSectionVisibleUser.isJust()) {
        //if we have any value in the user store then it takes precedence
        sectionVisible = maybeSectionVisibleUser.unsafelyUnwrap();
      } else {
        sectionVisible =
          pageSection.visible === true || pageSection.visible == undefined;
      }
      if (
        sectionVisible &&
        (maybePageVisibilty.isNothing() ||
          maybePageVisibilty.unsafelyUnwrap() == true)
      ) {
        return Maybe.of(prevPageID);
      }

      maybePrevPageID = readPreviousPageID(getStore())(
        moduleName,
        trackName,
        prevPageID
      );
    }
  }
  return new Maybe.Nothing<string>();
}

export function getNextVisiblePageID(
  pageID: string,
  moduleName: openableModules,
  trackName: string
): Maybe<string> {
  const currentPageID = pageID;
  let maybeNextPageID = readNextPageID(getStore())(
    moduleName,
    trackName,
    currentPageID
  );
  while (maybeNextPageID.isJust()) {
    const nextPageID = maybeNextPageID.unsafelyUnwrap();
    const maybePageVisibilty = pageVisibleUserOverrideApp(
      nextPageID,
      moduleName,
      trackName
    );
    const maybePageSection = getPageSection(moduleName, trackName, nextPageID);
    if (maybePageSection.isJust()) {
      const pageSection = maybePageSection.unsafelyUnwrap();
      const maybeSectionVisibleUser = readSectionVisibleUser(getStore())(
        moduleName,
        pageSection.name
      );
      let sectionVisible;
      if (maybeSectionVisibleUser.isJust()) {
        //if we have any value in the user store then it takes precedence
        sectionVisible = maybeSectionVisibleUser.unsafelyUnwrap();
      } else {
        sectionVisible =
          pageSection.visible === true || pageSection.visible == undefined;
      }
      // logMessage(
      //   "getNextVisiblePageID?",
      //   nextPageID,
      //   maybePageVisibilty,
      //   sectionVisible
      // );
      if (
        sectionVisible &&
        (maybePageVisibilty.isNothing() ||
          maybePageVisibilty.unsafelyUnwrap() === true)
      ) {
        return Maybe.of(nextPageID);
      }

      maybeNextPageID = readNextPageID(getStore())(
        moduleName,
        trackName,
        nextPageID
      );
    }
  }
  return new Maybe.Nothing<string>();
}
