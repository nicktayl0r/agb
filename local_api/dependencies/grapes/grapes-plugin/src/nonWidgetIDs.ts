import grapesjs from "grapesjs";
import { remove } from "lodash";

import { widgetIdInfo } from "./widgetIDs";

export let nonWidgetIDs: widgetIdInfo[] = [];

export function AddNonWidgetID(
	ID: string,
	name: string,
	type: string,
	grapesModel: grapesjs.Component
) {
	console.log("Add nonWidget ID", ID, type, name, grapesModel);
	nonWidgetIDs.push({
		value: ID,
		name: name + " (" + ID + ") [" + type + "]",
		type: type,
		model: grapesModel
	});
}

export function RemoveNonWidgetID(ID: string) {
	console.log("Remove nonWidget ID", ID);
	remove(nonWidgetIDs, idObj => idObj["value"] === ID);
}

export function RemoveAllNonWidgetID() {
	console.log("Remove all nonWidget IDs");
	nonWidgetIDs = [];
}
