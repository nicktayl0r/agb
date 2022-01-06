import { logError, logMessage } from "@/helpers/debugHelpers";
import { isQuitting, quittingPromise } from "@/store/mutationHistoryPlugin";

export async function delay(seconds: number) {
  if (isQuitting()) return Promise.resolve();

  const delayPromise = new Promise<void>(resolve => {
    setTimeout(resolve, seconds * 1000);
  });

  // whichever happens first...
  return Promise.race([delayPromise, quittingPromise]).catch(error => logError("Error in Promise.race", error));
}


let timeDiff = 0;

export async function getInternetTime() {
  // trying to do something similar to this https://www.codeproject.com/Articles/790220/Accurate-time-in-JavaScript
  const localStartTime = new Date().getTime(); // getTime = A number representing the milliseconds elapsed between 1 January 1970 00:00:00 UTC and the given date.
  logMessage("getting internet time. local start time:", localStartTime);

  return new Promise(((resolve, reject) => {
    try {
      const xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 2) {
          const localNow = new Date().getTime();
          const dateHeader = xmlhttp.getResponseHeader("Date");
          if (dateHeader) {
            const halfRequestTime = Math.round((localNow - localStartTime) / 2);
            const localRequestTime = localStartTime + halfRequestTime; // account for network delay
            logMessage(
              "local time. start",
              localStartTime,
              "now",
              localNow,
              "halfRequestTime",
              halfRequestTime,
              "localRequestTime",
              localRequestTime
            );
            const internetTime = new Date(dateHeader).getTime();
            logMessage("internet time", dateHeader, internetTime);
            timeDiff = internetTime - localRequestTime;
            logMessage("time diff", timeDiff);
            resolve(timeDiff);
          } else reject("no date header");
        }
      };
      logMessage("href", window.location.href);
      xmlhttp.open("HEAD", window.location.href, true);
      xmlhttp.send(null);
    } catch (error) {
      logError(error);
      reject(error);
    }
  }));
}

export function getTime() {
  if (timeDiff == 0) {
    // logMessage(
    //   "we don't have internet time yet, we're trusting local time for this one..."
    // );
  }
  const localNow = new Date().getTime();
  const currentTime = localNow - timeDiff;
  // logMessage("currentTime", currentTime);
  return currentTime;
}
