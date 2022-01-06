import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory";
import ApolloClient, { ApolloQueryResult} from "apollo-client";
import { ApolloLink, FetchResult } from "apollo-link";
import { BatchHttpLink } from "apollo-link-batch-http";
import { HttpLink } from "apollo-link-http";
import { RetryLink } from "apollo-link-retry";

import gql from "graphql-tag";
import { contains, isEmpty, without, path } from "ramda";

import {
  logError,
  logMessage,
  logWarning,
  logErrorSecurely,
  gizmoLogSecurely,
  logWarningSecurely,
  logInfo
} from "@/helpers/debugHelpers";
import { pageIsUnloading } from "@/store/mutationHistoryPlugin";
import { canAccessLocalStorage } from "@/helpers/browserHelpers";
import { Operation } from 'apollo-link';

let uri = "https://dev-vault.explorelearning.com/graphiql"; //not sure changes to this are going to be used by store after store is initialized
// export var el_client: any = null;

let headersAuth: string;

export function CreateApolloClient(sessionID: string, newURI?: string) {
  if (newURI != undefined) uri = newURI;
  logMessage("changed uri to: ", uri);
  headersAuth = sessionID ? `Bearer ${sessionID}` : "";
  
  const batchOption: any = {};

  if(newURI?.startsWith("https://sable.")) {
    // grand unification sable only
    batchOption.credentials = "include";
  }

  try {
    const client = new ApolloClient({
      defaultOptions: {
        query: {
          errorPolicy: "all"
        },
        mutate: {
          errorPolicy: "all"
        }
      },
      cache: new InMemoryCache(),
      link: ApolloLink.from([
        new RetryLink({
          delay: {
            initial: 300,
            max: Infinity,
            jitter: false // true = random wait between 0 and 2x initial. false = exponential wait, x2 each time
          },
          attempts: {
            max: 4, // 300, 600, 1200, 2400 = 4,500 max retry wait. That should get us through momentary outages.
            retryIf: (error, _operation:Operation) => {
              if (pageIsUnloading()) return false; // stop retrying and save things to localStorage
              const errorDefined = !!error;
              if (errorDefined) {

                console.warn("retrying operation", _operation, error)
                // logging below to sentry overwhelms vm resources at time of change
                // logWarningSecurely(
                //   `retrying operation`, _operation, error
                //   );
                }
                return errorDefined;
              }
            }
          }),
          // this is to get apollo and absinthe to use the same batch format
          // see https://github.com/absinthe-graphql/absinthe_plug/issues/89#issuecomment-307845018
          new ApolloLink((operation, forward) => {
            return forward!(operation).map(response => {
              // Also see https://github.com/absinthe-graphql/absinthe_plug/issues/89#issuecomment-307845018
              //@ts-ignore
              return { ...response, data: response.payload.data };
            });
          }),
          new BatchHttpLink({
          ...batchOption,
          uri,
          headers: {
            authorization: headersAuth
          }
        })
      ])
    });
    return client;
  } catch (e) {
    logErrorSecurely("Apollo Client creation exception", e);
  }

  return undefined;
}

export function ApolloQueryProgress(
  client: ApolloClient<NormalizedCacheObject>,
  _attemptId: number,
  _sessionId: string
): Promise<ApolloQueryResult<{}>> | undefined {
  if (client == null) {
    logError(
      "Apollo client has not been initialized, cannot ApolloQueryProgress"
    );
    return undefined;
  }
  const query = gql`
		query getUserActivityAttempt($attemptId: Int!) {
			getUserActivityAttempt(userActivityAttemptId: $attemptId) {
				userActivityAttemptId
				progress
				state
				resourceActivityId
			}
		}
	`;

  const variables = {
    attemptId: _attemptId
  };

  return logQueryErrors(client.query({
    query,
    variables
  }), query,
  variables);
}

export function ApolloQueryResourceActivity(
  client: ApolloClient<NormalizedCacheObject>,
  resourceActivityID: number
): Promise<ApolloQueryResult<{}>> | undefined {
  if (client == null) {
    logError(
      "Apollo client has not been initialized, cannot ApolloQueryProgress"
    );
    return undefined;
  }
  const query = gql`
		query getResourceActivity($resourceActivityId: Int!) {
			getResourceActivity(resourceActivityId: $resourceActivityId) {
				resourceActivityId
				key
			}
		}
	`;

  const variables = {
    resourceActivityId: resourceActivityID
  };

  return logQueryErrors(client.query({
    query,
    variables
  }), query, variables);
}

