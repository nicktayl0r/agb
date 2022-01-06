import { getLocalVue, getCleanStore } from "@/tests/jest/jestSetup";
const localVue = getLocalVue();
let store = getCleanStore();

import { shallowMount } from "@vue/test-utils";
import { WidgetBaseTests } from "@/tests/jest/components/WidgetBaseTests";
import { MixinWidgetClickableTests } from "@/tests/jest/mixins/MixinWidgetClickableTests";
import { MixinWidgetCorrectStyleTests } from "@/tests/jest/mixins/MixinWidgetCorrectStyleTests";
import { MixinWidgetEnabledTests } from "@/tests/jest/mixins/MixinWidgetEnabledTests";

import WidgetCheckbox from "@/components/WidgetCheckbox.vue";

describe("WidgetCheckbox", () => {
  beforeEach(() => {
    store = getCleanStore();
  });

  WidgetBaseTests(WidgetCheckbox);
  MixinWidgetClickableTests(WidgetCheckbox);
  MixinWidgetCorrectStyleTests(WidgetCheckbox);
  MixinWidgetEnabledTests(WidgetCheckbox);

  it("matches html snapshot", () => {
    const wrapper = shallowMount(WidgetCheckbox, {
      propsData: {
        id: "testWidget",
        text: "button text"
      },
      localVue,
      store
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
