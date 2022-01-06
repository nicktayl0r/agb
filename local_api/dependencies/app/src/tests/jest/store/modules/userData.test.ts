import { getCleanStore } from "@/tests/jest/jestSetup";
import { Maybe } from "true-myth";
let store: any = getCleanStore();

import { readRubricState } from "@/store/modules/userData";
import { handle_mutateActivityResponse } from '@/store/modules/userData/actions/mutateActivityResponse';

const projectData = require("@/tests/jest/__data__/CellRespiration_H_Progress_string.json");
import {
  commitInitProjectConfig
} from "@/store/modules/appData";


const payload = {
  attemptId: 1000,
  rubricId: "rubricIDHere",
  response: "<div class='header'>Explain how cyanide caused Jared’s symptoms (e.g., muscle weakness). </div><div class='response'>back fox</div><div class='header'>Explain how the data from your experiments showed that cyanide was used to poison Jared, and that 2-deoxyglucose, arsenic and oligomycin were not used.</div><div class='response'>data fox</div><div class='header'>For each molecule of glucose, glycolysis only makes 2 ATP, the Krebs cycle only makes 2 ATP and the ETC makes 34 ATP. If the suspects had given Jared the 2-deoxyglucose poison, would the decrease in ATP concentration be smaller, the same or larger as when they used cyanide?  Explain your answer.</div><div class='response'>poison fox\n</div><div class='header'>Describe how the antidote helped Jared's cells make ATP (include the ETC and H+ gradient in your answer).</div><div class='response'>conc fox</div>",
  responseData: "[{\"header\":\"Explain how cyanide caused Jared’s symptoms (e.g., muscle weakness). \",\"response\":\"back fox\"},{\"header\":\"Explain how the data from your experiments showed that cyanide was used to poison Jared, and that 2-deoxyglucose, arsenic and oligomycin were not used.\",\"response\":\"data fox\"},{\"header\":\"For each molecule of glucose, glycolysis only makes 2 ATP, the Krebs cycle only makes 2 ATP and the ETC makes 34 ATP. If the suspects had given Jared the 2-deoxyglucose poison, would the decrease in ATP concentration be smaller, the same or larger as when they used cyanide?  Explain your answer.\",\"response\":\"poison fox\\n\"},{\"header\":\"Describe how the antidote helped Jared's cells make ATP (include the ETC and H+ gradient in your answer).\",\"response\":\"conc fox\"}]"
};

describe("userData test", () => {
  beforeEach(() => {
    store = getCleanStore();
    commitInitProjectConfig(store, projectData); //to get page and track entries
  });

  it.each`
        serverResponse   | ExpectedRubricStatus | InLocalStore | description
		${{
      data: {
        createOrUpdateUserActivityResponse: {
          userActivityAttemptId: 1000, key: "rubricIDHere", response: "<div class='header'>Explain how cyanide caused Jared’s symptoms (e.g., muscle weakness). </div><div class='response'>back fox</div><div class='header'>Explain how the data from your experiments showed that cyanide was used to poison Jared, and that 2-deoxyglucose, arsenic and oligomycin were not used.</div><div class='response'>data fox</div><div class='header'>For each molecule of glucose, glycolysis only makes 2 ATP, the Krebs cycle only makes 2 ATP and the ETC makes 34 ATP. If the suspects had given Jared the 2-deoxyglucose poison, would the decrease in ATP concentration be smaller, the same or larger as when they used cyanide?  Explain your answer.</div><div class='response'>poison fox\n</div><div class='header'>Describe how the antidote helped Jared's cells make ATP (include the ETC and H+ gradient in your answer).</div><div class='response'>conc fox</div>", responseData: "[{\"header\":\"Explain how cyanide caused Jared’s symptoms (e.g., muscle weakness). \",\"response\":\"back fox\"},{\"header\":\"Explain how the data from your experiments showed that cyanide was used to poison Jared, and that 2-deoxyglucose, arsenic and oligomycin were not used.\",\"response\":\"data fox\"},{\"header\":\"For each molecule of glucose, glycolysis only makes 2 ATP, the Krebs cycle only makes 2 ATP and the ETC makes 34 ATP. If the suspects had given Jared the 2-deoxyglucose poison, would the decrease in ATP concentration be smaller, the same or larger as when they used cyanide?  Explain your answer.\",\"response\":\"poison fox\\n\"},{\"header\":\"Describe how the antidote helped Jared's cells make ATP (include the ETC and H+ gradient in your answer).\",\"response\":\"conc fox\"}]"
        }
      }
    }} }}    | ${"received"} | ${false} | ${"success"}
        ${{ payload: { errors: [{ message: "Error!" }] } }} | ${"resubmit"} | ${true} | ${"payload error: general"}                                                                                        
        ${{ payload: { errors: [{ message: "ResourceActivityRubric not found for Key: rubricIDHere and ResourceActivityID: 15!" }] } }} | ${"rejected"} | ${false} | ${"payload error: ResourceActivityRubric not found for Key"}
        ${{ error: [{}] }} | ${"resubmit"} | ${true} | ${"error: general"}
        
	`("handle_mutateActivityResponse", ({
      serverResponse, ExpectedRubricStatus, InLocalStore, description
    }) => {

      handle_mutateActivityResponse({ state: store.state.userDataStore } as any, payload, serverResponse);
      const maybeReturnedRubricStatus = readRubricState(store)("rubricIDHere");
      const returnedRubricStatus = Maybe.unsafelyUnwrap(maybeReturnedRubricStatus);
      expect(returnedRubricStatus.status).toBe(ExpectedRubricStatus);
    });
});
