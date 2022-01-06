import axios from "axios";
import { $ } from "backbone";
import grapesjs, { EditorInstance } from "grapesjs";

import { currentPageID } from "../../router";

// import _ from "underscore";
let gEditor: EditorInstance;
let blockCats: string[];
let editorBlocks: any;
let projectBlockNames: string[];

export const projectBlockModal: any = {
	run(editor: EditorInstance, sender, opts = {}) {
		gEditor = editor;
		const allBlocksCats = editor.BlockManager.getCategories();
		//@ts-ignore
		blockCats = allBlocksCats.models.map(x => x.get("label"));
		console.log("blockCats= ", blockCats);
		axios.get("/editor/blocks").then(res => {
			editorBlocks = res.data;
			projectBlockNames = editorBlocks.map(x => x.label);
			console.log("projectBlockNames= ", projectBlockNames);
			const html = GenerateHTML();
			// console.log("modal html is: ", html);
			CreateModal(<any>html);
			// CreateModal("<div>hello</div>");
		});
	}
};

function GenerateHTML() {
	const content = $("<div class=''></div>");
	content.append(
		"<p>Create a new block for this project from the selected component. Set a name, category, and optional icon.</p>"
	);
	content.append("<span>Block Name</span>");
	const names = $(
		"<div class='gjs-field gjs-select'><div class='gjs-sm-input-holder'><select id='nameSelect'></select> <div class='gjs-sel-arrow'><div class='gjs-d-s-arrow'></div></div></div></div>"
	);
	const nameSelect = names.find("select");
	nameSelect.append("<option>...</option>");
	for (const n of projectBlockNames) {
		const option = $("<option></option>");
		option.attr("value", n);
		option.append(n);
		nameSelect.append(option);
	}
	content.append(names);
	content.append(
		"<div class='gjs-field'><div class='gjs-input-holder'><input type='text' name='blockName' class='gjs-field' placeholder='Required. Type a new one or choose from the drop down above.'></div></div>"
	);
	content.append("<br>");
	content.append("<span class='gjs-sm-title'>Category</span>");
	const categories = $(
		"<div class='gjs-field gjs-select'><div class='gjs-sm-input-holder'><select id='catSelect'></select> <div class='gjs-sel-arrow'><div class='gjs-d-s-arrow'></div></div></div></div>"
	);
	const catSelect = categories.find("select");
	catSelect.append("<option>...</option>");
	for (const c of blockCats) {
		const option = $("<option></option>");
		option.attr("value", c);
		option.append("<span>" + c + "</span>");
		catSelect.append(option);
	}
	content.append(categories);
	content.append(
		"<div class='gjs-field'><div class='gjs-input-holder'><input type='text' name='category' class='gjs-field' placeholder='Required. Type a new one or choose from the drop down above.'></div></div>"
	);
	content.append("<br>");
	content.append("<span>Icon</span>");
	content.append(
		"<div class='gjs-field'><div class='gjs-input-holder'><input type='text' name='icon' class='gjs-field' placeholder='Type the css classes for the block button. ex: \"fa fa-pencil\"'></div></div>"
	);
	content.append(
		"<a href='https://fontawesome.com/v4.7.0/icons/' class='gjs-four-color-h gjs-two-color' target='_blank'>Supported Icons</a>"
	);
	content.append("<br>");
	content.append("<br>");
	const submit = $(
		"<button id='saveBlock' class='gjs-btn-prim'>Save Block</button>"
	);
	content.append(submit);
	return content;
}

function CreateModal(html: string) {
	console.log("create modal");
	const modal = gEditor.Modal;
	modal.setTitle("Create a Project Block");
	modal.setContent(html);
	modal.open();

	//assign events - has to be one after elements are in the dom
	$("#nameSelect").change(() => {
		$("[name='blockName']").val($("#nameSelect").val() as string);
	});
	$("#catSelect").change(() => {
		$('[name="category"]').val($("#catSelect").val() as string);
	});
	$("#saveBlock").click(() => {
		const name = $("[name='blockName']").val() as string;
		const category = $('[name="category"]').val() as string;
		if (name && category) {
			SaveBlock(name, category, $('[name="icon"]').val() as string);
		}
	});
}

