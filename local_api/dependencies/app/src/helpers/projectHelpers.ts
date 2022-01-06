import {
  filter, find, findIndex, propEq, union
} from "ramda";
import { Maybe } from "true-myth";

import {
  modules,
  Page,
  ProjectModule,
  Section,
  Track,
  TrackGroup,
  emptyParentSectionName
} from "@/data models/projectModels";
import { openableModules } from "@/data models/userModels";
import { logError, logMessage, logWarning } from "@/helpers/debugHelpers";
import { getStore } from "@/helpers/storeHelpers";
import {
  getModuleCurrentTrack,
  getModuleState,
  getNextPageID
} from "@/helpers/userHelpers";
import router from "@/router";
import { readModule, readTrackGroups } from "@/store/modules/appData";
import { readModulesState } from "@/store/modules/userData";
import { unlockPage } from "./effectHelpers";

export function getModuleData(moduleName: openableModules) {
  return readModule(getStore())(moduleName);
}

export function tryCatch(
  fn: () => any,
  onFail = (err: any) => logError(`tryCatch Error: ${err}`)
) {
  try {
    return fn();
  } catch (err) {
    return onFail(err);
  }
}

export function getTrack(
  moduleName: openableModules,
  trackID: string
): Maybe<Track> {
  const moduleData = getModuleData(moduleName);
  // logMessage("moduleData", moduleData);
  if (moduleData && moduleData.tracks) {
    return Maybe.of(
      find(propEq("trackID", trackID), moduleData.tracks) as Track
    );
  } return new Maybe.Nothing<Track>();
}

export interface SectionAndPageIndex {
  sectionIndex: number;
  pageIndex: number;
}

export function getSectionAndPageIndexes(
  track: Track,
  pageID: string
): Maybe<SectionAndPageIndex> {
  const sectionIndex = findIndex(
    (section) => getPageIndex(pageID, section).isJust(),
    track.sections
  );
  if (sectionIndex !== -1) {
    const maybePageIndex = getPageIndex(pageID, track.sections[sectionIndex]);
    if (maybePageIndex.isJust()) {
      const pageIndex = Maybe.unsafelyUnwrap(maybePageIndex);
      return Maybe.of({ sectionIndex, pageIndex });
    }
  }

  return new Maybe.Nothing<SectionAndPageIndex>();
}

export function getSubsectionSection(
  moduleName: openableModules,
  trackID: string,
  subsectionName: string
): Maybe<Section> {
  // logMessage("get section name", moduleName, trackID, pageID);
  const maybeTrack = getTrack(moduleName, trackID);
  if (maybeTrack.isJust()) {
    const track = Maybe.unsafelyUnwrap(maybeTrack);
    const maybeSubSectionIndex = getSectionIndex(subsectionName, track);
    if (maybeSubSectionIndex.isJust()) {
      const subsectionIndex = maybeSubSectionIndex.unsafelyUnwrap();
      const subsection = track.sections[subsectionIndex];
      if (
        subsection
        && "parentSectionName" in subsection
        && subsection.parentSectionName !== emptyParentSectionName
      ) {
        const maybeSectionIndex = getSectionIndex(
          subsection.parentSectionName,
          track
        );
        if (maybeSectionIndex.isJust()) {
          const sectionIndex = maybeSectionIndex.unsafelyUnwrap();
          return Maybe.of<Section>(track.sections[sectionIndex]);
        }
      }
    }
  }
  return Maybe.nothing<Section>();
}

export function getPageSection(
  moduleName: openableModules,
  trackID: string,
  pageID: string
): Maybe<Section> {
  // logMessage("getPageSection", moduleName, trackID, pageID);
  const maybeTrack = getTrack(moduleName, trackID);
  if (maybeTrack.isJust()) {
    // logMessage("getPageSection - got track");
    const track = Maybe.unsafelyUnwrap(maybeTrack);
    const sectionIndex = findIndex(
      (section) => getPageIndex(pageID, section).isJust(),
      track.sections
    );
    if (sectionIndex !== -1) {
      // logMessage("getPageSection - got section index", sectionIndex);
      return Maybe.of(track.sections[sectionIndex]);
    }
  }
  return Maybe.nothing<Section>();
}

