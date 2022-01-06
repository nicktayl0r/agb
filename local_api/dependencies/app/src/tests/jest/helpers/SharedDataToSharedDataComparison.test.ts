import { getCleanStore } from "@/tests/jest/jestSetup";
let store = getCleanStore();

import { evaluateComparison } from "@/helpers/conditionHelpers";
import { dispatchUserUpdateSharedData } from "@/store/modules/userData";
import { SharedDataToSharedDataComparison, Comparison } from "@/data models/conditionModels";

describe("evaluateComparison SharedDataToSharedDataComparison number", () => {
  const comparison: Comparison = {
    comparisonData: {
      comparisonType: "sharedDataToSharedData",
      sharedDataKey1: "testSharedData1",
      sharedDataKey2: "testSharedData2",
      comparison: "equals",
    }
  }
  beforeEach(() => {
    store = getCleanStore();
    dispatchUserUpdateSharedData(store, {
      pageID: "testPage",
      sharedDataID: "testSharedData1",
      value: 2
    });
  });

  it("equals comparison pass", () => {
    dispatchUserUpdateSharedData(store, {
      pageID: "testPage",
      sharedDataID: "testSharedData2",
      value: 2
    });
    const compVal = evaluateComparison(
      comparison,
      "testPage"
    );
    expect(compVal).toBe(true);
  });

  it("equals comparison fail", () => {
    dispatchUserUpdateSharedData(store, {
      pageID: "testPage",
      sharedDataID: "testSharedData2",
      value: 4
    });
    const compVal = evaluateComparison(
      comparison,
      "testPage"
    );
    expect(compVal).toBe(false);
  });

  it("notEquals comparison pass", () => {
    dispatchUserUpdateSharedData(store, {
      pageID: "testPage",
      sharedDataID: "testSharedData2",
      value: 2
    });
    const copyComparison = Object.assign({}, comparison);
    (copyComparison.comparisonData as SharedDataToSharedDataComparison).comparison = "notEquals";
    const compVal = evaluateComparison(
      copyComparison,
      "testPage"
    );
    expect(compVal).toBe(false);
  });

  it("notEquals comparison fail", () => {
    dispatchUserUpdateSharedData(store, {
      pageID: "testPage",
      sharedDataID: "testSharedData2",
      value: 4
    });
    const copyComparison = Object.assign({}, comparison);
    (copyComparison.comparisonData as SharedDataToSharedDataComparison).comparison = "notEquals";
    const compVal = evaluateComparison(
      copyComparison,
      "testPage"
    );
    expect(compVal).toBe(true);
  });

  it("lessThan comparison pass", () => {
    dispatchUserUpdateSharedData(store, {
      pageID: "testPage",
      sharedDataID: "testSharedData2",
      value: 3
    });
    const copyComparison = Object.assign({}, comparison);
    (copyComparison.comparisonData as SharedDataToSharedDataComparison).comparison = "lessThan";
    const compVal = evaluateComparison(
      copyComparison,
      "testPage"
    );

    expect(compVal).toBe(true);
  });

  it("lessThan comparison fail", () => {
    dispatchUserUpdateSharedData(store, {
      pageID: "testPage",
      sharedDataID: "testSharedData2",
      value: 1
    });
    const copyComparison = Object.assign({}, comparison);
    (copyComparison.comparisonData as SharedDataToSharedDataComparison).comparison = "lessThan";
    const compVal = evaluateComparison(
      copyComparison,
      "testPage"
    );
    expect(compVal).toBe(false);
  });

  it("greaterThan comparison pass", () => {
    dispatchUserUpdateSharedData(store, {
      pageID: "testPage",
      sharedDataID: "testSharedData2",
      value: 1
    });
    const copyComparison = Object.assign({}, comparison);
    (copyComparison.comparisonData as SharedDataToSharedDataComparison).comparison = "greaterThan";
    const compVal = evaluateComparison(
      copyComparison,
      "testPage"
    );
    expect(compVal).toBe(true);
  });

  it("greaterThan comparison fail", () => {
    dispatchUserUpdateSharedData(store, {
      pageID: "testPage",
      sharedDataID: "testSharedData2",
      value: 3
    });
    const copyComparison = Object.assign({}, comparison);
    (copyComparison.comparisonData as SharedDataToSharedDataComparison).comparison = "greaterThan";
    const compVal = evaluateComparison(
      copyComparison,
      "testPage"
    );
    expect(compVal).toBe(false);
  });

  it("equals_cs comparison pass", () => {
    dispatchUserUpdateSharedData(store, {
      pageID: "testPage",
      sharedDataID: "testSharedData2",
      value: 2
    });
    const copyComparison = Object.assign({}, comparison);
    (copyComparison.comparisonData as SharedDataToSharedDataComparison).comparison = "equals_cs";
    const compVal = evaluateComparison(
      copyComparison,
      "testPage"
    );
    expect(compVal).toBe(true);
  });

  it("equals_cs comparison fail", () => {
    dispatchUserUpdateSharedData(store, {
      pageID: "testPage",
      sharedDataID: "testSharedData2",
      value: 4
    });
    const copyComparison = Object.assign({}, comparison);
    (copyComparison.comparisonData as SharedDataToSharedDataComparison).comparison = "equals_cs";
    const compVal = evaluateComparison(
      copyComparison,
      "testPage"
    );
    expect(compVal).toBe(false);
  });

  it("notEquals_cs comparison pass", () => {
    dispatchUserUpdateSharedData(store, {
      pageID: "testPage",
      sharedDataID: "testSharedData2",
      value: 2
    });
    const copyComparison = Object.assign({}, comparison);
    (copyComparison.comparisonData as SharedDataToSharedDataComparison).comparison = "notEquals_cs";
    const compVal = evaluateComparison(
      copyComparison,
      "testPage"
    );
    expect(compVal).toBe(false);
  });

  it("notEquals_cs comparison fail", () => {
    dispatchUserUpdateSharedData(store, {
      pageID: "testPage",
      sharedDataID: "testSharedData2",
      value: 4
    });
    const copyComparison = Object.assign({}, comparison);
    (copyComparison.comparisonData as SharedDataToSharedDataComparison).comparison = "notEquals_cs";
    const compVal = evaluateComparison(
      copyComparison,
      "testPage"
    );
    expect(compVal).toBe(true);
  });
});