function SaveBlock(name: string, category: string, classes: string) {
	// console.log("save block - name: ", name, ", category: ", category);
	const selModel = gEditor.getSelected();
	console.log("selected model: ", selModel);
	const config = gEditor.getConfig();
	const wrappesIsBody = config.wrappesIsBody;
	//@ts-ignore
	let html = selModel.toHTML();
	html = ReplaceInString(html, "page" + currentPageID, "");
	console.log("html");
	const namedHTML = setAttributeData(html, selModel);
	// console.log("saved html= ", namedHTML);
	const cssc = gEditor.CssComposer;
	let css = gEditor.CodeManager.getCode(selModel, "css", {
		cssc,
		wrappesIsBody,
		keepUnusedStyles: true
	});
	css = ReplaceInString(css, "page" + currentPageID, "$$pageID$$");
	// console.log("saved css= ", css);
	const blockContent = namedHTML + "<style>" + css + "</style>";
	// console.log("blockContent: ", blockContent);
	const blockID = name + "-pB";
	const newblock = {
		id: blockID,
		label: name,
		category: category,
		content: blockContent,
		attributes: {
			class: "customBlock " + classes
		}
	};
	// console.log("newblock: ", newblock);
	const index = projectBlockNames.indexOf(name);
	if (index != -1) editorBlocks[index] = newblock;
	else editorBlocks.push(newblock);
	if (gEditor.BlockManager.get(blockID)) {
		const origBlock = gEditor.BlockManager.get(blockID);
		origBlock.set("label", newblock.label);
		origBlock.set("category", newblock.category);
		origBlock.set("content", blockContent);
		origBlock.set("attributes", newblock.attributes);
	} else gEditor.BlockManager.add(blockID, newblock);
	gEditor.BlockManager.render(gEditor.BlockManager.getAll().toArray());
	axios.post("/editor/blocks", editorBlocks).then(res => gEditor.Modal.close());
}

function ReplaceInString(
	startString: string,
	searchFor: string,
	replaceWith: string
) {
	let toReturn = startString;
	while (toReturn.includes(searchFor)) {
		toReturn = toReturn.replace(searchFor, replaceWith);
	}
	return toReturn;
}

function setAttributeData(html: string, selModel: any) {
	// console.log("incomming html: ", html, ", components: ", components);
	// make a transversible dom based on the html text, uses jQuery
	const newDom = $(html).filter((index, element) => element.nodeType == 1); //nodeType == 1 means only element nodes (not text, comment, etc)
	console.log("newDom: ", newDom);
	// go through all the grapes models with a matching dom.
	// if (components.models) {
	// for (let i = 0; i < components.models.length; i++) {
	recurseModels(selModel, newDom[0]);
	// }
	// }
	//get the entire page text by creating a temp parent and getting innerHTML
	const temp = $("<div></div>");
	temp.append(newDom);
	// console.log("temp html: ", temp.html());
	return temp.html();
}

function recurseModels(
	grapesComp: grapesjs.Component,
	domElement: HTMLElement
) {
	//add data-gjs-custom-name attribute to domElement based on graseComponent.get("custom-name");
	// console.log(
	// 	"recurseModels -- gComp: ",
	// 	grapesComp,
	// 	", domEl: ",
	// 	domElement
	// );
	const compName = grapesComp.getName();
	if (compName) {
		//if the grapes component has a custom name, then give the html an attribute
		// console.log("customName: ", compName);
		if (domElement != undefined)
			domElement.setAttribute("data-gjs-custom-name", compName);
		else console.warn("Could not attach name to element for ", compName);
	}
	const children = grapesComp
		.get("components")
		.models.filter(m => m.get("tagName") != ""); //get any children components that are actual tags
	for (let i = 0; i < children.length; i++) {
		//note: newDom.children = models.get('components');
		if (domElement != undefined)
			recurseModels(children[i], domElement.children[i] as HTMLElement); //recurse through the children
	}
}
