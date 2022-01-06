import { BlocksEditor } from "./editors/blocks";
import { PagesEditor } from "./editors/pages";
import { ProjectEditor } from "./editors/project";

// console.log("index.ts");
const p = new ProjectEditor("project_editor_holder");
const a = new PagesEditor("allpages_editor_holder");
const b = new BlocksEditor("blocks_editor_holder");
a.emitter.on("onNewPage", (mID, pID, pName) =>
	p.AutoCompleteAdd(mID, pID, pName)
);
a.emitter.on("onDeletePage", (mID, pID) => p.AutoCompleteRemove(mID, pID));
a.emitter.on("onSendAllPages", allData => p.AutoCompleteInitData(allData));
a.emitter.on("onUpdateModule", (mID, changes) =>
	p.AutoCompleteEditModule(mID, changes)
);
// p.emitter.emit("test");
// this.emitter =
