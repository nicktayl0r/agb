import axios from "axios";
import { detailedDiff } from "deep-object-diff";
import swal from "sweetalert";

import {
  ShowFailure,
  ShowSuccess,
  ShowWarning,
  ShowWarningDialog,
} from "../utils/alerts";
import Editor from "./editor";

const uuidv4 = require("uuid/v4");

const config = {
  // Enable fetching schemas via ajax
  ajax: true,
  // The schema for the editor
  schema: {
    $ref: require("../schema/allPagesSchema.json"),
  },
  disable_edit_json: true,
  disable_properties: true,
};

interface diff {
  added: {
    case: object;
    guide: object;
    glossary: object;
  };
  deleted: {
    case: object;
    guide: object;
    glossary: object;
  };
  updated: {
    case: object;
    guide: object;
    glossary: object;
  };
}

export class Change {
  constructor(public index: number, public id: string, public name: string) {}
}

class DeletedPage {
  id: string;
  name: string;
  index: number;
  sectionName: string;
  trackName: string;
  delete: boolean;
  found: boolean;

  constructor(id: string, name: string, index: number) {
    this.id = id;
    this.name = name;
    this.index = index;
  }
}

class NewPage {
  name: string = "new";
  "gjs-components": string =
    '[{"tagName":"div","type":"text","name":"","removable":true,"draggable":true,"droppable":false,"badgable":true,"stylable":true,"stylable-require":"","unstylable":"","highlightable":true,"copyable":true,"resizable":false,"editable":true,"layerable":true,"selectable":true,"hoverable":true,"void":false,"state":"","status":"","content":"\\n  Welcome to page ID!\\n","icon":"","style":"","attributes":{},"classes":[{"name":"ID!","label":"ID!","type":1,"active":true,"private":false,"protected":false},{"name":"temp","label":"temp","type":1,"active":true,"private":false,"protected":false}],"script":"","traits":[{"type":"text","label":"","name":"id","min":"","max":"","unit":"","step":1,"value":"","default":"","placeholder":"eg. Text here","changeProp":0,"options":[]},{"type":"text","label":"","name":"title","min":"","max":"","unit":"","step":1,"value":"","default":"","placeholder":"eg. Text here","changeProp":0,"options":[]}],"propagate":"","custom-name":"temp","components":[],"open":false}]';
  "gjs-assets": string = "";
  "gjs-styles": string =
    '[{"selectors":[{"name":"ID!","label":"ID!","type":1,"active":true,"private":false,"protected":false}],"selectorsAdd":"","style":{},"mediaText":"","state":"","stylable":true,"atRuleType":"","singleAtRule":0,"important":0}, {"selectors":[{"name":"temp","label":"temp","type":1,"active":true,"private":false,"protected":false}],"selectorsAdd":"","style":{"margin":"100px 100px 25px","padding":"25px"},"mediaText":"","state":"","stylable":true,"atRuleType":"","singleAtRule":0,"important":0} ]';
  "gjs-css": string = "";
  "gjs-html": string = "";
  constructor(id: string) {
    this["gjs-components"] = this["gjs-components"].replace("ID!", id + "!");
    this["gjs-components"] = this["gjs-components"].replace("ID!", "page" + id);
    this["gjs-components"] = this["gjs-components"].replace("ID!", "page" + id);
    this["gjs-styles"] = this["gjs-styles"].replace("ID!", "page" + id);
    this["gjs-styles"] = this["gjs-styles"].replace("ID!", "page" + id);
  }

  public GetJSON() {
    return {
      name: this.name,
      "gjs-components": this["gjs-components"],
      "gjs-assets": this["gjs-assets"],
      "gjs-styles": this["gjs-styles"],
      "gjs-css": this["gjs-css"],
      "gjs-html": this["gjs-html"],
    };
  }
}

export class PagesEditor extends Editor {
  constructor(elementID: string) {
    super(elementID, config);
    // console.log("pages.ts");
    this.emitter.on("onUpdateModule", (mod, changes) => {
      console.log("Regenerate Edit Page Buttons");
      this.removePageButtons(mod);
      this.addPageButtons(mod);
    });
    this.emitter.on("onDeletePage", (mod, changes) => {
      console.log("Regenerate Edit Page Buttons");
      this.removePageButtons(mod);
      this.addPageButtons(mod);
    });
  }

