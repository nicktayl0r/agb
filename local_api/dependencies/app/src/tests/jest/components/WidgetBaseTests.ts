import Vue from "vue";

import { getLocalVue, getCleanStore, getFirstChildWrapper } from "@/tests/jest/jestSetup";
const localVue = getLocalVue();
const store = getCleanStore();

import { shallowMount, VueClass } from "@vue/test-utils";

export function WidgetBaseTests<V extends Vue>(widget: VueClass<V>) {
  it("set visible prop true is visible", () => {
    const wrapper = shallowMount(widget, {
      propsData: {
        id: "testWidget",
        visible: true
      },
      localVue,
      store
    });
    const childWrapper = getFirstChildWrapper(wrapper);
    expect(wrapper.isVisible() && childWrapper.isVisible()).toBe(true);
  });

  it("set visible prop false is not visible", async () => {
    const wrapper = shallowMount(widget, {
      propsData: {
        id: "testWidget",
        visible: false
      },
      localVue,
      store
    });
    const childWrapper = getFirstChildWrapper(wrapper);
    expect(!wrapper.isVisible() || !childWrapper.isVisible()).toBe(true);
  });
}

let elem: any;
export function WidgetBaseTests_AttachedToDOM<V extends Vue>(widget: VueClass<V>) {
  it("set visible prop true is visible", () => {
    elem = document.createElement('div');
    if (document.body) {
      document.body.appendChild(elem);
    }
    const wrapper = shallowMount(widget, {
      propsData: {
        id: "testWidget",
        visible: true
      },
      localVue,
      store,
      attachTo: elem
    });
    const childWrapper = getFirstChildWrapper(wrapper);
    expect(wrapper.isVisible() && childWrapper.isVisible()).toBe(true);
  });

  it("set visible prop false is not visible", async () => {
    elem = document.createElement('div');
    if (document.body) {
      document.body.appendChild(elem);
    }
    const wrapper = shallowMount(widget, {
      propsData: {
        id: "testWidget",
        visible: false
      },
      localVue,
      store,
      attachTo: elem
    });
    const childWrapper = getFirstChildWrapper(wrapper);
    expect(!wrapper.isVisible() || !childWrapper.isVisible()).toBe(true);
  });
}
