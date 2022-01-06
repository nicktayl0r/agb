const mockOverride = require.requireActual("@/store/ApolloClient.ts");
import ApolloClient, { ApolloQueryResult } from "apollo-client";
import { FetchResult } from "apollo-link";
import { NormalizedCacheObject } from "apollo-cache-inmemory";

export type Response = { data: any, errors: any } | undefined;
let responses: Response[] = [];
export const setResponses = (newResponses: Response[]) => {
  if (newResponses)
    responses = newResponses.reverse();
  else
    responses = [];
};


mockOverride.ApolloQueryProgress = function(
  client: any,
  _attemptId: number,
  _sessionId: string
): Promise<ApolloQueryResult<{}>> | undefined {
  return query();
}


mockOverride.ApolloQueryResourceActivity = function(
  client: any,
  _resourceActivityId: number
): Promise<ApolloQueryResult<{}>> | undefined {
  return query();
}

mockOverride.ApolloMutateProgress = function(
  client: ApolloClient<NormalizedCacheObject>,
  _attemptId: number,
  _stateHistory: string,
  _progress: string
): Promise<FetchResult<{}, Record<string, any>>> | undefined {
  return query();
}

mockOverride.ApolloMutateActivityResponse = function(
  client: ApolloClient<NormalizedCacheObject>,
  _attemptId: number,
  _rubricId: string,
  _response: string,
  _responseData: string
): Promise<FetchResult<{}, Record<string, any>>> | undefined {
  return query();
}

const query = function(): Promise<ApolloQueryResult<{}>> | undefined {

  const response = responses.pop();
  if (response !== undefined) {
    return new Promise((resolutionFunc, rejectionFunc) => {
      if (response)
        resolutionFunc({
          data: response.data,
          errors: response.errors,
          loading: false,
          networkStatus: 7,   //enum ready=7
          stale: false
        });
    });
  }

  return undefined;
}


//module.exports = mockOverride;