  editorReady() {
    this.requestData("/pages");
  }

  private _editorCache: any;
  get editorCache(): any {
    // console.trace("editorCache get");
    return this._editorCache;
  }
  set editorCache(newCache: any) {
    // console.trace("editorCache set to: ", newCache);
    this._editorCache = this.deepCopyEditor(newCache);
  }

  deepCopyEditor(toCopy: any) {
    return {
      case: toCopy.case.slice(),
      guide: toCopy.guide.slice(),
      glossary: toCopy.glossary.slice(),
    };
  }

  editorInitialized() {
    // console.log("init");
    this.editorCache = this.editorInstance.getValue();
    this.SetStyles("case");
    this.SetStyles("guide");
    this.SetStyles("glossary");
    this.disablePageIDFields("case");
    this.disablePageIDFields("guide");
    this.disablePageIDFields("glossary");
    this.addPageButtons("case");
    this.addPageButtons("guide");
    this.addPageButtons("glossary");
    this.editorInstance.on("change", () => {
      // console.log("any change: ");
      this.editorOnChange();
      this.editorCache = this.editorInstance.getValue();
    });
    this.sendAllPages();
    this.validatePageFiles();
  }

  SetStyles(module: string) {
    //get case, guide,and glossary tables , set styles to be 100% wide.
    const selector = "root." + module;
    const moduleTable: Element | null = document.querySelector(
      '[data-schemapath="' + selector + '"]'
    );
    if (moduleTable) {
      const pageTable = moduleTable.getElementsByTagName("TABLE")[0];
      (<HTMLElement>pageTable).style.width = "100%"; //give the whole table a width of 100%
      const firstColumn = pageTable
        .getElementsByTagName("THEAD")[0]
        .getElementsByTagName("TH")[0];
      (<HTMLElement>firstColumn).style.width = "75px"; //set the with of the PageID column to 75px
    }
  }

  validatePageFiles() {
    //load editor.json
    let projectPages: any[] = [];
    projectPages = projectPages.concat(
      this.editorCache.case,
      this.editorCache.guide,
      this.editorCache.glossary
    );
    // console.log("projectPages: ", projectPages);
    axios
      .get("project/files")
      .then((res) => {
        //res= get project/files
        const projAssets = res.data;
        //search through all pages, check project directories
        const pageDir = projAssets.directories.find((d) => {
          return d.name === "pages";
        });
        if (pageDir) {
          // console.log("pageDir is good.");
          if (this.directoryHasPages(pageDir, projectPages)) {
            console.log(
              "AllPages - ValidatePageFiles. Check that AllPages have files. PASSED."
            );
          } else {
            console.log(
              "AllPages - ValidatePageFiles. Check that AllPages have files. FAILED."
            );
            ShowWarning(
              "Page Files Missing!",
              "Some pages in All Pages do not have files! The Project Editor autocomplete may show invalid pages. See browser console for details."
            );
          }
        } else {
          ShowFailure(
            "API ERROR!",
            "There was a problem validating your page files. Could not find the 'Pages' directory in your project."
          );
        }
      })
      .catch((error) => {
        console.error(error);
        ShowFailure(
          "DATA ERROR!",
          "There was a problem saving your project. See the browser console for details."
        );
      });
    //load directory
    //cross reference
  }

  directoryHasPages(dirData: any, pages: any[]) {
    // console.log("directoryHasPages: ", dirData, " pages: ", pages);
    for (const page of pages) {
      const pageDir = dirData.directories.find((d) => {
        return d.name === page.id;
      });
      if (!pageDir) {
        console.error(
          "NO directory found in the project for page: ",
          page.id,
          page.name
        );
        return false;
      }
    }
    return true;
  }

  disablePageIDFields(mod: string) {
    const pageArray: any[] = this.editorInstance
      .getEditor("root." + mod)
      .getValue() as any[];
    for (let i = 0; i < pageArray.length; i++) {
      const editor = this.editorInstance.getEditor(
        "root." + mod + "." + i + ".id"
      );
      //@ts-ignore
      editor.input.readOnly = true;
      // this.editorInstance
      // 	.getEditor("root." + mod + "." + i)
      // 	.setValue({ module: mod });
      // this.editorInstance
      // 	.getEditor("root." + mod + "." + i + ".module")
      // 	.disable();
    }
  }

