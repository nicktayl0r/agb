import {
  EntriesDict,
  PagesWidgetsEntriesDict,
} from "@/data models/widgetModels";

import {
  CaseModulesState,
  defaultModulesState
} from "@/data models/userModels";

import { RubricsDict } from "@/data models/rubricModels";
import { StoreDelayedEffect } from "@/data models/effectModels";
import { ActionContext } from "vuex";
import { RootState } from "@/store";

/** stores all the data we need to save and load a user's progress in a case */
export interface UserDataState {
  timestamp: number;
  sharedData: EntriesDict;
  pages: PagesWidgetsEntriesDict;
  modules: CaseModulesState;
  rubrics: RubricsDict;
  audio: {
    muted: boolean;
    bgMusic: string[];
  };
  delayedEffects: StoreDelayedEffect[];
}

export type userDataContext = ActionContext<UserDataState, RootState>;

export const defaultState = {
  sharedData: {},
  pages: {},
  modules: defaultModulesState,
  rubrics: {},
  audio: {
    muted: false,
    bgMusic: []
  },
  delayedEffects: []
};