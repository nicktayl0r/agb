require("@/tests/jest/__polyfill__/TextEncoder");
import { Effect } from "@/data models/effectModels";
import { runEffect } from "@/helpers/effectHelpers";
import { readWidgetEntryVal } from "@/store/modules/userData";

import { getStore } from "@/helpers/storeHelpers";

let store = getStore();

describe("applyEffect updateRadioGroupSelection", () => {
  beforeEach(() => {
    store = getStore();
  });

  it("updateRadioGroupSelection runEffect set selected", () => {
    const effectUpdateRadioGroupSelection: Effect = {
      effectData: {
        effectType: "updateRadioGroupSelection",
        group: "radioGroup",
        radioID: "radio1"
      },
      delay: 0,
      fireOnceID: ""
    };
    let storeVal = readWidgetEntryVal(store)(
      "testPage",
      "radioGroup",
      "selected"
    );
    expect(storeVal.isNothing()).toBe(true);
    runEffect(
      effectUpdateRadioGroupSelection,
      "testPage",
      "selectRadio1Button"
    );
    storeVal = readWidgetEntryVal(store)("testPage", "radioGroup", "selected");
    if (storeVal.isJust()) expect(storeVal.unsafelyUnwrap()).toBe("radio1");
    else throw Error("radioGroup property not found in store.");
  });

  it("updateRadioGroupSelection runEffect set none selected", () => {
    const effectUpdateRadioGroupSelection: Effect = {
      effectData: {
        effectType: "updateRadioGroupSelection",
        group: "radioGroup",
        radioID: ""
      },
      delay: 0,
      fireOnceID: ""
    };
    let storeVal = readWidgetEntryVal(store)(
      "testPage",
      "radioGroup",
      "selected"
    );
    expect(storeVal.unsafelyUnwrap()).toBe("radio1");
    runEffect(
      effectUpdateRadioGroupSelection,
      "testPage",
      "selectRadio1Button"
    );
    storeVal = readWidgetEntryVal(store)("testPage", "radioGroup", "selected");
    if (storeVal.isJust()) expect(storeVal.unsafelyUnwrap()).toBe("");
    else throw Error("radioGroup property not found in store.");
  });
});
