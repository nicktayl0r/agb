require("@/tests/jest/__polyfill__/TextEncoder");
import { getCleanStore } from "@/tests/jest/jestSetup";
import { compressJSON, decompressJSON, sendLocalResponses } from "@/helpers/serverHelpers";
import { SaveResponseLocal } from "@/store/ApolloClient"
import * as faker from "faker";
import { setStore } from "@/helpers/storeHelpers";
const progressJSON = require("@/tests/jest/__data__/Evolution_H_Progress_string.json");

let userData = require("@/store/modules/userData");

let store = getCleanStore();

describe("JSON compression", () => {
  const compressed = compressJSON(progressJSON);

  it("compressed JSON matches snapshot", () => {
    expect(compressed).toMatchSnapshot();
  });

  it("decompressed JSON matches snapshot", () => {
    const decompressed = decompressJSON(compressed);
    expect(decompressed).toMatchSnapshot();
  });


});


describe("LocalResponses", () => {
  let responses = Array(10).fill([]);
  beforeAll(() => {
    for (let i = 0; i < responses.length; i++) {
      responses[i] = [];
      window.localStorage.removeItem(`${i} responses`);
      for (let j = 0; j < 5; j++) {
        responses[i].push({
          attemptId: i,
          rubricId: `rubricId${j}`,
          response: faker.lorem.sentence(12),
          responseData: { jestID: `rubricId${j}`, responseData: faker.lorem.sentence(12) }.toString()
        });
        SaveResponseLocal(responses[i][j].attemptId, responses[i][j].rubricId, responses[i][j].response, responses[i][j].responseData);

      }
      //console.log(window.localStorage.getItem(`${i} responses`));
    }
    store = getCleanStore();
    setStore(store);
  });


  it.each`
  attemptIDs 
  ${[2]}
  ${[0, 1, 3, 4, 5, 6, 7, 8, 9]}
  `
    ("sendLocalResponses", async ({ attemptIDs }) => {
      for (let i = 0; i < attemptIDs.length; i++) {
        const attemptID = attemptIDs[i];
        userData.dispatchMutateActivityResponse = jest.fn();
        await sendLocalResponses(attemptID).catch((err) => console.error(err));

        expect(userData.dispatchMutateActivityResponse).toBeCalledTimes(responses[attemptID].length);
        for (let j = 0; j < responses[attemptID].length; j++) {
          expect(userData.dispatchMutateActivityResponse.mock.calls[j][1]).toStrictEqual(responses[attemptID][j]);
        }
      }
    });
});