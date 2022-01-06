import { getCleanStore } from "@/tests/jest/jestSetup";
import { setStore } from "@/helpers/storeHelpers";
import { getProjectData } from "@/helpers/envHelpers";
let userData = require("@/store/modules/userData");
let serverHelper = require("@/helpers/serverHelpers");


require("@/helpers/__mocks__/requestHelpers");
import mockAxios from "jest-mock-axios";




import { commitAttemptId } from "@/store/modules/authData";

let store: any = getCleanStore();

const project = require("@/tests/jest/__data__/project.json");



describe("Message-startAttemptMessage", () => {
  beforeEach(() => {
    store = getCleanStore();
    setStore(store);
    userData = require("@/store/modules/userData");
    serverHelper = require("@/helpers/serverHelpers");
  });

  afterEach(() => {
    setStore(undefined);
    userData = require("@/store/modules/userData");
    serverHelper = require("@/helpers/serverHelpers");
    mockAxios.reset();
  });




  it.each`
	STATUS | STATUS_TEXT 	|  PASS 	| SCENE_NAME	  | SIM_ID		| SIM_STATE_ID | RESPONSE_DATA 
	${404} | ${"Not Found"} | ${false} 	| ${"background"} | ${"553729"} | ${"invalid"} |  ${"invalid"} 
	${200} | ${"OK"}        | ${true} 	| ${"background"} | ${"553729"} |  ${"jwtsfo"} | ${project}`
    ("getProjectData",
      async ({
        STATUS, STATUS_TEXT, PASS, SCENE_NAME, SIM_ID, SIM_STATE_ID, RESPONSE_DATA
      }) => {

        expect(true).toBe(true);
        const recievedProjectPromise = getProjectData();


        const response = {
          data: RESPONSE_DATA, status: STATUS, statusText: STATUS_TEXT, config: {}, headers: {}
        };
        if (!PASS) {
          //Use mockError to simulate non-2xx responses
          mockAxios.mockError(response);
        }
        else {
          mockAxios.mockResponse(response);
        }

        recievedProjectPromise.then(recievedProject => {
          if (PASS) {
            expect(recievedProject).toEqual(project);
          }
          expect(mockAxios.get).toHaveBeenCalledWith(`./data/project.json`);
        }).catch(err => {
          //fail(err);
          throw err;
        })
      }
    );
});