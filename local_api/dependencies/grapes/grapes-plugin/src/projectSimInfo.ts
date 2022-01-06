import Axios from "axios";
import grapesjs from "grapesjs";
import { concat, findIndex } from "lodash";

import { GetWidgetType, widgetIDs } from "./widgetIDs";

let project: any;
/**
 * this is where we will store sim data straight from the project
 */
let projectSimData: any;
// const sceneAndSimID: { [id: string]: string } = {};
const simStateData: { [id: string]: any } = {};

let projectSharedData: any;

let rubrics: any;

// export const projectSimScenes: simSceneInfo[] = [];
interface simSceneInfo {
	value: string; // actual id string
	name: string; // display name
	type: string; // widget type
	model: grapesjs.Component; // grapes component model
}

interface simStateInfo {
	value: string; // actual id string
	name: string; // display name
	type: string; // widget type
	model: grapesjs.Component; // grapes component model
}

//need to get project data and store the sims
export default function loadProjectSimData() {
	Axios.get("/project")
		.then(res => {
			// console.log(res);
			//set value
			project = res.data;
			projectSimData = res.data.sims;
			projectSharedData = res.data.sharedData;
			// console.log("sim data: ", projectSimData);
			// console.log("projectSimScenes: ", projectSimScenes);
			for (const simID of projectSimData) {
				//sims.[simUID]
				for (const scene of simID.scenes) {
					//sims.[simUID].scenes[scene]
					Axios.get("/sims/" + simID.id) //go ahead and grab all the sim data for each one.
						.then(res => {
							// console.log("all states: ", res.data.simStates);
							//set value
							simStateData[scene.name] = res.data.simStates;
							// console.log("sim state data: ", simStateData[scene.name]);
							// console.log("projectSimScenes: ", projectSimScenes);
						})
						.catch(error => {
							console.log(error);
						});
				}
			}
			// console.log("sceneAndSimID: ", sceneAndSimID);
		})
		.catch(error => {
			console.log(error);
		});
	Axios.get("/rubrics")
		.then(res => {
			// console.log(res);
			//set value
			rubrics = res.data.rubrics;
		})
		.catch(error => {
			console.log(error);
		});
}

export function GetSceneNames(trait: any) {
	const projectSimScenes: simSceneInfo[] = [];
	if (projectSimData) {
		for (const simID of projectSimData) {
			// console.log(simID);
			for (const scene of simID.scenes) {
				projectSimScenes.push({
					value: scene.name,
					name: scene.name + " - " + simID.name,
					type: "widgetSimView",
					model: trait.target
				});
			}
		}
	}

	return projectSimScenes;
}

export function GetSimStates(sceneName: string, trait: any) {
	const sceneSimStates: simStateInfo[] = [];
	const simStates = simStateData[sceneName];
	if (simStates !== undefined) {
		for (const stateID in simStates) {
			// console.log(stateID);
			sceneSimStates.push({
				value: stateID,
				name: simStates[stateID] + " - " + stateID,
				type: "widgetSimView",
				model: trait.target
			});
		}
	} else console.error("GetSimStates - scene not found: " + sceneName);
	// console.log("sceneSimStates: ", sceneSimStates);
	return sceneSimStates;
}

export function GetPlayStates(trait: any) {
	const playStates: simStateInfo[] = [];
	const states: string[] = ["default", "play", "pause", "stop"];
	for (const s of states) {
		// console.log(stateID);
		playStates.push({
			value: s,
			name: s,
			type: "widgetSimView",
			model: trait.target
		});
	}
	// console.log("sceneSimStates: ", sceneSimStates);
	return playStates;
}

interface jsonEditorDropDown {
	ids: string[];
	names: string[];
}

