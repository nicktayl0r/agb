import { getLocalVue, getCleanStore } from "@/tests/jest/jestSetup";
const localVue = getLocalVue();
let store = getCleanStore();

import { shallowMount } from "@vue/test-utils";

import { WidgetBaseTests_AttachedToDOM } from "@/tests/jest/components/WidgetBaseTests";
import { MixinWidgetPlayableTests } from "@/tests/jest/mixins/MixinWidgetPlayableTests";

import WidgetTransparentVideo from "@/components/WidgetTransparentVideo.vue";

let elem: any;

describe("WidgetTransparentVideo", () => {
  beforeEach(() => {
    store = getCleanStore();
    elem = document.createElement('div');
    if (document.body) {
      document.body.appendChild(elem);
    }
  });

  WidgetBaseTests_AttachedToDOM(WidgetTransparentVideo);

  it("matches html snapshot", () => {
    const wrapper = shallowMount(WidgetTransparentVideo, {
      propsData: {
        id: "testWidget"
        // "src-mp4": "//vjs.zencdn.net/v/oceans.mp4" // this slows our test down and doesn't seem to matter
      },
      localVue,
      store,
      attachTo: elem
    }); /*?.*/
    expect(wrapper.element).toMatchSnapshot(); /*?.*/
  });

  MixinWidgetPlayableTests(WidgetTransparentVideo);
});