function logQueryErrors( promisedResponse: Promise<ApolloQueryResult<{}>> | undefined, query:any, variables:any) : Promise<ApolloQueryResult<{}> > | undefined  {
  if(promisedResponse) {    
    return new Promise( (resolve) => {
    promisedResponse.then( (response: any) => {
        logResponseError(response);          
        resolve(response);
      } ).catch( (err) => {
        if(err.networkError)
        { 
          logError(`QueryErrors caught NetworkError ${err.message}`, err, err.networkError, query,variables);
        }
        else
          logError(`QueryErrors caught Error ${err.message}`, err, query,variables);
        resolve(promisedResponse);
      });
    });
  }
  return undefined;
}


function logMutatationErrors( promisedResponse: Promise<FetchResult<{}, Record<string, any>>> | undefined, mutation:any, variables:any ) : Promise<FetchResult<{}, Record<string, any>> >  | undefined  {
  if(promisedResponse) {
    return new Promise( (resolve) => {
      promisedResponse.then( (response: any) => {
        logResponseError(response);          
        resolve(response);
      } ).catch( (err) => {
   
        if(err.networkError)
          logError(`MutatationErrors caught NetworkError ${err.message}`, err, err.networkError, mutation, variables);
        else
          logError(`MutatationErrors caught Error ${err.message}`, err, mutation, variables);
        resolve(promisedResponse); 
      });
    });
  }
  return undefined;
}


function logResponseError(response:any) {

  const error = path(
    ["error"],
    response
  ) as any;
  if (error) {
    logErrorSecurely(
      "ApolloQueryError",
      error,
      response.variables
    );
  }

  const errors = path(
    ["errors"],
    response
  ) as any;
  if (errors) {
    logErrorSecurely(
      "ApolloQueryError",
      error,
      response.variables
    );    
  }
}

const progressMutation = `
mutation updateUserActivityAttempt($attemptId: Int!, $progress: String, $state: String) {
	updateUserActivityAttempt(
		userActivityAttemptId: $attemptId
		progress: $progress
		state: $state
	) {
		userActivityAttemptId
		progress
		state
	}
}
`;

export function ApolloMutateProgress(
  client: ApolloClient<NormalizedCacheObject>,
  _attemptId: number,
  _stateHistory: string,
  _progress: string
): Promise<FetchResult<{}, Record<string, any>>> | undefined {
  if (client == null) {
    logError(
      "Apollo client has not been initialized, cannot ApolloMutateProgress"
    );
    return undefined;
  }
  const mutation = gql(progressMutation);

  const variables = {
    attemptId: _attemptId,
    progress: _progress,
    state: _stateHistory
  };

  return logMutatationErrors(client.mutate({
      mutation,
      variables
      }),mutation,
      variables);
}

// We need a synchronous request when saving on beforeUnload or unload events
//  to guarantee the request goes through.
// those events are hooked up in effectHelpers.ts
export function MutateProgressSynchronous(
  _attemptId: number,
  _stateHistory: string,
  _progress: string
) {
  const variables = {
    attemptId: _attemptId,
    progress: _progress,
    state: _stateHistory
  };

  const xhr = new XMLHttpRequest();
  xhr.open("POST", uri, false); // 3rd param false makes the request synchronous
  xhr.setRequestHeader("accept", "*/*");
  xhr.setRequestHeader("content-type", "application/json");
  xhr.setRequestHeader("authorization", headersAuth);
  const mutationJSON = JSON.stringify({
    query: progressMutation,
    variables
  });
  logMessage(mutationJSON);
  xhr.send(mutationJSON);
  logMessage(`${xhr.status}, ${xhr.responseText}`);
}

export interface LocalUserData {
  progress: string;
  state: string;
}

export function SaveUserDataLocal(
  attemptId: number,
  stateHistoryCompressed: string,
  progressCompressed: string
) {
  if (canAccessLocalStorage() == false) {
    logMessage(
      "skipping: saving progress to local storage. Access to localstorage is denied."
    );
    return;
  }
  logMessage("saving progress to local storage");
  const localData: LocalUserData = {
    progress: progressCompressed,
    state: stateHistoryCompressed
  };
  try {
    window.localStorage.setItem(`${attemptId} data`, JSON.stringify(localData));
  } catch (e) {
    gizmoLogSecurely(
      "SaveUserDataLocal - Exception Writing to LocalStorage",
      e
    );
  }
}

