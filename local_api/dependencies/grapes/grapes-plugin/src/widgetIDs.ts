import grapesjs from "grapesjs";
import { findIndex, remove } from "lodash";
import { Maybe } from "true-myth";

import { widgetPropDict } from "./components";

/**
 * this is where we will store the IDs of all the widgets that live on the page
 */
export let widgetIDs: widgetIdInfo[] = [];
const codonWheelButtonIDs = [
	"cw-G",
	"cw-U",
	"cw-C",
	"cw-A",
	"cw-GG",
	"cw-GU",
	"cw-GC",
	"cw-GA",
	"cw-UG",
	"cw-UU",
	"cw-UC",
	"cw-UA",
	"cw-CG",
	"cw-CU",
	"cw-CC",
	"cw-CA",
	"cw-AG",
	"cw-AU",
	"cw-AC",
	"cw-AA",
	"cw-GG",
	"cw-GU",
	"cw-GC",
	"cw-GA",
	"cw-GG",
	"cw-GU",
	"cw-GC",
	"cw-GA",
	"cw-GGG",
	"cw-GGU",
	"cw-GGC",
	"cw-GGA",
	"cw-GUG",
	"cw-GUU",
	"cw-GUC",
	"cw-GUA",
	"cw-GCG",
	"cw-GCU",
	"cw-GCC",
	"cw-GCA",
	"cw-GAG",
	"cw-GAU",
	"cw-GAC",
	"cw-GAA",
	"cw-UGG",
	"cw-UGU",
	"cw-UGC",
	"cw-UGA",
	"cw-UUG",
	"cw-UUU",
	"cw-UUC",
	"cw-UUA",
	"cw-UCG",
	"cw-UCU",
	"cw-UCC",
	"cw-UCA",
	"cw-UAG",
	"cw-UAU",
	"cw-UAC",
	"cw-UAA",
	"cw-CGG",
	"cw-CGU",
	"cw-CGC",
	"cw-CGA",
	"cw-CUG",
	"cw-CUU",
	"cw-CUC",
	"cw-CUA",
	"cw-CCG",
	"cw-CCU",
	"cw-CCC",
	"cw-CCA",
	"cw-CAG",
	"cw-CAU",
	"cw-CAC",
	"cw-CAA",
	"cw-AGG",
	"cw-AGU",
	"cw-AGC",
	"cw-AGA",
	"cw-AUG",
	"cw-AUU",
	"cw-AUC",
	"cw-AUA",
	"cw-ACG",
	"cw-ACU",
	"cw-ACC",
	"cw-ACA",
	"cw-AAG",
	"cw-AAU",
	"cw-AAC",
	"cw-AAA"
];

export interface widgetIdInfo {
	value: string; // actual id string
	name: string; // display name
	type: string; // widget type
	model: grapesjs.Component; // grapes component model
}

export function AddWidgetID(
	widgetID: string,
	widgetName: string,
	widgetType: string,
	grapesModel: grapesjs.Component
) {
	// console.log("AddWidgetID", widgetID, widgetType, widgetName, grapesModel);
	if (!WidgetIDExists(widgetID)) {
		widgetIDs.push({
			value: widgetID,
			name: FormatWidgetName(widgetName, widgetID, widgetType),
			type: widgetType,
			model: grapesModel
		});
		if (widgetType === "WidgetCodonWheel") {
			AddCodonWheelIDs(widgetName, grapesModel);
		}
	}
	// console.log("widgetIDs", widgetIDs);
}

function AddCodonWheelIDs(widgetName: string, grapesModel: grapesjs.Component) {
	for (let buttonID of codonWheelButtonIDs) {
		AddWidgetID(buttonID, widgetName, "codon-button", grapesModel);
	}
}

export function RemoveWidgetID(widgetID: string) {
	// console.log("RemoveWidgetID", widgetID);
	// console.log("widgetIDs", widgetIDs);
	const removed = remove(widgetIDs, idObj => idObj["value"] === widgetID);
	for (let r of removed) {
		if (r.type === "WidgetCodonWheel") {
			for (let buttonID of codonWheelButtonIDs) {
				RemoveWidgetID(buttonID);
			}
		}
	}
}

export function RemoveAllWidgetIDs() {
	// console.log("Remove all widget IDs");
	widgetIDs = [];
}

