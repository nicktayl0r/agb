


import { getCleanStore } from "@/tests/jest/jestSetup";
import {
  decompressJSON, compressJSON
} from "@/helpers/serverHelpers";
let store: any = getCleanStore();
import * as envHelpers from "@/helpers/envHelpers";

require("@/tests/jest/__mock__/Console");
import { logErrorSecurely } from "@/helpers/debugHelpers";
import { setResponses } from "@/store/__mock__/ApolloClient";

import * as getInitialUserData from "@/store/modules/userData/actions/getInitialUserData";
const log = require("@/helpers/debugHelpers");

import mockAxios from "jest-mock-axios";
const projectData = require("@/tests/jest/__data__/CellRespiration_H_Progress_string.json");
import {
  commitInitProjectConfig
} from "@/store/modules/appData";
import { dispatchMutateProgress } from "@/store/modules/userData";
import { RootStore } from "@/store";
import { setStore } from "@/helpers/storeHelpers";


const graphQLData = require("@/tests/jest/__data__/graphQL.json");
const localStorageData = require("@/tests/jest/__data__/localStorage.json");
const decompressedData = require("@/tests/jest/__data__/CellRespiration_H_Progress_string.json");

describe("userData.actions getInitialUserData", () => {
  beforeEach(() => {
    store = getCleanStore();
    setStore(store);
    commitInitProjectConfig(store, projectData); //to get page and track entries
    log.logErrorSecurely = jest.fn();
    for (const key in localStorageData) {
      global.window.localStorage.setItem(key, JSON.stringify(localStorageData[key]));
    }
    envHelpers.setEnv(envHelpers.EnvironmentOptions.debug);
  });

  afterEach(() => {
    global.window.localStorage.clear();
    mockAxios.reset();
  });


  it.each`
    attemptId | sessionId           | localtime | remotetime
    ${0} | ${"valid_for_Attempt1"}  | ${true}   | ${graphQLData.getUserActivityAttempt.new_attempt0}
    ${1000} | ${"valid_for_Attempt1"} | ${false} | ${graphQLData.getUserActivityAttempt.unauthorized}
    ${1000} | ${"valid_for_Attempt1000"} | ${true} | ${graphQLData.getUserActivityAttempt.new_attempt1000}
    `  ("getRemoteUserActivityAttempt - Authorized",
    async ({ attemptId, sessionId, authorized, response }) => {
      setResponses(response);

      expect(true).toBe(true);

      const serverResponse = await getInitialUserData.getRemoteUserActivityAttempt({ attemptId, sessionId });
      if (authorized) {
        expect(serverResponse?.userActivityAttemptId).toBe(attemptId);
      }
      else {
        expect(serverResponse?.userActivityAttemptId).toBeUndefined();
        expect(serverResponse?.resourceActivityId).toBeUndefined();
        expect(serverResponse?.progress).toBeUndefined();
        expect(serverResponse?.stateHistory).toBeUndefined();
        expect((logErrorSecurely as any).mock.calls.find((e: any) => e[0] === "queryProgress userActivityAttemptId do not match")).toBeDefined();
      }
    });

  it.each`
    attemptId | sessionId           | exists | response
    ${0} | ${"sessionID"}  | ${true}   | ${{ userActivityAttemptId: 0, resourceActivityId: 0, progress: JSON.parse(decompressJSON(localStorageData["0 data"].progress)), stateHistory: JSON.parse(decompressJSON(localStorageData["0 data"].state)) }}
    ${1000} | ${"sessionID"} | ${true} |  ${{ userActivityAttemptId: 1000, resourceActivityId: 0, progress: JSON.parse(decompressJSON(localStorageData["1000 data"].progress)), stateHistory: JSON.parse(decompressJSON(localStorageData["1000 data"].state)) }}
    ${10001} | ${"sessionID"} | ${false} | ${undefined}
    ${500} | ${"sessionID"} | ${true} | ${{ userActivityAttemptId: 500, resourceActivityId: 0, progress: null, stateHistory: JSON.parse(decompressJSON(localStorageData["500 data"].state)) }}
    ${501} | ${"sessionID"} | ${true} | ${{ userActivityAttemptId: 501, resourceActivityId: 0, progress: JSON.parse(decompressJSON(localStorageData["501 data"].progress)), stateHistory: null }}
    ${502} | ${"sessionID"} | ${true} | ${{ userActivityAttemptId: 502, resourceActivityId: 0, progress: null, stateHistory: null }}
  `  ("getLocalUseractivityAttempt - get",
    async ({ attemptId, sessionId, exists, response }) => {
      expect(true).toBe(true);

      envHelpers.setEnv(envHelpers.EnvironmentOptions.debug);
      const localAttempt = await getInitialUserData.getLocalUseractivityAttempt({ attemptId, sessionId });
      if (exists) {
        expect(localAttempt?.userActivityAttemptId).toBe(attemptId);
        expect(localAttempt?.resourceActivityId).toBe(response.resourceActivityId);
        expect(localAttempt?.progress).toStrictEqual(response.progress)
        expect(localAttempt?.stateHistory).toStrictEqual(response.stateHistory);
      }
      else {
        expect(localAttempt?.userActivityAttemptId).toBeUndefined();
        expect(localAttempt?.resourceActivityId).toBeUndefined();
        expect(localAttempt?.progress).toBeUndefined();
        expect(localAttempt?.stateHistory).toBeUndefined();
      }

      if (response?.progress === null)
        expect((logErrorSecurely as any).mock.calls.find((e: any) => e[0] === "localProgress")).toBeDefined();
    });

  it.each`
  resourceActivityId | getError | keyErrors | response | key
    ${34} | ${false}   | ${false}   | ${graphQLData.getResourceActivity.activity34} | ${"homeostasis_guide_highschool-v.1.0.0"}
    ${100} | ${true} | ${false} |${graphQLData.getResourceActivity.undefined} | ${undefined}
    ${35} | ${false} | ${true} | ${graphQLData.getResourceActivity.malformed} | ${undefined}
    `  ("getResourceActivityKey",
    async ({ resourceActivityId, getError, keyErrors, response, key }) => {

      setResponses([response]);

      expect(true).toBe(true);
      envHelpers.setEnv(envHelpers.EnvironmentOptions.debug);
      const serverResponse = await getInitialUserData.getResourceActivityKey(resourceActivityId);
      if (!getError && !keyErrors) {
        expect(serverResponse).toBe(key);
      }
      else
        expect(serverResponse).toBeUndefined();
      if (getError) {
        expect((logErrorSecurely as any).mock.calls.find((e: any) => e[0] === "getResourceActivity Error")).toBeDefined();
      }
      if (keyErrors) {
        expect((logErrorSecurely as any).mock.calls.find((e: any) => e[0] === "queryProgress did not return ResourceActivityKey")).toBeDefined();
      }
    });

  it.each`
  attemptId | pickLocal  | key
      ${2000} | ${false}   | ${"homeostasis_guide_highschool-v.1.0.0"}
      ${2000} | ${true} |${undefined}
      ${2000} | ${false} |  ${undefined}
      `  ("action_getInitialUserData",
    async ({ attemptId, pickLocal, key }) => {

      expect(true).toBe(true);

      const local = JSON.parse(JSON.stringify(decompressedData)); local.origin = "local";
      const remote = JSON.parse(JSON.stringify(decompressedData)); remote.origin = "remote";

      const remoteAttempt = JSON.parse(JSON.stringify(graphQLData.getUserActivityAttempt[`attempt${attemptId}`]));
      remoteAttempt.data.getUserActivityAttempt.progress = compressJSON(JSON.stringify(remote));

      if (pickLocal) local.timestamp += 10;

      const localAttempt = {
        "progress": compressJSON(JSON.stringify(local)),
        "state": ""
      }

      setResponses([remoteAttempt, graphQLData.updateUserActivityAttempt[`attempt${attemptId}`]]);
      global.window.localStorage.setItem(`${attemptId} data`, JSON.stringify(localAttempt));


      const serverResponse = await getInitialUserData.action_getInitialUserData({ state: store.state.userDataStore } as any, { attemptId, sessionId: "temp" });
      const progressJSON = serverResponse ? JSON.parse(serverResponse.progress) : {};
      // console.log("serverResponse", serverResponse);
      if (pickLocal) {
        expect((progressJSON as any).origin).toBe("local");
      }
      else
        expect((progressJSON as any).origin).toBe("remote");
      expect((logErrorSecurely as any).mock.calls).toEqual([]);
    });

});