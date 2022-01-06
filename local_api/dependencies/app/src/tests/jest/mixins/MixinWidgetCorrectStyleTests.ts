import Vue from "vue";

import { getLocalVue, getCleanStore, getFirstChildWrapper } from "@/tests/jest/jestSetup";
const localVue = getLocalVue();
const store = getCleanStore();

import { shallowMount, VueClass } from "@vue/test-utils";

export function MixinWidgetCorrectStyleTests<V extends Vue>(widget: VueClass<V>) {
  it("default no correct class", async () => {
    const wrapper = shallowMount(widget, {
      propsData: {
        id: "testWidget"
      },
      localVue,
      store
    });

    const childWrapper = getFirstChildWrapper(wrapper);
    const labelWrapper = wrapper.find("label");
    await wrapper.vm.$nextTick();

    expect(!wrapper.classes("correct") && !childWrapper.classes("correct") && !labelWrapper.classes("correct")).toBe(true);
  });

  it.only("correctStyle set in store adds correct class", async () => {
    const wrapper = shallowMount(widget, {
      propsData: {
        id: "testWidget"
      },
      localVue,
      store
    });


    const widgetClass = wrapper.vm as any;
    widgetClass.updateWidget("correctStyle", true);
    await wrapper.vm.$nextTick();

    const childWrapper = getFirstChildWrapper(wrapper);
    const labelWrapper = wrapper.find("label");

    expect(wrapper.classes("correct") || childWrapper.classes("correct") || labelWrapper.classes("correct")).toBe(true);
  });
}
