import { Maybe } from "true-myth";
import {
  readAppSharedDataEntryVal,
  readProjectAppSharedDataVal,
  readProjectUserSharedDataVal,
  dispatchAppUpdateSharedData
} from "@/store/modules/appData";
import { getStore } from "@/helpers/storeHelpers";
import {
  readUserSharedDataEntryVal,
  dispatchUserUpdateSharedData
} from "@/store/modules/userData";
import { logError } from "@/helpers/debugHelpers";
import { widgetValPrimitive } from "@/data models/widgetModels";

export function getSharedDataUserOrAppVal(
  store: any,
  sharedDataReadKey: string
) {
  let storeVal;

  const userSharedDataVal = readUserSharedDataEntryVal(store)(
    sharedDataReadKey
  );
  const appSharedDataVal = readAppSharedDataEntryVal(store)(sharedDataReadKey);
  const projectUserSDVal = readProjectUserSharedDataVal(store)(
    sharedDataReadKey
  );
  const projectAppSDVal = readProjectAppSharedDataVal(store)(sharedDataReadKey);

  if (Maybe.isJust(userSharedDataVal)) storeVal = userSharedDataVal.unsafelyUnwrap();
  else if (Maybe.isJust(appSharedDataVal)) storeVal = appSharedDataVal.unsafelyUnwrap();
  else if (Maybe.isJust(projectUserSDVal)) storeVal = projectUserSDVal.unsafelyUnwrap();
  else if (Maybe.isJust(projectAppSDVal)) storeVal = projectAppSDVal.unsafelyUnwrap();

  return storeVal;
}

export function setSharedDataUserOrAppVal(
  pageID: string,
  sharedDataKey: string,
  value: widgetValPrimitive
) {
  const userSharedDataVal = readUserSharedDataEntryVal(getStore())(
    sharedDataKey
  );
  const appSharedDataVal = readAppSharedDataEntryVal(getStore())(sharedDataKey);
  const projectUserSDVal = readProjectUserSharedDataVal(getStore())(
    sharedDataKey
  );
  const projectAppSDVal = readProjectAppSharedDataVal(getStore())(
    sharedDataKey
  );

  if (Maybe.isJust(userSharedDataVal) || Maybe.isJust(projectUserSDVal)) {
    dispatchUserUpdateSharedData(getStore(), {
      pageID,
      sharedDataID: sharedDataKey,
      value
    });
  } else if (Maybe.isJust(appSharedDataVal) || Maybe.isJust(projectAppSDVal)) {
    dispatchAppUpdateSharedData(getStore(), {
      pageID,
      sharedDataID: sharedDataKey,
      value
    });
  } else {
    logError(
      "Cannot setSharedDataUserOrAppVal, key:",
      sharedDataKey,
      "doesn't exist in either UserSharedData or AppSharedData"
    );
  }
}
