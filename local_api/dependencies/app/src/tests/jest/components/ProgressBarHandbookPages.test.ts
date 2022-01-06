import { getLocalVue, getCleanStore } from "@/tests/jest/jestSetup";
const localVue = getLocalVue();
let store = getCleanStore();

import { shallowMount, Wrapper } from "@vue/test-utils";

import ProgressBar from "@/components/ProgressBar.vue";
import * as debugHelpers from "@/helpers/debugHelpers";
import { unlockAndSetFirstPages } from "@/helpers/userHelpers";
import { commitInitProjectConfig } from "@/store/modules/appData";
import {
  commitCurrentModule,
  commitSetCurrentTrackGroup,
  commitSetModuleCurrentPage,
  commitUnlockModule,
  commitUnlockPage
} from "@/store/modules/userData";
import { wrap } from "@sentry/browser/dist/helpers";

const projectData = require("@/tests/jest/__data__/project.json");

jest.mock("@/helpers/debugHelpers");

describe("ProgressBar handbookPages=false", () => {
  let wrapper: Wrapper<ProgressBar>;
  beforeEach(async () => {
    store = getCleanStore();
    commitInitProjectConfig(store, projectData);
    commitSetCurrentTrackGroup(store, "evolution_case_ap-v.1.0.0");
    unlockAndSetFirstPages();
    // switch progress bar over to the guide
    commitUnlockModule(store, "guide");
    commitCurrentModule(store, "guide");
    // set open page to one in a subsection
    commitUnlockPage(store, { moduleName: "guide", pageID: "subSectionPage" });
    commitSetModuleCurrentPage(store, {
      moduleName: "guide",
      pageID: "subSectionPage"
    });

    wrapper = shallowMount(ProgressBar, {
      localVue,
      store
    });
  });

  it("debugHelpers.showHandbookPages is not mocked", () => {
    expect(jest.isMockFunction(debugHelpers.showHandbookPages)).toBe(false);
  });

  it("mocked debugHelpers.showHandbookPages returns false", () => {
    expect(debugHelpers.showHandbookPages()).toBe(false);
  });

  // it("matches appDataStore.project snapshot", () => {
  // 	expect(store.state.appDataStore.project).toMatchSnapshot();
  // });

  it("matches html snapshot", () => {
    wrapper.vm.$forceUpdate();
    expect(wrapper.element).toMatchSnapshot();
  });

  it("ProgessBar openModule is guide", () => {
    expect(wrapper.vm.$data.openModule).toBe("guide");
  });

  it("ProgessBar currentPage is subSectionPage", () => {
    expect(wrapper.vm.$data.currentPage).toBe("subSectionPage");
  });

  it("section page descendant is not visible", () => {
    expect(wrapper.find(".section .pages .page").isVisible()).toBe(false);
  });

  it("subsection page descendant is not visible", () => {
    expect(wrapper.find(".subsection .pages .page").isVisible()).toBe(false);
  });
});

describe("ProgressBar handbookPages=true", () => {
  let wrapper: Wrapper<ProgressBar>;

  beforeEach(async () => {
    const spy = jest.spyOn(debugHelpers, "showHandbookPages");
    spy.mockReturnValue(true);

    store = getCleanStore();
    commitInitProjectConfig(store, projectData);
    commitSetCurrentTrackGroup(store, "evolution_case_ap-v.1.0.0");
    unlockAndSetFirstPages();
    // switch progress bar over to the guide
    commitUnlockModule(store, "guide");
    commitCurrentModule(store, "guide");
    // set open page to one in a subsection
    commitUnlockPage(store, { moduleName: "guide", pageID: "subSectionPage" });
    commitSetModuleCurrentPage(store, {
      moduleName: "guide",
      pageID: "subSectionPage"
    });

    wrapper = shallowMount(ProgressBar, {
      localVue,
      store
    });
  });

  it("show HB ProgressBar on last page", () => {

    //const spy = jest.spyOn(global.console, 'error').mockImplementation((e) => { console.log("fAIL!!!!"); fail(); });
    //const error= global.console.error;
    const error = jest.fn((e) => { fail(e); error.mockRestore(); });
    global.console.error = error;


    commitSetModuleCurrentPage(store, {
      moduleName: "case",
      pageID: "addRemoveClasses"
    });
    wrapper.vm.$forceUpdate();
    commitSetModuleCurrentPage(store, {
      moduleName: "guide",
      pageID: "setGuideCompleted"
    });
    wrapper.vm.$forceUpdate();

    try {
      const sections = (wrapper.vm as any).Sections;
      expect(sections.length).toBe(2);    //the handbook has 2 sections.
    }
    catch (ex) {
      fail(ex);
    }
    expect((wrapper.vm as any).isUnlockedCasePage("setGuideCompleted")).toBe(false);
    expect(wrapper.vm.$data.openModule).toBe("guide");
    expect(wrapper.vm.$data.currentPage).toBe("setGuideCompleted");
    expect(wrapper.find(".section .pages .page").isVisible()).toBe(true);
    // spy.mockRestore();
  });

  it("debugHelpers.showHandbookPages is mocked", () => {
    expect(jest.isMockFunction(debugHelpers.showHandbookPages)).toBe(true);
  });

  it("mocked debugHelpers.showHandbookPages returns true", () => {
    expect(debugHelpers.showHandbookPages()).toBe(true);
  });

  // it("matches appDataStore.project snapshot", () => {
  // 	expect(store.state.appDataStore.project).toMatchSnapshot();
  // });

  it("matches html snapshot", () => {
    wrapper.vm.$forceUpdate();
    expect(wrapper.element).toMatchSnapshot();
  });

  it("ProgessBar openModule is guide", () => {
    expect(wrapper.vm.$data.openModule).toBe("guide");
  });

  it("ProgessBar currentPage is subSectionPage", () => {
    expect(wrapper.vm.$data.currentPage).toBe("subSectionPage");
  });

  it("section page descendant is visible", () => {
    expect(wrapper.find(".section .pages .page").isVisible()).toBe(true);
  });

  it("subsection page descendant is visible", () => {
    expect(wrapper.find(".subsection .pages .page").isVisible()).toBe(true);
  });
});
