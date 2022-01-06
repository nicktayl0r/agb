import * as Sentry from "@sentry/browser";

import { captureSentryEvent, captureSentryException } from "@/helpers/sentryHelper";

import { getEnv } from "@/helpers/envHelpers";
import { getStore } from "@/helpers/storeHelpers";
import { getPageID } from "@/helpers/widgetHelpers";
import { readModulesState } from "@/store/modules/userData";

import { readSessionId, readAttemptId } from "@/store/modules/authData";

import {
  readProjectName,
  readPlayerGitVersion,
  readProjectGitVersion
} from "@/store/modules/appData";

import { vueApp } from "..";

import { AxiosRetryInstance } from "@/helpers/requestHelpers";

import { canAccessLocalStorage } from "@/helpers/browserHelpers";

import { pageIsUnloading } from "@/store/mutationHistoryPlugin";

let debug = false;

export function setDebug(_debug: boolean) {
  debug = _debug;
}

export function isDebug() {
  return debug || window.location.href.includes("?debug=true");
}

export function showHandbookPages() {
  return window.location.href.includes("?handbookPages=true");
}

export function showDebugLabel() {
  return !window.location.href.includes("?debugLabel=false");
}

const filterValues = [
  "elClassID",
  "response",
  "responsedata",
  "comments",
  "score",
  "progress",
  "state",
  "attemptId",
  "totalscore",
  "sessionId",
  "userActivityAttemptId",
  "userActivityResponseId"
];


function combineOptionalParams(optionalParams: any[]) {
  let returnString = "";

  if (optionalParams != undefined) {
    for (const param of optionalParams) {
      if (param != undefined) returnString += ` ${stringifyParam(param)}`;
    }
  }

  return returnString;
}

function stringifyParam(param: any) {
  if (typeof param === "object" && param !== undefined) {
    return `\n${JSON.stringify(param, undefined, 4)}\n`;
  }
  return param.toString();
}

// clean up objects for the browser log, w/o Vue getters and setters
function removeFunctionsFromObjects(params: any[]) {
  const newArray: any[] = [];
  for (const index in params) {
    if (typeof params[index] === "object" && params[index] !== undefined) {
      newArray[index] = JSON.parse(JSON.stringify(params[index]));
    } else newArray[index] = params[index];
  }
  return newArray;
}

export function logMessage(message: string, ...optionalParams: any[]) {
  if (isDebug() || getEnv() === "development") {
    console.log(message, ...removeFunctionsFromObjects(optionalParams));
    // const stringifiedMessage = message + combineOptionalParams(optionalParams);
    // console.log(stringifiedMessage);
  }
}

export function logInfo(_message: string, ...optionalParams: any[]) {
  console.log(_message, ...removeFunctionsFromObjects(optionalParams));

  if (!pageIsUnloading()) {
    const moduleState = readModulesState(getStore());
    captureSentryEvent({
      message: _message,
      level: Sentry.Severity.Info,
      tags: {
        session_trackGroup: moduleState.currentTrackGroupID,
        session_page: getPageID(vueApp),
        local_storage_enabled: canAccessLocalStorage().toString()
      },
      extra: { ...removeFunctionsFromObjects(optionalParams) }
    });
  }
}

export function logError(_message: string, ...optionalParams: any[]) {
  console.error(_message, ...removeFunctionsFromObjects(optionalParams));

  if (!pageIsUnloading()) {
    const moduleState = readModulesState(getStore());
    captureSentryEvent({
      message: _message,
      level: Sentry.Severity.Error,
      tags: {
        session_trackGroup: moduleState.currentTrackGroupID,
        session_page: getPageID(vueApp),
        local_storage_enabled: canAccessLocalStorage().toString()
      },
      extra: { ...removeFunctionsFromObjects(optionalParams) }
    });
  }
}

export function logWarning(_message: string, ...optionalParams: any[]) {
  console.warn(_message, ...removeFunctionsFromObjects(optionalParams));

  if (!pageIsUnloading()) {
    const moduleState = readModulesState(getStore());
    captureSentryEvent({
      message: _message,
      level: Sentry.Severity.Warning,
      tags: {
        session_trackGroup: moduleState.currentTrackGroupID,
        session_page: getPageID(vueApp),
        local_storage_enabled: canAccessLocalStorage().toString()
      },
      extra: { ...removeFunctionsFromObjects(optionalParams) }
    });
  }
}

