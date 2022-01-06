import { getLocalVue, getCleanStore } from "@/tests/jest/jestSetup";
const localVue = getLocalVue();
const store = getCleanStore();

import "jest-canvas-mock";

import { shallowMount } from "@vue/test-utils";
import { WidgetBaseTests } from "@/tests/jest/components/WidgetBaseTests";
import { MixinWidgetPlayableTests } from "@/tests/jest/mixins/MixinWidgetPlayableTests";

import WidgetAnimatedSvg from "@/components/WidgetAnimatedSvg.vue";

describe("WidgetAnimatedSvg", () => {
  WidgetBaseTests(WidgetAnimatedSvg);

  it("matches html snapshot", async () => {
    const wrapper = shallowMount(WidgetAnimatedSvg, {
      propsData: {
        id: "testWidget",
        src: "././dist/assets/svg/thermometer_AnimatedSVG.json"
      },
      localVue,
      store
    }); /*?.*/
    expect(wrapper.element).toMatchSnapshot(); /*?.*/
  });

  MixinWidgetPlayableTests(WidgetAnimatedSvg);
});
