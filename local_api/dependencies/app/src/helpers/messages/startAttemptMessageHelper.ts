
import {
  commitInitProjectConfig,
  commitPlayerGitVersion,
  commitProjectGitVersion,
} from "@/store/modules/appData";

import { Project } from "@/data models/projectModels";
import { readAttemptId } from "@/store/modules/authData";
import {
  dispatchGetInitialUserData
} from "@/store/modules/userData";
import { resumeAudio } from "@/managers/audioManager";
import { UserActivityAttemptReturn } from "@/data models/responseModels";

import {
  sendLocalResponses
} from "@/helpers/serverHelpers";

//Helpers
import {
  isServerHealthy,
  setApollo,
  setServerAuth
} from "@/helpers/serverHelpers";
import { getStore } from '@/helpers/storeHelpers';

import { initSentry, setSentryScope } from "@/helpers/sentryHelper";
import { getSimManager } from "@/helpers/simHelpers";
import {
  handleRootPath,
  useTeacherView,
} from "@/helpers/widgetHelpers";

import {
  isDebug,
  logError,
  logMessage,
  logWarning,
  logInfo,
  logWarningSecurely,
  logExceptionSecurely,
  logErrorSecurely,
  gizmoLogSecurely,
} from "@/helpers/debugHelpers";

import { applyStoreDelayedEffects } from "@/helpers/effectHelpers";
import { sendStoreResponses } from "@/helpers/responseHelpers";

import {
  getPlayerVersion,
  getProjectVersion,
  getProjectData
} from "@/helpers/envHelpers";
import { getLoadingBar, getMainApp } from '@/helpers/asyncHelpers';


export type StartAttemptMessage = {
  data: {
    contents: {
      origin?: string,
      attemptID: number,
      sessionID: string
    }
  },
  origin: string
}

export async function startAttempt(event: StartAttemptMessage) {
  try {
    setServerAuth(
      window.origin,
      event.data.contents.attemptID,
      event.data.contents.sessionID
    );
    isServerHealthy();
    const version = await requestProjectVersion();

    // init sentry after env has been set, but before the project is loaded and everything really starts
    initSentry(version.playerVersion);

    const projectData = await getProjectData();

    setProjectConfigData(projectData, version);

    const loadingBar = getLoadingBar() as any;
    if (loadingBar) loadingBar.progressBar.animate(0.5, { duration: 200 });

    if (!isDebug()) {
      const attempt = await getAttempt().catch((err) => {
        logErrorSecurely("getAttempt() reload");
        window.location.reload();
        throw "reload after error in getAttempt()";
      }); //get the attemp data, then navigate to first page.
      //if there was an error getting the attempt then we reload the app and try again.
    }

    applyStoreDelayedEffects();
    sendStoreResponses();
    sendLocalResponses(event.data.contents.attemptID);

    const mainApp = getMainApp();
    mainApp.loading = false;
    handleRootPath(mainApp);

    resumeAudio();
    //compare progress.rubrics with sable rubrics

  } catch (err) {
    logErrorSecurely(
      `startAttempt Message does not contain Attempt# or SessisonID# ${event.origin}`,
      event,
      err
    );
  }
}

export async function requestProjectVersion() {
  // IDEA: Move this Sentry Init to when the application first starts
  //      And then reconfigure the Sentry.configureScope setTags to change the environment,
  //      which can be done after StartAttempt message is received
  const playerVersion = await getPlayerVersion();
  if (playerVersion) {
    logInfo("player version:", playerVersion);
  }
  const projectGitVersion = await getProjectVersion();
  if (projectGitVersion) { logInfo("project version:", projectGitVersion); }

  return { playerVersion, projectGitVersion };
}



export function setProjectConfigData(project: Project, version: { playerVersion: string, projectGitVersion: string }): void {
  commitPlayerGitVersion(getStore(), version.playerVersion.replace("\n", ""));
  commitProjectGitVersion(getStore(), version.projectGitVersion.replace("\n", ""));

  //send sim data
  getSimManager().init(project.sims);
  commitInitProjectConfig(getStore(), project);

  // tag Sentry events with project info
  setSentryScope(
    project.name,
    project.version,
    version.projectGitVersion,
    useTeacherView().toString(),
    readAttemptId(getStore())
  );

}


//Promise will reject if operation fails.
export async function getAttempt(): Promise<UserActivityAttemptReturn | undefined> {
  return new Promise(async (resolve, reject) => {
    let attemptRetries = 0;
    let attempt: UserActivityAttemptReturn | undefined;
    while (!attempt) {
      attempt = await dispatchGetInitialUserData(getStore());
      if (!attempt) {
        switch (attemptRetries) {
          case 0:
            logErrorSecurely(
              "getAttempt() returned an undefined or null attempt."
            );
            break;
          case 4:
            reject("Error - failed to getAttempt");
            return undefined;
        }
        attemptRetries++;
      } else {
        if (attemptRetries > 0) {
          logWarningSecurely("Retrieve attempt success after retry");
        }
        gizmoLogSecurely("getAttempt success");
      }
    }
    //should not be possible to have a null/undefined attempt at this point - the while_loop will retry, or the whole iFrame will reload
    if (attempt.progress === null || attempt.progress === undefined) {
      logErrorSecurely("getAttempt() returned a null or undefined progress.");
      //TODO: Reload the iFrame if the attempt is null
      //call window.location.reload();
    }
    resolve(attempt);
    return attempt;
  });
}


export function openStartAttempt() {
  setApollo(null);
  logMessage("postMessage: openStartAttempt");

}