import debounce from "debounce";
import { equals } from "ramda";
import { Store } from "vuex";

import { RootState } from "./index";
import { saveProgressToServer } from "@/helpers/serverHelpers";

import {
  isDebug,
  logMessage,
  logError,
  gizmoLogSecurely
} from "@/helpers/debugHelpers";


import { beforeUnloadEvent } from "@/helpers/browserHelpers";


export interface Mutation {
  type: string;
  payload: any;
}

let userHistory: Mutation[] = [];
// debounce so that we only save once a second
const debouncedSaveProgress = debounce(saveProgressToServer, 1000);

export async function saveOnQuit() {
  debouncedSaveProgress.clear();
  const stateHistoryJSON = JSON.stringify(userHistory);
  await saveProgressToServer(stateHistoryJSON, true);
}

let saving = false;

export function doneSaving() {
  logMessage("done saving");
  saving = false;
}

export function waitingForSave() {
  logMessage("waiting for save", saving);
  return saving;
}

const maxMutations = 30;
let prevMutation: Mutation;
export function mutationHistoryPlugin(store: Store<RootState>) {
  // called after every mutation.
  // The mutation comes in the format of `{ type, payload }`.
  store.subscribe((mutation: Mutation, state) => {
    // const nextState = clone(store.state);
    // logMessage("mutation", mutation);
    if (mutation.type.startsWith("userDataStore")) {
      if (prevMutation == undefined) {
        prevMutation = mutation;
        userHistory.push(mutation);
      } else if (!equals(prevMutation, mutation)) {
        logMessage(
          "mutations not equal. prev:  ",
          prevMutation,
          ", mutation: ",
          mutation
        );
        if (
          mutation.payload != undefined
          && mutation.payload.sharedDataID != undefined
          && mutation.payload.value != undefined
        ) {
          //we're dealing with a shared data mutation
          if (
            prevMutation.payload != undefined
            && mutation.payload.sharedDataID == prevMutation.payload.sharedDataID
          ) {
            //new mutation has the same key as the previous, so just store the value in prevMutation and don't add to userHistory
            // console.log(
            // 	"prev mutation and mutation match, replacing last (",
            // 	userHistory.length - 1,
            // 	"). total count=",
            // 	userHistory.length,
            // 	", last = ",
            // 	JSON.stringify(userHistory[userHistory.length - 1])
            // );
            userHistory[userHistory.length - 1] = mutation; //update the last mutation with the new value
            prevMutation = mutation;
          } else {
            //new mutation is sharedData, but not the same key. Push old sharedData mutation.
            userHistory.push(mutation);
            prevMutation = mutation; //now the new shared data mutation is stored in prevMutation
            // console.log(
            // 	"prev mutation and mutation don not match, pushing. total now=",
            // 	userHistory.length
            // );
          }
        } else {
          userHistory.push(mutation);
          prevMutation = mutation;
        }
      }
      if (userHistory.length > maxMutations) {
        userHistory.shift();
      }
      initiateStateHistorySave();
      // console.log("userHistory:", userHistory);
    }
  });
}

function initiateStateHistorySave() {
  if (userHistory.length == maxMutations) logMessage("userHistory is at max length.");
  const stateHistoryJSON = JSON.stringify(userHistory);
  // logMessage("stateHistoryJSON", stateHistoryJSON);
  saving = true;
  logMessage("debouncing save");
  debouncedSaveProgress(stateHistoryJSON);
}

export function loadUserHistory(newHistory: Mutation[]) {
  userHistory = newHistory;
}




let quitting = false;
export function isQuitting() {
  return quitting;
}



// on window close resolve this promise
export const quittingPromise = new Promise(resolve => {
  window.addEventListener(beforeUnloadEvent(), resolve, true); // the third param useCapture = true should make it happen before saveBeforeUnload
})
  .then(async () => {
    gizmoLogSecurely("quiting promise resolved on", beforeUnloadEvent());
  })
  .catch(error => logError("Error in quittingPromise:", error));


export function pageIsUnloading() {
  logMessage("pageIsUnloading?", quitting);
  return quitting;
}


const quittingCustomEvent = new CustomEvent("quitting");

// we want these after the quitting promise
async function saveBeforeUnload(event: Event) {
  quitting = true;
  dispatchEvent(quittingCustomEvent);

  if (waitingForSave()) {
    setTimeout(async () => {
      // this will get called after the user clicks an option in the dialog
      logMessage("dialog dismissed");
      setTimeout(async () => {
        // if the page lives this long after the dialog is dismissed, the user canceled the dialog
        logMessage("user canceled dialog");
        quitting = false;
      }, 2000);
    }, 1);
    if (!isDebug() && event) {
      logMessage("show dialog");
      // this will display a dialog asking the user if they are sure they want to leave the page
      event.preventDefault();
      event.returnValue = true;
    }
    await saveOnQuit();
    gizmoLogSecurely("saveBeforeUnload", "waitingForSave? true");
    return true;
  }
  gizmoLogSecurely("saveBeforeUnload", "waitingForSave? false");
  return false;
}

async function saveOnUnload() {
  logMessage("saveOnUnload");
  // if (waitingForDelayedEffects())	// if (waitingForDelayedEffects())
  // 	logWarning("still waiting for delayed effects in saveOnUnload");
  // last ditch synchronous save if somehow we didn't save everything in beforeunload
  if (waitingForSave()) {
    await saveOnQuit();
  }
}

window.addEventListener(beforeUnloadEvent(), saveBeforeUnload, false); // the third param useCapture = false should make it happen after quittingPromise
window.addEventListener("unload", saveOnUnload, false);