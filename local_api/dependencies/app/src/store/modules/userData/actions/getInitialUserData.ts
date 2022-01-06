import { loadUserHistory, Mutation } from "@/store/mutationHistoryPlugin";
import {
  decompressJSON,
  getApollo
} from "@/helpers/serverHelpers";
import { UserDataState, userDataContext } from "@/store/modules/userData/userDataState";
import { UserActivityAttemptReturn } from "@/data models/responseModels";

import {
  logInfo,
  logMessage,
  logErrorSecurely,
  logExceptionSecurely
} from "@/helpers/debugHelpers";

import {
  ApolloQueryProgress,
  ApolloQueryResourceActivity,
  GetUserDataLocal,
  RemoveUserDataLocal,
} from "@/store/ApolloClient";

import {
  path
} from "ramda";

import { getTrackGroupByID } from "@/helpers/projectHelpers";
import { commitUserData, getStore } from "@/helpers/storeHelpers";
import { dispatchMutateProgress, commitSetCurrentTrackGroup, userDataStore } from '@/store/modules/userData';



interface UserActivityAttempt {
  userActivityAttemptId: number;
  resourceActivityId: number;
  progress: UserDataState | null;
  stateHistory: Mutation[] | null;
}

export async function getRemoteUserActivityAttempt(payload: { attemptId: number; sessionId: string }): Promise<UserActivityAttempt | undefined> {
  const serverResponse = (await ApolloQueryProgress(
    getApollo(),
    payload.attemptId,
    payload.sessionId
  )) as object;
  
  const userActivityAttemptId = path(
    ["data", "getUserActivityAttempt", "userActivityAttemptId"],
    serverResponse
  ) as number;
  if (!userActivityAttemptId || userActivityAttemptId != payload.attemptId
  ) {
    logErrorSecurely(
      "queryProgress userActivityAttemptId do not match", payload.attemptId,
      serverResponse
    );
  }

  const resourceActivityId = path(
    ["data", "getUserActivityAttempt", "resourceActivityId"],
    serverResponse
  ) as number;

  if (!resourceActivityId) {
    logErrorSecurely(
      "queryProgress did not return resourceActivityId",
      serverResponse
    );
    return undefined;
  }

  const progressJSON = decompressJSON(path(
    ["data", "getUserActivityAttempt", "progress"],
    serverResponse
  ) as string);
  //logMessage("progress from server query:", progressJSON);

  const stateJSON = decompressJSON(path(
    ["data", "getUserActivityAttempt", "state"],
    serverResponse
  ) as string);


  // try to parse progressJSON from server
  let progress: UserDataState | null;
  try {
    progress = JSON.parse(progressJSON) as UserDataState;
  } catch (err) {
    // This is expected when starting a NEW Attempt.
    // PROGRESS will be NULL.    
    progress = null;
  }

  let stateHistory: Mutation[] | null;
  try {
    stateHistory = JSON.parse(stateJSON) as Mutation[];
  } catch (err) {
    stateHistory = null;
  }

  return { userActivityAttemptId, resourceActivityId, progress, stateHistory };
}


export async function getLocalUseractivityAttempt(payload: { attemptId: number; sessionId: string }): Promise<UserActivityAttempt | undefined> {
  const localData = GetUserDataLocal(payload.attemptId);
  if (localData) {
    logMessage("local data found", localData);
    const localProgressJSON = decompressJSON(localData.progress);
    let localProgress: UserDataState | null;
    try {
      localProgress = JSON.parse(localProgressJSON) as UserDataState;
    } catch (err) {
      // This is expected when starting a NEW Attempt.
      // PROGRESS will be NULL.
      logErrorSecurely("localProgress", err);
      localProgress = null;
    }
    const localStateJSON = decompressJSON(localData.state);
    let localStateHistory: Mutation[] | null;
    try {
      localStateHistory = JSON.parse(localStateJSON) as Mutation[];
    } catch (err) {
      localStateHistory = null;
    }

    return { userActivityAttemptId: payload.attemptId, resourceActivityId: 0, progress: localProgress, stateHistory: localStateHistory };
  }
  return undefined;
}


export async function getResourceActivityKey(resourceActivityId: number) {

  const resourceActivityResponse = (await ApolloQueryResourceActivity(
    getApollo(),
    resourceActivityId
  )) as object;

  const queryResourceActivityError = path(
    ["error"],
    resourceActivityResponse
  ) as any;
  if (queryResourceActivityError) {
    logErrorSecurely(
      "getResourceActivity Error",
      queryResourceActivityError
    );
    return undefined;
  }

  const queryResourceActivityErrors = path(
    ["errors"],
    resourceActivityResponse
  ) as any;
  if (queryResourceActivityErrors) {
    logErrorSecurely(
      "getResourceActivity Error",
      queryResourceActivityErrors
    );
    return undefined;
  }

  const resourceActivityKey = path(
    ["data", "getResourceActivity", "key"],
    resourceActivityResponse
  ) as string;


  if (!resourceActivityKey) {
    logErrorSecurely(
      "queryProgress did not return ResourceActivityKey",
      resourceActivityResponse
    );
    return undefined;
  }

  return resourceActivityKey;
}

