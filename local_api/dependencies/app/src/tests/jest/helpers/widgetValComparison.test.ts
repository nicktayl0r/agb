import { getCleanStore } from "@/tests/jest/jestSetup";
let store = getCleanStore();

import { evaluateComparison } from "@/helpers/conditionHelpers";
import { dispatchUpdateWidget } from "@/store/modules/userData";

describe("evaluateComparison widgetValComparison number", () => {
  beforeEach(() => {
    store = getCleanStore();
    dispatchUpdateWidget(store, {
      pageID: "testPage",
      widgetID: "testWidget",
      key: "numVal",
      value: 2
    });
  });

  it("equals comparison pass", () => {
    const compVal = evaluateComparison(
      {
        comparisonData: {
          comparisonType: "widgetVal",
          widgetID: "testWidget",
          key: "numVal",
          comparison: "equals",
          val: 2
        }
      },
      "testPage"
    );
    expect(compVal).toBe(true);
  });

  it("equals comparison fail", () => {
    const compVal = evaluateComparison(
      {
        comparisonData: {
          comparisonType: "widgetVal",
          widgetID: "testWidget",
          key: "numVal",
          comparison: "equals",
          val: 4
        }
      },
      "testPage"
    );
    expect(compVal).toBe(false);
  });

  it("notEquals comparison pass", () => {
    const compVal = evaluateComparison(
      {
        comparisonData: {
          comparisonType: "widgetVal",
          widgetID: "testWidget",
          key: "numVal",
          comparison: "notEquals",
          val: 2
        }
      },
      "testPage"
    );
    expect(compVal).toBe(false);
  });

  it("notEquals comparison fail", () => {
    const compVal = evaluateComparison(
      {
        comparisonData: {
          comparisonType: "widgetVal",
          widgetID: "testWidget",
          key: "numVal",
          comparison: "notEquals",
          val: 4
        }
      },
      "testPage"
    );
    expect(compVal).toBe(true);
  });

  it("lessThan comparison pass", () => {
    const compVal = evaluateComparison(
      {
        comparisonData: {
          comparisonType: "widgetVal",
          widgetID: "testWidget",
          key: "numVal",
          comparison: "lessThan",
          val: 3
        }
      },
      "testPage"
    );
    expect(compVal).toBe(true);
  });

  it("lessThan comparison fail", () => {
    const compVal = evaluateComparison(
      {
        comparisonData: {
          comparisonType: "widgetVal",
          widgetID: "testWidget",
          key: "numVal",
          comparison: "lessThan",
          val: 1
        }
      },
      "testPage"
    );
    expect(compVal).toBe(false);
  });

  it("greaterThan comparison pass", () => {
    const compVal = evaluateComparison(
      {
        comparisonData: {
          comparisonType: "widgetVal",
          widgetID: "testWidget",
          key: "numVal",
          comparison: "greaterThan",
          val: 1
        }
      },
      "testPage"
    );
    expect(compVal).toBe(true);
  });

  it("greaterThan comparison fail", () => {
    const compVal = evaluateComparison(
      {
        comparisonData: {
          comparisonType: "widgetVal",
          widgetID: "testWidget",
          key: "numVal",
          comparison: "greaterThan",
          val: 3
        }
      },
      "testPage"
    );
    expect(compVal).toBe(false);
  });

  it("equals_cs comparison pass", () => {
    const compVal = evaluateComparison(
      {
        comparisonData: {
          comparisonType: "widgetVal",
          widgetID: "testWidget",
          key: "numVal",
          comparison: "equals_cs",
          val: 2
        }
      },
      "testPage"
    );
    expect(compVal).toBe(true);
  });

  it("equals_cs comparison fail", () => {
    const compVal = evaluateComparison(
      {
        comparisonData: {
          comparisonType: "widgetVal",
          widgetID: "testWidget",
          key: "numVal",
          comparison: "equals_cs",
          val: 4
        }
      },
      "testPage"
    );
    expect(compVal).toBe(false);
  });

  it("notEquals_cs comparison pass", () => {
    const compVal = evaluateComparison(
      {
        comparisonData: {
          comparisonType: "widgetVal",
          widgetID: "testWidget",
          key: "numVal",
          comparison: "notEquals_cs",
          val: 2
        }
      },
      "testPage"
    );
    expect(compVal).toBe(false);
  });

  it("notEquals_cs comparison fail", () => {
    const compVal = evaluateComparison(
      {
        comparisonData: {
          comparisonType: "widgetVal",
          widgetID: "testWidget",
          key: "numVal",
          comparison: "notEquals_cs",
          val: 4
        }
      },
      "testPage"
    );
    expect(compVal).toBe(true);
  });
});

