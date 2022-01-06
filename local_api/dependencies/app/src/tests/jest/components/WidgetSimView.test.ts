import { getLocalVue, getCleanStore } from "@/tests/jest/jestSetup";
const localVue = getLocalVue();
let store = getCleanStore();

import { shallowMount } from "@vue/test-utils";
//import { WidgetBaseTests } from "@/tests/jest/components/WidgetBaseTests";
import { MixinWidgetPlayableTests } from "@/tests/jest/mixins/MixinWidgetPlayableTests";

import {
  dispatchUpdateWidget
} from "@/store/modules/userData";

import WidgetSimView from "@/components/WidgetSimView.vue";
import { getSimManager } from "@/helpers/simHelpers";
import { SimManager } from "@/managers/simManager";

//Required to mock this module, because LoadingBar.vue creates a line object
//   Progressbar.Line  doesn't have all of its required properties.
//   So WidgetSimView fails to mount
jest.mock("progressbar.js");

describe("WidgetSimView", () => {
  beforeEach(() => {
    store = getCleanStore();
  });

  //WidgetBaseTests(WidgetSimView);
  MixinWidgetPlayableTests(WidgetSimView);

  it("should return the correct value outside of grapes", () => {
    const wrapper = shallowMount(WidgetSimView, {
      store,
      propsData: {
        id: "testWidget",
        scenename: "testScene",
        simstateid: "testSimStateID"
      }
    });
    // wrapper.setData({ store: undefined });
    // should return !sceneLoaded if grapes isn't detected
    wrapper.setData({ sceneLoaded: true });
    expect((wrapper.vm as any).getShowProgressBar).toBe(false);

    wrapper.setData({ sceneLoaded: false });
    expect((wrapper.vm as any).getShowProgressBar).toBe(true);
  });

  it("should return false if within Grapes", () => {
    const wrapper = shallowMount(WidgetSimView, {
      propsData: {
        id: "testWidget",
        scenename: "testScene",
        simstateid: "testSimStateID"
      }
    });
    // should be false if Grapes is detected

    wrapper.setData({ sceneLoaded: true });
    wrapper.setData({ $store: undefined });

    expect((wrapper.vm as any).getShowProgressBar).toBe(false);
    wrapper.setData({ sceneLoaded: false });
    expect((wrapper.vm as any).getShowProgressBar).toBe(false);
  });

  it("matches html snapshot", () => {
    const wrapper = shallowMount(WidgetSimView, {
      propsData: {
        id: "testWidget"
      },
      localVue,
      store
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("Owner", () => {
    const owner = {
      PageID: "testPage",
      WidgetID: "testWidget",
      SceneName: "testScene",
      SimStateID: "testSimStateID"
    };

    const wrapper = shallowMount(WidgetSimView, {
      propsData: {
        id: owner.WidgetID,
        scenename: owner.SceneName,
        simstateid: owner.SimStateID
      },
      localVue,
      store
    });

    const { vm } = wrapper;

    //Use toStrictEqual to do a deep equality comparison
    expect((vm as any).owner).toStrictEqual(owner);

    owner.SimStateID = "different_testSimStateID";
    dispatchUpdateWidget(store, {
      pageID: "testPage",
      widgetID: "testWidget",
      key: "simstateid",
      value: "different_testSimStateID"
    });

    //wrapper.vm.$forceUpdate();
    expect((vm as any).owner).toStrictEqual(owner);
  });


  it("unmount triggers terminate", () => {
    const owner = {
      PageID: "testPage",
      WidgetID: "testWidget",
      SceneName: "testScene",
      SimStateID: "testSimStateID"
    };

    const wrapper = shallowMount(WidgetSimView, {
      propsData: {
        id: owner.WidgetID,
        scenename: owner.SceneName,
        simstateid: owner.SimStateID
      },
      localVue,
      store
    });

    const { vm } = wrapper;
    const simManager: SimManager = getSimManager();
    simManager.terminateLoadSimState = jest.fn((sceneName: string, owner: any) => { return Promise.resolve(); });
    wrapper.destroy();

    expect(simManager.terminateLoadSimState).toBeCalledWith("testScene", owner);
  });
});