export async function action_getInitialUserData(
  context: userDataContext,
  payload: { attemptId: number, sessionId: string }
): Promise<UserActivityAttemptReturn | undefined> {

  logInfo("queryProgress payload", payload);
  try {

    const remoteUserActivityAttempt = await getRemoteUserActivityAttempt(payload);
    if (remoteUserActivityAttempt === undefined) {
      logErrorSecurely(
        "getRemoteUserActivityAttempt failed to return remoteUserActivityAttempt for payload",
        payload
      );
      return undefined;
    }

    const resourceActivityId = remoteUserActivityAttempt.resourceActivityId;

    const localUserActivityAttempt = await getLocalUseractivityAttempt(payload);


    let usingLocalData = false;
    if (localUserActivityAttempt && localUserActivityAttempt.progress && !(remoteUserActivityAttempt.progress)) {
      //There is not remote progress data
      usingLocalData = true;
    }
    else if (localUserActivityAttempt && localUserActivityAttempt.progress && localUserActivityAttempt.progress.timestamp
      && remoteUserActivityAttempt && remoteUserActivityAttempt.progress && remoteUserActivityAttempt.progress.timestamp) {
      //There is not remote progress data
      logMessage(
        "server timestamp:",
        remoteUserActivityAttempt.progress.timestamp,
        "local timestamp:",
        localUserActivityAttempt.progress.timestamp,
        "local is newer??",
        localUserActivityAttempt.progress.timestamp > remoteUserActivityAttempt.progress.timestamp
      );
      usingLocalData = (localUserActivityAttempt.progress.timestamp > remoteUserActivityAttempt.progress.timestamp);
    }
    else {
      usingLocalData = false;
    }


    if (usingLocalData) {
      // save to server 
      const progress = (localUserActivityAttempt) ? localUserActivityAttempt.progress : null;
      const stateHistory = (localUserActivityAttempt && localUserActivityAttempt.stateHistory) ? localUserActivityAttempt.stateHistory : [];

      if (localUserActivityAttempt && localUserActivityAttempt.progress && remoteUserActivityAttempt && remoteUserActivityAttempt.progress)
        logInfo("usingLocalData to start", `server timestamp: ${remoteUserActivityAttempt.progress.timestamp} \nlocal timestamp: ${localUserActivityAttempt.progress.timestamp}`);

      commitUserData(getStore(), progress, { root: true });
      loadUserHistory(stateHistory);

      await dispatchMutateProgress(getStore(), {
        attemptId: payload.attemptId,
        stateHistoryJSON: JSON.stringify(stateHistory),
        quitting: false
      });

      // we have loaded the localData, we are done.
      return {
        progress: JSON.stringify(progress),
        state: JSON.stringify(stateHistory),
        resourceActivityId
      };

    }
    else if (remoteUserActivityAttempt.progress) {
      const progress = (remoteUserActivityAttempt) ? remoteUserActivityAttempt.progress : null;
      const stateHistory = (remoteUserActivityAttempt && remoteUserActivityAttempt.stateHistory) ? remoteUserActivityAttempt.stateHistory : [];

      if (localUserActivityAttempt)
        RemoveUserDataLocal(payload.attemptId);

      commitUserData(getStore(), progress, { root: true });
      loadUserHistory(stateHistory);

      await dispatchMutateProgress(getStore(), {
        attemptId: payload.attemptId,
        stateHistoryJSON: JSON.stringify(stateHistory),
        quitting: false
      });

      // we have loaded the remoteData, we are done.
      return {
        progress: JSON.stringify(progress),
        state: JSON.stringify(stateHistory),
        resourceActivityId
      };
    }
    else { //brand new run      
      const resourceActivityKey = await getResourceActivityKey(resourceActivityId);
      if (!resourceActivityKey) {
        logErrorSecurely(
          "action_getInitialUserData resourceActivityKey is not defined",
          resourceActivityKey
        );
        return undefined;
      }

      logMessage(
        "NO PROGRESS, Commit curentTrackGroupID to ",
        resourceActivityKey
      );

      const validTrackID = getTrackGroupByID(resourceActivityKey);
      //if fails, LogErrorSecurely, return undefined.
      if (validTrackID.isNothing()) {
        logErrorSecurely(
          "action_getInitialUserData resourceActivityKey is not valid.",
          resourceActivityKey
        );
        if (!resourceActivityKey) { return undefined; }
      }

      //no progress yet, so setting current Track Group
      commitSetCurrentTrackGroup(getStore(), resourceActivityKey);
      return {
        progress: "",
        state: "",
        resourceActivityId
      };
    }
  } catch (err) {
    logExceptionSecurely("queryProgress Exception", err);
    return undefined;
  }
};