describe("evaluateComparison widgetValComparison string", () => {
  beforeEach(() => {
    store = getCleanStore();
    dispatchUpdateWidget(store, {
      pageID: "testPage",
      widgetID: "testWidget",
      key: "stringVal",
      value: "abcd"
    });
  });

  it("equals comparison pass (mismatch case)", () => {
    const compVal = evaluateComparison(
      {
        comparisonData: {
          comparisonType: "widgetVal",
          widgetID: "testWidget",
          key: "stringVal",
          comparison: "equals",
          val: "ABCD"
        }
      },
      "testPage"
    );
    expect(compVal).toBe(true);
  });

  it("equals comparison pass (match case)", () => {
    const compVal = evaluateComparison(
      {
        comparisonData: {
          comparisonType: "widgetVal",
          widgetID: "testWidget",
          key: "stringVal",
          comparison: "equals",
          val: "abcd"
        }
      },
      "testPage"
    );
    expect(compVal).toBe(true);
  });

  it("equals comparison fail (lowercase)", () => {
    const compVal = evaluateComparison(
      {
        comparisonData: {
          comparisonType: "widgetVal",
          widgetID: "testWidget",
          key: "stringVal",
          comparison: "equals",
          val: "efgh"
        }
      },
      "testPage"
    );
    expect(compVal).toBe(false);
  });

  it("equals comparison fail (uppercase)", () => {
    const compVal = evaluateComparison(
      {
        comparisonData: {
          comparisonType: "widgetVal",
          widgetID: "testWidget",
          key: "stringVal",
          comparison: "equals",
          val: "EFGH"
        }
      },
      "testPage"
    );
    expect(compVal).toBe(false);
  });

  it("notEquals comparison pass (match case)", () => {
    //compare two equal values (both lowercase) and should return false (because they are actuall equal).
    const compVal = evaluateComparison(
      {
        comparisonData: {
          comparisonType: "widgetVal",
          widgetID: "testWidget",
          key: "stringVal",
          comparison: "notEquals",
          val: "abcd"
        }
      },
      "testPage"
    );
    expect(compVal).toBe(false);
  });

  it("notEquals comparison pass (mismatch case)", () => {
    //compare two equal values (one uppercase) and should return false (because they are actuall equal).
    const compVal = evaluateComparison(
      {
        comparisonData: {
          comparisonType: "widgetVal",
          widgetID: "testWidget",
          key: "stringVal",
          comparison: "notEquals",
          val: "ABCD"
        }
      },
      "testPage"
    );
    expect(compVal).toBe(false);
  });

  it("notEquals comparison fail (uppercase)", () => {
    //compare two unequal value (one uppercase) and should return true (because they are not equal).
    const compVal = evaluateComparison(
      {
        comparisonData: {
          comparisonType: "widgetVal",
          widgetID: "testWidget",
          key: "stringVal",
          comparison: "notEquals",
          val: "EFGH"
        }
      },
      "testPage"
    );
    expect(compVal).toBe(true);
  });

  it("notEquals comparison fail (match case)", () => {
    //compare two unequal value (one uppercase) and should return true (because they are not equal).
    const compVal = evaluateComparison(
      {
        comparisonData: {
          comparisonType: "widgetVal",
          widgetID: "testWidget",
          key: "stringVal",
          comparison: "notEquals",
          val: "efgh"
        }
      },
      "testPage"
    );
    expect(compVal).toBe(true);
  });

  it("equals_cs comparison pass (match case)", () => {
    const compVal = evaluateComparison(
      {
        comparisonData: {
          comparisonType: "widgetVal",
          widgetID: "testWidget",
          key: "stringVal",
          comparison: "equals_cs",
          val: "abcd"
        }
      },
      "testPage"
    );
    expect(compVal).toBe(true);
  });

  it("equals_cs comparison fail", () => {
    const compVal = evaluateComparison(
      {
        comparisonData: {
          comparisonType: "widgetVal",
          widgetID: "testWidget",
          key: "stringVal",
          comparison: "equals_cs",
          val: "efgh"
        }
      },
      "testPage"
    );
    expect(compVal).toBe(false);
  });

  it("equals_cs comparison fail (mismatch case)", () => {
    const compVal = evaluateComparison(
      {
        comparisonData: {
          comparisonType: "widgetVal",
          widgetID: "testWidget",
          key: "stringVal",
          comparison: "equals_cs",
          val: "ABCD"
        }
      },
      "testPage"
    );
    expect(compVal).toBe(false);
  });

  it("notEquals_cs comparison pass (match case)", () => {
    //compare two equal values and should return false (because they are actually equal).
    const compVal = evaluateComparison(
      {
        comparisonData: {
          comparisonType: "widgetVal",
          widgetID: "testWidget",
          key: "stringVal",
          comparison: "notEquals_cs",
          val: "abcd"
        }
      },
      "testPage"
    );
    expect(compVal).toBe(false);
  });

  it("notEquals_cs comparison fail", () => {
    //compare two unequal values and should return true (because they are not equal).
    const compVal = evaluateComparison(
      {
        comparisonData: {
          comparisonType: "widgetVal",
          widgetID: "testWidget",
          key: "stringVal",
          comparison: "notEquals_cs",
          val: "efgh"
        }
      },
      "testPage"
    );
    expect(compVal).toBe(true);
  });

  it("notEquals_cs comparison fail (mismatch case)", () => {
    //compare two unequal values (one uppercase) and should return true (because they are not equal).
    const compVal = evaluateComparison(
      {
        comparisonData: {
          comparisonType: "widgetVal",
          widgetID: "testWidget",
          key: "stringVal",
          comparison: "notEquals_cs",
          val: "ABCD"
        }
      },
      "testPage"
    );
    expect(compVal).toBe(true);
  });
});

