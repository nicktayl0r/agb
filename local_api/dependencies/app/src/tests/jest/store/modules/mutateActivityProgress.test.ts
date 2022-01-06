import { action_mutateActivityProgress, handle_mutateActivityProgress } from '@/store/modules/userData/actions/mutateActivityProgress';
import { getCleanStore } from "@/tests/jest/jestSetup";
let store = getCleanStore();

let mockApolloClient = require("@/store/__mock__/ApolloClient");
let actualApolloClient = jest.requireActual("@/store/ApolloClient");
import { setStore } from '@/helpers/storeHelpers';
import { getTime } from "@/helpers/timeHelpers";
import { commitInitProjectConfig } from '@/store/modules/appData';
// import { UserDataState, defaultState, userDataContext } from "@/store/modules/userData/userDataState";


const responseHelpers = require("@/helpers/responseHelpers");
const serverHelpers = require("@/helpers/serverHelpers");
const debugHelpers = require("@/helpers/debugHelpers");
//mock ApolloMutateProgress

import Vue from "vue";
import { RootStore } from '@/store';
import { commitAttemptId } from '@/store/modules/authData';
import faker from 'faker';
import { compressJSON } from '@/helpers/serverHelpers';
import { EnvironmentOptions, setEnv } from '@/helpers/envHelpers';

import { commitUpdateTimestamp } from '@/store/modules/userData';

const projectData = require("@/tests/jest/__data__/CellRespiration_H_Progress_string.json");
const graphQLData = require("@/tests/jest/__data__/graphQL.json");

