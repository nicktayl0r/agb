import axios from "axios";
import grapesjs, { BlockManagerInstance } from "grapesjs";

import loadArrow from "./blocks/arrow";
import loadAssessments from "./blocks/assessments";
import loadBasic from "./blocks/basic";
import loadButtonBlocks from "./blocks/buttons";
import loadFunctionality from "./blocks/funtionality";
import loadPageBlocks from "./blocks/page";
import loadPageCaseBlocks from "./blocks/pageCase";
import loadPageHandbookBlocks from "./blocks/pageHandbook";
import loadTables from "./blocks/tables";
import loadTemplates from "./blocks/templates";
import loadPoppers from "./blocks/poppers";
import loadWidgets from "./blocks/widgets";
import { currentPageID } from "./router";

const assessmentBlocks = require("./blocks/assessments.json");
const arrowBlocks = require("./blocks/arrow.json");
const buttonBlocks = require("./blocks/buttons.json");
const textBlocks = require("./blocks/text.json");
const tableBlocks = require("./blocks/table.json");
const basicBlocks = require("./blocks/basic.json");
const flatLineBlocks = require("./blocks/flatLines.json");
const colorBlockBlocks = require("./blocks/colorBlocks.json");

//a type for the data coming out of the API
export interface blockData {
	id: string;
	label: string;
	category: string;
	content: string;
	attributes: any;
}

export function AddPageIDToString(addTo: string) {
	// console.log("adddddd");
	let toReturn = addTo;
	while (toReturn.includes("$$pageID$$")) {
		toReturn = toReturn.replace("$$pageID$$", "page" + currentPageID);
		// console.log("before: ", addTo, ", after: ", toReturn);
	}
	while (toReturn.includes("$pageID$")) {
		//I suspect the auto blocks are escaping double$ ($$)
		toReturn = toReturn.replace("$pageID$", "page" + currentPageID);
		// console.log("before: ", addTo, ", after: ", toReturn);
	}
	return toReturn;
}

export default (editor: grapesjs.EditorInstance, config) => {
	const bm = editor.BlockManager;

	loadBlocksJson(basicBlocks, bm);
	loadBasic(bm, config);
	loadPageBlocks(bm, config);
	loadPageCaseBlocks(bm, config);
	loadPageHandbookBlocks(bm, config);
	loadBlocksJson(arrowBlocks, bm);
	loadArrow(bm, config);
	loadBlocksJson(buttonBlocks, bm);
	loadButtonBlocks(bm, config);
	loadAssessments(bm, config);
	loadBlocksJson(assessmentBlocks, bm);
	loadFunctionality(bm, config);
	loadPoppers(bm, config);
	loadTables(bm, config);
	loadBlocksJson(textBlocks, bm);
	loadWidgets(bm, config);
	loadBlocksJson(colorBlockBlocks, bm);
	loadBlocksJson(flatLineBlocks, bm);
	loadTemplates(bm, config);

	// axios.defaults.headers.post["Content-Type"] = "application/json";
	axios.defaults.baseURL = config.apiBaseURL;
	axios
		.get("editor/blocks")
		.then(res => {
			const block_Data = res.data as blockData[];
			// for (const block of block_Data) {
			// 	block.content = AddPageIDToString(block.content);
			// }
			loadBlocksJson(block_Data, bm);
			CloseAllCategories(bm);
		})
		.catch(error => {});

	CloseAllCategories(bm);

	// console.log("categories: ", bm.getCategories());
};

function CloseAllCategories(bm) {
	//close all the block categories
	const allCategories = bm.getCategories() as Backbone.Collection<
		Backbone.Model
	>;
	for (const cat of allCategories.models) {
		cat.set("open", false);
	}
}

function loadBlocksJson(block_Data: blockData[], bm: BlockManagerInstance) {
	if (block_Data && Array.isArray(block_Data)) {
		for (let b of block_Data) {
			bm.add(b.id, {
				label: b.label,
				category: b.category,
				content: AddPageIDToString(b.content),
				attributes: b.attributes || {}
			});
		}
	} else {
		console.error(
			"Cannot get blocks, server response is undefined or not an array"
		);
	}
}

// function Alphabetize(bm: BlockManagerInstance) {
// 	//get the collection and sort?
// }
