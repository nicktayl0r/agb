import { Maybe } from "true-myth";
import { getCleanStore } from "@/tests/jest/jestSetup";
let store = getCleanStore();

import { runEffect } from "@/helpers/effectHelpers";
import { Effect } from "@/data models/effectModels";
import {
  readUserSharedDataEntryVal,
  dispatchUpdateWidget
} from "@/store/modules/userData";

const projectData = require("@/tests/jest/__data__/project.json");
import {
  commitInitProjectConfig,
  commitInitWidgetProps
} from "@/store/modules/appData";

describe("applyEffect setSharedDataToRadioGroupValue", () => {
  let effectAppSharedData: Effect;

  beforeEach(() => {
    store = getCleanStore();
    commitInitProjectConfig(store, projectData);

    effectAppSharedData = {
      effectData: {
        effectType: "setSharedDataToRadioGroupValue",
        radioGroupId: "radioGroup",
        sharedDataKey: "radioGroupValue"
      },
      delay: 0,
      fireOnceID: ""
    };
  });

  it("setSharedDataToRadioGroupValue runEffect", () => {
    //set the initial value prop for the radio1 widget to "one"
    commitInitWidgetProps(store, {
      pageID: "testPage",
      widgetID: "radio1",
      props: {
        value: "one"
      },
      conditionsProp: { conditionList: [] }
    });
    //set the store info as if the radioGroup has radio1 selected
    dispatchUpdateWidget(store, {
      pageID: "testPage",
      widgetID: "radioGroup",
      key: "selected",
      value: "radio1"
    });
    //run the effect setting radio1.value to radioGroupValue sharedDataKey
    runEffect(effectAppSharedData, "testPage", "testWidget");
    //get the radioGroupValue sharedDataKey value
    const storeVal = readUserSharedDataEntryVal(store)("radioGroupValue");

    if (storeVal.isJust()) {
      const val = Maybe.unsafelyUnwrap(storeVal);
      expect(val).toBe("one");
    } else {
      throw Error("radioGroupValue entry not found in store.");
    }
  });
});
