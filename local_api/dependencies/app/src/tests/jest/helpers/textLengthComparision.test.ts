import { getCleanStore } from "@/tests/jest/jestSetup";
let store = getCleanStore();

import { evaluateComparison } from "@/helpers/conditionHelpers";
import { dispatchUpdateWidget } from "@/store/modules/userData";
import { Comparison } from "@/data models/conditionModels";

describe("evaluateComparison textLengthComparision", () => {
  let comparison: Comparison;

  beforeEach(() => {
    store = getCleanStore();

    comparison = {
      comparisonData: {
        comparisonType: "textLength",
        textID: "testWidget"
      }
    };
  });

  it("textLength comparison pass", () => {
    dispatchUpdateWidget(store, {
      pageID: "testPage",
      widgetID: "testWidget",
      key: "text",
      value: "some text longer than 5 characters"
    });

    const compVal = evaluateComparison(comparison, "testPage");
    expect(compVal).toBe(true);
  });

  it("textLength comparison fail", () => {
    dispatchUpdateWidget(store, {
      pageID: "testPage",
      widgetID: "testWidget",
      key: "text",
      value: "1234"
    });

    const compVal = evaluateComparison(comparison, "testPage");
    expect(compVal).toBe(false);
  });
});
