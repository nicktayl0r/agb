import { Maybe } from "true-myth";

import {
  Response,
  ServerResponseDataJsonPair,
  SharedDataResponse,
  WidgetResponse
} from "@/data models/responseModels";
import { RubricRevision } from "@/data models/rubricModels";
import { widgetValPrimitive } from "@/data models/widgetModels";
import { logMessage, logError } from "@/helpers/debugHelpers";
import { delay } from "../helpers/timeHelpers";
import { getStore } from "@/helpers/storeHelpers";
import { WidgetPropEntryOverride } from "@/helpers/widgetHelpers";
import { readProjectUserSharedDataVal } from "@/store/modules/appData";
import { readAttemptId } from "@/store/modules/authData";
import {
  commitRubricStateRevision,
  commitSetWidgetEntry,
  dispatchMutateActivityResponse,
  readAllRubricStates,
  readRubricState,
  readUserSharedDataEntryVal,
  readWidgetEntryVal
} from "@/store/modules/userData";
import { clone } from "ramda";

export async function sendResponse(
  response: Response,
  pageID: string,
  parentWidgetID: string
) {
  if (response.fireOnceID != undefined && response.fireOnceID !== "") {
    //check the store to see if it's been sent already
    const maybeFired = readWidgetEntryVal(getStore())(
      pageID,
      parentWidgetID,
      response.fireOnceID
    );

    if (maybeFired.isJust()) {
      logMessage(`response ${response.fireOnceID} has already fired`);
      return;
    }
  }

  const attemptId = readAttemptId(getStore());

  await delay(1); // because of the debounces in wigets data might not be written yet, so wait a second

  //console.log("TODO: send response", response.rubricID, response.val);
  switch (response.responseData.responseType) {
  case "sharedData":
    sendSharedDataResponse(attemptId, response);
    break;
  case "widget":
    sendWidgetResponse(attemptId, response, pageID);
    break;
  case "radioGroup":
    sendRadioGroupResponse(attemptId, response, pageID);
    break;
  case "revisableWidget":
    sendRevisableWidgetResponse(attemptId, response, pageID);
    break;
  }

  if (response.fireOnceID != undefined && response.fireOnceID !== "") {
    commitSetWidgetEntry(getStore(), {
      pageID,
      widgetID: parentWidgetID,
      key: response.fireOnceID,
      value: true
    });
  }
}

function sendSharedDataResponse(attemptId: number, response: Response) {
  if (response.responseData.responseType == "sharedData") {
    const maybeSharedData = readUserSharedDataEntryVal(getStore())(
      response.responseData.sharedDataKey
    );
    let responseVal: Maybe<widgetValPrimitive>;
    logMessage("sharedDataVal is nothing: ", Maybe.isNothing(maybeSharedData));
    if (Maybe.isNothing(maybeSharedData)) {
      const projectDataVal = readProjectUserSharedDataVal(getStore())(
        response.responseData.sharedDataKey
      );
      logMessage(
        "projectDataVal is nothing: ",
        Maybe.isNothing(projectDataVal)
      );
      responseVal = projectDataVal;
    } else responseVal = maybeSharedData; //actually should be safe since we know it's not nothing

    if (responseVal.isJust()) {
      const responseString = FormatNumericalDescriptor(
        responseVal.unsafelyUnwrap().toString(),
        response.responseData
      );
      const responseData: ServerResponseDataJsonPair[] = [
        {
          response: responseString
        }
      ];
      logMessage(
        "sendSharedDataResponse - rubricID:",
        response.rubricID,
        "responseString:",
        responseString,
        "responseData:",
        responseData
      );
      dispatchMutateActivityResponse(getStore(), {
        attemptId,
        rubricId: response.rubricID,
        response: responseString,
        responseData: JSON.stringify(responseData)
      });
    } else {
      logError(
        `${response.responseData.sharedDataKey} is not a sharedDataKey or has an undefined value. Request not sent to SABLE.`
      );
    }
  }
}

function FormatNumericalDescriptor(
  val: string,
  responseData: SharedDataResponse
): string {
  switch (responseData.descriptor) {
  case "numCorrect":
    if (responseData.numCorrectTotal && responseData.numCorrectTotal !== 0) {
      return `${val} out of ${responseData.numCorrectTotal} correct options identified`;
    }
    break;
  case "numAttempts":
    if (val === "1") return "correct in 1 try";
    return `correct in ${val} tries`;
  case "incorrectAfterNumAttempts":
    if (val === "1") return "incorrect after 1 try";
    return `incorrect after ${val} tries`;
  case "none":
    return val.toString();
  }
  return "";
}

