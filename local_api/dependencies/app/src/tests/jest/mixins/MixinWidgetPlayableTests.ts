import Vue from "vue";

import { getLocalVue, getCleanStore } from "@/tests/jest/jestSetup";
const localVue = getLocalVue();
const store = getCleanStore();

import { shallowMount, VueClass } from "@vue/test-utils";

let elem: any;

export function MixinWidgetPlayableTests<V extends Vue>(widget: VueClass<V>) {
  beforeEach(() => {
    elem = document.createElement('div');
    if (document.body) {
      document.body.appendChild(elem);
    }
  });


  it("set playState play calls DoPlayState", async () => {
    const wrapper = shallowMount(widget, {
      propsData: {
        id: "testWidget"
      },
      localVue,
      store,
      attachTo: elem
    });
    jest.spyOn(wrapper.vm as any, "loadedAndReady").mockReturnValue(true);
    const spy = jest.spyOn(wrapper.vm as any, "DoPlayState");
    (wrapper.vm as any).updateWidget("playState", "play");
    await wrapper.vm.$nextTick();

    expect(spy).toHaveBeenCalled();
  });

  it("set playState pause calls DoPauseState", async () => {
    const wrapper = shallowMount(widget, {
      propsData: {
        id: "testWidget"
      },
      localVue,
      store,
      attachTo: elem
    });
    jest.spyOn(wrapper.vm as any, "loadedAndReady").mockReturnValue(true);
    const spy = jest.spyOn(wrapper.vm as any, "DoPauseState");
    (wrapper.vm as any).updateWidget("playState", "pause");
    await wrapper.vm.$nextTick();

    expect(spy).toHaveBeenCalled();
  });

  it("set playState stop calls DoStopState", async () => {
    const wrapper = shallowMount(widget, {
      propsData: {
        id: "testWidget"
      },
      localVue,
      store,
      attachTo: elem
    });
    jest.spyOn(wrapper.vm as any, "loadedAndReady").mockReturnValue(true);
    const spy = jest.spyOn(wrapper.vm as any, "DoStopState");
    (wrapper.vm as any).updateWidget("playState", "stop");
    await wrapper.vm.$nextTick();

    expect(spy).toHaveBeenCalled();
  });
}