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

describe("ProgressBar teacherView=true", () => {
  let wrapper: Wrapper<ProgressBar>;
  beforeEach(async () => {
    const spy = jest.spyOn(widgetHelpers, "useTeacherView");
    spy.mockReturnValue(true);

    store = getCleanStore();
    commitInitProjectConfig(store, projectData);
    commitSetCurrentTrackGroup(store, "evolution_case_ap-v.1.0.0");

    wrapper = shallowMount(ProgressBar, {
      localVue,
      store
    });
  });

  it("widgetHelpers.useTeacherView is mocked", () => {
    expect(jest.isMockFunction(widgetHelpers.useTeacherView)).toBe(true);
  });

  it("mocked widgetHelpers.useTeacherView returns true", () => {
    expect(widgetHelpers.useTeacherView()).toBe(true);
  });

  it("matches html snapshot", () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it("section elements have class unlocked", () => {
    const sectionElements = wrapper.findAll(".section");
    let sectionsUnlocked = true;
    for (const section of sectionElements.wrappers) {
      if (!section.classes("unlocked")) {
        sectionsUnlocked = false;
        break;
      }
    }
    expect(sectionsUnlocked).toBe(true);
  });

  it("sectionName elements have class unlocked", () => {
    const sectionElements = wrapper.findAll(".sectionName");
    let sectionsUnlocked = true;
    for (const section of sectionElements.wrappers) {
      if (!section.classes("unlocked")) {
        sectionsUnlocked = false;
        break;
      }
    }
    expect(sectionsUnlocked).toBe(true);
  });

  it("has pages", () => {
    expect(wrapper.find(".page").exists()).toBe(true);
  });

  it("pages should have router links", () => {
    const pageElements = wrapper.findAll(".page");
    let pagesHaveLinks = true;
    for (const page of pageElements.wrappers) {
      if (!page.find("router-link-stub")) {
        pagesHaveLinks = false;
      }
    }
    expect(pagesHaveLinks).toBe(true);
  });
});