  /*
		Params:
		* mod: string = Module key work e.g. "case" "glossary" "guide"
	*/
  addPageButtons(mod: string) {
    const pageArray: any[] = this.editorInstance
      .getEditor("root." + mod)
      .getValue() as any[];
    for (let i = 0; i < pageArray.length; i++) {
      //get div containing stuff = data-schemapath = root.mod.i
      const selector = "root." + mod + "." + i;
      const pageRow = document.querySelectorAll(
        '[data-schemapath="' + selector + '"]'
      );
      if (pageRow[0]) {
        if (pageRow[0].getElementsByClassName("pageButtons").length == 0) {
          //don't add more than one button
          //make sure the button isn't already there?
          const flexParent = document.createElement("div");
          flexParent.setAttribute("class", "pageButtons");
          pageRow[0].appendChild(flexParent);

          const editButton = document.createElement("a");
          const text = document.createTextNode(" Edit");
          editButton.appendChild(text);
          const pageID = this.editorInstance
            .getEditor("root." + mod + "." + i + ".id")
            .getValue();
          const baseURL = axios.defaults.baseURL!.slice(0, -4);
          editButton.setAttribute("class", "btn btn-primary edit-link");
          editButton.setAttribute(
            "href",
            baseURL + "/dependencies/grapes/dist/#/pages/" + mod + "/" + pageID
          );
          editButton.setAttribute("target", "_blank");
          flexParent.appendChild(editButton);

          const previewButton = document.createElement("a");
          const preview = document.createTextNode("Launch");
          previewButton.appendChild(preview);
          previewButton.setAttribute("class", "btn btn-success launch-link");

          if (mod === "glossary") {
            previewButton.setAttribute(
              "href",
              baseURL +
                "preview/?debug=true?teacherView=true?handbookPages=true#/glossary/" +
                pageID
            );
          } else {
            previewButton.setAttribute(
              "href",
              baseURL +
                "preview/?debug=true?teacherView=true?handbookPages=true#/pages/" +
                pageID
            );
          }
          previewButton.setAttribute("target", "_blank");
          flexParent.appendChild(previewButton);
        }
      }
    }
  }

  removePageButtons(mod: string) {
    const pageArray: any[] = this.editorInstance
      .getEditor("root." + mod)
      .getValue() as any[];
    for (let i = 0; i < pageArray.length; i++) {
      //get div containing stuff = data-schemapath = root.mod.i
      const selector = "root." + mod + "." + i;
      const pageRow = document.querySelectorAll(
        '[data-schemapath="' + selector + '"]'
      );
      if (pageRow[0]) {
        var pageButtonDiv = pageRow[0].getElementsByClassName("pageButtons");
        if (pageButtonDiv[0]) pageButtonDiv[0].remove();
      }
      //append a link element with correct href and class
    }
  }

  sendAllPages() {
    this.emitter.emit("onSendAllPages", this.editorCache);
  }

  editorOnChange() {
    //track when the editor changes
    // console.log("edCache: ", this.editorCache);
    // console.log("edInstance: ", this.editorInstance.getValue());
    const eDiff: diff = detailedDiff(
      this.editorCache,
      this.editorInstance.getValue()
    ) as diff;
    console.log(eDiff);
    this.checkForAdditions(eDiff);
    this.checkForDeletions(eDiff);
    this.checkForUpdates(eDiff);
  }

  checkForAdditions(eDiff: diff) {
    if (eDiff.added.case) {
      const a: any = eDiff.added.case;
      this.createPageEntry(a, "case");
    }
    if (eDiff.added.guide) {
      const a: any = eDiff.added.guide;
      this.createPageEntry(a, "guide");
    }
    if (eDiff.added.glossary) {
      const a: any = eDiff.added.glossary;
      this.createPageEntry(a, "glossary");
    }
    //if added guide, glossary
  }

