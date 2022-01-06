import { RemoveAllNonWidgetID } from "@/nonWidgetIDs";
import { CSSParser } from "@/utils/CSSParser";
import { RemoveAllWidgetIDs } from "@/widgetIDs";
import { $ } from "backbone";
import css from "css";
import grapesjs, { EditorInstance } from "grapesjs";
import { isEqual } from "lodash";

export function getEditorCSS(editor: EditorInstance): string {
	let css = "";
	const rules = editor.CssComposer.getAll();
	for (let i = 0; i < rules.length; i++) {
		css += rules.at(i).toCSS() + "\n";
	}
	return css;
}


export function orderCssClasses(classes) {
	const classList = classes
		.split(".")
		.filter(c => c.length > 1);

	const pageIDs = classList
		.filter((c) => c.startsWith("page"))
		.map(c => `.${c}`)
		.sort();

	const notPageIDs = classList
		.filter((c) => !c.startsWith("page") && !c.match(/[\s]+/g)) //don't include "classes" that are solely white space either
		.map(c => `.${c}`)
		.sort();

	return [...notPageIDs, ...pageIDs, "{"].join("")
}

export const editSource: any = {
	run(editor: EditorInstance, sender, opts = {}) {
		sender && sender.set && sender.set("active", 0);
		const config = editor.getConfig();
		const pfx = config.stylePrefix;
		this.editor = editor;
		this.cm = editor.CodeManager || null;
		this.initialHTML = "";
		this.initialCSS = "";

		if (!this.$content) {
			const oHtmlEd = this.buildEditor("htmlmixed", "hopscotch", "HTML");
			const oCsslEd = this.buildEditor("css", "hopscotch", "CSS");
			this.htmlEditor = oHtmlEd.el;
			this.cssEditor = oCsslEd.el;

			//Construct HTML
			const $content = $(`<div></div>`);

			const $menu = $(`<div class="${pfx}export-menu">
								<div align="right" class="dropdown">
								<button id='sortCSSButton'>Sort CSS by Name</button>
							<select id="cleanCSSMenu">
								<option value='default'>Clean CSS</option>
								<option>-----------------</option>
								<option value='deleteUnusedCSS'>Delete Unused CSS</option>
								<option value='sortCSSByName'>Sort CSS by Name</option>
							</select>
							</div>
						</div>`);
			$content.append($menu);

			//Attach Editors
			const $editors = $(`<div class="${pfx}export-dl row" > </div>`);
			$editors.append(oHtmlEd.$el);
			$editors.append(oCsslEd.$el);
			$content.append($editors);

			//Create Save Button
			const btnSave = document.createElement("button");
			btnSave.type = "button";
			btnSave.innerHTML = "Save";
			btnSave.className = `${pfx}btn-prim ${pfx}btn-import`;
			btnSave.onclick = (e) => {
				getOpenLayers(editor);
				this.saveSource(e, editor);
				trySetOpenLayers(editor);
			};
			$content.append(btnSave);

			//Create status message
			this.statusMessage = document.createElement("p");
			this.statusMessage.type = "p";
			this.statusMessage.innerHTML = "";
			$content.append(this.statusMessage);

			this.$content = $content;
		}

		this.editor.Modal.setTitle("Edit Source Code");
		this.editor.Modal.setContent(this.$content);

		this.cleanCSSMenu = document.getElementById("cleanCSSMenu");
		this.cleanCSSMenu.onchange = e => {
			this.onChangeMenu(this.cleanCSSMenu);
		};

		this.sortCSSByNameButton = document.getElementById("sortCSSButton");
		this.sortCSSByNameButton.onclick = e => {
			this.onSortCssByName();
		};

		this.applyStyle(`${pfx}export-dl`, "font-size:16px !important;");
		this.applyStyle(`CodeMirror-wrap`, "height:75vh;");
		this.editor.Modal.open();

		this.initialHTML = editor.getHtml();
		// console.log("this.initialHTML", this.initialHTML);
		const namedHTML = this.setAttributeData(
			this.initialHTML,
			this.editor.getComponents()
		);
		// console.log("namedHTML", namedHTML);
		this.initialCSS = getEditorCSS(editor);

		this.statusMessage.innerHTML = "";
		this.htmlEditor.setContent(namedHTML);
		this.cssEditor.setContent(this.initialCSS);
	},

	addRuleToCSSComposer(rule, editor: EditorInstance, mediaText: string = "") {
		const style = {};
		const decls = rule.declarations;
		for (var i in decls) {
			if (decls[i]["type"] == "declaration") {
				style[decls[i]["property"]] = decls[i]["value"];
			}
		}

		//add selectors
		const selectors = new Array();
		let state = "";
		for (var i in rule["selectors"]) {
			var selector_state = rule["selectors"][i].trim().split(/[:]+/);
			if (selector_state.length > 1) {
				state = selector_state[1].trim();
			}

			selector_state = selector_state[0].trim().split(/[.#]+/);

			for (var j in selector_state) {
				if (selector_state[j] != "") {
					selectors.push(editor.SelectorManager.add(selector_state[j]));
				}
			}
		}

		var cssrule = editor.CssComposer.add(selectors, state).set("style", style);
		if (mediaText != "") {
			cssrule.set("mediaText", mediaText);
		}
	},

	deleteUnusedCSS() {
		//Parse StyleString

		//CSS Syntax Tree
		//StyleSheet "type": "stylesheet", "stylesheet": { "rules" : [ rule | media ] }
		//		Rule "type": "rule", "selectors": [ ".c439" ], "declarations":  [ declaration ]
		//			Declaration "type": "declaration", "property": "margin", "value": "100px 100px 25px",
		//		Media "type": "media", "media": "screen and (min-width: 480px)", "rules": [ rule | media? ]
		//			Unclear if a @media can contain additional @media

		// Recurse through ast of css sheet
		// for each rule,
		//    for each selector,
		//        if(selector is a class) search the HTML source for references, if none then remove selector from list
		// repopulate CSS editor from css ast
		var htmlSource: string = this.htmlEditor.editor.getValue().trim();
		CSSParser.parseString(
			this.cssEditor.editor.getValue(),
			(sheetAST, ruleContainer, rule, mediaText) => {
				var selector = "";
				var selectors = rule.selectors;
				for (var i = 0; i < selectors.length; i++) {
					const regex = /[.#]/g;
					selector = selectors[i].replace(regex, " ").trim();
					console.log("selector", selector);
					if (htmlSource.indexOf(selector) == -1) {
						console.log("NO selector:" + rule.selectors[i]);
						rule.selectors.splice(i, 1);
					}
				}
				if (rule.selectors.length == 0) {
					ruleContainer.splice(ruleContainer.indexOf(rule), 1);
				}
				this.cssEditor.setContent(css.stringify(sheetAST));
				console.log("final: " + css.stringify(sheetAST));
			}
		);
	},

	stop(editor) {
		const modal = editor.Modal;
		modal && modal.close();
	},

	buildEditor(codeName, theme, label) {
		const input = document.createElement("textarea");
		!this.codeMirror && (this.codeMirror = this.cm.getViewer("CodeMirror"));

		const el = this.codeMirror.clone();
		el.set({
			label,
			codeName,
			theme,
			input,
			readOnly: 0
		});

		const $el = new this.cm.EditorView({
			model: el,
			config: this.cm.getConfig()
		}).render().$el;

		el.init(input);

		el.editor.refresh(); // this should keep the code from overlapping the line numbers
		const map = {
			"Ctrl-F": "findPersistent", // I find this one a bit more helpful than the default "find"
			"Alt-G": "jumpToLine",
			"Alt-L": "jumpToLine"
		};
		el.editor.addKeyMap(map);

		return { el, $el };
	},

	setAttributeData(html: string, components: any) {
		// console.log("incomming html: ", html, ", components: ", components);
		// make a transversible dom based on the html text, uses jQuery
		const newDom = $(html).filter((index, element) => element.nodeType == 1); //nodeType == 1 means only element nodes (not text, comment, etc)
		console.log("newDom: ", newDom);
		// go through all the grapes models with a matching dom.
		if (components.models) {
			for (let i = 0; i < components.models.length; i++) {
				this.recurseModels(components.models[i], newDom[i]);
			}
		}
		//get the entire page text by creating a temp parent and getting innerHTML
		const temp = $("<div></div>");
		temp.append(newDom);
		// console.log("temp html: ", temp.html());
		return temp.html();
	},

	recurseModels(grapesComp: grapesjs.Component, domElement: HTMLElement) {
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
				this.recurseModels(children[i], domElement.children[i]); //recurse through the children
		}
	},

	applyStyle(className, styleValue) {
		var elems = document.getElementsByClassName(className);
		for (var i = 0; i < elems.length; i++) {
			const item = elems.item(i);
			if (item) {
				item.setAttribute("style", styleValue);
			}
		}
	},

	saveSource(e: MouseEvent, editor: EditorInstance) {
		RemoveAllNonWidgetID();
		RemoveAllWidgetIDs();
		// this prevents grapes from giving components new IDs. It's actually trying to prevent duplicates, but in our case creating them.
		editor.DomComponents.clear();
		editor.DomComponents.componentsById = {};

		try {
			const errors = CSSParser.verify(this.cssEditor.editor.getValue());
			errors.forEach(error => {
				console.log("CSS: " + error.reason + " (line " + error.line + ", col " + error.col + ")" + error.source);
				throw {
					message:
						"Cannot Save - CSS Error: " +
						error.reason +
						" (line " +
						error.line +
						", col " +
						error.col +
						")" +
						error.source
				};
			});
			let style = this.cssEditor.editor.getValue().split("\n");
			// console.log("before style:", style.slice());

			style
				.forEach((cssString, i) => {
					if (cssString.includes(".") && // if a class
						cssString.includes("{") && // if a declaration
						!cssString.includes("@") && // if not a media query
						!cssString.includes(";")) { // if not a property
						style[i] = orderCssClasses(cssString.substring(0, cssString.length - 1)); // strip the opening brackect from our string
					}
				})
			style = style.join("\n");
			// console.log("after style:", style);

			this.cssEditor.setContent(style);

			editor.CssComposer.clear();
			//Add Rules to CSS Composer
			CSSParser.parseString(
				this.cssEditor.editor.getValue(),
				(ast, ruleContainer, rule, mediaText) => {
					this.addRuleToCSSComposer(rule, this.editor, mediaText);
				}
			);

			let savedHTML = this.htmlEditor.editor.getValue().trim();
			// codemirror adds a new line and some spaces before tags
			// which looks nice in the codemirror editor,
			// but is adding unwanted spaces in our pages
			// use a regex to remove the extra whitespace
			savedHTML = savedHTML.replace(/\n\s+</g, "<");
			editor.setComponents(savedHTML);
			editor.Modal.close();
		} catch (ex) {
			console.log(ex);
			this.statusMessage.innerHTML = ex.message;
			editor.setComponents(this.initialHTML);
		}
	},

	onChangeMenu(menuSelect) {
		switch (menuSelect.options[menuSelect.selectedIndex].value) {
			case "deleteUnusedCSS":
				this.deleteUnusedCSS();
				break;
		}
		menuSelect.selectedIndex = 0;
	},

	onSortCssByName() {
		const cssAST = CSSParser.getAST(this.cssEditor.editor.getValue());
		console.log("cssAST: ", cssAST);
		this.sortAndReorder(cssAST.stylesheet.rules); //sort all the non-media rules
		cssAST.stylesheet.rules.forEach(x => {
			if (x.type == "media") {
				this.sortAndReorder(x.rules); //sort the rules array in each media query
			}
		});
		const justMedia = cssAST.stylesheet.rules.filter(x => {
			return x.type == "media";
		});
		for (const media of justMedia) {
			//push all the media queries to the end in the order they are defined.
			const mediaIndex = cssAST.stylesheet.rules.indexOf(media); //get the index
			cssAST.stylesheet.rules.splice(mediaIndex, 1); //delete the item from whereever it is
			cssAST.stylesheet.rules.push(media); //put it at the end
		}
		this.cssEditor.setContent(css.stringify(cssAST));
	},

	sortAndReorder(origArray) {
		const justSelectors = origArray
			.filter(x => {
				return x.type == "rule";
			})
			.map((currVal, index, arr) => {
				return currVal.selectors[0];
			});
		// console.log("justSelectors: ", justSelectors);
		justSelectors.sort(); //sort
		// console.log("justSelectors.sort()", justSelectors.sort());
		//loop through sorted
		for (const s of justSelectors) {
			//first item in justSelectors should be the first in the final list
			const selRule = origArray.find(x => {
				if (x.selectors == undefined) return false;
				else return x.selectors[0] == s;
			}); //find the rule matching the selector
			const selRuleIndex = origArray.indexOf(selRule); //get the index
			origArray.splice(selRuleIndex, 1); //delete the item from whereever it is
			origArray.push(selRule); //put it at the end
		}
		// console.log("sorted rules: ", origArray);
	}
};

let openedLayers; // reeeee, global variables
let selectedBefore;
let selectedAfter;

function getOpenLayers(editor) {
	selectedBefore = editor.getSelected();
	if (selectedBefore) editor.selectRemove(selectedBefore);

	const components = editor.getComponents();
	openedLayers = [];
	recurseFindOpenLayers(components);

}

function recurseFindOpenLayers(components) {
	components.each(comp => {
		if (comp.get("open")) {
			openedLayers.push(comp);
		}
		const children = comp.get("components");
		if (children && children.length > 0) {
			recurseFindOpenLayers(children);
		}
	});
}

function trySetOpenLayers(editor) {
	selectedAfter = undefined;
	const components = editor.getComponents();
	if (openedLayers) recurseCompToOpenLayers(components, editor);

	if (selectedAfter) editor.select(selectedAfter);
	else if (selectedBefore && components.models[0])
		editor.select(components.models[0]);
}

function recurseCompToOpenLayers(components, editor) {
	console.log("recurseCompToOpenLayers", components, openedLayers);
	for (let i = 0; i < components.length; i++) {
		let comp = components.models[i];
		// console.log("comp", comp);
		if (selectedBefore && compMatchComparison(selectedBefore, comp))
			selectedAfter = comp;

		const children = comp.get("components");
		if (!children || children.length == 0) continue;

		for (let open of openedLayers) {
			if (compMatchComparison(open, comp)) {
				// console.log("open", comp.get("custom-name"));
				comp.set("open", true);
				break;
			}
		}
		recurseCompToOpenLayers(children, editor);
	}
}

function compMatchComparison(comp1, comp2) {
	const match =
		comp1.get("tagName") == comp2.get("tagName") &&
		comp1.get("custom-name") == comp2.get("custom-name") &&
		isEqual(comp1.get("classes").models, comp2.get("classes").models) &&
		comp1.get("attributes").id == comp2.get("attributes").id &&
		comp1.get("components").length == comp2.get("components").length;
	if (match)
		console.log(
			"comp1",
			comp1.get("tagName"),
			comp1.get("custom-name"),
			comp1.get("classes").models,
			comp1.get("attributes").id,
			comp1.get("components").length,
			comp1,
			"\ncomp2",
			comp2.get("tagName"),
			comp2.get("custom-name"),
			comp2.get("classes").models,
			comp2.get("attributes").id,
			comp2.get("components").length,
			comp2,
			"\nmatch?",
			match
		);
	return match;
}
