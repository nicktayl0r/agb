import { getLocalVue, getCleanStore } from "@/tests/jest/jestSetup";
const localVue = getLocalVue();
let store = getCleanStore();

import { shallowMount } from "@vue/test-utils";
import { WidgetBaseTests } from "@/tests/jest/components/WidgetBaseTests";
import { MixinWidgetClickableTests } from "@/tests/jest/mixins/MixinWidgetClickableTests";

import WidgetImage from "@/components/WidgetImage.vue";

describe("WidgetImage", () => {
  beforeEach(() => {
    store = getCleanStore();
  });

  WidgetBaseTests(WidgetImage);
  MixinWidgetClickableTests(WidgetImage);

  it("matches html snapshot", () => {
    const wrapper = shallowMount(WidgetImage, {
      propsData: {
        id: "testWidget"
      },
      localVue,
      store
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
