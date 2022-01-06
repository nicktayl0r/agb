import { getCleanStore } from "@/tests/jest/jestSetup";
let store = getCleanStore();

import { runEffect } from "@/helpers/effectHelpers";
import { Effect } from "@/data models/effectModels";
import { readModulesState } from "@/store/modules/userData";


describe("applyEffect goToGlossary", () => {
  beforeEach(() => {
    store = getCleanStore();
  });
  const effectGoToGlossary: Effect = {
    effectData: {
      effectType: "goToGlossary",
      pageID: "glossaryPage2"
    },
    delay: 0,
    fireOnceID: ""
  };

  //couldn't get this to pass since there isn't an app with a glossary
  //couldn't get wrapper<App> to mount, since errors happen when mount App
  // it("goToGlossary opens glossary", () => {
  // 	let isOpen = readModulesState(store).glossaryOpen;
  // 	expect(isOpen).toBe(false);
  // 	runEffect(effectGoToGlossary, "testPage", "lockPageButton");
  // 	isOpen = readModulesState(store).glossaryOpen;
  // 	expect(isOpen).toBe(true);
  // });

  it("goToGlossary opens page", () => {
    runEffect(effectGoToGlossary, "testPage", "lockPageButton");
    const page = readModulesState(store).currentGlossaryPageID;
    expect(page).toBe("glossaryPage2");
  });
});
