import { getLocalVue, getCleanStore } from "@/tests/jest/jestSetup";
const localVue = getLocalVue();
let store = getCleanStore();

import { shallowMount } from "@vue/test-utils";
import { WidgetBaseTests } from "@/tests/jest/components/WidgetBaseTests";
import { MixinWidgetEnabledTests } from "@/tests/jest/mixins/MixinWidgetEnabledTests";

import WidgetSlider from "@/components/WidgetSlider.vue";

describe("WidgetSlider", () => {
  beforeEach(() => {
    store = getCleanStore();
  });

  WidgetBaseTests(WidgetSlider);
  MixinWidgetEnabledTests(WidgetSlider);

  it("matches html snapshot", () => {
    const wrapper = shallowMount(WidgetSlider, {
      propsData: {
        id: "testWidget"
      },
      localVue,
      store
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