export function getPageSectionName(
  moduleName: openableModules,
  trackID: string,
  pageID: string
): Maybe<string> {
  const maybeSection = getPageSection(moduleName, trackID, pageID);
  if (maybeSection.isJust()) {
    const selection = Maybe.unsafelyUnwrap(maybeSection);
    return Maybe.of(selection.name);
  }
  return Maybe.nothing<string>();
}

export function getSectionIndex(
  sectionName: string,
  track: Track
): Maybe<number> {
  const sectionIndex = findIndex(propEq("name", sectionName))(track.sections);
  if (sectionIndex !== -1) return Maybe.of(sectionIndex);

  return new Maybe.Nothing<number>();
}

export function getPageIndex(pageID: string, section: Section): Maybe<number> {
  const pageIndex = findIndex(propEq("pageID", pageID))(section.pages);
  if (pageIndex !== -1) return Maybe.of(pageIndex);

  return new Maybe.Nothing<number>();
}

export function getPageExistsInTrack(
  moduleName: openableModules,
  trackID: string,
  pageID: string
): boolean {
  const maybeTrack = getTrack(moduleName, trackID);
  if (maybeTrack.isJust()) {
    const trackData: Track = Maybe.unsafelyUnwrap(maybeTrack);
    const maybePageIndexes = getSectionAndPageIndexes(trackData, pageID);
    if (maybePageIndexes.isJust()) return true;
  }
  return false;
}

export function getPageExistsInTrackGroup(
  trackGroupID: string,
  pageID: string
): boolean {
  const maybeGroup = getTrackGroupByID(trackGroupID);
  if (maybeGroup.isJust()) {
    const group = Maybe.unsafelyUnwrap(maybeGroup);
    if (
      getPageExistsInTrack("case", group.caseID, pageID)
      || getPageExistsInTrack("guide", group.guideID, pageID)
    ) return true;
  }
  return false;
}

export function getPageModule(pageID: string): openableModules {
  const userModuleData = readModulesState(getStore());
  const maybeGroup = getTrackGroupByID(userModuleData.currentTrackGroupID);
  if (maybeGroup.isJust()) {
    const group = Maybe.unsafelyUnwrap(maybeGroup);
    if (getPageExistsInTrack("guide", group.guideID, pageID)) return "guide";
  }
  return "case";
}

export function getPageTracks(pageID: string): Track[] {
  const tracks = new Array<Track>();
  const caseModuleData = readModule(getStore())("case") as ProjectModule;
  if (!caseModuleData) {
    logError("no case data in the project!");
    return [];
  }
  const caseTracks = caseModuleData.tracks;
  logMessage("caseTracks", caseTracks);
  if (caseTracks && caseTracks.length > 0) {
    for (const track of caseTracks) {
      logMessage("track", track, "pageID", pageID);
      if (getPageExistsInTrack("case", track.trackID, pageID)) {
        logMessage("page exists in track");
        tracks.push(track);
      }
    }
  }
  const guideModuleData = readModule(getStore())("guide") as ProjectModule;
  if (!guideModuleData) {
    logError("no guide data in the project!");
    return [];
  }
  const guideTracks = guideModuleData.tracks;
  logMessage("guideTracks", guideTracks);
  if (guideTracks && guideTracks.length > 0) {
    for (const track of guideTracks) {
      if (getPageExistsInTrack("guide", track.trackID, pageID)) tracks.push(track);
    }
  }
  logMessage(pageID, tracks);
  return tracks;
}

export function getTrackTrackGroups(trackID: string): TrackGroup[] {
  const groupsTrackIsIn = new Array<TrackGroup>();
  const maybeAllTrackGroups = readTrackGroups(getStore());
  if (maybeAllTrackGroups.isJust()) {
    const allTrackGroups = Maybe.unsafelyUnwrap(maybeAllTrackGroups);
    for (const trackGroup of allTrackGroups) {
      if (
        trackGroup.caseID === trackID
        || trackGroup.guideID === trackID
        || trackGroup.glossaryID === trackID
      ) groupsTrackIsIn.push(trackGroup);
    }
    return groupsTrackIsIn;
  }
  return [];
}

export function getPageTrackGroups(pageID: string) {
  const pageTracks = getPageTracks(pageID);
  let groupsPageIsIn = new Array<TrackGroup>();
  for (const track of pageTracks) {
    const groupsTrackIsIn = getTrackTrackGroups(track.trackID);
    groupsPageIsIn = union(groupsPageIsIn, groupsTrackIsIn);
  }
  return groupsPageIsIn;
}

