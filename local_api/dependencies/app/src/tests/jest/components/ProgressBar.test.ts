import { getLocalVue, getCleanStore } from "@/tests/jest/jestSetup";
const localVue = getLocalVue();
let store = getCleanStore();

import { shallowMount, Wrapper } from "@vue/test-utils";

import ProgressBar from "@/components/ProgressBar.vue";
import * as widgetHelpers from "@/helpers/widgetHelpers";
import { commitInitProjectConfig } from "@/store/modules/appData";
import { commitSetCurrentTrackGroup } from "@/store/modules/userData";

const projectData = require("@/tests/jest/__data__/project.json");

jest.mock("@/helpers/widgetHelpers");

describe("ProgressBar", () => {
  let wrapper: Wrapper<ProgressBar>;
  beforeEach(async () => {
    store = getCleanStore();
    commitInitProjectConfig(store, projectData);
    commitSetCurrentTrackGroup(store, "evolution_case_ap-v.1.0.0");

    wrapper = shallowMount(ProgressBar, {
      localVue,
      store
    });
  });

  it("debugHelpers.showHandbookPages is not mocked", () => {
    expect(jest.isMockFunction(widgetHelpers.useTeacherView())).toBe(false);
  });

  it("mocked debugHelpers.showHandbookPages returns false", () => {
    expect(widgetHelpers.useTeacherView()).toBe(false);
  });

  it("matches html snapshot", () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it("no elements have class unlocked", () => {
    expect(wrapper.find(".unlocked").exists()).toBe(false);
  });

  it("no pages", () => {
    expect(wrapper.find(".page").exists()).toBe(false);
  });
});
