import * as Sentry from "@sentry/browser";
import { Vue as VueIntegration } from "@sentry/integrations";
import Vue from "vue";
import { getEnv } from "@/helpers/envHelpers";

export function initSentry(playerVersion: string) {
  Sentry.init({
    dsn: "https://fd3beb014b434083bd597ff57889fd6f@sentry.explorelearning.com/2",
    integrations: [new VueIntegration({ Vue })],
    release: playerVersion,
    environment: getEnv(),
    //Change motivated by
    //Suggested solution https://github.com/getsentry/sentry-javascript/issues/2210#issuecomment-528831900
    beforeSend(event: any, hint: any) {
      //If the original message was an EVENT instead of an ERROR exception, change parsing
      try {
        if (
          hint
          && hint.originalException !== null
          && hint.originalException !== undefined
          && !(hint.originalException instanceof Error)
        ) {
          const keys = Object.keys(hint.originalException);
          if (keys.length) {
            event.extra.errorProperties = {};
            keys.forEach(key => {
              event.extra.errorProperties[key] = hint.originalException[key];
            });
          }
        }
      } catch (error) {
        console.warn(
          "[sentry] Failed to assign enumerable error properties to extras",
          error
        );
      }
      return event;
    }
  });
}

export function setSentryScope(
  projectName: string,
  projectVersion: string,
  projectGitVersion: string,
  teacherView: string,
  attemptId: number
) {
  Sentry.configureScope((scope) => {
    scope.setTag("project_name", projectName);
    scope.setTag("project_version", projectVersion);
    scope.setTag("project_git_version", projectGitVersion);
    scope.setTag("teacherView", teacherView);
    if (attemptId !== -1) scope.setTag("attemptId", attemptId.toString());
  });
}

export function captureSentryEvent(event: Sentry.Event) {
  Sentry.captureEvent(event);
}

export function captureSentryException(exception: any) {
  Sentry.captureException(exception);
}