describe('userData - mutateActivityProgress', () => {
  let attemptID = 0;
  beforeEach(() => {
    setEnv(EnvironmentOptions.debug);
    attemptID = faker.random.number(10000);
    store = getCleanStore();
    setStore(store);
    commitAttemptId(store, { attemptId: attemptID });
    commitInitProjectConfig(store, projectData);
    //Vue.set(store.state, "timestamp", getTime());
    mockApolloClient = require("@/store/__mock__/ApolloClient");
  });

  it('action_mutateActivityProgress - handle mismatch attemptId', async () => {
    serverHelpers.sendLocalResponses = jest.fn();
    responseHelpers.sendStoreResponses = jest.fn();
    debugHelpers.logErrorSecurely = jest.fn();

    const response = JSON.parse(JSON.stringify(graphQLData.updateUserActivityAttempt.success));
    response.data.updateUserActivityAttempt.attemptId = attemptID + 1;
    response.data.updateUserActivityAttempt.progress = compressJSON(JSON.stringify(store.state));

    mockApolloClient.setResponses([graphQLData.updateUserActivityAttempt.success]);

    await action_mutateActivityProgress((store as any),
      {
        attemptId: attemptID,
        stateHistoryJSON: "state",
        quitting: false
      }
    );

    expect(serverHelpers.sendLocalResponses).toBeCalled();
    expect(responseHelpers.sendStoreResponses).toBeCalled();
    expect(debugHelpers.logErrorSecurely).toBeCalled();
    expect(debugHelpers.logErrorSecurely.mock.calls[0][0]).toBe("queryProgress userActivityAttemptId do not match");
  });

  it('action_mutateActivityProgress - handle exception', async () => {
    serverHelpers.sendLocalResponses = jest.fn();
    responseHelpers.sendStoreResponses = jest.fn();
    debugHelpers.logErrorSecurely = jest.fn();

    actualApolloClient.ApolloMutateProgress = jest.fn(function(...params) { throw new Error("Mock ApolloMutateProgress Exception"); });
    actualApolloClient.SaveUserDataLocal = jest.fn();
    await action_mutateActivityProgress((store as any),
      {
        attemptId: attemptID,
        stateHistoryJSON: "state",
        quitting: false
      }
    );

    expect(actualApolloClient.SaveUserDataLocal).toBeCalled();
    expect(actualApolloClient.SaveUserDataLocal).toBeCalledWith(attemptID, compressJSON("state"), compressJSON(JSON.stringify(store.state)));
  });

  it('action_mutateActivityProgress - handle exception then success', async () => {
    serverHelpers.sendLocalResponses = jest.fn();
    responseHelpers.sendStoreResponses = jest.fn();
    debugHelpers.logErrorSecurely = jest.fn();
    commitUpdateTimestamp(store);

    const originalFunc = actualApolloClient.ApolloMutateProgress;
    actualApolloClient.ApolloMutateProgress = jest.fn(function(...params) { throw new Error("Mock ApolloMutateProgress Exception"); });
    actualApolloClient.SaveUserDataLocal = jest.fn();
    actualApolloClient.RemoveUserDataLocal = jest.fn();

    const dataContext = { state: store.state.userDataStore };

    await action_mutateActivityProgress(dataContext as any,
      {
        attemptId: attemptID,
        stateHistoryJSON: "state",
        quitting: false
      }
    );
    expect(serverHelpers.sendLocalResponses).toBeCalled();
    expect(responseHelpers.sendStoreResponses).toBeCalled();
    expect(actualApolloClient.SaveUserDataLocal).toBeCalled();
    expect(actualApolloClient.SaveUserDataLocal).toBeCalledWith(attemptID, compressJSON("state"), compressJSON(JSON.stringify(dataContext.state)));
    expect(actualApolloClient.RemoveUserDataLocal).not.toBeCalled();

    //try, this time no error
    jest.resetAllMocks();

    //update timestamp
    commitUpdateTimestamp(store);
    actualApolloClient.ApolloMutateProgress = originalFunc;
    mockApolloClient.setResponses([graphQLData.updateUserActivityAttempt.success]);

    await action_mutateActivityProgress((dataContext as any),
      {
        attemptId: attemptID,
        stateHistoryJSON: "state",
        quitting: false
      }
    );
    expect(serverHelpers.sendLocalResponses).toBeCalled();
    expect(responseHelpers.sendStoreResponses).toBeCalled();
    expect(actualApolloClient.SaveUserDataLocal).not.toBeCalled();
    expect(actualApolloClient.RemoveUserDataLocal).toBeCalledWith(attemptID);
  });

  it.each
    `response | errors | payloadErrors | data_updateUserActivityAttempt_progress | data_updateUserActivityAttempt_state
    ${graphQLData.updateUserActivityAttempt.success} | ${false} | ${false} |${false} | ${false}
    ${graphQLData.updateUserActivityAttempt.errors} | ${true} | ${false} |${false} | ${false}
    ${graphQLData.updateUserActivityAttempt.undefined_progress} | ${false} | ${false} |${true} | ${false}
    ${graphQLData.updateUserActivityAttempt.undefined_state} | ${false} | ${false} |${false} | ${true}
    ${graphQLData.updateUserActivityAttempt.undefined_data} | ${false} | ${false} |${true} | ${true}
    `
    ("handle_mutateActivityProgress", ({ response, errors, payloadErrors, data_updateUserActivityAttempt_progress, data_updateUserActivityAttempt_state }) => {
      const dataContext = { state: store.state.userDataStore };
      debugHelpers.logErrorSecurely = jest.fn();
      handle_mutateActivityProgress(dataContext as any,
        {
          attemptId: attemptID,
          stateHistoryJSON: "state",
          quitting: false
        },
        response);

      if (errors)
        expect(debugHelpers.logErrorSecurely).toBeCalledWith("mutateProgress serverResponse.errors", response.errors);
      if (data_updateUserActivityAttempt_progress || data_updateUserActivityAttempt_state)
        expect(debugHelpers.logErrorSecurely).toBeCalledWith("mutateProgress returned no data and no error. ServerResponse", response);

    });

  it('action_mutateActivityProgress - send Local & Stored Response', async () => {
    serverHelpers.sendLocalResponses = jest.fn();
    responseHelpers.sendStoreResponses = jest.fn();

    const response = JSON.parse(JSON.stringify(graphQLData.updateUserActivityAttempt.success));
    response.data.updateUserActivityAttempt.attemptId = attemptID + 1;
    response.data.updateUserActivityAttempt.progress = compressJSON(JSON.stringify(store.state));

    mockApolloClient.setResponses([graphQLData.updateUserActivityAttempt.success]);

    await action_mutateActivityProgress((store as any),
      {
        attemptId: attemptID,
        stateHistoryJSON: "state",
        quitting: false
      }
    );

    expect(serverHelpers.sendLocalResponses).toBeCalled();
    expect(responseHelpers.sendStoreResponses).toBeCalled();
  });



});