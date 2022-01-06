require("@/tests/jest/__polyfill__/TextEncoder")
jest.mock("@/router");
jest.mock("@/helpers/debugHelpers");
jest.mock("@/helpers/widgetHelpers");

import { createLocalVue, Wrapper } from "@vue/test-utils";
import Vue, { VueConstructor } from "vue";
import Vuex from "vuex";
import { clone } from "ramda";

import { vueApp } from "@/.";
import { defaultState } from "@/store/modules/userData/userDataState";
import { RootStore } from "@/store";

export function getCleanStore(): RootStore {
  vueApp.$store.commit("loadUserData", clone(defaultState));
  return vueApp.$store;
}

export function getLocalVue(): VueConstructor<Vue> {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  return localVue;
}

// sometimes our templates are doing stuff on the base element, sometimes on the first child so we may need to check both
export function getFirstChildWrapper(wrapper: Wrapper<Vue>) {
  if (wrapper.element.childElementCount > 0) {
    const child = wrapper.find("* *");
    return child;
  }
  return wrapper;
}