export function GetSimViewSimStatesOptionsByScene(widgetID: string) {
	//get the sceneName on the widget
	let toReturn: jsonEditorDropDown = { ids: [""], names: [""] };
	const index = findIndex(widgetIDs, idObj => idObj["value"] === widgetID);
	if (index === -1) {
		console.warn("couldn't find widget with widgetID: ", widgetID);
	} else {
		const componentModel = widgetIDs[index].model;
		const sceneName = (<any>componentModel.getAttributes()).scenename;
		const simStates = simStateData[sceneName];
		for (const stateID in simStates) {
			toReturn.ids.push(stateID);
			toReturn.names.push(simStates[stateID] + " (" + stateID + ")");
		}
	}
	return toReturn;
}

export function GetSharedDataKeys(trait: any) {
	const projectSharedDataKeys: simSceneInfo[] = [];

	if (!projectSharedData || !project.appSharedData)
		return projectSharedDataKeys;

	for (const sharedID of projectSharedData) {
		// console.log("sharedID: ", sharedID);
		// console.log("shared component: ", trait);
		let name = sharedID.sharedDataID;
		if (sharedID.value != "" && sharedID.value != undefined) {
			name += " - " + sharedID.value;
		}
		const widgetType = GetWidgetType(trait.target.get("attributes").id);
		if (widgetType.isJust()) {
			projectSharedDataKeys.push({
				value: sharedID.sharedDataID,
				name: name,
				type: widgetType.unsafelyUnwrap(),
				model: trait.target
			});
		}
	}
	for (const sharedID of project.appSharedData) {
		// console.log("sharedID: ", sharedID);
		// console.log("shared component: ", trait);
		let name = sharedID.sharedDataID;
		if (sharedID.value != "" && sharedID.value != undefined) {
			name += " - " + sharedID.value;
		}
		const widgetType = GetWidgetType(trait.target.get("attributes").id);
		if (widgetType.isJust()) {
			projectSharedDataKeys.push({
				value: sharedID.sharedDataID,
				name: name,
				type: widgetType.unsafelyUnwrap(),
				model: trait.target
			});
		}
	}
	return projectSharedDataKeys;
}

// export function GetTracksIDsOfModule(trait: any, module: string) {
// 	const projectModuleTracks: simSceneInfo[] = [];
// 	for (const track of project[module].tracks) {
// 		const widgetType = GetWidgetType(trait.target.get("attributes").id);
// 		if (widgetType.isJust()) {
// 			projectModuleTracks.push({
// 				value: track.trackID,
// 				name: track.name + "(" + track.trackID + ")",
// 				type: widgetType.unsafelyUnwrap(),
// 				model: trait.target
// 			});
// 		}
// 	}
// }

export function GetTracksIDsAndNamesOfModule(module: string) {
	//get the sceneName on the widget
	let toReturn: jsonEditorDropDown = { ids: [""], names: [""] };

	if (!project || !project[module]) return;

	for (const track of project[module].tracks) {
		toReturn.ids.push(track.trackID);
		toReturn.names.push(track.name + " (" + track.trackID + ")");
	}
	console.log("GetTracksIDsAndNamesOfModule. toReturn= ", toReturn);
	return toReturn;
}

export function GetPageIDsAndNamesOfModule(module: string) {
	//get the sceneName on the widget
	let toReturn: jsonEditorDropDown = { ids: [""], names: [""] };

	if (!project || !project[module]) return;

	for (const track of project[module].tracks) {
		for (const section of track.sections) {
			for (const page of section.pages) {
				toReturn.ids.push(page.pageID);
				toReturn.names.push(
					page.name + " (" + page.pageID + ") [" + track.name + "]"
				);
			}
		}
	}
	console.log("GetPageIDsAndNamesOfModule. toReturn= ", toReturn);
	return toReturn;
}

export function GetSectionNamesOfModule(module: string) {
	let toReturn: jsonEditorDropDown = { ids: [""], names: [""] };

	if (!project || !project[module]) return;

	for (const track of project[module].tracks) {
		for (const section of track.sections) {
			if (toReturn.ids.findIndex(name => name == section.name) == -1) {
				toReturn.ids.push(section.name);
				toReturn.names.push(section.name);
			}
		}
	}
	console.log("GetSectionNamesOfModule. toReturn= ", toReturn);
	return toReturn;
}