export function getTrackGroupByID(trackGroupID: string): Maybe<TrackGroup> {
  // logMessage("getTrackGroupByID", trackGroupID);
  const maybeTrackGroups = readTrackGroups(getStore());
  // logMessage("getTrackGroupByID maybeTrackGroup", maybeTrackGroups);
  if (maybeTrackGroups.isJust()) {
    const allTrackGroups = Maybe.unsafelyUnwrap(maybeTrackGroups);
    // logMessage("getTrackGroupByID maybeTrackGroup isJust()", allTrackGroups);
    return Maybe.of(
      find(propEq("trackGroupID", trackGroupID), allTrackGroups) as TrackGroup
    );
  }
  return Maybe.nothing<TrackGroup>();
}

export function getSectionSubsections(
  moduleName: modules,
  sectionName: string
): Maybe<Section[]> {
  //logMessage(`getSectionSubsections ${moduleName} ${sectionName}`)
  let maybeTrack = Maybe.nothing<Track>();
  const modulesState = readModulesState(getStore());
  if (moduleName === "case") {
    const caseTrackID = modulesState.caseState.currentTrackID;
    maybeTrack = getTrack("case", caseTrackID);
  } else if (moduleName === "guide") {
    const guideTrackID = modulesState.guideState.currentTrackID;
    maybeTrack = getTrack("guide", guideTrackID);
  }
  if (maybeTrack.isJust()) {
    const track = Maybe.unsafelyUnwrap(maybeTrack);

    const sections = filter(
      (section) => section
        && "parentSectionName" in section
        && section.parentSectionName === sectionName,
      track.sections
    );
    if (sections.length > 0) {
      return Maybe.of(sections);
    }
  }

  return Maybe.nothing<Section[]>();
}

export function getSectionPages(
  moduleName: modules,
  sectionName: string
): Maybe<Page[]> {
  let maybeTrack = Maybe.nothing<Track>();
  const modulesState = readModulesState(getStore());
  if (moduleName === "case") {
    const caseTrackID = modulesState.caseState.currentTrackID;
    maybeTrack = getTrack("case", caseTrackID);
  } else if (moduleName === "guide") {
    const guideTrackID = modulesState.guideState.currentTrackID;
    maybeTrack = getTrack("guide", guideTrackID);
  }
  if (maybeTrack.isJust()) {
    const track = Maybe.unsafelyUnwrap(maybeTrack);
    const sectionIndex = findIndex(
      (section) => section.name == sectionName,
      track.sections
    );
    if (sectionIndex !== -1) {
      return Maybe.of(track.sections[sectionIndex].pages);
    }
  }

  return Maybe.nothing<Page[]>();
}

export function getSectionFirstPageID(
  moduleName: modules,
  sectionName: string
): Maybe<string> {
  const maybePages = getSectionPages(moduleName, sectionName);
  if (maybePages.isJust()) {
    const pages = Maybe.unsafelyUnwrap(maybePages);
    return Maybe.of(pages[0].pageID);
  }

  return Maybe.nothing<string>();
}

/*
  Returns true is the Page is in the Section or in any of the Section's Subsections
*/
export function isPageContainedInSection(
  pageID: string,
  section: Section,
  moduleName: openableModules
) {
  const maybeCurrentTrack = getModuleCurrentTrack(moduleName);
  if (maybeCurrentTrack.isJust()) {
    const currentTrack = Maybe.unsafelyUnwrap(maybeCurrentTrack);
    let maybeSearchSection = getPageSection(
      moduleName,
      currentTrack.trackID,
      pageID
    );
    while (maybeSearchSection.isJust()) {
      const searchSection = Maybe.unsafelyUnwrap(maybeSearchSection);
      if (searchSection.name == section.name) return true;
      if (
        searchSection
        && "parentSectionName" in searchSection
        && searchSection.parentSectionName !== emptyParentSectionName
      ) {
        if (searchSection.parentSectionName !== section.name) {
          maybeSearchSection = getSubsectionSection(
            moduleName,
            currentTrack.trackID,
            searchSection.name
          );
        } else {
          //console.log(`isPageContainedInSection- page ${pageID} IS contained by ${section.name}`);
          return true;
        }
      } else {
        //console.log(`isPageContainedInSection- page ${pageID} IS NOT contained by ${section.name}`);
        return false;
      }
    }
    //console.log(`isPageContainedInSection- searchSection not found for page ${pageID}`);
  }
  //else console.log(`isPageContainedInSection- CurrentTrack not found for module ${moduleName}`);

  return false;
}

