import { getLocalVue, getCleanStore } from "@/tests/jest/jestSetup";
const localVue = getLocalVue();
let store = getCleanStore();

import { shallowMount, Wrapper } from "@vue/test-utils";

// @ts-ignore: typescript says I cannot import stringFilter. And yet, I have
import WidgetTextbox, { stringFilter } from "@/components/WidgetTextbox.vue";

import {
  readWidgetEntryVal,
  dispatchUpdateWidget
} from "@/store/modules/userData";

describe("stringFilter", () => {
  const regexFilter = /[^acdeg]/; // these are the characters the user MUST NOT use
  it("should remove all chars from a string that match the regex", () => {
    const unfilteredString = "gfaiaczggggggaczacbacguaczzgggg"; // the string to be filtered
    expect(stringFilter(unfilteredString, regexFilter)).toBe("fizzbuzz");
  });

  it("should work with empty strings", () => {
    expect(stringFilter("", regexFilter)).toBe("");
  });
});

describe("WidgetTextBox filter=integer", () => {
  let wrapper: Wrapper<WidgetTextbox>;
  beforeEach(async () => {
    store = getCleanStore();
    wrapper = shallowMount(WidgetTextbox, {
      localVue,
      store,
      propsData: {
        filter: "integer",
        pageID: "testPage",
        id: "intTest"
      }
    });
  });

  it("filter=integer non number is not stored", () => {
    //give the widget an itial value
    dispatchUpdateWidget(store, {
      pageID: "testPage",
      widgetID: "intTest",
      key: "text",
      value: "000"
    });
    //get the input html element
    const input = wrapper.find("input"); //.element as HTMLInputElement;
    // console.log("starting value: ", input.value);
    //give the element a value to be filtered
    input.setValue("000A"); //possible to run every possible character? for loop?
    window.dispatchEvent(new Event("quitting")); //flush the debounce to write any text to the store

    //get widget's text value from store
    const widgetVal = readWidgetEntryVal(store)("testPage", "intTest", "text");
    //widget's text value should be unchanged.
    expect(widgetVal.unsafelyUnwrap()).toBe("000");
  });

  it("filter=integer non numbers are removed from input element", () => {
    //get the input html element
    const input = wrapper.find("input");
    //give the element a value to be filtered
    input.setValue("A");
    //the html input's value should have the "A" stripped
    expect((input.element as HTMLInputElement).value).toBe("");
  });

  //can't quite get this work because of debounce
  it("filter=integer number is stored", () => {
    //give the widget an itial value
    dispatchUpdateWidget(store, {
      pageID: "testPage",
      widgetID: "intTest",
      key: "text",
      value: ""
    });
    //get the input html element
    const input = wrapper.find("input"); //.element as HTMLInputElement;
    // console.log("starting value: ", input.value);
    //give the element a value to be filtered
    input.setValue("123");
    window.dispatchEvent(new Event("quitting")); // flush the debounce to write any text to the store
    //get widget's text value from store
    const widgetVal = readWidgetEntryVal(store)("testPage", "intTest", "text");
    //widget's text value should be unchanged.
    expect(widgetVal.unsafelyUnwrap()).toBe("123");
  });
});

describe("WidgetTextBox filter=float", () => {
  let wrapper: Wrapper<WidgetTextbox>;
  beforeEach(async () => {
    store = getCleanStore();
    wrapper = shallowMount(WidgetTextbox, {
      localVue,
      store,
      propsData: {
        filter: "float",
        pageID: "testPage",
        id: "floatTest"
      }
    });
  });

  it("filter=float non number is not stored", () => {
    //give the widget an itial value
    dispatchUpdateWidget(store, {
      pageID: "testPage",
      widgetID: "floatTest",
      key: "text",
      value: "0.1"
    });
    //get the input html element
    const input = wrapper.find("input"); //.element as HTMLInputElement;
    // console.log("starting value: ", input.value);
    //give the element a value to be filtered
    input.setValue("0.1A"); //possible to run every possible character? for loop?
    window.dispatchEvent(new Event("quitting")); //flush the debounce to write any text to the store

    //get widget's text value from store
    const widgetVal = readWidgetEntryVal(store)(
      "testPage",
      "floatTest",
      "text"
    );
    //widget's text value should be unchanged.
    expect(widgetVal.unsafelyUnwrap()).toBe("0.1");
  });

  it("filter=float non numbers are removed from input element", () => {
    //get the input html element
    const input = wrapper.find("input");
    //give the element a value to be filtered
    input.setValue("A");
    //the html input's value should have the "A" stripped
    expect((input.element as HTMLInputElement).value).toBe("");
  });

  //can't quite get this work because of debounce
  it("filter=float number is stored", () => {
    //give the widget an itial value
    dispatchUpdateWidget(store, {
      pageID: "testPage",
      widgetID: "floatTest",
      key: "text",
      value: "0"
    });
    //get the input html element
    const input = wrapper.find("input"); //.element as HTMLInputElement;
    // console.log("starting value: ", input.value);
    //give the element a value to be filtered
    input.setValue("0.1");
    window.dispatchEvent(new Event("quitting")); //flush the debounce to write any text to the store
    // (wrapper.vm as WidgetTextbox).flushDebounce(); //can't call it directly..
    //get widget's text value from store
    const widgetVal = readWidgetEntryVal(store)(
      "testPage",
      "floatTest",
      "text"
    );
    //widget's text value should be unchanged.
    expect(widgetVal.unsafelyUnwrap()).toBe("0.1");
  });
});

