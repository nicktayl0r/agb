import { getLocalVue, getCleanStore } from "@/tests/jest/jestSetup";
const localVue = getLocalVue();
let store = getCleanStore();

import { shallowMount, mount, Wrapper } from "@vue/test-utils";

import StoreOverrideProp from "@/components/StoreOverrideProp.vue";
import { dispatchUpdateWidget } from "@/store/modules/userData";

describe("StoreOverrideProp text from prop", () => {
  let wrapper: Wrapper<StoreOverrideProp>;

  beforeEach(() => {
    store = getCleanStore();
    wrapper = shallowMount(StoreOverrideProp, {
      propsData: {
        id: "testWidget",
        text: "text from prop"
      },
      localVue,
      store
    });
  });

  it("matches html snapshot", () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});

describe("StoreOverrideProp text from store", () => {
  let wrapper: Wrapper<StoreOverrideProp>;

  beforeEach(() => {
    store = getCleanStore();
    dispatchUpdateWidget(store, {
      pageID: "testPage",
      widgetID: "testWidget",
      key: "text",
      value: "text from store"
    });

    wrapper = mount(StoreOverrideProp, {
      propsData: {
        id: "testWidget",
        text: "text from prop"
      },
      localVue,
      store
    });
  });

  it("matches html snapshot", () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it("matches userDataStore.pages snapshot", () => {
    expect(store.state.userDataStore.pages).toMatchSnapshot();
  });
});
