import grapesjs from "grapesjs";

import { assetManager } from "./commands/asset_manager";
import { editSource } from "./commands/edit_source/view/EditSource";
import { projectBlockModal } from "./commands/project_block";

let _editor: grapesjs.EditorInstance;
export default (editor: grapesjs.EditorInstance, config = {}) => {
	_editor = editor;
	editor.Commands.add("edit-source-grapes", editSource); //see panels.ts - edit-source-grapes button
	editor.Commands.add("open-assets", assetManager);

	editor.Commands.add("local-api-save", {
		//see panels.ts - save button
		run: function(editor, sender) {
			editor.on("storage:response", SaveModalSuccess);
			editor.on("storage:error", SaveModalFail);
			console.log("Saving via save button.");
			editor.store((data, text) => {});
			sender.set("active", false);
		},
		stop: function(editor, sender) {}
	});

	editor.Commands.add("project-block-modal", projectBlockModal);
};

function SaveModalSuccess(data) {
	console.log("modal storage:response");
	const modal = _editor.Modal;
	modal.setTitle("Save Completed");
	modal.setContent(
		"<div><span style='color: green'>SUCCESS!</span>. The save action *appears* to have completed successfully.</div>"
	);
	modal.open();
	_editor.off("storage:response", SaveModalSuccess);
	_editor.off("storage:error", SaveModalFail);
}

function SaveModalFail(data) {
	console.log("modal storage:error");
	const modal = _editor.Modal;
	modal.setTitle("Storage Error");
	modal.setContent(
		"<div style='padding: 5px;'><span style='color: red;'>ERROR!</span> There has been an error saving your changes. Please try again.</div> <br> <div style='background-color:white; color:black; padding: 10px;'>" +
			data +
			"</div>"
	);
	modal.open();
	_editor.off("storage:response", SaveModalSuccess);
	_editor.off("storage:error", SaveModalFail);
}
