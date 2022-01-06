import pako from "pako";
import { isEmpty, path } from "ramda";

import { UserActivityAttemptReturn } from "@/data models/responseModels";
import { logException, logInfo, logMessage, logWarning } from "@/helpers/debugHelpers";
import { getStore } from "@/helpers/storeHelpers";
import { doneSaving } from "@/store/mutationHistoryPlugin";
import { GetResponsesLocal } from "@/store/ApolloClient";
import { readAttemptId, readSessionId } from "@/store/modules/authData";
import {
  dispatchMutateActivityResponse,
  dispatchMutateProgress
} from "@/store/modules/userData";
import {
  getEnv,
  setEnvByOrigin,
  EnvironmentOptions
} from "@/helpers/envHelpers";

import {
  CreateApolloClient
} from "@/store/ApolloClient";

import { logError, logWarningSecurely, logErrorSecurely } from "@/helpers/debugHelpers";

import {
  commitAttemptId,
  commitSessionId
} from "@/store/modules/authData";

import { AxiosRetryInstance } from "./requestHelpers";
const ascii85 = require("ascii85");


export const allowedOrigins = [
  "^https://www.explorelearning.com",
  "^https://gizmos.explorelearning.com",
  "^https://test-www.explorelearning.com",
  "^https://test-gizmos.explorelearning.com",
  "^https://apps.elclouddev.net",
  "^https://apps.elcloudstage.net",
  "^https://apps.explorelearning.com",
  "^http://localhost",
  "^http(s{0,1})://10\\.214(\\.[0-9]{1,3}){2}",
  "^http(s{0,1})://10\\.216(\\.[0-9]{1,3}){2}",
  "^http(s{0,1})://10(.[0-9]{1,3}){3}:80[0-9]{2}",
  "^http(s{0,1})://s3.amazonaws.com",
  "^http(s{0,1})://s3.amazonaws.com"
];



function matchPattern(patternList: any, search: string) {
  for (const pattern in patternList) {
    if (search.search(patternList[pattern]) == 0) return true;
  }
  return false;
}

export function isOriginAllowed(origin: string): boolean {
  return matchPattern(allowedOrigins, origin);

}

export function setServerAuth(origin: string, attemptID: number, sessionID: any): any {
  if (attemptID == 0 || attemptID == undefined) {
    logError("startAttempt Attempt# is null");
  }
  if (sessionID == 0 || sessionID == "" || sessionID == undefined) {
    logError("startAttempt session# is null");
  }

  setEnvByOrigin(origin);

  commitSessionId(getStore(), {
    sessionId: sessionID
  });
  commitAttemptId(getStore(), {
    attemptId: attemptID
  });
}

export function getApolloClientUrl(env: string) {
  //@ts-ignore
  const url = {
    "production": "https://sable.explorelearning.com/graphiql",
    "staging": "https://sable.elcloudstage.net/graphiql",
    "development": "https://sable.elclouddev.net/graphiql"
  }[env]
  
  if(!url) {
    logWarningSecurely("getApolloClientUrl getEnv is undefined", env);
  }
  return url;
}

interface StringDict {
  [key: string]: string;
}

export function getSableUrl():string  {
  // we don't know when gizmos will pivot to the new UI, but we need something in place that will not break the cases in the current or new scenario
  // TODO: replace with getApolloClientUrl once the update is complete
  const originServerMap: StringDict = {
    "https://el-gizmos-stage.s3.amazonaws.com": "https://stage-vault.explorelearning.com/graphiql",
    "https://el-gizmos.s3.amazonaws.com": "https://vault.explorelearning.com/graphiql",
    "https://apps.elclouddev.net": "https://sable.elclouddev.net/graphiql",
    "https://apps.elcloudstage.net": "https://sable.elcloudstage.net/graphiql",
    "https://apps.explorelearning.com": "https://sable.explorelearning.com/graphiql",
  }
  
  const sableUrl: string = originServerMap[window.origin] || "https://sable.elclouddev.net/graphiql";

  return sableUrl;
}