function sendWidgetResponse(
  attemptId: number,
  response: Response,
  pageID: string
) {
  if (response.responseData.responseType == "widget") {
    let formattedResponse = "";
    const responseData: ServerResponseDataJsonPair[] = [];
    for (let i = 0; i < response.responseData.headerPairs.length; i++) {
      const pair = response.responseData.headerPairs[i];
      const maybeWwidgetVal = WidgetPropEntryOverride(
        pageID,
        pair.widgetID,
        pair.key
      );

      const widgetVal = maybeWwidgetVal.unwrapOr("");

      if (pair.header.trim() !== "") {
        responseData.push({
          header: pair.header,
          response: widgetVal.toString()
        });
      } else responseData.push({ response: widgetVal.toString() });

      const formatRevision: RubricRevision = {};
      formatRevision[pair.header] = widgetVal;
      formattedResponse += FormatLine(
        response.responseData.format,
        formatRevision,
        i == response.responseData.headerPairs.length - 1
      );
    }
    logMessage(
      "sendWidgetResponse - rubricID:",
      response.rubricID,
      `formattedResponse:|${formattedResponse}|`,
      "responseData:",
      responseData
    );
    dispatchMutateActivityResponse(getStore(), {
      attemptId,
      rubricId: response.rubricID,
      response: formattedResponse,
      responseData: JSON.stringify(responseData)
    });
  }
}

function sendRadioGroupResponse(
  attemptId: number,
  response: Response,
  pageID: string
) {
  if (response.responseData.responseType == "radioGroup") {
    const widgetHeaderPairs = [];
    for (const headerPair of response.responseData.headerPairs) {
      const maybeSelectedRadio = WidgetPropEntryOverride(
        pageID,
        headerPair.group,
        "selected"
      );
      if (maybeSelectedRadio.isJust()) {
        const selectedRadioID = maybeSelectedRadio.unsafelyUnwrap() as string;
        widgetHeaderPairs.push({
          header: headerPair.header,
          widgetID: selectedRadioID,
          key: "value"
        });
      }
    }
    const widgetResponse = clone(response);
    widgetResponse.responseData = {
      responseType: "widget",
      format: response.responseData.format,
      headerPairs: widgetHeaderPairs
    };
    sendWidgetResponse(attemptId, widgetResponse, pageID);
  }
}

function sendRevisableWidgetResponse(
  attemptId: number,
  response: Response,
  pageID: string
) {
  if (response.responseData.responseType == "revisableWidget") {
    commitRubricStateRevision(getStore(), {
      rubricID: response.rubricID,
      header: response.responseData.headerPair.header,
      response: WidgetPropEntryOverride(
        pageID,
        response.responseData.headerPair.widgetID,
        response.responseData.headerPair.key
      )
        .unwrapOr("")
        .toString()
    });
    const rubricState = readRubricState(getStore())(response.rubricID);
    if (rubricState.isJust()) {
      let formattedResponse = "";
      const responseData: ServerResponseDataJsonPair[] = [];
      const state = rubricState.unsafelyUnwrap();
      for (const revision of state.revisions) {
        for (const header in revision) {
          responseData.push({
            header,
            response: revision[header].toString()
          });
        }
        formattedResponse += FormatLine(
          "html",
          revision,
          state.revisions.indexOf(revision) == state.revisions.length - 1
        );
      }
      logMessage(
        "sendRevisableWidgetResponse - rubricID:",
        response.rubricID,
        ", formattedResponse:",
        `|${formattedResponse}|`,
        ", responseData: ",
        responseData
      );
      dispatchMutateActivityResponse(getStore(), {
        attemptId,
        rubricId: response.rubricID,
        response: formattedResponse,
        responseData: JSON.stringify(responseData)
      });
    }
  }
}

function FormatLine(
  formatType: WidgetResponse["format"],
  revision: RubricRevision,
  final: boolean
) {
  let toReturn = "";
  switch (formatType) {
  case "comma":
    for (const header in revision) {
      if (header != undefined && header != "") toReturn += `${header}, `; //add command and space
      if (revision[header] != undefined && revision[header] != "") {
        const escapedResponse = escapeHtml(revision[header].toString());
        toReturn += `${escapedResponse}, `;
      }
    }
    if (final && toReturn.slice(-2) == ", ") toReturn = toReturn.slice(0, -2);
    break;
  case "html":
    for (const header in revision) {
      if (header != undefined && header != "") { toReturn += `<div class='header'>${header}</div>`; }
      if (revision[header] != undefined && revision[header] != "") {
        const escapedResponse = escapeHtml(revision[header].toString());
        toReturn += `<div class='response'>${escapedResponse}</div>`;
      }
    }
    break;
  case "none":
    for (const header in revision) {
      if (header != undefined && header != "") toReturn += header;
      if (revision[header] != undefined && revision[header] != "") {
        const escapedResponse = escapeHtml(revision[header].toString());
        toReturn += escapedResponse;
      }
    }
    break;
  }
  return toReturn;
}

export function escapeHtml(str: string) {
  const div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

// UNSAFE with unsafe strings; only use on previously-escaped ones!
export function unescapeHtml(escapedStr: string): string {
  const div = document.createElement("div");
  div.innerHTML = escapedStr;
  const child = div.childNodes[0];
  return child && child.nodeValue ? child.nodeValue : "";
}

export function sendStoreResponses() {
  const store = getStore();
  const rubrics = readAllRubricStates(store);
  for (const rubricId in rubrics) {
    const rubricState = rubrics[rubricId];
    if (
      rubricState.status !== "received"
      && rubricState.response
      && rubricState.responseData
    ) {
      const attemptId = readAttemptId(store);
      dispatchMutateActivityResponse(store, {
        attemptId,
        rubricId,
        response: rubricState.response,
        responseData: rubricState.responseData
      });
    }
  }
}
