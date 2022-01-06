import { getLocalVue, getCleanStore } from "@/tests/jest/jestSetup";
const localVue = getLocalVue();
let store = getCleanStore();

import { shallowMount, Wrapper } from "@vue/test-utils";
import { WidgetBaseTests } from "@/tests/jest/components/WidgetBaseTests";

import ContainerShowHide from "@/components/ContainerShowHide.vue";

describe("ContainerShowHide prop visible:true", () => {
  let wrapper: Wrapper<ContainerShowHide>;

  beforeEach(() => {
    store = getCleanStore();
    wrapper = shallowMount(ContainerShowHide, {
      propsData: {
        id: "testWidget",
        visible: true
      },
      slots: {
        default: "slot text"
      },
      localVue,
      store
    });
  });

  WidgetBaseTests(ContainerShowHide);

  it("is visible", () => {
    expect(wrapper.isVisible()).toBe(true);
  });

  it("matches html snapshot", () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});

describe("ContainerShowHide prop visible:false", () => {
  let wrapper: Wrapper<ContainerShowHide>;

  beforeEach(() => {
    store = getCleanStore();
    wrapper = shallowMount(ContainerShowHide, {
      propsData: {
        id: "testWidget",
        visible: false
      },
      slots: {
        default: "slot text"
      },
      localVue,
      store
    });
  });

  it("is not visible", () => {
    expect(wrapper.isVisible()).toBe(false);
  });

  it("matches html snapshot", () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
