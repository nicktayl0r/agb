import {
  ApolloMutateActivityResponse,
  RemoveResponseLocal,
  SaveResponseLocal
} from "@/store/ApolloClient";

import {
  path
} from "ramda";

import {
  getApollo
} from "@/helpers/serverHelpers";

import { UserDataState, userDataContext } from "@/store/modules/userData/userDataState";
import {
  isDebug,
  logInfo,
  logMessage,
  logErrorSecurely,
  logExceptionSecurely
} from "@/helpers/debugHelpers";

import { commitRubricStateResponse, commitRubricRejected, commitRubricReceived } from '@/store/modules/userData';
import { userDataStore } from '@/store/modules/userData';
import { RubricStatus } from "@/data models/rubricModels";

export async function action_mutateActivityResponse(
  context: userDataContext,
  payload: {
    attemptId: number;
    rubricId: string;
    response: string;
    responseData: string;
  }
) {
  logMessage("mutateActivityResponse", payload);

  userDataStore.mutations.updateRubricStateResponse(context.state, {
    rubricID: payload.rubricId,
    status: RubricStatus.submitted,
    response: payload.response,
    responseData: payload.responseData
  });

  if (isDebug()) return;

  try {
    const serverResponse = await ApolloMutateActivityResponse(
      getApollo(),
      payload.attemptId,
      payload.rubricId,
      payload.response,
      payload.responseData
    );

    logMessage("mutateActivityReponse serverResponse:", serverResponse);

    if (serverResponse && Array.isArray(serverResponse)) {
      serverResponse.forEach(response => {
        handle_mutateActivityResponse(context, payload, response);
      });
    } else if (serverResponse) {
      handle_mutateActivityResponse(context, payload, serverResponse);
    } else {
      logErrorSecurely(
        "mutateActivityResponse returned no response ",
        `RubricID ${payload.rubricId}`,
        serverResponse
      );
    }
  } catch (err) {
    logExceptionSecurely("mutateActivityResponse exception", err);
    // save response to local storage in case the user lost internet connection
    saveLocalAndResubmitResponse(context, payload);
  }
}


export function handle_mutateActivityResponse(
  context: userDataContext,
  payload: {
    attemptId: number;
    rubricId: string;
    response: string;
    responseData: string;
  },
  serverResponse: any
) {
  const returned: any = path(
    ["data", "createOrUpdateUserActivityResponse"],
    serverResponse as object
  );

  if (!returned) {
    const errors: any = path(["errors"], serverResponse as object);
    const payloadErrors: any = path(
      ["payload", "errors"],
      serverResponse as object
    );

    if (errors) {
      logErrorSecurely(
        "mutateActivityResponse returned no data. Errors",
        `RubricID ${payload.rubricId}`,
        errors
      );
      parseErrors(context, payload, errors);
    } else if (payloadErrors) {
      logErrorSecurely(
        "mutateActivityResponse returned no data. Payload/Errors",
        `RubricID ${payload.rubricId}`,
        payloadErrors
      );
      parseErrors(context, payload, payloadErrors);
    } else {
      logErrorSecurely(
        "mutateActivityResponse returned no data. ServerResponse",
        `RubricID ${payload.rubricId}`,
        serverResponse
      );
      saveLocalAndResubmitResponse(context, payload);
    }
  } else if (
    returned.userActivityAttemptId == payload.attemptId
    && returned.key == payload.rubricId
    && returned.response == payload.response
    && returned.responseData == payload.responseData
  ) { //success
    // we have verified that our activityResponse was received correctly
    logMessage(
      "mutateActivityResponse verified with userActivityResponseId",
      returned.userActivityResponseId
    );

    userDataStore.mutations.updateRubricReceived(context.state,
      {
        rubricID: returned.key,
        responseID: returned.userActivityResponseId
      });

    RemoveResponseLocal(
      payload.attemptId,
      payload.rubricId,
      payload.response,
      payload.responseData
    );
  } else {
    logErrorSecurely(
      "mutateActivityResponse response does not match payload",
      payload,
      "returned:",
      returned
    );
    saveLocalAndResubmitResponse(context, payload);
  }
}

export function parseErrors(context: userDataContext,
  payload: {
    attemptId: number;
    rubricId: string;
    response: string;
    responseData: string;
  },
  errors: any) {
  let rejectResponse = false;
  errors.forEach((error: any) => {
    if (error.message && error.message.startsWith("ResourceActivityRubric not found for Key")) {
      logMessage(`mutateActivityResponse rejecting response to Rubric ${payload.rubricId}`);
      userDataStore.mutations.updateRubricRejected(context.state, {
        rubricID: payload.rubricId
      });

      RemoveResponseLocal(
        payload.attemptId,
        payload.rubricId,
        payload.response,
        payload.responseData
      );
      rejectResponse = true;
    }
  });

  if (!rejectResponse) {
    logMessage(`mutateActivityResponse saveLocalAndResubmitResponse to Rubric ${payload.rubricId}`);
    saveLocalAndResubmitResponse(context, payload);
  }
}

export function saveLocalAndResubmitResponse(context: userDataContext,
  payload: {
    attemptId: number;
    rubricId: string;
    response: string;
    responseData: string;
  }) {
  SaveResponseLocal(
    payload.attemptId,
    payload.rubricId,
    payload.response,
    payload.responseData
  );

  userDataStore.mutations.updateRubricStateResponse(context.state,
    {
      rubricID: payload.rubricId,
      status: RubricStatus.resubmit,
      response: payload.response,
      responseData: payload.responseData
    });
}

