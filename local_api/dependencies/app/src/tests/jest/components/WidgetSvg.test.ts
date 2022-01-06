import { getLocalVue, getCleanStore } from "@/tests/jest/jestSetup";
const localVue = getLocalVue();
let store = getCleanStore();

import { shallowMount } from "@vue/test-utils";
import { WidgetBaseTests } from "@/tests/jest/components/WidgetBaseTests";
import { MixinWidgetClickableTests } from "@/tests/jest/mixins/MixinWidgetClickableTests";

import WidgetSVG from "@/components/WidgetSvg.vue";

describe("WidgetSvg", () => {
  beforeEach(() => {
    store = getCleanStore();
  });

  WidgetBaseTests(WidgetSVG);
  MixinWidgetClickableTests(WidgetSVG);

  it("matches html snapshot", () => {
    const wrapper = shallowMount(WidgetSVG, {
      propsData: {
        id: "testWidget"
      },
      localVue,
      store
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
