import { getLocalVue, getCleanStore } from "@/tests/jest/jestSetup";
const localVue = getLocalVue();
let store = getCleanStore();

import { shallowMount, Wrapper } from "@vue/test-utils";
import { WidgetBaseTests } from "@/tests/jest/components/WidgetBaseTests";
import { MixinWidgetEnabledTests } from "@/tests/jest/mixins/MixinWidgetEnabledTests";

import ContainerEnableDisable from "@/components/ContainerEnableDisable.vue";

describe("ContainerEnableDisable prop enabled:true", () => {
  let wrapper: Wrapper<ContainerEnableDisable>;

  beforeEach(() => {
    store = getCleanStore();
    wrapper = shallowMount(ContainerEnableDisable, {
      propsData: {
        id: "testWidget",
        enabled: true
      },
      slots: {
        default: "slot text"
      },
      localVue,
      store
    });
  });

  WidgetBaseTests(ContainerEnableDisable);
  MixinWidgetEnabledTests(ContainerEnableDisable);

  it("doesn't have disabled attribute", () => {
    expect(wrapper.attributes("disabled")).not.toBeDefined();
  });

  it("matches html snapshot", () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});

describe("ContainerEnableDisable prop enabled:false", () => {
  let wrapper: Wrapper<ContainerEnableDisable>;

  beforeEach(() => {
    store = getCleanStore();
    wrapper = shallowMount(ContainerEnableDisable, {
      propsData: {
        id: "testWidget",
        enabled: false
      },
      slots: {
        default: "slot text"
      },
      localVue,
      store
    });
  });

  it("has disabled attribute", () => {
    expect(wrapper.attributes("disabled")).toBeDefined();
  });

  it("matches html snapshot", () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