  createPageEntry(changes: object, mod: string) {
    const keys = Object.keys(changes);
    for (let i = 0; i < keys.length; i++) {
      if (changes[keys[i]].id === " ") {
        console.log("new page!");
        const caseEditor = this.editorInstance.getEditor("root." + mod);
        const curArray = caseEditor.getValue();
        // console.log(curArray);
        curArray[Number(keys[i])].id = uuidv4().split("-")[1];
        // console.log(curArray);
        caseEditor.setValue(curArray);
        this.editorInstance
          .getEditor("root." + mod + "." + Number(keys[i]) + ".id")
          .disable();
        this.newPageRequest(mod, curArray[Number(keys[i])].id);
      }
    }
    //update page buttons
    this.addPageButtons(mod);
  }

  checkForDeletions(eDiff: diff) {
    //load the project once
    if (eDiff.deleted.case || eDiff.deleted.guide || eDiff.deleted.glossary) {
      const cache = this.deepCopyEditor(this.editorCache); //have to keep a copy of the previous version before edits b/c this request is asynchronous
      axios
        .get("project")
        .then((res) => {
          const project = res.data;
          if (eDiff.deleted.case) {
            const a: any = eDiff.deleted.case;
            ShowWarningDialog(
              "Delete Page?",
              () => {
                this.deletePageEntry(a, "case", project, cache);
              },
              () => {
                //canceled, undo delete
                this.undoAllDeletedPages(a, "case", project, cache);
              },
              "Are you sure you want to delete the page?"
            );
          }
          if (eDiff.deleted.guide) {
            const a: any = eDiff.deleted.guide;
            ShowWarningDialog(
              "Delete Page?",
              () => {
                this.deletePageEntry(a, "guide", project, cache);
              },
              () => {
                //canceled, undo delete
                this.undoAllDeletedPages(a, "guide", project, cache);
              },
              "Are you sure you want to delete the page?"
            );
          }
          if (eDiff.deleted.glossary) {
            const a: any = eDiff.deleted.glossary;
            ShowWarningDialog(
              "Delete Page?",
              () => {
                this.deletePageEntryGlossary(a, project, cache);
              },
              () => {
                //canceled, undo delete
                this.undoAllDeletedPages(a, "glossary", project, cache);
              },
              "Are you sure you want to delete the page?"
            );
          }
        })
        .catch((error) => {
          console.log(error);
          ShowFailure(
            "API ERROR!",
            "There was a problem deleting a page. Project data couldn't be loaded. Check the browser console for details."
          );
        });
    }
  }

  deletePageEntry(changes: object, mod: string, project: any, edCache: any) {
    //get a list of missing pages from the current editor instance
    const deletedPages: DeletedPage[] = this.findMissingEditorPages(
      edCache,
      mod,
      this.editorInstance.getValue()
    );
    console.log("delted pages: ", deletedPages);

    for (const toDelete of deletedPages) {
      //review all the pages missing from the editor.
      if (project[mod].tracks[0]) {
        //only search through if there's actually a track
        if (toDelete.found) break; //if the page has been found, stop looking in the next track
        for (const track of project[mod].tracks) {
          // loop module.tracks
          if (track.sections[0]) {
            //only search through sections if there are any
            for (const section of track.sections) {
              // loop tracks.sections
              if (toDelete.found) break; //if the page has been found, stop looking in the next section
              const page = section.pages.find((p) => {
                return p.pageID === toDelete.id;
              });
              if (page) {
                //found a matching ID
                // console.log("page is found, ", toDelete);
                toDelete.sectionName = section.name;
                toDelete.trackName = track.name;
                toDelete.delete = false; //the id exists in the tracks, so delete = false
                toDelete.found = true;
                break;
              } else {
                // console.log(
                // 	"page not found in section ",
                // 	section.name,
                // 	toDelete
                // );
                toDelete.delete = true; //the id doesn't exist in the tracks, so delete = true
              }
            }
          } else toDelete.delete = true; //there aren't any sections, so delete the page.
        }
      } else {
        //there aren't any tracks, so delete the page.
        toDelete.delete = true;
      }
      console.log(toDelete);

      if (toDelete.delete) {
        this.deletePageRequest(mod, toDelete.id);
      } else {
        this.restoreDeletedPage(mod, toDelete);
        // console.log("editor cache post reAdd: ", Object.assign({}, this.editorCache));
        ShowFailure(
          "Delete prevented",
          "The page with id ",
          toDelete.id,
          " was found in the ",
          mod,
          " track: ",
          toDelete.trackName,
          " in section: ",
          toDelete.sectionName,
          ". Remove the page from all ",
          mod,
          " tracks before deleting it."
        );
      }
    }

    if (deletedPages.length > 0) this.disablePageIDFields(mod);
  }

