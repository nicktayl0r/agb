import Vue from "vue";
import Vuex from "vuex";
import { Store as VuexStore } from "vuex/types";

import { AppDataState, appDataStore } from "@/store/modules/appData";
import { UserDataState } from "@/store/modules/userData/userDataState";
import { userDataStore } from "@/store/modules/userData";
import { AuthDataState, authDataStore } from "@/store/modules/authData";
import { mutationHistoryPlugin } from "./mutationHistoryPlugin";
import { getStoreAccessors } from "vuex-typescript";

Vue.use(Vuex);

export interface RootState {
  userDataStore: UserDataState;
  appDataStore: AppDataState;
  authDataStore: AuthDataState;
}

export type RootStore = VuexStore<RootState>;

export const createStore = (): RootStore => new Vuex.Store<RootState>({
  strict: true,
  modules: {
    userDataStore,
    appDataStore,
    authDataStore
  },
  plugins: [mutationHistoryPlugin],
  mutations: {
    loadUserData(state: RootState, newUserState: UserDataState) {
      Vue.set(state, "userDataStore", newUserState);
    }
  }
});
