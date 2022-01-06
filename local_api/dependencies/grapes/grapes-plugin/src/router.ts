import axios from "axios";
import Backbone from "backbone";
import grapesjs from "grapesjs";

export var currentPageID = "";
export var currentModuleID = "";

export default (editor: grapesjs.EditorInstance, config) => {
	const router = Backbone.Router.extend({
		routes: {
			"pages/:moduleID/:pageID": "pageLoad" // #pages/case/1234
		},
		pageLoad: (moduleID, pageID) => {
			console.log("pageLoad", moduleID, pageID);
			currentPageID = pageID;
			currentModuleID = moduleID;
			const storage = editor.StorageManager.get("el");
			storage.set(
				"urlStore",
				config.apiBaseURL + "pages/" + moduleID + "/" + pageID
			);
			storage.set("urlLoad", config.apiBaseURL + "pages/" + pageID);
			// console.log(editor.StorageManager.get("el"));
			editor.StorageManager.setCurrent("el");
			editor.load(data => {
				//callback after data is loaded, set the name for saving purposes.
				console.log("For page: ", pageID, ", editor retreived data: ", data);
				// console.log("loaded page with name: " + data.name);
			});
			axios.defaults.baseURL = config.apiBaseURL;
			axios
				.get("pages/" + pageID + "/name")
				.then(res => {
					const name = res.data;
					document.title = name;
				})
				.catch(error => {});
		}
	});

	const newRouter = new router();

	Backbone.history.start();
};
