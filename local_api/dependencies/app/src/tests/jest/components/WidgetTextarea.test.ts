import { getLocalVue, getCleanStore } from "@/tests/jest/jestSetup";
const localVue = getLocalVue();
const store = getCleanStore();

import { shallowMount, Wrapper } from "@vue/test-utils";
import { WidgetBaseTests } from "@/tests/jest/components/WidgetBaseTests";
import { MixinWidgetEnabledTests } from "@/tests/jest/mixins/MixinWidgetEnabledTests";

import WidgetTextarea from "@/components/WidgetTextarea.vue";

describe("WidgetTextarea", () => {
  WidgetBaseTests(WidgetTextarea);
  MixinWidgetEnabledTests(WidgetTextarea);

  it("matches html snapshot", () => {
    const wrapper = shallowMount(WidgetTextarea, {
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