export function ChangeWidgetName(widgetID: string, newName: string) {
	const index = findIndex(widgetIDs, idObj => idObj["value"] === widgetID);
	if (index === -1) {
		console.warn("couldn't find widget with id", widgetID);
	} else {
		widgetIDs[index].name = FormatWidgetName(
			newName,
			widgetID,
			widgetIDs[index].type
		);
		if (widgetIDs[index].type === "WidgetCodonWheel") {
			for (let buttonID of codonWheelButtonIDs) {
				ChangeWidgetName(buttonID, newName);
			}
		}
	}
}

function FormatWidgetName(name: string, id: string, type: string) {
	return name + " (" + id + ") [" + type + "]";
}

export function WidgetIDExists(widgetID: string) {
	return findIndex(widgetIDs, idObj => idObj["value"] === widgetID) !== -1;
}

export function GetAllWidgetsIDsArray() {
	return widgetIDs
		.filter(wi => {
			return wi.type != "codon-button";
		})
		.map(idObj => idObj.value);
}

export function GetAllWidgetsNamesArray() {
	return widgetIDs
		.filter(wi => {
			return wi.type != "codon-button";
		})
		.map(idObj => idObj.name);
}

export function GetWidgetType(widgetID: string): Maybe<string> {
	const index = findIndex(widgetIDs, idObj => idObj["value"] === widgetID);
	if (index === -1) {
		console.warn("couldn't find widget with id", widgetID);
		return Maybe.nothing();
	}
	return Maybe.of(widgetIDs[index].type);
}
//"src-mp4", "src-webm", "src-mp4ios" are not reactive, do not include them as valid props
const filteredKeyNames = ["id", "srcMp4", "srcWebm", "srcMp4ios", "poster", "controls", "enableScrub", ];
export function GetWidgetKeys(widgetID: string): Maybe<string[]> {
	const widgetType = GetWidgetType(widgetID);
	if (widgetType.isNothing()) return Maybe.nothing();

	const type = Maybe.unsafelyUnwrap(widgetType);

	const props = widgetPropDict[type];

	// filter
	const noObjects = props.filter(prop => prop.type !== "object");
	const notID = noObjects.filter(
		prop => filteredKeyNames.indexOf(prop.name) === -1
	);
	const names = notID.map(prop => prop.name);
	return Maybe.of(names);
}

export function GetWidgetKeyType(widgetID: string, key: string): Maybe<string> {
	const widgetType = GetWidgetType(widgetID);
	if (widgetType.isNothing()) return Maybe.nothing();

	const type = Maybe.unsafelyUnwrap(widgetType);

	const props = widgetPropDict[type];
	//@ts-ignore
	const index = findIndex(props, prop => prop["name"] === key);
	if (index === -1) {
		console.warn(
			"couldn't find key type on widgetID",
			widgetID,
			"key",
			key,
			"props",
			props
		);
		return Maybe.nothing();
	}
	return Maybe.of(props[index].type);
}

function GetRadioGroups() {
	const allRadioIDs = widgetIDs.filter(idObj => idObj.type === "WidgetRadio");
	const radioGroupDict = {};
	for (let radio of allRadioIDs) {
		const attr = radio.model.get("attributes");
		if (attr.group !== undefined) {
			if (!radioGroupDict[attr.group]) radioGroupDict[attr.group] = [];
			radioGroupDict[attr.group].push(radio);
		}
	}
	return radioGroupDict;
}

export function GetRadioGroupNamesArray() {
	let groups = Object.keys(GetRadioGroups());
	if (groups.length === 0) groups = [""];
	return groups;
}

export function GetRadioGroupRadioIDsArray(group: string) {
	const groupDict = GetRadioGroups();
	let IDsArray = [""];
	if (groupDict[group]) IDsArray = groupDict[group].map(obj => obj.value);
	return IDsArray;
}

export function GetRadioGroupRadioNamesArray(group: string) {
	const groupDict = GetRadioGroups();
	let namesArray = [""];
	if (groupDict[group]) namesArray = groupDict[group].map(obj => obj.name);
	return namesArray;
}

export function GetWidgetTypesObjs(types: Array<string>) {
	return widgetIDs.filter(idObj => types.indexOf(idObj.type) !== -1);
}

export function GetWidgetTypesIDsArray(types: Array<string>) {
	let IDs = GetWidgetTypesObjs(types).map(obj => obj.value);
	if (IDs.length === 0) IDs = [""];
	return IDs;
}

export function GetWidgetTypesNamesArray(types: Array<string>) {
	let names = GetWidgetTypesObjs(types).map(obj => obj.name);
	if (names.length === 0) names = [""];
	return names;
}
