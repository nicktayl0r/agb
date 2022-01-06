// vue-jest seems to not like doing this in a .vue singe file component, so I'll do it here
export const LoadingBar = () => import(
  /* webpackChunkName: "LoadingBar" */
  "@/components/LoadingBar.vue"
);

export const App = () => import(
  /* webpackChunkName: "App" */
  "@/App.vue"
);

import LoadingBarClass from "@/components/LoadingBar.vue";

let loadBarInst: LoadingBarClass | undefined = undefined;
export function setLoadingBar(bar: any) {
  loadBarInst = bar;
}

export function getLoadingBar(): LoadingBarClass | undefined {
  return loadBarInst;
}


let mainApp: any | undefined = undefined;
export function setMainApp(app: any) {
  mainApp = app;
}

export function getMainApp(): any | undefined {
  return mainApp;
}

