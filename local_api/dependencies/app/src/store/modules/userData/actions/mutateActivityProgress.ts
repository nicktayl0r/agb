
import {
  ApolloMutateProgress,
  MutateProgressSynchronous,
  RemoveUserDataLocal,
  SaveUserDataLocal
} from "@/store/ApolloClient";

import {
  path
} from "ramda";

import {
  compressJSON,
  getApollo,
  sendLocalResponses
} from "@/helpers/serverHelpers";

import { sendStoreResponses } from "@/helpers/responseHelpers";

import { userDataContext } from "@/store/modules/userData/userDataState";
import {
  gizmoLogSecurely,
  logErrorSecurely,
  logExceptionSecurely
} from "@/helpers/debugHelpers";


let localUserDataTimestamp: number;

export async function action_mutateActivityProgress(
  context: userDataContext,
  payload: {
    attemptId: number;
    stateHistoryJSON: string;
    quitting: boolean;
  }
): Promise<void> {
  console.time(`mutateProgress attemptId ${payload.attemptId}`);

  const compressedStateHistory = compressJSON(payload.stateHistoryJSON);
  const compressedProgress = compressJSON(JSON.stringify(context.state));


  if (!compressedProgress) {
    logErrorSecurely("mutateProgress - compressedProgress is falsy", compressedProgress);
  }

  try {
    if (payload.quitting) {
      MutateProgressSynchronous(
        payload.attemptId,
        compressedStateHistory,
        compressedProgress
      );
    } else {
      // if we were able to send to the server, let's send any responses we're holding onto
      sendStoreResponses();
      sendLocalResponses(payload.attemptId);

      const serverResponse = await ApolloMutateProgress(
        getApollo(),
        payload.attemptId,
        compressedStateHistory,
        compressedProgress
      );

      const userActivityAttemptId = (serverResponse
        && serverResponse.data
        && (serverResponse.data as any).updateUserActivityAttempt
        && (serverResponse.data as any).updateUserActivityAttempt.userActivityAttemptId) ? (serverResponse.data as any).updateUserActivityAttempt.userActivityAttemptId : undefined;

      if (
        !userActivityAttemptId
        || userActivityAttemptId != payload.attemptId
      ) {
        logErrorSecurely(
          "queryProgress userActivityAttemptId do not match",
          serverResponse
        );
      }

      if (serverResponse && Array.isArray(serverResponse)) {
        serverResponse.forEach(response => {
          handle_mutateActivityProgress(context, payload, response);
        });
      } else if (serverResponse) {
        handle_mutateActivityProgress(context, payload, serverResponse);
      } else {
        logErrorSecurely(
          "mutateActivityPRogress returned no response ",
          serverResponse
        );
      }

      // also if we regained network connection and saved we don't need to keep older local data around
      if (
        localUserDataTimestamp
        && context.state.timestamp
        && context.state.timestamp > localUserDataTimestamp
      ) {
        RemoveUserDataLocal(payload.attemptId);
      }
    }
  } catch (err) {
    //Log mutateProgress exception only to Gizmo's log when user is quitting
    //Reserve Sentry logging for unacceptable or unexpected exceptions
    if (payload.quitting) {
      gizmoLogSecurely("mutateProgress Exception - Quitting");
    } else if (!payload.quitting) {
      logExceptionSecurely("mutateProgress Exception -", err.message);
    }
    // save state to local storage in case the user lost internet connection
    localUserDataTimestamp = context.state.timestamp;
    SaveUserDataLocal(
      payload.attemptId,
      compressedStateHistory,
      compressedProgress
    );
  }
  console.timeEnd(`mutateProgress attemptId ${payload.attemptId}`);
}



export function handle_mutateActivityProgress(
  context: userDataContext,
  payload: {
    attemptId: number;
    stateHistoryJSON: string;
    quitting: boolean;
  },
  serverResponse: any
) {
  const errors: any = path(["errors"], serverResponse as object);
  if (errors) {
    logErrorSecurely(
      "mutateProgress serverResponse.errors",
      errors
    );
  }

  //TODO: Compare the returnedProgress & returnedState values to the sent values,
  //		LOG if the 2 values are different.
  //TODO: Get the time that takes to compress the Files and the time that it takes to compare the sent and recieved data
  //		 to make sure that we aren't overloading the CaseApp with a new operation.
  //IDEA: if it is too big, then consider comparing CHECKSUM values instead of explicit binary values

  // we could check the returned progress to see if it matches
  // or we could not return it at all from the query if we don't need it
  const returnedProgress = path(
    ["data", "updateUserActivityAttempt", "progress"],
    serverResponse as object
  );
  const returnedState = path(
    ["data", "updateUserActivityAttempt", "state"],
    serverResponse as object
  );

  if (!serverResponse || !returnedProgress || !returnedState) {

    const payloadErrors: any = path(
      ["payload", "errors"],
      serverResponse as object
    );

    if (errors) {
      logErrorSecurely("mutateProgress returned no data. Errors", errors, serverResponse);
    } else if (payloadErrors) {
      logErrorSecurely(
        "mutateProgress returned no data. Payload/Errors",
        payloadErrors,
        serverResponse
      );
    } else {
      logErrorSecurely(
        "mutateProgress returned no data and no error. ServerResponse",
        serverResponse
      );
    }
  }
}


