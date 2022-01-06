
import {
  logError,
  logWarning,
  logInfo,
  logWarningSecurely,
  logExceptionSecurely,
  logErrorSecurely
} from "@/helpers/debugHelpers";

import {
  setApollo,
  saveProgressToServer,
} from "@/helpers/serverHelpers";

export function testMessage(event: any) {
  switch (event.data.messageName) {
    case "testGizmoLog":
      console.log("handleMessage: testGizmoLog");
      logWarningSecurely("postMessage: Test Gizmo Log", event.data);
      logExceptionSecurely("postMessage: Test Gizmo Log", event.data);
      logErrorSecurely("postMessage: Test Gizmo Log", event.data);
      break;
    case "testApollo":
      console.log("handleMessage: testApollo");
      setApollo(null);
      saveProgressToServer("testApollo", true);
      break;
    case "testSentry":
      console.log("handleMessage: testSentry");
      logInfo("postMessage: Test Sentry", event.data);
      logWarning("postMessage: Test Sentry", event.data);
      logError("postMessage: Test Sentry", event.data);
      break;
  }
}