  deletePageEntryGlossary(changes: object, project: any, edCache: any) {
    const mod = "glossary";
    //get a list of missing pages from the current editor instance
    const deletedPages: DeletedPage[] = this.findMissingEditorPages(
      edCache,
      mod,
      this.editorInstance.getValue()
    );
    console.log("delted pages: ", deletedPages);

    for (const toDelete of deletedPages) {
      //review all the pages missing from the editor.
      if (project[mod].tracks[0]) {
        //only search through if there's actually a track
        if (toDelete.found) break; //if the page has been found, stop looking in the next track
        for (const track of project[mod].tracks) {
          // loop module.tracks

          const page = track.pages.find((p) => {
            return p.pageID === toDelete.id;
          });
          if (page) {
            //found a matching ID
            // console.log("page is found, ", toDelete);
            toDelete.trackName = track.name;
            toDelete.delete = false; //the id exists in the tracks, so delete = false
            toDelete.found = true;
            break;
          } else {
            // console.log(
            // 	"page not found in section ",
            // 	section.name,
            // 	toDelete
            // );
            toDelete.delete = true; //the id doesn't exist in the tracks, so delete = true
          }
        }
      } else {
        //there aren't any tracks, so delete the page.
        toDelete.delete = true;
      }
      console.log(toDelete);

      if (toDelete.delete) {
        this.deletePageRequest(mod, toDelete.id);
      } else {
        this.restoreDeletedPage(mod, toDelete);
        // console.log("editor cache post reAdd: ", Object.assign({}, this.editorCache));
        ShowFailure(
          "Delete prevented",
          "The page with id ",
          toDelete.id,
          " was found in the ",
          mod,
          " track: ",
          toDelete.trackName,
          ". Remove the page from all ",
          mod,
          " tracks before deleting it."
        );
      }
    }

    if (deletedPages.length > 0) this.disablePageIDFields(mod);
  }

  findMissingEditorPages(cache: any, mod: string, current: any): DeletedPage[] {
    //a page is missing, return the ID of the missing page.
    // console.log("cache: ", cache);
    // console.log("current: ", current);
    const foundPages: DeletedPage[] = [];
    for (const page of cache[mod]) {
      //for each page that was in the editor.
      // console.log("search: ", page.id);
      const missingPage = current[mod].find((p) => {
        return p.id === page.id;
      });
      if (!missingPage) {
        //missingPage is null, therefore it's missing from the project. Add it to the array to return.
        foundPages.push(
          new DeletedPage(
            page.id,
            page.name,
            cache[mod].indexOf(page) as number
          )
        ); // { id: page.id, name: page.name, index: cache[mod].indexOf(page)  };
      }
    }
    return foundPages;
  }

  deletePageRequest(moduleID: string, pageID: string) {
    axios
      .delete("pages/" + moduleID + "/" + pageID)
      .then((res) => {
        // console.log(res);
        swal({
          title: "Page Deleted",
          text:
            "Successfully deleted page: " +
            pageID +
            " in the " +
            moduleID +
            ".",
          icon: "success",
          // buttons: [true, "Rockin", false, "Cancel"],
        });
        this.emitter.emit("onDeletePage", moduleID, pageID);
      })
      .catch((error) => {
        console.log(error);
        swal({
          title: "API ERROR!",
          text:
            "There was a problem deleting the page: " +
            pageID +
            " in the " +
            moduleID +
            ". \n Pages shown on this page may be out of sync. You'll need to refresh the page to reload the available pages.",
          icon: "error",
          buttons: ["Bummer"],
        });
      });
  }

  undoAllDeletedPages(
    changes: object,
    mod: string,
    project: any,
    edCache: any
  ) {
    const deletedPages: DeletedPage[] = this.findMissingEditorPages(
      edCache,
      mod,
      this.editorInstance.getValue()
    );
    for (const toDelete of deletedPages) {
      this.restoreDeletedPage(mod, toDelete);
    }
  }