export function openFirstPageOfGuideSection(sectionName: string) {
  const modulesState = readModulesState(getStore());
  const maybePageID = getSectionFirstPageID("guide", sectionName);
  if (maybePageID.isJust()) {
    const pageID = Maybe.unsafelyUnwrap(maybePageID);
    unlockPage(pageID);
    router.push(`/${modulesState.currentTrackGroupID}/pages/${pageID}`);
  } else logWarning("couldn't find section", sectionName, "in guide");
}

export function getModuleFirstPageID(
  moduleName: openableModules
): Maybe<string> {
  const maybeTrack = getModuleCurrentTrack(moduleName);

  if (maybeTrack.isJust()) {
    const track = Maybe.unsafelyUnwrap(maybeTrack);
    return Maybe.of(track.sections[0].pages[0].pageID);
  }

  return Maybe.nothing<string>();
}

export function getModuleLastPageID(
  moduleName: openableModules
): Maybe<string> {
  const maybeTrack = getModuleCurrentTrack(moduleName);

  if (maybeTrack.isJust()) {
    const track = Maybe.unsafelyUnwrap(maybeTrack);
    const lastSectionIndex = track.sections.length - 1;
    if (track.sections[lastSectionIndex]) {
      const lastPageIndex = track.sections[lastSectionIndex].pages.length - 1;
      return Maybe.of(
        track.sections[lastSectionIndex].pages[lastPageIndex].pageID
      );
    }
  }

  return Maybe.nothing<string>();
}

export function getNextPagePopperMessage(pageID?: string) {
  const userModuleState = readModulesState(getStore());
  const maybeTrack = userModuleState.moduleOpen === "case"
  ? getTrack("case", userModuleState.caseState.currentTrackID)
  : getTrack("guide", userModuleState.guideState.currentTrackID);;
  
  const maybeNextPageID = pageID ? Maybe.just(pageID) : getNextPageID();
  if (maybeTrack.isJust() && maybeNextPageID.isJust()) {
    const track = Maybe.unsafelyUnwrap(maybeTrack);
    const nextPageID = Maybe.unsafelyUnwrap(maybeNextPageID);
    const maybeIndexes = getSectionAndPageIndexes(track, nextPageID);
    if (maybeIndexes.isJust()) {
      const indexes = Maybe.unsafelyUnwrap(maybeIndexes);
      const message = track.sections[indexes.sectionIndex].pages[indexes.pageIndex]
      .popperMessage;
      if (message != undefined && message !== "" && message !== " ") return message;
    }
  }

  // On Default...
  return  userModuleState.moduleOpen === "case"
    ? "Click to continue."
    : "";
}

export function getModulePopperMessage(moduleName: openableModules): string {
  const moduleState = getModuleState(moduleName);
  const trackID = moduleState.currentTrackID;
  const maybeTrack = getTrack(moduleName, trackID);
  if (maybeTrack.isJust()) {
    const track = Maybe.unsafelyUnwrap(maybeTrack);
    if (
      track.popperMessage
      && track.popperMessage !== ""
      && track.popperMessage !== " "
    ) return track.popperMessage;
  }

  const moduleData: ProjectModule = getModuleData(moduleName);
  if (
    moduleData
    && moduleData.popperMessage
    && moduleData.popperMessage !== ""
    && moduleData.popperMessage !== " "
  ) return moduleData.popperMessage;

  if (moduleName === "guide") return "Open the Handbook.";
  return "Return to the Case.";
}

export function getPageModel(pageID: string): Page | null {
  const tracks = getPageTracks(pageID);
  if (tracks.length > 0) {
    const maybeSectionAndPage = getSectionAndPageIndexes(tracks[0], pageID);
    if (maybeSectionAndPage.isJust()) {
      const sectionAndPage = Maybe.unsafelyUnwrap(maybeSectionAndPage);
      return tracks[0].sections[sectionAndPage.sectionIndex].pages[
        sectionAndPage.pageIndex
      ];
    }
  }
  return null;
}
