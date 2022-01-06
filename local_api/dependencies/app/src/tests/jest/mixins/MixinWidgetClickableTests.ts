import Vue from "vue";

import { getLocalVue, getCleanStore, getFirstChildWrapper } from "@/tests/jest/jestSetup";
const localVue = getLocalVue();
const store = getCleanStore();

import { shallowMount, VueClass } from "@vue/test-utils";

export function MixinWidgetClickableTests<V extends Vue>(widget: VueClass<V>) {
  it("click calls clicked function", () => {
    const wrapper = shallowMount(widget, {
      propsData: {
        id: "testWidget",
        enabled: true
      },
      localVue,
      store
    });

    wrapper.setMethods({ clicked: jest.fn() });
    wrapper.vm.$forceUpdate(); // this seems to be necessary to update the wrapper with the mocked function

    wrapper.trigger("click");
    wrapper.trigger("change"); // used by radio and checkbox
    const childWrapper = getFirstChildWrapper(wrapper);
    childWrapper.trigger("click");
    childWrapper.trigger("change");

    expect((wrapper.vm as any).clicked).toBeCalled();
  });
}