describe("evaluateComparison SharedDataToSharedDataComparison string", () => {
  const comparison: Comparison = {
    comparisonData: {
      comparisonType: "sharedDataToSharedData",
      sharedDataKey1: "testSharedData1",
      sharedDataKey2: "testSharedData2",
      comparison: "equals",
    }
  }
  beforeEach(() => {
    store = getCleanStore();
    dispatchUserUpdateSharedData(store, {
      pageID: "testPage",
      sharedDataID: "testSharedData1",
      value: "foo"
    });
  });

  it("equals comparison pass (mismatch case)", () => {
    dispatchUserUpdateSharedData(store, {
      pageID: "testPage",
      sharedDataID: "testSharedData2",
      value: "Foo"
    });
    const compVal = evaluateComparison(
      comparison,
      "testPage"
    );
    expect(compVal).toBe(true);
  });

  it("equals comparison pass (match case)", () => {
    dispatchUserUpdateSharedData(store, {
      pageID: "testPage",
      sharedDataID: "testSharedData2",
      value: "foo"
    });
    const compVal = evaluateComparison(
      comparison,
      "testPage"
    );
    expect(compVal).toBe(true);
  });

  it("equals comparison fail (lowercase)", () => {
    dispatchUserUpdateSharedData(store, {
      pageID: "testPage",
      sharedDataID: "testSharedData2",
      value: "bar"
    });
    const compVal = evaluateComparison(
      comparison,
      "testPage"
    );
    expect(compVal).toBe(false);
  });

  it("equals comparison fail (uppercase)", () => {
    dispatchUserUpdateSharedData(store, {
      pageID: "testPage",
      sharedDataID: "testSharedData2",
      value: "BAR"
    });
    const compVal = evaluateComparison(
      comparison,
      "testPage"
    );
    expect(compVal).toBe(false);
  });

  it("notEquals comparison pass (match case)", () => {
    //compare two equal values (both lowercase) and should return false (because they are actually equal).
    dispatchUserUpdateSharedData(store, {
      pageID: "testPage",
      sharedDataID: "testSharedData2",
      value: "foo"
    });
    const copyComparison = Object.assign({}, comparison);
    (copyComparison.comparisonData as SharedDataToSharedDataComparison).comparison = "notEquals";
    const compVal = evaluateComparison(
      copyComparison,
      "testPage"
    );
    expect(compVal).toBe(false);
  });

  it("notEquals comparison pass (mismatch case)", () => {
    //compare two equal values (one uppercase) and should return false (because they are actuall equal).
    dispatchUserUpdateSharedData(store, {
      pageID: "testPage",
      sharedDataID: "testSharedData2",
      value: "FOO"
    });
    const copyComparison = Object.assign({}, comparison);
    (copyComparison.comparisonData as SharedDataToSharedDataComparison).comparison = "notEquals";
    const compVal = evaluateComparison(
      copyComparison,
      "testPage"
    );
    expect(compVal).toBe(false);
  });

  it("notEquals comparison fail (uppercase)", () => {
    //compare two unequal value (one uppercase) and should return true (because they are not equal).
    dispatchUserUpdateSharedData(store, {
      pageID: "testPage",
      sharedDataID: "testSharedData2",
      value: "BAR"
    });
    const copyComparison = Object.assign({}, comparison);
    (copyComparison.comparisonData as SharedDataToSharedDataComparison).comparison = "notEquals";
    const compVal = evaluateComparison(
      copyComparison,
      "testPage"
    );
    expect(compVal).toBe(true);
  });

  it("notEquals comparison fail (match case)", () => {
    //compare two unequal value (one uppercase) and should return true (because they are not equal).
    dispatchUserUpdateSharedData(store, {
      pageID: "testPage",
      sharedDataID: "testSharedData2",
      value: "bar"
    });
    const copyComparison = Object.assign({}, comparison);
    (copyComparison.comparisonData as SharedDataToSharedDataComparison).comparison = "notEquals";
    const compVal = evaluateComparison(
      copyComparison,
      "testPage"
    );
    expect(compVal).toBe(true);
  });

  it("equals_cs comparison pass (match case)", () => {
    dispatchUserUpdateSharedData(store, {
      pageID: "testPage",
      sharedDataID: "testSharedData2",
      value: "foo"
    });
    const copyComparison = Object.assign({}, comparison);
    (copyComparison.comparisonData as SharedDataToSharedDataComparison).comparison = "equals_cs";
    const compVal = evaluateComparison(
      copyComparison,
      "testPage"
    );

    expect(compVal).toBe(true);
  });

  it("equals_cs comparison fail", () => {
    dispatchUserUpdateSharedData(store, {
      pageID: "testPage",
      sharedDataID: "testSharedData2",
      value: "bar"
    });
    const copyComparison = Object.assign({}, comparison);
    (copyComparison.comparisonData as SharedDataToSharedDataComparison).comparison = "equals_cs";
    const compVal = evaluateComparison(
      copyComparison,
      "testPage"
    );
    expect(compVal).toBe(false);
  });

  it("equals_cs comparison fail (mismatch case)", () => {
    dispatchUserUpdateSharedData(store, {
      pageID: "testPage",
      sharedDataID: "testSharedData2",
      value: "FOO"
    });
    const copyComparison = Object.assign({}, comparison);
    (copyComparison.comparisonData as SharedDataToSharedDataComparison).comparison = "equals_cs";
    const compVal = evaluateComparison(
      copyComparison,
      "testPage"
    );

    expect(compVal).toBe(false);
  });

  it("notEquals_cs comparison pass (match case)", () => {
    //compare two equal values and should return false (because they are actually equal).
    dispatchUserUpdateSharedData(store, {
      pageID: "testPage",
      sharedDataID: "testSharedData2",
      value: "foo"
    });
    const copyComparison = Object.assign({}, comparison);
    (copyComparison.comparisonData as SharedDataToSharedDataComparison).comparison = "notEquals_cs";
    const compVal = evaluateComparison(
      copyComparison,
      "testPage"
    );
    expect(compVal).toBe(false);
  });

  it("notEquals_cs comparison fail", () => {
    //compare two unequal values and should return true (because they are not equal).
    dispatchUserUpdateSharedData(store, {
      pageID: "testPage",
      sharedDataID: "testSharedData2",
      value: "bar"
    });
    const copyComparison = Object.assign({}, comparison);
    (copyComparison.comparisonData as SharedDataToSharedDataComparison).comparison = "notEquals_cs";
    const compVal = evaluateComparison(
      copyComparison,
      "testPage"
    );

    expect(compVal).toBe(true);
  });

  it("notEquals_cs comparison fail (mismatch case)", () => {
    //compare two unequal values (one uppercase) and should return true (because they are not equal).
    dispatchUserUpdateSharedData(store, {
      pageID: "testPage",
      sharedDataID: "testSharedData2",
      value: "FOO"
    });
    const copyComparison = Object.assign({}, comparison);
    (copyComparison.comparisonData as SharedDataToSharedDataComparison).comparison = "notEquals_cs";
    const compVal = evaluateComparison(
      copyComparison,
      "testPage"
    );

    expect(compVal).toBe(true);
  });
});