describe("WidgetTextBox filter=allow-list", () => {
  let wrapper: Wrapper<WidgetTextbox>;
  beforeEach(async () => {
    store = getCleanStore();
    wrapper = shallowMount(WidgetTextbox, {
      localVue,
      store,
      propsData: {
        filter: "allow-list",
        pageID: "testPage",
        id: "test",
        filterList: "ABC"
      }
    });
  });

  it("filter=allow-list allow chars in list", () => {
    //give the widget an itial value
    dispatchUpdateWidget(store, {
      pageID: "testPage",
      widgetID: "test",
      key: "text",
      value: "A"
    });
    //get the input html element
    const input = wrapper.find('input[type="text"]');
    //give the element a value to be filtered
    input.setValue("B"); //possible to run every possible character? for loop?
    window.dispatchEvent(new Event("quitting")); //flush the debounce to write any text to the store

    //get widget's text value from store
    const widgetVal = readWidgetEntryVal(store)("testPage", "test", "text");
    //widget's text value should be ABC.
    expect(widgetVal.unsafelyUnwrap()).toBe("B");
  });

  it("filter=allow-list block chars in list", () => {
    //give the widget an itial value
    dispatchUpdateWidget(store, {
      pageID: "testPage",
      widgetID: "test",
      key: "text",
      value: "ABC"
    });
    //get the input html element
    const input = wrapper.find('input[type="text"]'); //.element as HTMLInputElement;
    //give the element a value to be filtered
    input.setValue("ABCD"); //possible to run every possible character? for loop?
    window.dispatchEvent(new Event("quitting")); //flush the debounce to write any text to the store

    //get widget's text value from store
    const widgetVal = readWidgetEntryVal(store)("testPage", "test", "text");
    //widget's text value should be unchanged.
    expect(widgetVal.unsafelyUnwrap()).toBe("ABC");
  });
});

describe("WidgetTextBox filter=text", () => {
  let wrapper: Wrapper<WidgetTextbox>;
  beforeEach(async () => {
    store = getCleanStore();
    wrapper = shallowMount(WidgetTextbox, {
      localVue,
      store,
      propsData: {
        filter: "text",
        pageID: "testPage",
        id: "textTest"
      }
    });
  });

  it("filter=text allows all characters", () => {
    //give the widget an itial value
    dispatchUpdateWidget(store, {
      pageID: "testPage",
      widgetID: "textTest",
      key: "text",
      value: "000"
    });
    //get the input html element
    const input = wrapper.find("input"); //.element as HTMLInputElement;
    // console.log("starting value: ", input.value);
    //give the element a value to be filtered
    const testString = "1234567890-=_+`~qwertyuiop[]\QWERTYUIOP{}|asdfghjkl;'ASDFGHJKL:zxcvbnm,./ZXCVBNM<>?";
    input.setValue(testString); //possible to run every possible character? for loop?
    window.dispatchEvent(new Event("quitting")); //flush the debounce to write any text to the store

    //get widget's text value from store
    const widgetVal = readWidgetEntryVal(store)("testPage", "textTest", "text");
    //widget's text value should be unchanged.
    expect(widgetVal.unsafelyUnwrap()).toBe(testString);
  });
});
