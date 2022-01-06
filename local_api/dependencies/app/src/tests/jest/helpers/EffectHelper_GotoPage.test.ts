import { Maybe } from "true-myth";
import { getCleanStore } from "@/tests/jest/jestSetup";
let store = getCleanStore();

import { runEffect } from "@/helpers/effectHelpers";
import { getCurrentPageID, isPageUnlocked } from "@/helpers/userHelpers";
import { Effect } from "@/data models/effectModels";
import {
  commitCurrentModule,
  commitSetCurrentTrackGroup,
  commitLockPage
} from "@/store/modules/userData";

const projectData = require("@/tests/jest/__data__/project.json");
import {
  commitInitProjectConfig
} from "@/store/modules/appData";

describe("applyEffect gotoPage", () => {
  beforeEach(() => {
    store = getCleanStore();
    commitInitProjectConfig(store, projectData); //to get page and track entries
  });

  it("case goToPage runEffect - unlockPage", () => {
    const effectGotoPageCase: Effect = {
      effectData: {
        effectType: "goToPage",
        pageID: "lockPage"
      },
      delay: 0,
      fireOnceID: ""
    };
    commitSetCurrentTrackGroup(store, "evolution_case_ap-v.1.0.0");
    commitCurrentModule(store, "case");
    commitLockPage(store, {
      moduleName: "case",
      pageID: "lockPage"
    });
    let unlocked = isPageUnlocked("lockPage");
    expect(unlocked).toBe(false);

    runEffect(effectGotoPageCase, "testPage", "lockPageButton");
    unlocked = isPageUnlocked("lockPage");
    expect(unlocked).toBe(true);

    // const maybeCurrentPage = getCurrentPageID();
    // expect(maybeCurrentPage.isJust()).toBe(true);
    // if (maybeCurrentPage.isJust()) {
    // 	expect(maybeCurrentPage.unsafelyUnwrap()).toBe("lockPage");
    // }
  });

  it("guide goToPage runEffect - unlockPage", () => {
    const effectGoToPageGuide: Effect = {
      effectData: {
        effectType: "goToPage",
        pageID: "lockPageGuide"
      },
      delay: 0,
      fireOnceID: ""
    };
    commitSetCurrentTrackGroup(store, "evolution_case_ap-v.1.0.0");
    commitCurrentModule(store, "guide");
    commitLockPage(store, {
      moduleName: "guide",
      pageID: "lockPageGuide"
    });

    let unlocked = isPageUnlocked("lockPageGuide");
    expect(unlocked).toBe(false);
    runEffect(effectGoToPageGuide, "simIntro", "lockPageButton");
    unlocked = isPageUnlocked("lockPageGuide");
    expect(unlocked).toBe(true);

    // const maybeCurrentPage = getCurrentPageID();
    // expect(maybeCurrentPage.isJust()).toBe(true);
    // if (maybeCurrentPage.isJust()) {
    // 	expect(maybeCurrentPage.unsafelyUnwrap()).toBe("lockPageGuide");
    // }
  });
});
