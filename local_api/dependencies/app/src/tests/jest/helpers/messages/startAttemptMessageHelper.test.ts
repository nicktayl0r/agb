import { getCleanStore } from "@/tests/jest/jestSetup";
import { setStore } from "@/helpers/storeHelpers";
const envHelpers = require('@/helpers/envHelpers');
import { setProjectConfigData, getAttempt } from "@/helpers/messages/startAttemptMessageHelper";
let userData = require("@/store/modules/userData");
let serverHelper = require("@/helpers/serverHelpers");

const startAttemptMessageHelper = require('@/helpers/messages/startAttemptMessageHelper');

require("@/helpers/__mocks__/debugHelpers");

import {
  readPlayerGitVersion,
  readProjectGitVersion,
} from "@/store/modules/appData";
import { RootStore } from '@/store';

require("@/helpers/__mocks__/requestHelpers");
import mockAxios from "jest-mock-axios";




import { commitAttemptId } from "@/store/modules/authData";

let store: any = getCleanStore();

const project = require("@/tests/jest/__data__/project.json");

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}


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
  playerVersion | projectVersion | attemptID
  
  ${"asdlkj9asvd"} | ${"asdflkawef"} | ${1001}
  ${uuidv4()} | ${uuidv4()} | ${1002}
  ${uuidv4()} | ${uuidv4()} | ${1003}

    `("setProjectConfigData",
    async ({ playerVersion, projectVersion, attemptID }) => {

      expect(true).toBe(true);
      commitAttemptId(store, attemptID);

      setProjectConfigData(project, { playerVersion, projectGitVersion: projectVersion });

      expect(readProjectGitVersion(store)).toBe(projectVersion);
      expect(readPlayerGitVersion(store)).toBe(playerVersion);
    }
  );




  it.each`
    attemptID | mockResponse | retries | willReject
    ${1001} | ${{ progress: "1001 progress", state: "1001 state", resourceActivityId: 30 }} | ${0} | ${false}
    ${1002} | ${{ progress: "1002 progress", state: "1002 state", resourceActivityId: 30 }}  | ${1} | ${false}
    ${1003} | ${{ progress: "1003 progress", state: "1002 state", resourceActivityId: 30 }}  | ${2} | ${false}
    ${1004} | ${{ progress: "1004 progress", state: "1004 state", resourceActivityId: 30 }}  | ${3} | ${false}
    ${1005} | ${{ progress: "1005 progress", state: "1005 state", resourceActivityId: 30 }}  | ${4} | ${true}
  
      `("getAttempt - resolve/reject on success vs failure",
    async ({ attemptID, mockResponse, retries, willReject }) => {
      let count = 0;
      userData.dispatchGetInitialUserData = (store: RootStore) => {
        count++;
        if (count > retries)
          return mockResponse;
        else
          return null;
      }
      //mock: dispatchGetInitialUserData to return null of an attempt
      expect(true).toBe(true);

      await getAttempt().catch(err => {
        expect(willReject).toBe(true);
      });
    }
  );



  it.each`
    attemptID | mockResponse | message | env | reject
    ${1001} | ${{ progress: "1001 progress", state: "1001 state", resourceActivityId: 30 }} |${{ data: { contents: { attemptID: 1001, sessionID: "sessionId1001" } }, origin: "https://www.explorelearning.com" }} | ${envHelpers.EnvironmentOptions.production} | ${false}
    ${1002} | ${{ progress: "1002 progress", state: "1002 state", resourceActivityId: 30 }} |${{ data: { contents: { attemptID: 1002, sessionID: "sessionId1002" } }, origin: "https://www.explorelearning.com" }}  | ${envHelpers.EnvironmentOptions.production} | ${false}
    ${1003} | ${{ progress: "1003 progress", state: "1003 state", resourceActivityId: 30 }} |${{ data: { contents: { attemptID: 1003, sessionID: "sessionId1003" } }, origin: "https://www.explorelearning.com" }}  | ${envHelpers.EnvironmentOptions.production} | ${false}
    ${1004} | ${{ progress: "1004 progress", state: "1004 state", resourceActivityId: 30 }} |${{ data: { contents: { attemptID: 1004, sessionID: "sessionId1004" } }, origin: "https://www.explorelearning.com" }}  | ${envHelpers.EnvironmentOptions.production} | ${false}      
    ${1005} | ${{ progress: "1005 progress", state: "1005 state", resourceActivityId: 30 }} | ${{ data: { contents: { attemptID: 1005, sessionID: "sessionId1005" } }, origin: "https://www.explorelearning.com" }}  | ${envHelpers.EnvironmentOptions.production} | ${true}
  
    `("startAttempt- windowReload",
    async ({ attemptID, mockResponse, message, env, reject }) => {

      serverHelper.isServerHealthy = () => true;

      envHelpers.getPlayerVersion = () => "playerVersion";
      envHelpers.getProjectVersion = () => "projectVersion";
      envHelpers.getProjectData = () => project;

      window.location.reload = jest.fn();

      userData.dispatchGetInitialUserData = (store: RootStore) => {
        return reject ? null : mockResponse;
      };


      expect(true).toBe(true);
      startAttemptMessageHelper.startAttempt(message).catch((err: any) => console.log(err)).then(() => {
        expect(envHelpers.getEnv()).toBe(env);

        if (reject)
          expect(window.location.reload).toBeCalled();
      });
    }
  );
});