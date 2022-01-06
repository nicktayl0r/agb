import { getCleanStore } from "@/tests/jest/jestSetup";

import { runEffect } from "@/helpers/effectHelpers";
import { getCurrentPageID, isPageUnlocked } from "@/helpers/userHelpers";
import { Effect } from "@/data models/effectModels";
import {
  commitCurrentModule,
  commitSetCurrentTrackGroup,
  commitLockPage,
  commitSetModuleCurrentPage
} from "@/store/modules/userData";

import {
  commitInitProjectConfig
} from "@/store/modules/appData";

let store = getCleanStore();
const projectData = require("@/tests/jest/__data__/project.json");

describe("applyEffect previousPage", () => {
  beforeEach(() => {
    store = getCleanStore();
    commitInitProjectConfig(store, projectData); //to get page and track entries
  });

  it("case previousPage runEffect - unlockPage", () => {
    const effectGotoPageCase: Effect = {
      effectData: {
        effectType: "previousPage"
      },
      delay: 0,
      fireOnceID: ""
    };
    commitSetCurrentTrackGroup(store, "evolution_case_ap-v.1.0.0");
    commitCurrentModule(store, "case");
    commitSetModuleCurrentPage(store, { moduleName: "case", pageID: "animationslider" });
    commitLockPage(store, {
      moduleName: "case",
      pageID: "anchor"
    });
    let unlocked = isPageUnlocked("anchor");
    expect(unlocked).toBe(false);

    runEffect(effectGotoPageCase, "animationslider", "lockPageButton");
    unlocked = isPageUnlocked("anchor");
    expect(unlocked).toBe(true);
  });

  it("guide previousPage runEffect - unlockPage", () => {
    const effectGoToPageGuide: Effect = {
      effectData: {
        effectType: "previousPage"
      },
      delay: 0,
      fireOnceID: ""
    };
    commitSetCurrentTrackGroup(store, "evolution_case_ap-v.1.0.0");
    commitCurrentModule(store, "guide");
    commitSetModuleCurrentPage(store, { moduleName: "guide", pageID: "setGuideCompleted" });
    commitLockPage(store, {
      moduleName: "guide",
      pageID: "lockPageGuide"
    });

    let unlocked = isPageUnlocked("lockPageGuide");
    expect(unlocked).toBe(false);
    runEffect(effectGoToPageGuide, "setGuideCompleted", "lockPageButton");
    unlocked = isPageUnlocked("lockPageGuide");
    expect(unlocked).toBe(true);

    // const maybeCurrentPage = getCurrentPageID();
    // expect(maybeCurrentPage.isJust()).toBe(true);
    // if (maybeCurrentPage.isJust()) {
    // 	expect(maybeCurrentPage.unsafelyUnwrap()).toBe("lockPageGuide");
    // }
  });
});
