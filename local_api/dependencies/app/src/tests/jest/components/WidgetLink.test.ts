import { getLocalVue, getCleanStore } from "@/tests/jest/jestSetup";
const localVue = getLocalVue();
const store = getCleanStore();

import { shallowMount } from "@vue/test-utils";
import { WidgetBaseTests } from "@/tests/jest/components/WidgetBaseTests";
import { MixinWidgetClickableTests } from "@/tests/jest/mixins/MixinWidgetClickableTests";

import WidgetLink from "@/components/WidgetLink.vue";

describe("WidgetLink", () => {
  WidgetBaseTests(WidgetLink);
  MixinWidgetClickableTests(WidgetLink);

  it("external link matches snapshot html", () => {
    const wrapper = shallowMount(WidgetLink, {
      propsData: {
        id: "testWidget",
        text: "link",
        options: {
          type: "external",
          href: "http://cogenteducation.com"
        }
      },
      localVue,
      store
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it("internal link matches snapshot html", () => {
    const wrapper = shallowMount(WidgetLink, {
      propsData: {
        id: "testWidget",
        text: "link",
        options: {
          type: "internal",
          module: "case",
          pageId: "page"
        }
      },
      localVue,
      store
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
