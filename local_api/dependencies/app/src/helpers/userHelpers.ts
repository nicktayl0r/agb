import { Maybe } from "true-myth";

import {
  GlossaryPage,
  GlossaryTrack,
  modules,
  Track
} from "@/data models/projectModels";
import {
  CaseModulesState,
  ModuleUserState,
  openableModules,
  PagesDict,
  PageUserState
} from "@/data models/userModels";

import { getNextVisiblePageID, unlockPage } from "@/helpers/effectHelpers";
import {
  getPageModule,
  getSectionPages,
  getSectionSubsections,
  getTrack
} from "@/helpers/projectHelpers";
import { getStore } from "@/helpers/storeHelpers";
import router from "@/router";
import { readGlossary } from "@/store/modules/appData";
import {
  commitCurrentModule,
  commitSetModuleCurrentPage,
  commitUnlockPage,
  readModulesState
} from "@/store/modules/userData";

export function getModuleCurrentTrack(
  moduleName: openableModules
): Maybe<Track> {
  const modulesState = readModulesState(getStore());

  if (moduleName === "guide") {
    return getTrack("guide", modulesState.guideState.currentTrackID);
  } if (moduleName === "case") {
    return getTrack("case", modulesState.caseState.currentTrackID);
  }

  return Maybe.nothing<Track>();
}

export function unlockAndSetFirstPages() {
  const moduleState = readModulesState(getStore());
  unlockAndSetModuleFirstPages("case", moduleState.caseState);
  unlockAndSetModuleFirstPages("guide", moduleState.guideState);

  if (
    !moduleState.currentGlossaryPageID
    || moduleState.currentGlossaryPageID == ""
  ) {
    unlockAndSetGlossaryFirstPages(moduleState);
  }
}

function unlockAndSetModuleFirstPages(
  moduleName: openableModules,
  moduleState: ModuleUserState
) {
  const maybeTrack = getTrack(moduleName, moduleState.currentTrackID);
  if (maybeTrack.isJust()) {
    const track = Maybe.unsafelyUnwrap(maybeTrack);
    const firstSection = track.sections[0];
    if (firstSection) {
      const firstPage = firstSection.pages[0];
      if (firstPage) {
        if (moduleState.currentPageID === "") {
          commitSetModuleCurrentPage(getStore(), {
            moduleName,
            pageID: firstPage.pageID
          });
        }
        if (
          !moduleState.pages[firstPage.pageID]
          || !moduleState.pages[firstPage.pageID].unlocked
          || moduleState.pages[firstPage.pageID].unlocked === false
        ) {
          commitUnlockPage(getStore(), {
            moduleName,
            pageID: firstPage.pageID
          });
        }
      }
    }
  }
}

export function getCurrentGlossaryTrack(): GlossaryTrack | undefined {
  const userModuleState = readModulesState(getStore());
  if (!userModuleState) return undefined;

  const trackID = userModuleState.currentGlossaryTrackID;
  if (!trackID || trackID.trim() === "") {
    console.warn(
      "No glossary track ID. The project maybe didn't load yet, but if you see this more than once make sure it's set up in the project."
    );
  }

  const glossaryModuleData = readGlossary(getStore());
  if (
    glossaryModuleData
    && glossaryModuleData.tracks
    && glossaryModuleData.tracks.length > 0
  ) {
    return glossaryModuleData.tracks.find(track => track.trackID === trackID);
  }

  return undefined;
}

export function getCurrentGlossaryPage(): GlossaryPage | undefined {
  const currentTrack = getCurrentGlossaryTrack();

  if (currentTrack && currentTrack.pages) {
    const userModuleState = readModulesState(getStore());

    return currentTrack.pages.find(
      page => page.pageID === userModuleState.currentGlossaryPageID
    );
  }

  return undefined;
}

function unlockAndSetGlossaryFirstPages(moduleState: CaseModulesState) {
  const glossaryTrack = getCurrentGlossaryTrack();
  if (glossaryTrack && glossaryTrack.pages && glossaryTrack.pages.length > 0) {
    commitSetModuleCurrentPage(getStore(), {
      moduleName: "glossary",
      pageID: glossaryTrack.pages[0].pageID
    });
  }
}

export function getModulePageDict(moduleName: modules): Maybe<PagesDict> {
  const userModuleState = readModulesState(getStore());
  if (moduleName === "case") {
    return Maybe.of(userModuleState.caseState.pages);
  } if (moduleName === "guide") {
    return Maybe.of(userModuleState.guideState.pages);
  }
  return Maybe.nothing<PagesDict>();
}

