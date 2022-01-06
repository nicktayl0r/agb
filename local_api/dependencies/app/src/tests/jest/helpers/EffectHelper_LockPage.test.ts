import { Maybe } from "true-myth";
import { getCleanStore } from "@/tests/jest/jestSetup";
let store = getCleanStore();

import { runEffect } from "@/helpers/effectHelpers";
import { isPageUnlocked } from "@/helpers/userHelpers";
import { Effect } from "@/data models/effectModels";
import {
  commitUnlockPage,
  commitCurrentModule,
  commitSetCurrentTrackGroup
} from "@/store/modules/userData";

const projectData = require("@/tests/jest/__data__/project.json");
import {
  commitInitProjectConfig,
  commitInitWidgetProps
} from "@/store/modules/appData";

describe("applyEffect lockPage", () => {
  beforeEach(() => {
    store = getCleanStore();
    commitInitProjectConfig(store, projectData); //to get page and track entries
  });

  it("case lockPage runEffect", () => {
    const effectLockPageCase: Effect = {
      effectData: {
        effectType: "lockPage",
        pageID: "lockPage"
      },
      delay: 0,
      fireOnceID: ""
    };
    commitUnlockPage(store, {
      moduleName: "case",
      pageID: "lockPage"
    });
    let unlocked = isPageUnlocked("lockPage");
    expect(unlocked).toBe(true);
    runEffect(effectLockPageCase, "testPage", "lockPageButton");
    unlocked = isPageUnlocked("lockPage");
    expect(unlocked).toBe(false);
  });

  it("guide lockPage runEffect", () => {
    const effectLockPageGuide: Effect = {
      effectData: {
        effectType: "lockPage",
        pageID: "lockPageGuide"
      },
      delay: 0,
      fireOnceID: ""
    };
    commitSetCurrentTrackGroup(store, "evolution_case_ap-v.1.0.0");
    commitCurrentModule(store, "guide");
    commitUnlockPage(store, {
      moduleName: "guide",
      pageID: "lockPageGuide"
    });
    let unlocked = isPageUnlocked("lockPageGuide");
    expect(unlocked).toBe(true);
    runEffect(effectLockPageGuide, "lockPageGuide", "lockPageButton");
    unlocked = isPageUnlocked("lockPageGuide");
    expect(unlocked).toBe(false);
  });
});
