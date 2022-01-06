import { getLocalVue, getCleanStore } from "@/tests/jest/jestSetup";
const localVue = getLocalVue();
const store = getCleanStore();

import { shallowMount, Wrapper } from "@vue/test-utils";
import { WidgetBaseTests } from "@/tests/jest/components/WidgetBaseTests";
import { MixinWidgetEnabledTests } from "@/tests/jest/mixins/MixinWidgetEnabledTests";

import WidgetTextbox from "@/components/WidgetTextbox.vue";

describe("WidgetTextBox", () => {
  WidgetBaseTests(WidgetTextbox);
  MixinWidgetEnabledTests(WidgetTextbox);

  it("matches html snapshot", () => {
    const wrapper = shallowMount(WidgetTextbox, {
      propsData: {
        id: "testWidget",
        text: "test text",
        placeholder: "test placeholder"
      },
      localVue,
      store
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
