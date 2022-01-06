import grapesjs from "grapesjs";

import { getEditorCSS } from "@/commands/edit_source/view/EditSource";
import { compFactories } from "@/components";

export default (
	editor: grapesjs.EditorInstance,
	config: grapesjs.StorageManagerConfig | object
) => {
	const sm = editor.StorageManager;

	sm.setAutosave(false);

	// set to remote, set urls, set as json
	const newStorage = sm.get("remote");
	//newStorage.set("stepsBeforeSave", 2);
	newStorage.set("contentTypeJson", true);

	// overwrite css to avoid grapes sorting media queries
	const defaultCssComposerStoreFunction = editor.CssComposer.store;
	editor.CssComposer.store = function(noStore) {
		let obj = defaultCssComposerStoreFunction.apply(
			editor.CssComposer,
			arguments
		);
		obj["css"] = getEditorCSS(editor);
		return obj;
	};

	newStorage.store = (data, clb, clbErr) => {
		const body = {};

		for (let key in data) {
			console.log(key, data[key]);
			if (key == "gjs-components") {
				// don't let grapes store traits
				// if we change them grapes will want to use the old version
				body[key] = removeTraitsFromJSONArray(data[key]);
			} else body[key] = data[key];
		}

		newStorage.request(newStorage.get("urlStore"), { body }, clb, clbErr);
	};
	newStorage.onResponse = (text, clb) => {
		const em = newStorage.get("em");
		const complete = newStorage.get("onComplete");
		const typeJson = newStorage.get("contentTypeJson");
		const parsable = text && typeof text === "string";

		const res = typeJson && parsable ? JSON.parse(text) : text;

		// console.log("res", res);
		if (res["gjs-components"]) {
			// if an imcoming page has traits on components
			// remove them so we get fresh traits from our components
			res["gjs-components"] = removeTraitsFromJSONArray(res["gjs-components"]);
		}

		// if components are not modularized (everything is in build.js)
		// complete && complete(res);
		// clb && clb(res);
		// em && em.trigger("storage:response", res);

		// else call the factory functions from components.ts to get promises
		const compFactoriesPromiseArray = compFactories.map(cf => cf());
		// wait until all component promises finish, then load the page
		Promise.all(compFactoriesPromiseArray).then(() => {
			console.log("components all loaded, load the page");
			complete && complete(res);
			clb && clb(res);
			em && em.trigger("storage:response", res);
		});
	};

	// console.log("storage.js ---");
	sm.add("el", newStorage);
	// console.log("new storage added ---");
	sm.setCurrent("el");
	// console.log("currentStorage is: " + sm.getCurrent());

	//** Events related to storage pass/fail have been moved to commands.ts */
};

export function removeTraitsFromJSONArray(jsonData) {
	const compArrayObj = JSON.parse(jsonData);
	compArrayObj.forEach(comp => {
		removeTraitsFromCompObject(comp);
	});
	console.log("removed traits", compArrayObj);
	return JSON.stringify(compArrayObj);
}

function removeTraitsFromCompObject(compObj) {
	delete compObj.traits;
	const compArray = compObj.components;
	compArray.forEach(comp => {
		delete comp.traits;
		removeTraitsFromCompObject(comp);
	});
}
