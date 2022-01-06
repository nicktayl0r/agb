import { getLocalVue, getCleanStore } from "@/tests/jest/jestSetup";
const localVue = getLocalVue();
let store = getCleanStore();

import { shallowMount } from "@vue/test-utils";

import { WidgetBaseTests_AttachedToDOM } from "@/tests/jest/components/WidgetBaseTests";
import { MixinWidgetPlayableTests } from "@/tests/jest/mixins/MixinWidgetPlayableTests";

import WidgetVideoPlayer from "@/components/WidgetVideoPlayer.vue";

import { mute } from "@/managers/audioManager";

let elem: any;

describe("WidgetVideoPlayer", () => {
  beforeEach(() => {
    store = getCleanStore();
    elem = document.createElement('div');
    if (document.body) {
      document.body.appendChild(elem);
    }
  });

  WidgetBaseTests_AttachedToDOM(WidgetVideoPlayer);
  MixinWidgetPlayableTests(WidgetVideoPlayer);

  it("matches html snapshot", () => {
    const wrapper = shallowMount(WidgetVideoPlayer, {
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


  it.each`
		globalMute_Init | globalMute_Final 	| videoMute | InitialResult | FinalResult 
		${false}		| ${false} 			| ${false} 	| ${false} 		| ${false} 
		${true}			| ${false} 			| ${false} 	| ${true} 		| ${false} 
		${false}		| ${true} 			| ${false} 	| ${false} 		| ${true}
		${false}		| ${false} 			| ${true} 	| ${true} 		| ${true} 
		${false}		| ${true} 			| ${true} 	| ${true} 		| ${true}
		${true}			| ${true} 			| ${true} 	| ${true} 		| ${true}
	`("global mute", ({
    globalMute_Init, globalMute_Final, videoMute, InitialResult, FinalResult
  }) => {
    const wrapper = shallowMount(WidgetVideoPlayer, {
      propsData: {
        id: "testWidget",
        muted: videoMute
        // "src-mp4": "//vjs.zencdn.net/v/oceans.mp4" // this slows our test down and doesn't seem to matter
      },
      localVue,
      store,
      attachTo: elem
    }); /*?.*/

    const { vm } = wrapper;

    mute(globalMute_Init);
    wrapper.vm.$forceUpdate();
    expect((vm as any).mutedStore).toBe(InitialResult);


    mute(globalMute_Final);
    wrapper.vm.$forceUpdate();
    expect((vm as any).mutedStore).toBe(FinalResult);
  });


});
