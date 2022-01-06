import { getLocalVue, getCleanStore } from "@/tests/jest/jestSetup";
const localVue = getLocalVue();
let store = getCleanStore();

import { shallowMount } from "@vue/test-utils";
import { WidgetBaseTests } from "@/tests/jest/components/WidgetBaseTests";
import { MixinWidgetClickableTests } from "@/tests/jest/mixins/MixinWidgetClickableTests";
import { MixinWidgetEnabledTests } from "@/tests/jest/mixins/MixinWidgetEnabledTests";

import WidgetButton from "@/components/WidgetButton.vue";

describe("WidgetButton", () => {
  beforeEach(() => {
    store = getCleanStore();
  });

  WidgetBaseTests(WidgetButton);
  MixinWidgetClickableTests(WidgetButton);
  MixinWidgetEnabledTests(WidgetButton);

  it("matches html snapshot", () => {
    const wrapper = shallowMount(WidgetButton, {
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