describe("evaluateComparison widgetValComparison boolean", () => {
  const comparison: Comparison = {
    comparisonData: {
      comparisonType: "sharedDataToSharedData",
      sharedDataKey1: "testSharedData1",
      sharedDataKey2: "testSharedData2",
      comparison: "equals",
    }
  }
  beforeEach(() => {
    store = getCleanStore();
    dispatchUserUpdateSharedData(store, {
      pageID: "testPage",
      sharedDataID: "testSharedData1",
      value: true
    });
  });

  it("equals comparison pass", () => {
    dispatchUserUpdateSharedData(store, {
      pageID: "testPage",
      sharedDataID: "testSharedData2",
      value: true
    });
    const compVal = evaluateComparison(
      comparison,
      "testPage"
    );

    expect(compVal).toBe(true);
  });

  it("equals comparison fail", () => {
    dispatchUserUpdateSharedData(store, {
      pageID: "testPage",
      sharedDataID: "testSharedData2",
      value: false
    });
    const compVal = evaluateComparison(
      comparison,
      "testPage"
    );
    expect(compVal).toBe(false);
  });

  it("notEquals comparison pass", () => {
    dispatchUserUpdateSharedData(store, {
      pageID: "testPage",
      sharedDataID: "testSharedData2",
      value: true
    });
    const copyComparison = Object.assign({}, comparison);
    (copyComparison.comparisonData as SharedDataToSharedDataComparison).comparison = "notEquals";
    const compVal = evaluateComparison(
      copyComparison,
      "testPage"
    );
    expect(compVal).toBe(false);
  });

  it("notEquals comparison fail", () => {
    dispatchUserUpdateSharedData(store, {
      pageID: "testPage",
      sharedDataID: "testSharedData2",
      value: false
    });
    const copyComparison = Object.assign({}, comparison);
    (copyComparison.comparisonData as SharedDataToSharedDataComparison).comparison = "notEquals";
    const compVal = evaluateComparison(
      copyComparison,
      "testPage"
    );
    expect(compVal).toBe(true);
  });

  it("equals_cs comparison pass", () => {
    dispatchUserUpdateSharedData(store, {
      pageID: "testPage",
      sharedDataID: "testSharedData2",
      value: true
    });
    const copyComparison = Object.assign({}, comparison);
    (copyComparison.comparisonData as SharedDataToSharedDataComparison).comparison = "equals_cs";
    const compVal = evaluateComparison(
      copyComparison,
      "testPage"
    );

    expect(compVal).toBe(true);
  });

  it("equals_cs comparison fail", () => {
    dispatchUserUpdateSharedData(store, {
      pageID: "testPage",
      sharedDataID: "testSharedData2",
      value: false
    });
    const copyComparison = Object.assign({}, comparison);
    (copyComparison.comparisonData as SharedDataToSharedDataComparison).comparison = "equals_cs";
    const compVal = evaluateComparison(
      copyComparison,
      "testPage"
    );

    expect(compVal).toBe(false);
  });

  it("notEquals_cs comparison pass", () => {
    dispatchUserUpdateSharedData(store, {
      pageID: "testPage",
      sharedDataID: "testSharedData2",
      value: true
    });
    const copyComparison = Object.assign({}, comparison);
    (copyComparison.comparisonData as SharedDataToSharedDataComparison).comparison = "notEquals_cs";
    const compVal = evaluateComparison(
      copyComparison,
      "testPage"
    );

    expect(compVal).toBe(false);
  });

  it("notEquals_cs comparison fail", () => {
    dispatchUserUpdateSharedData(store, {
      pageID: "testPage",
      sharedDataID: "testSharedData2",
      value: false
    });
    const copyComparison = Object.assign({}, comparison);
    (copyComparison.comparisonData as SharedDataToSharedDataComparison).comparison = "notEquals_cs";
    const compVal = evaluateComparison(
      copyComparison,
      "testPage"
    );

    expect(compVal).toBe(true);
  });
});
