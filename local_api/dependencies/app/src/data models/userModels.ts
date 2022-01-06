export interface SectionUserState {
  visible: boolean; // is the corresponding progress bar button visible?
  unlocked?: boolean;
}

export interface SectionsDict {
  [key: string]: SectionUserState; // key = sectionID
}

export interface PageUserState {
  unlocked: boolean;
  GuideNextClicked: boolean; //updated when a user clicks the nextpage button
  visible: boolean; // is the corresponding progress bar button visible?
  visited: boolean; // has the user opened the page at least once?
  teacherVisited?: boolean; // but has a teacher visited this page at least once?
}

export interface PagesDict {
  [key: string]: PageUserState; // key = sectionID
}

export interface ModuleUserState {
  currentTrackID: string;
  currentPageID: string;
  sections: SectionsDict;
  pages: PagesDict;
  locked: boolean; // is the button in the progress bar enabled?
  lastUnlockedPageID: string;
}

export type openableModules = "case" | "guide";

export interface CaseModulesState {
  currentTrackGroupID: string;
  caseState: ModuleUserState;
  guideState: ModuleUserState;
  currentGlossaryTrackID: string;
  currentGlossaryPageID: string;
  glossaryOpen: boolean;
  moduleOpen: openableModules; // which module is currently open, case or guide?
  guideCompleted: boolean;
}

export const defaultModulesState: CaseModulesState = {
  currentTrackGroupID: "",
  caseState: {
    currentTrackID: "",
    currentPageID: "",
    sections: {},
    pages: {},
    locked: false,
    lastUnlockedPageID: ""
  },
  guideState: {
    currentTrackID: "",
    currentPageID: "",
    sections: {},
    pages: {},
    locked: true,
    lastUnlockedPageID: ""
  },
  currentGlossaryTrackID: "",
  currentGlossaryPageID: "",
  glossaryOpen: false,
  moduleOpen: "case",
  guideCompleted: false
};
