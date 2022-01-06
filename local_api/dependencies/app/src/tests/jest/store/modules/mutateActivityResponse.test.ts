import { action_mutateActivityResponse, handle_mutateActivityResponse, saveLocalAndResubmitResponse } from '@/store/modules/userData/actions/mutateActivityResponse';
import { getCleanStore } from "@/tests/jest/jestSetup";
import * as envHelpers from "@/helpers/envHelpers";
import { RubricStatus } from "@/data models/rubricModels";
import { UserDataState } from "@/store/modules/userData/userDataState";

let mockApolloClient = require("@/store/__mock__/ApolloClient");
let actualApolloClient = jest.requireActual("@/store/ApolloClient");


const responseHelpers = require("@/helpers/responseHelpers");
const serverHelpers = require("@/helpers/serverHelpers");
const debugHelpers = require("@/helpers/debugHelpers");
//mock ApolloMutateProgress

import faker from 'faker';
import { commitRubricStateResponse, readAllRubricStates, userDataStore } from '@/store/modules/userData';
import { GetResponsesLocal, SaveResponseLocal } from '@/store/ApolloClient';
import { setResponses } from '@/store/__mock__/ApolloClient';
import { getStore } from '@/helpers/storeHelpers';

const projectData = require("@/tests/jest/__data__/CellRespiration_H_Progress_string.json");
const graphQLData = require("@/tests/jest/__data__/graphQL.json");

// action_mutateActivityResponse
// handle_mutateActivityResponse
// saveLocalAndResubmitResponse

describe("mutateActivityResponse", () => {
  let attemptID: number;
  let store: any;
  beforeEach(() => {
    store = getCleanStore();
    attemptID = faker.random.number(100000);
    envHelpers.setEnv(envHelpers.EnvironmentOptions.debug);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("saveLocalAndResubmitResponse", () => {
    const context = { state: store.state.userDataStore };
    const responses: any[] = [];
    for (let i = 0; i < 10; i++) {
      const response = {
        attemptId: attemptID,
        rubricId: faker.name.firstName(),
        response: faker.lorem.sentence(10),
        responseData: { responseData: faker.lorem.sentence(10) }.toString()
      };
      responses.push(response);
      saveLocalAndResubmitResponse(context as any, response);
    }

    const locals = GetResponsesLocal(attemptID);
    const storages = readAllRubricStates(store);

    responses.forEach(r => {
      expect(locals).toContainEqual({ response: r.response, responseData: r.responseData, rubricId: r.rubricId });
      expect(storages[r.rubricId]).toBeDefined();
      expect(storages[r.rubricId].responseData).toBe(r.responseData);
      expect(storages[r.rubricId].response).toBe(r.response);
    });
  });


  it("saveLocalAndResubmitResponse", () => {
    const context = { state: store.state.userDataStore };
    const responses: any[] = [];
    for (let i = 0; i < 10; i++) {
      const response = {
        attemptId: attemptID,
        rubricId: faker.lorem.slug(3),
        response: faker.lorem.sentence(10),
        responseData: { responseData: faker.lorem.sentence(10) }.toString()
      };
      responses.push(response);
      saveLocalAndResubmitResponse(context as any, response);
    }

    const locals = GetResponsesLocal(attemptID);
    const storages = readAllRubricStates(store);

    responses.forEach(r => {
      expect(locals).toContainEqual({ response: r.response, responseData: r.responseData, rubricId: r.rubricId });
      expect(storages[r.rubricId]).toBeDefined();
      expect(storages[r.rubricId].responseData).toBe(r.responseData);
      expect(storages[r.rubricId].response).toBe(r.response);
    });
  });

  it.each`
   response | status | inLocalStorage
   ${null} | ${RubricStatus.resubmit} | ${true}
   ${graphQLData.createOrUpdateUserActivityResponse.recieve} | ${RubricStatus.received} | ${false}
   ${graphQLData.createOrUpdateUserActivityResponse.reject_no_user} | ${RubricStatus.resubmit} |  ${true}
   ${graphQLData.createOrUpdateUserActivityResponse.reject_unauthorized} | ${RubricStatus.resubmit} |  ${true}
   ${graphQLData.createOrUpdateUserActivityResponse.reject_rubric} | ${RubricStatus.rejected} |  ${false}
  `
    ("handle_mutateActivityResponse", ({ response, status, inLocalStorage }) => {
      const context = { state: store.state.userDataStore };
      const payload = {
        attemptId: attemptID,
        rubricId: faker.lorem.slug(3),
        response: faker.lorem.sentence(10),
        responseData: JSON.stringify({ responseData: faker.lorem.sentence(10) })
      };

      if (response?.data?.createOrUpdateUserActivityResponse) {
        response.data.createOrUpdateUserActivityResponse.userActivityAttemptId = payload.attemptId;
        response.data.createOrUpdateUserActivityResponse.key = payload.rubricId;
        response.data.createOrUpdateUserActivityResponse.response = payload.response;
        response.data.createOrUpdateUserActivityResponse.responseData = payload.responseData;
        console.log(response)
      }
      SaveResponseLocal(attemptID, payload.rubricId, payload.response, payload.responseData);
      commitRubricStateResponse(getStore(), { rubricID: payload.rubricId, response: payload.response, responseData: payload.responseData, status: RubricStatus.submitted });
      handle_mutateActivityResponse(context as any, payload, response);

      const locals = GetResponsesLocal(attemptID);
      const storages = readAllRubricStates(store);

      if (inLocalStorage)
        expect(locals).toContainEqual({ response: payload.response, responseData: payload.responseData, rubricId: payload.rubricId });

      expect(storages[payload.rubricId]).toBeDefined();
      expect(storages[payload.rubricId].responseData).toBe(payload.responseData);
      expect(storages[payload.rubricId].response).toBe(payload.response);
      expect(storages[payload.rubricId].status).toBe(status);
    });

});