  restoreDeletedPage(mod: string, wasDeleted: DeletedPage) {
    const moduleEditor = this.editorInstance.getEditor("root." + mod);
    const curArray = moduleEditor.getValue() as object[];
    // console.log("splice: ", deletedID.index, 0, {id: deletedID.id, name: deletedID.name}, "current count: ", curArray.length);
    curArray.splice(wasDeleted.index, 0, {
      id: wasDeleted.id,
      name: wasDeleted.name,
    }); //put page back where you got it
    // console.log("splice: after count: ", curArray.length);
    moduleEditor.setValue(curArray); //set the editor data back
    // console.log("caseEditor setValue: ", moduleEditor.getValue());

    //I don't understand why I have to do this nasty bit of object editing, but otherwise, the fixed array isn't retained. It's always missing the final element.
    //I'm getting the module editor from the instance, and setting the moduleEditor value.... this.editorInstance.getValue() should be correct, but it isn't
    const ed: any = Object.assign({}, this.editorInstance.getValue());
    ed[mod] = moduleEditor.getValue();
    this.editorInstance.setValue(ed);
    //end nasty
    // console.log("edInstance getValue: ", this.editorInstance.getValue());
    this.editorCache = this.editorInstance.getValue(); //set the editor cache back so we dont' get looping change events
  }

  newPageRequest(moduleID: string, pageID: string) {
    // console.log("request ", "moduleID: ", moduleID, "pageID: ", pageID);
    const newPage = new NewPage(pageID);
    axios
      .post("pages/" + moduleID + "/" + pageID, newPage.GetJSON())
      .then((res) => {
        // console.log(res);
        ShowSuccess(
          "Page Created!",
          "Successfully created a new page: ",
          pageID,
          " in the ",
          moduleID,
          "."
        );
        this.emitter.emit("onNewPage", moduleID, pageID, newPage.name);
      })
      .catch((error) => {
        console.log(error);
        ShowFailure(
          "API ERROR!",
          "There was a problem saving your new page: ",
          pageID,
          " to the ",
          moduleID,
          ". Pages shown on this page may be out of sync. You'll need to refresh the page to reload the available pages."
        );
      });
  }

  checkForUpdates(eDiff: diff) {
    if (eDiff.updated.case && !eDiff.deleted.case) {
      if (Object.keys(eDiff.updated.case).length > 0) {
        if (!eDiff.updated.case[Object.keys(eDiff.updated.case)[0]].module) {
          console.log("case: we have an update that isn't part of a delete");
          this.collectChanges(eDiff.updated.case, "case");
        }
      }
    }
    if (eDiff.updated.guide && !eDiff.deleted.guide) {
      if (Object.keys(eDiff.updated.guide).length > 0) {
        if (!eDiff.updated.guide[Object.keys(eDiff.updated.guide)[0]].module) {
          console.log("guide: we have an update that isn't part of a delete");
          this.collectChanges(eDiff.updated.guide, "guide");
        }
      }
    }
    if (eDiff.updated.glossary && !eDiff.deleted.glossary) {
      if (Object.keys(eDiff.updated.glossary).length > 0) {
        if (
          !eDiff.updated.glossary[Object.keys(eDiff.updated.glossary)[0]].module
        ) {
          console.log("guide: we have an update that isn't part of a delete");
          this.collectChanges(eDiff.updated.glossary, "glossary");
        }
      }
    }
  }

  collectChanges(modDiff: any, mod: string) {
    const keys = Object.keys(modDiff);
    const changeArray: Change[] = [];
    for (let i = 0; i < keys.length; i++) {
      if (modDiff[keys[i]].id) {
        changeArray.push(
          new Change(
            Number(keys[i]),
            modDiff[keys[i]].id,
            modDiff[keys[i]].name
          )
        );
      } else {
        const page = this.editorCache[mod][Number(keys[i])];
        console.log(page);
        changeArray.push(
          new Change(Number(keys[i]), page.id, modDiff[keys[i]].name)
        );
      }
    }
    axios
      .post("pages/" + mod, changeArray)
      .then((res) => {
        console.log("Successfully edited modules");
        this.emitter.emit("onUpdateModule", mod, changeArray);
      })
      .catch((error) => {
        console.log(error);
        ShowFailure(
          "API ERROR",
          "There was a problem saving your changes. Check the browser console for details."
        );
      });
  }
}