export function GetPageIDsAndNamesOfAllModules() {
	//get the sceneName on the widget
	let toReturn: jsonEditorDropDown = { ids: [""], names: [""] };

	const casePages = GetPageIDsAndNamesOfModule("case");
	if (casePages) {
		for (let i = 0; i < casePages.names.length; i++) {
			casePages.names[i] += " {Case}";
		}
		toReturn.ids = concat(toReturn.ids, casePages.ids);
		toReturn.names = concat(toReturn.names, casePages.names);
	}
	const guidePages = GetPageIDsAndNamesOfModule("guide");
	if (guidePages) {
		for (let i = 0; i < guidePages.names.length; i++) {
			guidePages.names[i] += " {Guide}";
		}
		toReturn.ids = concat(toReturn.ids, guidePages.ids);
		toReturn.names = concat(toReturn.names, guidePages.names);
	}

	console.log(toReturn);

	return toReturn;
}

export function GetPageIDsAndNamesOfGlossary() {
	const module = "glossary";
	//get the sceneName on the widget
	let toReturn: jsonEditorDropDown = { ids: [""], names: [""] };

	if (!project || !project[module]) return;

	for (const track of project[module].tracks) {
		for (const page of track.pages) {
			toReturn.ids.push(page.pageID);
			toReturn.names.push(
				page.name + " (" + page.pageID + ") [" + track.name + "]"
			);
		}
	}
	console.log("GetPageIDsAndNamesOfModule. toReturn= ", toReturn);
	return toReturn;
}

export function GetSharedDataKeys_JsonEditor() {
	//get the sceneName on the widget
	let toReturn: jsonEditorDropDown = { ids: [""], names: [""] };

	if (!project || !project.sharedData) return;

	for (const sharedDataKey of project.sharedData) {
		toReturn.ids.push(sharedDataKey.sharedDataID);
		toReturn.names.push(
			sharedDataKey.sharedDataID +
				" (" +
				sharedDataKey.value +
				") [" +
				typeof sharedDataKey.value +
				"]"
		);
	}
	return toReturn;
}

export function GetAllSharedDataKeys_JsonEditor() {
	//get the sceneName on the widget
	let toReturn: jsonEditorDropDown = { ids: [""], names: [""] };

	if (!project || !project.sharedData || !project.appSharedData) return;

	for (const sharedDataKey of project.sharedData) {
		toReturn.ids.push(sharedDataKey.sharedDataID);
		toReturn.names.push(
			sharedDataKey.sharedDataID +
				" (" +
				sharedDataKey.value +
				") [" +
				typeof sharedDataKey.value +
				"]"
		);
	}
	for (const sharedDataKey of project.appSharedData) {
		toReturn.ids.push(sharedDataKey.sharedDataID);
		toReturn.names.push(
			sharedDataKey.sharedDataID +
				" (" +
				sharedDataKey.value +
				") [" +
				typeof sharedDataKey.value +
				"]"
		);
	}
	return toReturn;
}

export function GetSharedDataKeyValue(sharedDataKey: string) {
	if (!project || !project.sharedData) return undefined;
	const sharedData = project.sharedData.filter(
		sd => sd.sharedDataID == sharedDataKey
	);
	if (sharedData) return sharedData[0].value;

	return undefined;
}

export function GetSharedDataKeyType(sharedDataKey: string) {
	return typeof GetSharedDataKeyValue(sharedDataKey);
}

export function GetRubricIDs() {
	let toReturn: jsonEditorDropDown = { ids: [""], names: [""] };
	if (projectSimData && rubrics) {
		for (const rubric of rubrics) {
			// console.log(simID);
			toReturn.ids.push(rubric.key);
			toReturn.names.push(
				rubric.key + " - " + rubric.resource_activity_rubric_type
			);
		}
	}

	return toReturn;
}
