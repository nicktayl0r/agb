import { Maybe } from "true-myth";
import { getCleanStore } from "@/tests/jest/jestSetup";
let store = getCleanStore();

import { runEffect } from "@/helpers/effectHelpers";
import { getCurrentPageID, isPageUnlocked } from "@/helpers/userHelpers";
import { Effect } from "@/data models/effectModels";
import {
  commitCurrentModule,
  commitSetCurrentTrackGroup,
  commitLockPage,
  commitSetModuleCurrentPage
} from "@/store/modules/userData";

const projectData = require("@/tests/jest/__data__/project.json");
import {
  commitInitProjectConfig
} from "@/store/modules/appData";

describe("applyEffect nextPage", () => {
  beforeEach(() => {
    store = getCleanStore();
    commitInitProjectConfig(store, projectData); //to get page and track entries
  });

  it("case nextPage runEffect - unlockPage", () => {
    const effectGotoPageCase: Effect = {
      effectData: {
        effectType: "nextPage"
      },
      delay: 0,
      fireOnceID: ""
    };
    commitSetCurrentTrackGroup(store, "evolution_case_ap-v.1.0.0");
    commitCurrentModule(store, "case");
    commitSetModuleCurrentPage(store, { moduleName: "case", pageID: "animationslider" });
    commitLockPage(store, {
      moduleName: "case",
      pageID: "lockPage"
    });
    let unlocked = isPageUnlocked("lockPage");
    expect(unlocked).toBe(false);

    runEffect(effectGotoPageCase, "animationslider", "lockPageButton");
    unlocked = isPageUnlocked("lockPage");
    expect(unlocked).toBe(true);
  });

  it("guide nextPage runEffect - unlockPage", () => {
    const effectGoToPageGuide: Effect = {
      effectData: {
        effectType: "nextPage"
      },
      delay: 0,
      fireOnceID: ""
    };
    commitSetCurrentTrackGroup(store, "evolution_case_ap-v.1.0.0");
    commitCurrentModule(store, "guide");
    commitSetModuleCurrentPage(store, { moduleName: "guide", pageID: "lockPageGuide" });
    commitLockPage(store, {
      moduleName: "guide",
      pageID: "setGuideCompleted"
    });

    let unlocked = isPageUnlocked("setGuideCompleted");
    expect(unlocked).toBe(false);
    runEffect(effectGoToPageGuide, "lockPageGuide", "lockPageButton");
    unlocked = isPageUnlocked("setGuideCompleted");
    expect(unlocked).toBe(true);

    // const maybeCurrentPage = getCurrentPageID();
    // expect(maybeCurrentPage.isJust()).toBe(true);
    // if (maybeCurrentPage.isJust()) {
    // 	expect(maybeCurrentPage.unsafelyUnwrap()).toBe("lockPageGuide");
    // }
  });
});
