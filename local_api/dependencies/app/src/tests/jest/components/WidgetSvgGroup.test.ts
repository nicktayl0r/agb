import { getLocalVue, getCleanStore } from "@/tests/jest/jestSetup";
const localVue = getLocalVue();
let store = getCleanStore();

import { shallowMount } from "@vue/test-utils";
import { WidgetBaseTests } from "@/tests/jest/components/WidgetBaseTests";
import { MixinWidgetClickableTests } from "@/tests/jest/mixins/MixinWidgetClickableTests";
import { MixinWidgetEnabledTests } from "@/tests/jest/mixins/MixinWidgetEnabledTests";

import WidgetSvgGroup from "@/components/WidgetSvgGroup.vue";

describe("WidgetSvgGroup", () => {
  beforeEach(() => {
    store = getCleanStore();
  });

  WidgetBaseTests(WidgetSvgGroup);
  MixinWidgetClickableTests(WidgetSvgGroup);
  MixinWidgetEnabledTests(WidgetSvgGroup);

  it("matches html snapshot", () => {
    const wrapper = shallowMount(WidgetSvgGroup, {
      propsData: {
        id: "testWidget"
      },
      localVue,
      store
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
