import Vue from "vue";

import { getLocalVue, getCleanStore, getFirstChildWrapper } from "@/tests/jest/jestSetup";
const localVue = getLocalVue();
const store = getCleanStore();

import { shallowMount, VueClass } from "@vue/test-utils";

export function MixinWidgetEnabledTests<V extends Vue>(widget: VueClass<V>) {
  it("set enabled prop true is not disabled", () => {
    const wrapper = shallowMount(widget, {
      propsData: {
        id: "testWidget",
        enabled: true
      },
      localVue,
      store
    });
    const childWrapper = getFirstChildWrapper(wrapper);
    expect(
      wrapper.attributes("disabled") === undefined
			&& childWrapper.attributes("disabled") === undefined
    ).toBe(true);
  });

  it("set enabled prop false is disabled", () => {
    const wrapper = shallowMount(widget, {
      propsData: {
        id: "testWidget",
        enabled: false
      },
      localVue,
      store
    });
    const childWrapper = getFirstChildWrapper(wrapper);
    expect(
      wrapper.attributes("disabled") !== undefined
			|| childWrapper.attributes("disabled") !== undefined
    ).toBe(true);
  });
}
