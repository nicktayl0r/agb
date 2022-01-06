import { Maybe } from "true-myth";
import { getCleanStore } from "@/tests/jest/jestSetup";
let store = getCleanStore();

import { runEffect } from "@/helpers/effectHelpers";
import { Effect, UpdateWidgetWithSharedData } from "@/data models/effectModels";
import { readWidgetEntryVal } from "@/store/modules/userData";

const projectData = require("@/tests/jest/__data__/project.json");
import { commitInitProjectConfig } from "@/store/modules/appData";

describe("applyEffect updateWidgetWithSharedData", () => {
  let effectUserSharedData: Effect;
  let effectAppSharedData: Effect;

  beforeEach(() => {
    store = getCleanStore();
    commitInitProjectConfig(store, projectData);

    effectUserSharedData = {
      effectData: {
        effectType: "updateWidgetWithSharedData",
        widgetID: "testWidget",
        key: "testPropertyKey_UserShared",
        sharedDataKey: "userSharedData_updateWidgetWithSharedData"
      },
      delay: 0,
      fireOnceID: ""
    };

    effectAppSharedData = {
      effectData: {
        effectType: "updateWidgetWithSharedData",
        widgetID: "testWidget",
        key: "testPropertyKey_AppShared",
        sharedDataKey: "appSharedData_updateWidgetWithSharedData"
      },
      delay: 0,
      fireOnceID: ""
    };
  });

  it("updateWidgetWithSharedData runEffect UserSharedData", () => {
    runEffect(effectUserSharedData, "testPage", "testWidget");

    const storeVal = readWidgetEntryVal(store)(
      "testPage",
      "testWidget",
      "testPropertyKey_UserShared"
    );

    // this will return propVal if storeVal is Nothing
    if (storeVal.isJust()) {
      const val = Maybe.unsafelyUnwrap(storeVal);

      expect(val).toBe(40982345);
    } else {
      throw Error("testWidget property not found in store.");
    }
  });

  it("updateWidgetWithSharedData runEffect AppSharedData", () => {
    runEffect(effectAppSharedData, "testPage", "testWidget");

    const storeVal = readWidgetEntryVal(store)(
      "testPage",
      "testWidget",
      "testPropertyKey_AppShared"
    );

    if (storeVal.isJust()) {
      // this will return propVal if storeVal is Nothing
      const val = Maybe.unsafelyUnwrap(storeVal);

      expect(val).toBe(5438904);
    } else {
      throw Error("testWidget property not found in store.");
    }
  });
});
