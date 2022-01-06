import { getLocalVue, getCleanStore } from "@/tests/jest/jestSetup";
const localVue = getLocalVue();
let store = getCleanStore();

import { shallowMount } from "@vue/test-utils";
require("@/tests/jest/__mock__/MutationObserver");

import WidgetRadio from "@/components/WidgetRadio.vue";
import WidgetArrow from "@/components/WidgetArrow.vue";

import {
  dispatchUpdateWidget,
  commitUserSharedDataEntryVal,
  commitSetWidgetEntry
} from "@/store/modules/userData";
import { sendResponse, sendStoreResponses } from "@/helpers/responseHelpers";

//mock the effectHelper so we can override the delay function.
jest.mock("@/helpers/timeHelpers");
import * as timeHelpers from "@/helpers/timeHelpers";
//@ts-ignore
timeHelpers.delay = (seconds: number) => {
  return Promise.resolve();
};

const userData = require("@/store/modules/userData");

import {
  Response,
  RadioGroupResponse,
  RadioGroupHeaderPair,
  SharedDataResponse,
  WidgetResponse,
  WidgetHeaderPair
} from "@/data models/responseModels";



describe("ResponseHelpers - sendResponse with radioGroupResponse data", () => {
  beforeEach(() => {
    store = getCleanStore();
  });

  it("sendResponse radioGroupResponse", async () => {
    const radio1 = shallowMount(WidgetRadio, {
      propsData: {
        id: "radio1",
        value: "1",
        pageID: "testPage"
      },
      localVue,
      store
    });
    dispatchUpdateWidget(store, {
      pageID: "testPage",
      widgetID: "groupID",
      key: "selected",
      value: "radio1"
    });

    const radio1HeaderPair: RadioGroupHeaderPair = {
      header: "",
      group: "groupID"
    };

    const radioResponseData: RadioGroupResponse = {
      responseType: "radioGroup",
      format: "none",
      headerPairs: [radio1HeaderPair]
    };

    const response: Response = {
      rubricID: "test.rubricID",
      responseData: radioResponseData,
      fireOnceID: ""
    };
    const spy = jest.spyOn(userData, "dispatchMutateActivityResponse");
    await sendResponse(response, "testPage", "submitButton");
    // expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(store, {
      attemptId: -1,
      rubricId: "test.rubricID",
      response: "1",
      responseData: JSON.stringify([{ response: "1" }])
    });
  });

  it("sendResponse radioGroupResponse after changed radio selection", async () => {
    //tests a specific bugfix where submitting a radioGroupResponse after changing the selected radio was incorrect.
    const radio2 = shallowMount(WidgetRadio, {
      propsData: {
        id: "radio2",
        value: "2",
        pageID: "testPage"
      },
      localVue,
      store
    });

    dispatchUpdateWidget(store, {
      pageID: "testPage",
      widgetID: "groupID",
      key: "selected",
      value: "radio1"
    });

    const radio1HeaderPair: RadioGroupHeaderPair = {
      header: "",
      group: "groupID"
    };

    const radioResponseData: RadioGroupResponse = {
      responseType: "radioGroup",
      format: "none",
      headerPairs: [radio1HeaderPair]
    };

    const response: Response = {
      rubricID: "test.rubricID",
      responseData: radioResponseData,
      fireOnceID: ""
    };
    const spy = jest.spyOn(userData, "dispatchMutateActivityResponse");
    await sendResponse(response, "testPage", "submitButton");
    // expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(store, {
      attemptId: -1,
      rubricId: "test.rubricID",
      response: "1",
      responseData: JSON.stringify([{ response: "1" }])
    });

    dispatchUpdateWidget(store, {
      pageID: "testPage",
      widgetID: "groupID",
      key: "selected",
      value: "radio2"
    });

    await sendResponse(response, "testPage", "submitButton");
    expect(spy).toHaveBeenCalledWith(store, {
      attemptId: -1,
      rubricId: "test.rubricID",
      response: "2",
      responseData: JSON.stringify([{ response: "2" }])
    });
  });
});

describe("ResponseHelpers - sendResponse with sharedDataResponse data", () => {
  beforeEach(() => {
    store = getCleanStore();
  });

  it.each`
		sharedVal           | descr            | formatted
		${1}                | ${"numAttempts"} | ${"correct in 1 try"}
		${2}                | ${"numAttempts"} | ${"correct in 2 tries"}
		${1}                | ${"numCorrect"}  | ${"1 out of 2 correct options identified"}
		${1}                | ${"none"}        | ${"1"}
		${true}             | ${"none"}        | ${"true"}
		${false}            | ${"none"}        | ${"false"}
		${"testShareValue"} | ${"none"}        | ${"testShareValue"}
	`(
    "sendResponse sharedDataResponse userData $sharedVal $descr",
    async ({ sharedVal, descr, formatted }) => {
      commitUserSharedDataEntryVal(store, {
        sharedDataID: "testShareID",
        value: sharedVal
      });

      const sharedResponseData: SharedDataResponse = {
        responseType: "sharedData",
        sharedDataKey: "testShareID",
        descriptor: descr,
        numCorrectTotal: 2
      };

      const response: Response = {
        rubricID: "test.rubricID",
        responseData: sharedResponseData,
        fireOnceID: ""
      };

      const spy = jest.spyOn(userData, "dispatchMutateActivityResponse");
      await sendResponse(response, "testPage", "submitButton");
      // expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(store, {
        attemptId: -1,
        rubricId: "test.rubricID",
        response: formatted,
        responseData: JSON.stringify([{ response: formatted }])
      });
    }
  );
});