export function getApolloHealthURL(environment: string) {
  switch (environment) {
    case "production":
      return "https://vault.explorelearning.com/health";
    case "staging":
      return "https://stage-vault.explorelearning.com/health";
    case "development":
      return "https://dev-vault.explorelearning.com/health";
    default:
      //by default, we will check on production's health
      return "https://vault.explorelearning.com/health";
  }
}


export async function saveProgressToServer(
  stateHistoryJSON: string,
  quitting = false
) {
  if (!connectToServer()) return;

  logMessage("saving");
  const attemptId = readAttemptId(getStore());
  await dispatchMutateProgress(getStore(), {
    attemptId,
    stateHistoryJSON,
    quitting
  });
  doneSaving();
}

function connectToServer() {
  const attemptId = readAttemptId(getStore());
  const sessionId = readSessionId(getStore());
  return sessionId && attemptId && !isEmpty(sessionId) && !isEmpty(attemptId);
}

export function compressJSON(jsonString: string): string {
  // logMessage("compressJSON jsonString", jsonString);
  try {
    const jsonString_zlib = pako.deflate(jsonString);
    // logMessage("compressJSON jsonString_zlib", jsonString_zlib);
    const jsonString_zlib_ascii85 = ascii85.encode(jsonString_zlib).toString();
    //logMessage("compressed json", jsonString_zlib_ascii85);
    return jsonString_zlib_ascii85;
  } catch (err) {
    //TODO: modify to not send jsonString as optionalParam
    logException("json compression failed", err, jsonString);
  }

  return "";
}

export function decompressJSON(jsonString_zlib_ascii85: string): string {
  if (!jsonString_zlib_ascii85) {
    //logWarning("can't decompress undefined value");
    return "";
  }
  try {
    const jsonString_zlib = ascii85.decode(jsonString_zlib_ascii85);
    // logMessage("decompressJSON jsonString_zlib", jsonString_zlib);
    const jsonString = pako.inflate(jsonString_zlib, { to: "string" });
    //logMessage("decompressed json", jsonString);
    return jsonString;
  } catch (err) {
    logException("json decompression failed", err, jsonString_zlib_ascii85);
  }

  return "";
}

let apollo: any = undefined;
export function getApollo() {
  if (apollo === undefined) {
    initializeApollo();
  }

  return apollo;
}

export function setApollo(newApollo: any) {
  apollo = newApollo;
}

function initializeApollo() {
  if (getEnv() != EnvironmentOptions.debug) {
    setApollo(
      CreateApolloClient(
        readSessionId(getStore()),
        getSableUrl()
      )
    );
  }
}


export async function sendLocalResponses(attemptId: number) {
  const localResponses = GetResponsesLocal(attemptId);

  if (localResponses) {
    for (const lr of localResponses) {
      // not awaiting here, so that these can be batched into one http request
      dispatchMutateActivityResponse(getStore(), {
        attemptId,
        rubricId: lr.rubricId,
        response: lr.response,
        responseData: lr.responseData
      });
      logInfo("Recover sendLocalResponse ", lr.rubricId, lr.response);
    }
  }
}

export async function isServerHealthy() {
  //get environment
  //axios request to
  await AxiosRetryInstance
    .get(getApolloHealthURL(getEnv()))
    .then(response => {
      try {
        if (response.status !== 200) {
          logErrorSecurely("isServerHealthy status not 200", getApolloHealthURL(getEnv()), response.status);
        }
        if (!response.data.toString().includes("SABLE is healthy")) {
          logErrorSecurely("isServerHealthy not heathly", getApolloHealthURL(getEnv()), response.data);
        } else {
          logMessage(`isServerHealthy ${response.data}`, getApolloHealthURL(getEnv()));
        }
      } catch (err) {
        logError(`loadSimState error: ${err.name}`);
      }
    })
    .catch(error => logErrorSecurely(`isServerHealthy  ${getApolloHealthURL(getEnv())} error`, error));
}
