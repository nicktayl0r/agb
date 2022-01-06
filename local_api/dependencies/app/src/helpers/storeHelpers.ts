
import { createStore } from "@/store";
import { RootState, RootStore } from "@/store";

import { userDataContext } from "@/store/modules/userData/userDataState";

let store: RootStore | undefined;

export const setStore = function(newStore: RootStore | undefined) { store = newStore; };
export function getStore(): RootStore {
  if (!store) store = createStore();
  return store;
}

export const commitUserData = (store: RootStore, progress: any, state: any) => {
  store.commit("loadUserData", progress, { root: true });
}