export function GetUserDataLocal(attemptId: number): LocalUserData | null {
  if (canAccessLocalStorage() == false) {
    logMessage("skipping: GetUserDataLocal. Access to localstorage is denied.");

    return null;
  }
  try {
    const localDataJSON = window.localStorage.getItem(`${attemptId} data`);
    if (localDataJSON) {
      const localData = JSON.parse(localDataJSON) as LocalUserData;
      return localData;
    }
  } catch (e) {
    logError("problem parsing local data", e);
  }
  return null;
}

export function RemoveUserDataLocal(attemptId: number) {
  if (canAccessLocalStorage() == false) {
    logMessage(
      "skipping: RemoveUserDataLocal. Access to localstorage is denied."
    );
    return;
  }
  try {
    localStorage.removeItem(`${attemptId} data`);
  } catch (e) {
    gizmoLogSecurely(
      "RemoveUserDataLocal - Exception Writing to LocalStorage",
      e
    );
  }
}

export function ApolloMutateActivityResponse(
  client: ApolloClient<NormalizedCacheObject>,
  _attemptId: number,
  _rubricId: string,
  _response: string,
  _responseData: string
): Promise<FetchResult<{}, Record<string, any>>> | undefined {
  if (client == null) {
    logError(
      "Apollo client has not been initialized, cannot ApolloMutateActivityResponse"
    );
    return undefined;
  }
  const mutation = gql`
		mutation createOrUpdateUserActivityResponse(
			$attemptId: Int!
			$rubricId: String
			$response: String!
			$responseData: String
		) {
			createOrUpdateUserActivityResponse(
				userActivityAttemptId: $attemptId
				key: $rubricId
				response: $response
				responseData: $responseData
			) {
				userActivityResponseId
				userActivityAttemptId
				key
				response
				responseData
			}
		}
	`;

  const variables = {
    attemptId: _attemptId,
    rubricId: _rubricId,
    response: _response,
    responseData: _responseData
  };

  return logMutatationErrors(client.mutate({
    mutation,
    variables
  }),mutation,
  variables);
}

export interface LocalResponse {
  rubricId: string;
  response: string;
  responseData: string;
}

export function SaveResponseLocal(
  attemptId: number,
  rubricId: string,
  response: string,
  responseData: string
) {
  if (canAccessLocalStorage() == false) {
    logMessage(
      "skipping: saving response to local storage. Access to localstorage is denied."
    );
    return;
  }
  logMessage("saving response to local storage", rubricId);
  let localResponses = GetResponsesLocal(attemptId);

  const newResponse = {
    rubricId,
    response,
    responseData
  };

  if (localResponses) {
    // remove old responses with the same rubricId
    localResponses = localResponses.filter(resp => resp.rubricId != rubricId);

    if (!contains(newResponse, localResponses)) {
      localResponses.push(newResponse);
    }
  } else {
    localResponses = [newResponse];
  }
  try {
    window.localStorage.setItem(
      `${attemptId} responses`,
      JSON.stringify(localResponses)
    );
  } catch (e) {
    gizmoLogSecurely(
      "SaveResponseLocal - Exception Writing to LocalStorage",
      e
    );
  }
}

export function GetResponsesLocal(attemptId: number): LocalResponse[] | null {
  if (canAccessLocalStorage() == false) {
    logMessage(
      "skipping: GetResponsesLocal. Access to localstorage is denied."
    );

    return null;
  }
  try {

    const localResponsesJSON = window.localStorage.getItem(
      `${attemptId} responses`
    );
    if (localResponsesJSON) {
      const localResponses = JSON.parse(localResponsesJSON) as LocalResponse[];
      return localResponses;
    }
  } catch (e) {
    console.error("problem parsing local responses", e);
  }
  return null;
}

export function RemoveResponseLocal(
  attemptId: number,
  rubricId: string,
  response: string,
  responseData: string
) {
  if (canAccessLocalStorage() == false) {
    logMessage(
      "skipping: RemoveResponseLocal. Access to localstorage is denied."
    );
    return;
  }
  let localResponses = GetResponsesLocal(attemptId);

  if (localResponses) {
    const responseToRemove: LocalResponse = {
      rubricId,
      response,
      responseData
    };

    const newLocalResponses = without([responseToRemove], localResponses);

    try {
      window.localStorage.setItem(
        `${attemptId} responses`,
        JSON.stringify(newLocalResponses)
      );
    } catch (e) {
      gizmoLogSecurely(
        "RemoveResponseLocal - Exception Writing to LocalStorage",
        e
      );
    }
  }

  // if all have been removed, we can remove the local item
  localResponses = GetResponsesLocal(attemptId);
  if (!localResponses || isEmpty(GetResponsesLocal(attemptId))) {
    localStorage.removeItem(`${attemptId} responses`);
  }
}
