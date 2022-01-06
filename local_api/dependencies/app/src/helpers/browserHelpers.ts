//import { gizmoLogSecurely, logError } from "@/helpers/debugHelpers";

export function isChrome() {
  const val = navigator.userAgent.includes("Chrome")
    && !navigator.userAgent.includes("Edge");
  //logMessage("is Chrome?", val);
  return val;
}

export function isFirefox() {
  const val = navigator.userAgent.includes("Firefox");
  //logMessage("is Firefox?", val);
  return val;
}

//Expanded this check based on changes to userAgent string in iOS13
//Based on solution: https://stackoverflow.com/a/58064481
export function isMobileSafari() {
  const val = (navigator.userAgent.includes("iPad")
    || navigator.userAgent.includes("iPhone")
    || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1))
    //@ts-ignore
    && !window.MSStream;
  //logMessage("is mobile Safari?", val);
  return val;
}

export function isSafari() {
  const val = navigator.userAgent.includes("Safari")
    && !navigator.userAgent.includes("Chrome");
  //logMessage("is Safari?", val);
  return val;
}

export function canAccessTopWindow() {
  try {
    return (window.top.location && !window.top.location.href.includes("Exception"));
  } catch (e) { return false; }
}

export function beforeUnloadEvent() {
  if (isMobileSafari()) return "pagehide"; // mobile Safari does not call beforeunload, but calls pagehide before unload. yay
  return "beforeunload";
}

let testLocalStorageEnabled = true;
let isLocalStorageEnabled = false;
export function canAccessLocalStorage() {
  //https://github.com/Modernizr/Modernizr/blob/master/feature-detects/storage/localstorage.js
  if (testLocalStorageEnabled) {
    testLocalStorageEnabled = false;
    try {
      const mod = "modernizr";
      localStorage.setItem(mod, mod);
      localStorage.removeItem(mod);
      isLocalStorageEnabled = true;
    } catch (e) {
      isLocalStorageEnabled = false;
    }
  }

  return isLocalStorageEnabled;
}