describe("evaluateComparison widgetValComparison boolean", () => {
  beforeEach(() => {
    store = getCleanStore();
    dispatchUpdateWidget(store, {
      pageID: "testPage",
      widgetID: "testWidget",
      key: "boolVal",
      value: true
    });
  });

  it("equals comparison pass", () => {
    const compVal = evaluateComparison(
      {
        comparisonData: {
          comparisonType: "widgetVal",
          widgetID: "testWidget",
          key: "boolVal",
          comparison: "equals",
          val: true
        }
      },
      "testPage"
    );
    expect(compVal).toBe(true);
  });

  it("equals comparison fail", () => {
    const compVal = evaluateComparison(
      {
        comparisonData: {
          comparisonType: "widgetVal",
          widgetID: "testWidget",
          key: "boolVal",
          comparison: "equals",
          val: false
        }
      },
      "testPage"
    );
    expect(compVal).toBe(false);
  });

  it("notEquals comparison pass", () => {
    const compVal = evaluateComparison(
      {
        comparisonData: {
          comparisonType: "widgetVal",
          widgetID: "testWidget",
          key: "boolVal",
          comparison: "notEquals",
          val: true
        }
      },
      "testPage"
    );
    expect(compVal).toBe(false);
  });

  it("notEquals comparison fail", () => {
    const compVal = evaluateComparison(
      {
        comparisonData: {
          comparisonType: "widgetVal",
          widgetID: "testWidget",
          key: "boolVal",
          comparison: "notEquals",
          val: false
        }
      },
      "testPage"
    );
    expect(compVal).toBe(true);
  });

  it("equals_cs comparison pass", () => {
    const compVal = evaluateComparison(
      {
        comparisonData: {
          comparisonType: "widgetVal",
          widgetID: "testWidget",
          key: "boolVal",
          comparison: "equals_cs",
          val: true
        }
      },
      "testPage"
    );
    expect(compVal).toBe(true);
  });

  it("equals_cs comparison fail", () => {
    const compVal = evaluateComparison(
      {
        comparisonData: {
          comparisonType: "widgetVal",
          widgetID: "testWidget",
          key: "boolVal",
          comparison: "equals_cs",
          val: false
        }
      },
      "testPage"
    );
    expect(compVal).toBe(false);
  });

  it("notEquals_cs comparison pass", () => {
    const compVal = evaluateComparison(
      {
        comparisonData: {
          comparisonType: "widgetVal",
          widgetID: "testWidget",
          key: "boolVal",
          comparison: "notEquals_cs",
          val: true
        }
      },
      "testPage"
    );
    expect(compVal).toBe(false);
  });

  it("notEquals_cs comparison fail", () => {
    const compVal = evaluateComparison(
      {
        comparisonData: {
          comparisonType: "widgetVal",
          widgetID: "testWidget",
          key: "boolVal",
          comparison: "notEquals_cs",
          val: false
        }
      },
      "testPage"
    );
    expect(compVal).toBe(true);
  });
});