export function logException(error: any, ...optionalParams: any[]) {
  console.error(error, ...removeFunctionsFromObjects(optionalParams));

  if (!pageIsUnloading()) {
    const stringifiedError = error;
    captureSentryException(stringifiedError);
  }
}

export function gizmoLogSecurely(message: string, ...optionalParams: any[]) {
  console.log(message);
  sendGizmoLogForm("INFO", message, optionalParams);
}

export function logWarningSecurely(message: string, ...optionalParams: any[]) {
  console.warn(message);

  if (!pageIsUnloading()) {
    sendGizmoLogForm("WARN", message, optionalParams);

    const moduleState = readModulesState(getStore());
    captureSentryEvent({
      message: `[GizmoLog]${message}`,
      level: Sentry.Severity.Warning,
      tags: {
        session_trackGroup: moduleState.currentTrackGroupID,
        session_page: getPageID(vueApp),
        local_storage_enabled: canAccessLocalStorage().toString()
      },
      extra: { ...removeFunctionsFromObjects(optionalParams) }
    });
  }
}

export function logExceptionSecurely(error: any, ...optionalParams: any[]) {
  console.error(error);

  if (!pageIsUnloading()) {
    const stringifiedError = error;
    sendGizmoLogForm("ERROR", stringifiedError, optionalParams);
    captureSentryException(new Error(`[GizmoLog]${stringifiedError}`));
  }
}

export function logErrorSecurely(message: string, ...optionalParams: any[]) {
  console.error(message);
  if (!pageIsUnloading()) {
    sendGizmoLogForm("ERROR", message, optionalParams);

    const moduleState = readModulesState(getStore());
    captureSentryEvent({
      message: `[GizmoLog]${message}`,
      level: Sentry.Severity.Error,
      tags: {
        session_trackGroup: moduleState.currentTrackGroupID,
        session_page: getPageID(vueApp),
        local_storage_enabled: canAccessLocalStorage().toString()
      },
      extra: { ...removeFunctionsFromObjects(optionalParams) }
    });
  }
}

async function sendGizmoLogForm(
  messageType: string,
  message: string,
  ...optionalParams: any[]
) {
  //send form request
  // URL: https://api.explorelearning.com/api/v3/write-to-log
  // Staging  URL: https://test-api.explorelearning.com/api/v3/write-to-log

  let url = undefined;
  switch (getEnv()) {
    case "production":
      url = "https://api.explorelearning.com/api/v3/write-to-log";
      break;
    case "stage":
      url = "https://test-api.explorelearning.com/api/v3/write-to-log";
      break;
    // case "development":
    //   url= "http://dev-api.explorelearning.com/api/v3/write-to-log";
    //   break;
    // case "debug":
    //   //url= "http://dev-api.explorelearning.com/api/v3/write-to-log";
    //   url= "";
    //   break;
    default:
      url = "https://api.explorelearning.com/api/v3/write-to-log";
      break;
  }

  const bodyFormData = new FormData();

  try {
    bodyFormData.append("MessageType", messageType);
    bodyFormData.append(
      "Message",
      `${message} ${combineOptionalParams(optionalParams)}
      AttemptID: ${readAttemptId(getStore())} SessionID: ${readSessionId(getStore())}
      Project: ${readProjectName(getStore())}
      ProjectGitVersion: ${readProjectGitVersion(
        getStore()
      )} PlayerGitVersion: ${readPlayerGitVersion(getStore())}`
    );
    bodyFormData.append("Key", "SoylentGreen1974");
    bodyFormData.append("Subsystem", `STEMCase_VueApp_${getEnv()}`);
  } catch (error) {
    logError(`loadSimState error: ${error}`);
  }

  const headers = {
    config: { headers: { "Content-Type": "multipart/form-data" } }
  };

  if (url) {
    AxiosRetryInstance
      .post(url, bodyFormData)
      .catch((errors): any => {
        console.error("Cannot Use Gizmo Logs", errors);
        // commented below out because it was hogging sentry with junk errors
        // logError("Cannot Use Gizmo Logs", errors, headers);
      });
  }
}