export function isPageUnlocked(pageID: string) {
  const maybePageState = getPageUserState(pageID);
  if (maybePageState.isJust()) {
    const state = Maybe.unsafelyUnwrap(maybePageState);
    return state.unlocked;
  }
  return false;
}

export function getModuleState(moduleName: openableModules): ModuleUserState {
  const userModuleState = readModulesState(getStore());
  if (moduleName === "guide") return userModuleState.guideState;
  return userModuleState.caseState;
}

export function isSectionUnlocked(sectionName: string) {
  const userModuleState = readModulesState(getStore());
  const maybePages = getSectionPages(userModuleState.moduleOpen, sectionName);
  if (maybePages.isJust()) {
    const moduleState = getModuleState(userModuleState.moduleOpen);
    const pages = Maybe.unsafelyUnwrap(maybePages);
    for (const page of pages) {
      if (
        moduleState.pages[page.pageID]
        && moduleState.pages[page.pageID].unlocked
      ) {
        //logMessage(`isSectionUnlocked ${sectionName} true - ${page.pageID} is unlocked`)
        return true;
      }
    }
  }
  const maybeSubsections = getSectionSubsections(
    userModuleState.moduleOpen,
    sectionName
  );
  if (maybeSubsections.isJust()) {
    const subsections = Maybe.unsafelyUnwrap(maybeSubsections);

    for (const subsection of subsections) {
      //logMessage(`isSectionUnlocked test ${subsection.name} `)
      if (isSectionUnlocked(subsection.name)) return true;
    }
  }

  //logMessage(`isSectionUnlocked ${sectionName} false`)
  return false;
}

export function getCurrentPageID(): Maybe<string> {
  const userModuleState = readModulesState(getStore());
  if (userModuleState.moduleOpen === "case") {
    return Maybe.of(userModuleState.caseState.currentPageID);
  } if (userModuleState.moduleOpen === "guide") {
    return Maybe.of(userModuleState.guideState.currentPageID);
  }

  return Maybe.nothing<string>();
}

export function getNextPageID(): Maybe<string> {
  const modulesState = readModulesState(getStore());
  let trackID = modulesState.caseState.currentTrackID;
  let { currentPageID } = modulesState.caseState;

  if (modulesState.moduleOpen === "guide") {
    trackID = modulesState.guideState.currentTrackID;
    currentPageID = modulesState.guideState.currentPageID;
  }

  return getNextVisiblePageID(currentPageID, modulesState.moduleOpen, trackID);
}

export function openCurrentCasePage() {
  const modulesState = readModulesState(getStore());
  router.push(
    `/${
     modulesState.currentTrackGroupID
     }/pages/${
     modulesState.caseState.currentPageID}`
  );
}

export function openCurrentGuidePage() {
  const modulesState = readModulesState(getStore());
  router.push(
    `/${
     modulesState.currentTrackGroupID
     }/pages/${
     modulesState.guideState.currentPageID}`
  );
}

export function getPageUserState(pageId: string): Maybe<PageUserState> {
  const userModuleState = readModulesState(getStore());
  if (userModuleState.moduleOpen === "case") {
    return Maybe.of(userModuleState.caseState.pages[pageId]);
  } if (userModuleState.moduleOpen === "guide") {
    return Maybe.of(userModuleState.guideState.pages[pageId]);
  }

  return Maybe.nothing<PageUserState>();
}

export function getCurrentPageUserState(): Maybe<PageUserState> {
  const maybeCurrentPage = getCurrentPageID();
  if (maybeCurrentPage.isJust()) {
    const currentPageID = Maybe.unsafelyUnwrap(maybeCurrentPage);
    return getPageUserState(currentPageID);
  }
  return Maybe.nothing<PageUserState>();
}

export function getNextPageUserState(): Maybe<PageUserState> {
  const maybeNextPage = getNextPageID();
  if (maybeNextPage.isJust()) {
    const nextPageID = Maybe.unsafelyUnwrap(maybeNextPage);
    return getPageUserState(nextPageID);
  }
  return Maybe.nothing<PageUserState>();
}

export function setCurrentPage(pageID: string) {
  unlockPage(pageID);
  const pageModule = getPageModule(pageID);
  const userModuleState = readModulesState(getStore());
  if (userModuleState.moduleOpen != pageModule) {
    commitCurrentModule(getStore(), pageModule);
  }
  if (
    (pageModule == "case"
      && userModuleState.caseState.currentPageID !== pageID)
    || (pageModule == "guide"
      && userModuleState.guideState.currentPageID !== pageID)
  ) {
    commitSetModuleCurrentPage(getStore(), {
      moduleName: pageModule,
      pageID
    });
  }
}
