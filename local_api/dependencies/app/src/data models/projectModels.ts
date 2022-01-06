import { widgetValPrimitive } from "@/data models/widgetModels";

export interface Compatibility {
  versionStart: string;
  versionEnd: string;
}

export interface Page {
  pageID: string;
  name: string;
  visible: boolean;
  popperMessage: string;
}
export const emptyPage: Page = {
  name: "",
  pageID: "",
  visible: true,
  popperMessage: ""
};

export interface Section {
  name: string;
  parentSectionName: string;
  visible: boolean;
  tocColor: string;
  pages: Page[];
}

export const emptyParentSectionName = "";

export const emptySection: Section = {
  name: "",
  parentSectionName: emptyParentSectionName,
  visible: true,
  tocColor: "",
  pages: [emptyPage]
};

export interface Track {
  trackID: string;
  name: string;
  popperMessage: string;
  sections: Section[];
}
export const emptyTrack: Track = {
  trackID: "",
  name: "",
  popperMessage: "",
  sections: [emptySection]
};

export interface ProjectModule {
  popperMessage: string;
  tracks: Track[];
}

export interface TrackGroup {
  trackGroupID: string;
  name: string;
  caseID: string;
  guideID: string;
  glossaryID: string;
}

export interface SharedData {
  sharedDataID: string;
  value: widgetValPrimitive;
}

export type loadMode = "LoadOnStart" | "LoadOnDemand";
export type unloadMode = "UnloadNever" | "UnloadOnDemand";

export const emptySim: Sim = {
  id: "",
  name: "",
  loadMode: "LoadOnDemand",
  unloadMode: "UnloadOnDemand",
  antialias: true,
  alpha: false,
  preserveDrawingBuffer: false,
  preferWebGl2: true,
  useBasis: false,
  scenes: []
};

export interface Sim {
  id: string;
  name: string;
  loadMode: loadMode;
  unloadMode: unloadMode;
  antialias: boolean | undefined;
  alpha: boolean | undefined;
  preserveDrawingBuffer: boolean | undefined;
  preferWebGl2: boolean | undefined;
  useBasis: boolean | undefined;
  scenes: SimScene[];
}

export interface SimScene {
  name: string;
  fileName: string;
}

export interface GlossaryPage {
  pageID: string;
  name: string;
  relatedTerms: GlossaryRelatedTerm[];
}
export interface GlossaryRelatedTerm {
  pageID: string;
  name: string;
}
export interface GlossaryTrack {
  trackID: string;
  name: string;
  pages: GlossaryPage[];
}
export interface GlossaryModule {
  tracks: GlossaryTrack[];
}

export type modules = "case" | "guide" | "glossary";

export interface Project {
  name: string;
  description: string;
  appkey: string;
  version: string;
  sharedData: SharedData[];
  appSharedData: SharedData[];
  compatibility: Compatibility[];
  case: ProjectModule;
  guide: ProjectModule;
  glossary: GlossaryModule;
  trackGroups: TrackGroup[];
  sims: Sim[];
}
