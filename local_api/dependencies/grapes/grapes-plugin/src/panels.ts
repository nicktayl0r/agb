import grapesjs from "grapesjs";

export default (editor: grapesjs.EditorInstance, config) => {
	const swv = "sw-visibility";
	const ful = "fullscreen";
	const prv = "preview";

	editor.Panels.removeButton("options", "export-template");

	editor.Panels.addButton("options", [
		{
			active: true,
			id: swv,
			className: "fa fa-square-o",
			command: swv,
			context: swv,
			attributes: { title: "View components" }
		},
		// doesn't seem to work with custom ui
		// {
		// 	id: prv,
		// 	className: "fa fa-eye",
		// 	command: prv,
		// 	context: prv,
		// 	attributes: { title: "Preview" }
		// },
		{
			id: ful,
			className: "fa fa-arrows-alt",
			command: ful,
			context: ful,
			attributes: { title: "Fullscreen" }
		},
		{
			id: "edit-source-grapes",
			className: "fa fa-code",
			command: "edit-source-grapes",
			attributes: { title: "Edit Source" }
		},
		{
			id: "save",
			className: "fa fa-save icon-save",
			command: "local-api-save",
			attributes: { title: "Save Page" }
		},
		{
			id: "preview-grapes",
			className: "fa fa-space-shuttle",
			command: (editor, sender) => {
				// const storage = editor.StorageManager.get("el");
				const pageID = editor.StorageManager.get("el")
					.get("urlLoad")
					.split("/")
					.pop();
				editor.store();
				const win = window.open(
					config.apiBaseURL.slice(0, -4) +
						"preview?debug=true/#/pages/" +
						pageID,
					"_blank"
				);
				if (win) win.focus();
				console.log("launch!");
			},
			attributes: { title: "Preview Live Page" }
		}
	]);
};
