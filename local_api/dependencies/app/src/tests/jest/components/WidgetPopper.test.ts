import { getLocalVue, getCleanStore } from "@/tests/jest/jestSetup";
const localVue = getLocalVue();
let store = getCleanStore();

import { shallowMount } from "@vue/test-utils";
import { WidgetBaseTests } from "@/tests/jest/components/WidgetBaseTests";
import { MixinWidgetClickableTests } from "@/tests/jest/mixins/MixinWidgetClickableTests";

import WidgetPopper from "@/components/WidgetPopper.vue";

describe("WidgetPopper", () => {
  beforeEach(() => {
    store = getCleanStore();
  });

  WidgetBaseTests(WidgetPopper);
  MixinWidgetClickableTests(WidgetPopper);

  it("matches html snapshot", () => {
    const wrapper = shallowMount(WidgetPopper, {
      propsData: {
        id: "testWidget"
      },
      localVue,
      store
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
