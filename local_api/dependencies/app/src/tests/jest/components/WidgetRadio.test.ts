import { getLocalVue, getCleanStore } from "@/tests/jest/jestSetup";
const localVue = getLocalVue();
let store = getCleanStore();

import { shallowMount } from "@vue/test-utils";
import { WidgetBaseTests } from "@/tests/jest/components/WidgetBaseTests";
import { MixinWidgetClickableTests } from "@/tests/jest/mixins/MixinWidgetClickableTests";
import { MixinWidgetCorrectStyleTests } from "@/tests/jest/mixins/MixinWidgetCorrectStyleTests";
import { MixinWidgetEnabledTests } from "@/tests/jest/mixins/MixinWidgetEnabledTests";

import WidgetRadio from "@/components/WidgetRadio.vue";

describe("WidgetRadio", () => {
  beforeEach(() => {
    store = getCleanStore();
  });

  WidgetBaseTests(WidgetRadio);
  MixinWidgetClickableTests(WidgetRadio);
  MixinWidgetCorrectStyleTests(WidgetRadio);
  MixinWidgetEnabledTests(WidgetRadio);

  it("matches html snapshot", () => {
    const wrapper = shallowMount(WidgetRadio, {
      propsData: {
        id: "testWidget"
      },
      localVue,
      store
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
