import {
  getPageID,
  notGrapes,
  runPageLoadConditions
} from "../helpers/widgetHelpers";

import debounce from "debounce";


interface debounceDict {
  [key: string]: Function;
}
const dDict: debounceDict = {};

export function debouncedPageLoad(pageID: string): void {
  //Either test if the PAGE AND NOT BLOCK by GLOSSARY

  if (!dDict[pageID]) {
    // console.log("Page.debouncedPageLoad ", pageID, " setup debounce");
    dDict[pageID] = debounce((pageID: string) => {
      if (notGrapes()) runPageLoadConditions(pageID);
    }, 250);
  }
  dDict[pageID](pageID);
}