describe("ResponseHelpers - sendResponse with widgetResponse data", () => {
  beforeEach(() => {
    store = getCleanStore();
  });

  it.each`
		propVal     | storeVal         | format     | expected
		${"answer"} | ${false}         | ${"comma"} | ${"answer"}
		${"answer"} | ${"storeAnswer"} | ${"comma"} | ${"storeAnswer"}
		${true}     | ${false}         | ${"comma"} | ${"true"}
		${false}    | ${true}          | ${"comma"} | ${"true"}
		${10}       | ${false}         | ${"comma"} | ${"10"}
		${10}       | ${15}            | ${"comma"} | ${"15"}
	`(
    "sendResponse widgetResponse $propVal $storeVal $format",
    async ({
      propVal, storeVal, format, expected
    }) => {
      const elem = [document.createElement('div'), document.createElement('div'), document.createElement('div')];
      elem[0].id = typeof propVal === "string" ? propVal : "";
      elem[1].id = typeof storeVal === "string" ? storeVal : "";
      if (document.body) {
        elem.forEach((element: any) => {
          document.body.appendChild(element);
        });
      }


      // console.log("SANITY: ", typeof propVal);
      // console.log(typeof propVal === "number" ? propVal : 20);
      const testID = `test_${format}_${expected}`;
      const text1 = shallowMount(WidgetArrow, {
        propsData: {
          id: testID,
          sourceId: typeof propVal === "string" ? propVal : "",
          pageID: "testPage",
          targetOffsetX: typeof propVal === "number" ? propVal : 20,
          visible: typeof propVal === "boolean" ? propVal : true
        },
        localVue,
        store
      });

      const propDict = {
        string: "sourceId",
        number: "targetOffsetX",
        boolean: "visible",
        bigint: "undefined", //here b/c of typescrpt, unused
        symbol: "undefined", //here b/c of typescrpt, unused
        function: "undefined", //here b/c of typescrpt, unused
        undefined: "undefined", //here b/c of typescrpt, unused
        object: "undefined" //here b/c of typescrpt, unused
      };

      if (storeVal != false) {
        commitSetWidgetEntry(store, {
          pageID: "testPage",
          widgetID: testID,
          key: propDict[typeof storeVal],
          value: storeVal
        });
      }

      const widgetHeader1: WidgetHeaderPair = {
        header: "",
        widgetID: testID,
        key: propDict[typeof propVal]
      };

      const widgetResponseData: WidgetResponse = {
        responseType: "widget",
        format,
        headerPairs: [widgetHeader1]
      };

      const response: Response = {
        rubricID: "test.rubricID",
        responseData: widgetResponseData,
        fireOnceID: ""
      };

      const spy = jest.spyOn(userData, "dispatchMutateActivityResponse");
      await sendResponse(response, "testPage", "submitButton").then(() => {
        expect(spy).toHaveBeenCalledWith(store, {
          attemptId: -1,
          rubricId: "test.rubricID",
          response: expected,
          responseData: JSON.stringify([{ response: expected }])
        });
      });
      // expect(spy).toHaveBeenCalled();
      spy.mockClear();
      text1.destroy();
    }
  );
});


import * as faker from "faker";
import { setStore } from "@/helpers/storeHelpers";
import {
  commitAttemptId
} from "@/store/modules/authData";

describe("StoredResponses", () => {
  let responses: any[] = [];
  let attemptID: any;
  beforeEach(() => {

    store = getCleanStore();
    setStore(store);

    attemptID = faker.random.number(10000);
    commitAttemptId(store, { attemptId: attemptID });

    for (let j = 0; j < 5; j++) {
      responses.push({
        attemptId: attemptID,
        rubricId: `rubricId${j}`,
        response: faker.lorem.sentence(12),
        responseData: { jestID: `rubricId${j}`, responseData: faker.lorem.sentence(12) }.toString()
      });
      userData.commitRubricStateResponse(store, {
        rubricID: responses[j].rubricId,
        status: "submitted",
        response: responses[j].response,
        responseData: responses[j].responseData
      });
    }


  });


  it
    ("sendStoreResponses", () => {
      userData.dispatchMutateActivityResponse = jest.fn();

      sendStoreResponses();

      expect(userData.dispatchMutateActivityResponse).toBeCalledTimes(5);

      for (let j = 0; j < 5; j++) {
        expect(userData.dispatchMutateActivityResponse.mock.calls[j][1]).toStrictEqual(responses[j]);
      }
    });
});