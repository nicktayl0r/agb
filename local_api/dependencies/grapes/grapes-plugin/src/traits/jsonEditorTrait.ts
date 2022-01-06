import grapesjs from "grapesjs";
import jsStringify from "javascript-stringify";
import { cloneDeep, isEmpty } from "lodash";
import { Maybe } from "true-myth";

import { conditionProps } from "../components";
import {
	GetAllSharedDataKeys_JsonEditor,
	GetPageIDsAndNamesOfAllModules,
	GetPageIDsAndNamesOfGlossary,
	GetPageIDsAndNamesOfModule,
	GetRubricIDs,
	GetSectionNamesOfModule,
	GetSharedDataKeys_JsonEditor,
	GetSharedDataKeyType,
	GetSimViewSimStatesOptionsByScene,
	GetTracksIDsAndNamesOfModule,
} from "../projectSimInfo";
import { currentModuleID } from "../router";
import { AddClassAutocompleteToInputMultiple } from "../StyleManagerClassesAutocomplete";
import { removeTraitPropValue } from "../traits";
import {
	GetAllWidgetsIDsArray,
	GetAllWidgetsNamesArray,
	GetRadioGroupNamesArray,
	GetRadioGroupRadioIDsArray,
	GetRadioGroupRadioNamesArray,
	GetWidgetKeys,
	GetWidgetKeyType,
	GetWidgetType,
	GetWidgetTypesIDsArray,
	GetWidgetTypesNamesArray,
} from "../widgetIDs";

export default (editor: grapesjs.EditorInstance, config = {}) => {
	const idListSchema = require("../schemas/idListSchema.json");
	const conditionSchema = require("../schemas/conditionSchema.json");
	const widgetLinkOptionsSchema = require("../schemas/widgetLinkOptionsSchema.json");
	const popperOptionsSchema = require("../schemas/popperOptionsSchema.json");
	const effectsSchema = cloneDeep(conditionSchema);
	effectsSchema.title = "Event Effects";
	effectsSchema.definitions.Condition.properties.comparisons.description =
		"Comparisons are optional on events. If there are no comparisons effectsPass and responsesPass will be applied.";
	effectsSchema.definitions.Condition.properties.evaluateWhen.options.hidden = true;

	editor.TraitManager.addType("json", {
		events: {
			change: "onValueChange"
		},
		getInputEl(): HTMLElement {
			this.model.defaults = {
				jeditor: "",
				modal: "",
				container: "",
				traitSchema: {}
			};

			if (!this.inputEl) {
				// get value from target attributes
				const md = this.model;
				const trg = this.target;
				const name = md.get("name");
				const attrs = trg.get("attributes");

				// gets attribute value or model default
				let value = md.get("value") || attrs[name];
				if (!value) value = '""';

				// create json field element and populate with attr value
				const p = document.createElement("pre");
				p.setAttribute(
					"style",
					"text-align: left; color: white; max-height: 200px"
				);
				p.innerHTML = value;
				this.inputEl = p;

				// hook up onclick event
				p.onclick = this.onFieldClicked.bind(this);
			}
			return this.inputEl;
		},
		populateConditionSchemaWithIDs(schema) {
			console.log("schema", schema);
			this.traitSchema = schema;
			this.traitSchema.definitions.widgetIDs.enum = GetAllWidgetsIDsArray();
			this.traitSchema.definitions.widgetIDs.options.enum_titles = GetAllWidgetsNamesArray();
			this.traitSchema.definitions.radioGroups.enum = GetRadioGroupNamesArray();
			this.traitSchema.definitions.textIDs.enum = GetWidgetTypesIDsArray([
				"WidgetTextbox",
				"WidgetTextarea"
			]);
			this.traitSchema.definitions.textIDs.options.enum_titles = GetWidgetTypesNamesArray(
				["WidgetTextbox", "WidgetTextarea"]
			);
			this.traitSchema.definitions.dropIDs.enum = GetWidgetTypesIDsArray([
				"WidgetDrop"
			]);
			this.traitSchema.definitions.dropIDs.options.enum_titles = GetWidgetTypesNamesArray(
				["WidgetDrop"]
			);

			const trackIDsAndNames = GetTracksIDsAndNamesOfModule(currentModuleID);
			if (trackIDsAndNames) {
				this.traitSchema.definitions.trackIDs.enum = trackIDsAndNames.ids;
				this.traitSchema.definitions.trackIDs.options.enum_titles =
					trackIDsAndNames.names;
			}
			const pageIDsAndNames = GetPageIDsAndNamesOfAllModules();
			if (pageIDsAndNames) {
				this.traitSchema.definitions.pageIDs.enum = pageIDsAndNames.ids;
				this.traitSchema.definitions.pageIDs.options.enum_titles =
					pageIDsAndNames.names;
			}
			const sharedDataKeys = GetSharedDataKeys_JsonEditor();
			if (sharedDataKeys) {
				this.traitSchema.definitions.sharedDataKeys.enum = sharedDataKeys.ids;
				this.traitSchema.definitions.sharedDataKeys.options.enum_titles =
					sharedDataKeys.names;
			}
			const allSharedDataKeys = GetAllSharedDataKeys_JsonEditor();
			if (allSharedDataKeys) {
				this.traitSchema.definitions.allSharedDataKeys.enum =
					allSharedDataKeys.ids;
				this.traitSchema.definitions.allSharedDataKeys.options.enum_titles =
					allSharedDataKeys.names;
			}
			const caseSectionNames = GetSectionNamesOfModule("case");
			if (caseSectionNames) {
				this.traitSchema.definitions.caseSectionNames.enum =
					caseSectionNames.ids;
				this.traitSchema.definitions.caseSectionNames.options.enum_titles =
					caseSectionNames.names;
			}
			const guideSectionNames = GetSectionNamesOfModule("guide");
			if (guideSectionNames) {
				this.traitSchema.definitions.guideSectionNames.enum =
					guideSectionNames.ids;
				this.traitSchema.definitions.guideSectionNames.options.enum_titles =
					guideSectionNames.names;
			}
			const rubricIDs = GetRubricIDs();
			if (rubricIDs) {
				this.traitSchema.definitions.rubricIDs.enum = rubricIDs.ids;
				this.traitSchema.definitions.rubricIDs.options.enum_titles =
					rubricIDs.names;
			}
			const glossaryPageIDsAndNames = GetPageIDsAndNamesOfGlossary();
			if (glossaryPageIDsAndNames) {
				this.traitSchema.definitions.GlossaryPageIDs.enum =
					glossaryPageIDsAndNames.ids;
				this.traitSchema.definitions.GlossaryPageIDs.options.enum_titles =
					glossaryPageIDsAndNames.names;
			}
		},
		populateWidgetLinkOptionsSchemeWithIDs(schema) {
			console.log("schema", schema);
			this.traitSchema = schema;
			const casePageIDsAndNames = GetPageIDsAndNamesOfModule("case");
			if (casePageIDsAndNames) {
				this.traitSchema.definitions.CasePageIDs.enum = casePageIDsAndNames.ids;
				this.traitSchema.definitions.CasePageIDs.options.enum_titles =
					casePageIDsAndNames.names;
			}
			const guidePageIDsAndNames = GetPageIDsAndNamesOfModule("guide");
			if (guidePageIDsAndNames) {
				this.traitSchema.definitions.GuidePageIDs.enum =
					guidePageIDsAndNames.ids;
				this.traitSchema.definitions.GuidePageIDs.options.enum_titles =
					guidePageIDsAndNames.names;
			}
			const glossaryPageIDsAndNames = GetPageIDsAndNamesOfGlossary();
			if (glossaryPageIDsAndNames) {
				this.traitSchema.definitions.GlossaryPageIDs.enum =
					glossaryPageIDsAndNames.ids;
				this.traitSchema.definitions.GlossaryPageIDs.options.enum_titles =
					glossaryPageIDsAndNames.names;
			}
		},

		/**
		 * Handles field clicked event to show modal json-editor
		 */
		onFieldClicked() {
			const p = this.inputEl;

			let jsObj = {};

			try {
				jsObj = eval("(" + p.innerText + ")"); // so we are actually storing an object string literal and not json, so that vue treats it as an object
			} catch (e) {
				alert(e);
				return;
			}

			console.log("conditionSchema", conditionSchema);
			const modelName = this.model.get("name");
			console.log("trait", modelName);

			switch (modelName) {
				case ":conditions": {
					this.populateConditionSchemaWithIDs(conditionSchema);
					break;
				}
				case ":options": {
					const componentID = this.target.get("attributes").id;
					const type = GetWidgetType(componentID);
					if (type.isJust() && Maybe.unsafelyUnwrap(type) === "WidgetPopper") {
						this.traitSchema = popperOptionsSchema;
					}
					if (type.isJust() && Maybe.unsafelyUnwrap(type) === "WidgetLink") {
						this.populateWidgetLinkOptionsSchemeWithIDs(
							widgetLinkOptionsSchema
							);
						}
						break;
					}
					case "correct-drop-ids": {
						this.traitSchema = idListSchema;
						break;
					}
					default: {
						if (conditionProps.indexOf(modelName) !== -1) {
							this.populateConditionSchemaWithIDs(effectsSchema);
						} else this.traitSchema = {};
						break;
					}
				}
				
			console.log("trait schema", this.traitSchema);

			// create json-editor and set to json value
			this.container = document.createElement("div");
			this.container.setAttribute("class", "jsonModal");
			const jeditor = new JSONEditor(this.container, {
				schema: this.traitSchema,
				theme: "bootstrap3"
			});
			this.jeditor = jeditor;

			jeditor.on("change", function () {
				// @ts-ignore: watchlist is real but not in the type definition
				const watchlist = jeditor.watchlist;

				console.log("jsonEditor change", watchlist);

				// @ts-ignore: watchlist is real but not in the type definition
				if (jeditor.watchlist) {
					const watchedPaths = Object.getOwnPropertyNames(watchlist);
					for (let path of watchedPaths) {
						// @ts-ignore: watchlist is real but not in the type definition
						//console.log("path", path, jeditor.watchlist[path]);
						if (path.endsWith("widgetID")) {
							// @ts-ignore
							jeditor.watchlist[path] = [
								() => {
									console.log("widgetID change callback", path);

									const widgetIdEditor = jeditor.getEditor(path);
									if (!widgetIdEditor) return;

									const keyPath = path.replace("widgetID", "key");
									const keyEditor = jeditor.getEditor(keyPath);
									if (!keyEditor) {
										// maybe this is a Add/Remove Classes Effect
										const classesPath = path.replace("widgetID", "classes");
										const classesEditor = jeditor.getEditor(classesPath);
										if (classesEditor) {
											// @ts-ignore
											AddClassAutocompleteToInputMultiple(classesEditor.input);
										}
										return;
									}
									//console.log("keyEditor", keyEditor);
									//@ts-ignore
									const newSchema = keyEditor.original_schema;
									const widgetID: any = widgetIdEditor.getValue();
									if (!widgetID) return;
									console.log(
										"changed widgetID",
										widgetID.toString(),
										"at path",
										path
									);
									const maybeKeys = GetWidgetKeys(widgetID.toString());
									if (maybeKeys.isJust()) {
										newSchema.enum = Maybe.unsafelyUnwrap(maybeKeys);
										console.log("widget keys", newSchema.enum);
										rebuildJSONEditor(keyEditor, newSchema);
									}
								}
							];
						} else if (path.endsWith("key")) {
							// @ts-ignore: watchlist is real but not in the type definition
							jeditor.watchlist[path] = [
								() => {
									console.log("key change callback", path);
									const keyEditor = jeditor.getEditor(path);
									if (!keyEditor) return;

									const widgetIDPath = path.replace("key", "widgetID");
									const widgetEditor = jeditor.getEditor(widgetIDPath);
									if (!widgetEditor) {
										console.warn("couldn't find widgetIDEditor");
										return;
									}
									const widgetID: any = widgetEditor.getValue();
									const key: any = keyEditor.getValue();
									if (!widgetID || !key) return;
									const maybeKeyType = GetWidgetKeyType(
										widgetID.toString(),
										key.toString()
									);
									if (maybeKeyType.isNothing()) {
										//@ts-ignore
										widgetEditor.onChange(false);
										return;
									}

									const keyType = Maybe.unsafelyUnwrap(maybeKeyType);
									console.log(
										"changed key",
										key,
										"at path",
										path,
										"with type",
										keyType
									);

									const comparisonPath = path.replace("key", "comparison");
									const compEditor = jeditor.getEditor(comparisonPath);
									// Update Widget Effect doesn't have a compEditor,
									// so if we can't find it just keep going
									if (compEditor) {
										console.log(compEditor, keyType);
										//@ts-ignore
										let compSchema: any = compEditor.original_schema;
										if (keyType == "number")
											compSchema["$ref"] = "#/definitions/equalityOperatorNum";
										else compSchema["$ref"] = "#/definitions/equalityOperator";
										rebuildJSONEditor(compEditor, compSchema);
									}

									const valPath = path.replace("key", "val");
									const valEditor = jeditor.getEditor(valPath);
									if (!valEditor) {
										console.warn("couldn't find valEditor");
										return;
									}
									//console.log("valEditor", valEditor);
									//@ts-ignore
									let newSchema = valEditor.original_schema;
									newSchema.type = keyType;

									if (key === "dropId") {
										newSchema.allOf = [{ $ref: "#/definitions/dropIDs" }];
									} else if (key === "playState") {
										newSchema.allOf = [{ $ref: "#/definitions/playStates" }];
									} else if (key === "simstateid") {
										const allOptions = GetSimViewSimStatesOptionsByScene(
											widgetID.toString()
										);
										console.log("allOptions: ", allOptions);
										newSchema.allOf = [
											{
												enum: allOptions.ids,
												options: {
													enum_titles: allOptions.names
												}
											}
										];
									} else newSchema.allOf = undefined;

									console.log("newSchema", newSchema);
									rebuildJSONEditor(valEditor, newSchema);
								}
							];
						} else if (path.endsWith("group")) {
							// @ts-ignore: watchlist is real but not in the type definition
							jeditor.watchlist[path] = [
								() => {
									console.log("group change callback", path);
									refreshRadioGroupEditor(path, jeditor);
								}
							];
						} else if (path.endsWith("selected")) {
							// @ts-ignore: watchlist is real but not in the type definition
							jeditor.watchlist[path] = [
								() => {
									console.log("selected change callback", path);
									const selectedEditor = jeditor.getEditor(path);
									if (!selectedEditor) return;

									const selectedVal = selectedEditor.getValue();
									if (!selectedVal) return;

									//console.log(selectedVal);

									const parentPath = path.replace(".selected", "");
									const parentEditor = jeditor.getEditor(parentPath);
									// console.log("parentEditor", parentEditor);
									if (!parentEditor) return;

									let parentObjectEditor;
									//@ts-ignore
									for (let pEditor of parentEditor.editors) {
										if (
											pEditor &&
											pEditor.schema.id == "thisRadioSelectionCondition"
										) {
											parentObjectEditor = pEditor;
											break;
										}
									}
									// console.log("parentObjectEditor", parentObjectEditor);
									if (!parentObjectEditor) return;

									if (selectedVal === "any" || selectedVal === "none") {
										parentObjectEditor.removeObjectProperty("radioID");
									} else {
										parentObjectEditor.addObjectProperty("radioID");
										const groupPath = path.replace("selected", "group");
										refreshRadioGroupEditor(groupPath, jeditor);
									}
								}
							];
						} else if (path.endsWith("sharedDataKey")) {
							// @ts-ignore: watchlist is real but not in the type definition
							jeditor.watchlist[path] = [
								() => {
									console.log("sharedDataKey change callback", path);
									const sdKeyEditor = jeditor.getEditor(path);
									if (!sdKeyEditor) return;

									const sdKeyEdVal: any = sdKeyEditor.getValue();
									const sdKey = sdKeyEdVal.toString();
									console.log("sdKey", sdKey);
									const keyType = GetSharedDataKeyType(sdKey);

									const comparisonPath = path.replace(
										"sharedDataKey",
										"comparison"
									);
									const compEditor = jeditor.getEditor(comparisonPath);
									if (!compEditor) {
										console.warn("couldn't find compEditor");
										return;
									} else {
										console.log(compEditor, keyType);
										//@ts-ignore
										let compSchema: any = compEditor.original_schema;
										if (keyType == "number")
											compSchema["$ref"] = "#/definitions/equalityOperatorNum";
										else compSchema["$ref"] = "#/definitions/equalityOperator";
										rebuildJSONEditor(compEditor, compSchema);
									}

									const valPath = path.replace("sharedDataKey", "val");
									const valEditor = jeditor.getEditor(valPath);
									if (!valEditor) {
										console.warn("couldn't find valEditor");
										return;
									}
									//console.log("valEditor", valEditor);
									//@ts-ignore
									let newSchema = valEditor.original_schema;
									newSchema.type = keyType;
									rebuildJSONEditor(valEditor, newSchema);
								}
							];
						} else if (path.endsWith("moduleName")) {
							// @ts-ignore: watchlist is real but not in the type definition
							jeditor.watchlist[path] = [
								() => {
									console.log(
										"SetSectionVisibility moduleName change callback",
										path
									);
									const mnEditor = jeditor.getEditor(path);
									if (!mnEditor) return;

									const mn = mnEditor.getValue();
									console.log("module name", mn);

									const sectionNameEditorPath = path.replace(
										"moduleName",
										"sectionName"
									);
									const snEditor = jeditor.getEditor(sectionNameEditorPath);
									console.log("snEditor", snEditor);

									if (!snEditor) return;

									//@ts-ignore
									let snSchema: any = snEditor.original_schema;
									if (mn == "case") {
										snSchema["$ref"] = "#/definitions/caseSectionNames";
									} else snSchema["$ref"] = "#/definitions/guideSectionNames";
									rebuildJSONEditor(snEditor, snSchema);
								}
							];
						}
					}
				}
			});

			console.log("jeditor", jeditor);
			//const jQ = window["jQuery"];
			//console.log("selec2?", jQ, jQ.fn, jQ.fn.select2); // will select2 work?

			/**
			 * grapes uses bootstrap 4, json-editor uses bootstrap 3 :(
			 */
			const bootstrap = document.createElement("style");
			bootstrap.innerHTML = "@import url(./jsonEditor/css/bootstrap.min.css)";
			this.container.appendChild(bootstrap);

			jeditor.setValue(jsObj);
			jeditor.enable();

			// grab grapesjs editor modal instance and fill with json-editor container
			if (!this.modal) {
				this.modal = editor.Modal;
			}
			this.modal.setTitle("JSON Editor");
			this.modal.setContent(this.container);

			// hook up onclose modal event
			this.listenTo(
				this.modal.getModel(),
				"change:open",
				this.onModalClosed.bind(this)
			);

			this.modal.open();

			// force our editors to propogate
			setTimeout(() => {
				//@ts-ignore
				const watchlist = jeditor.watchlist;
				// console.log("Watchlist", watchlist);
				if (watchlist) {
					for (let name in watchlist) {
						const funcArray = watchlist[name];
						// console.log("funcArray", funcArray);
						for (let func of funcArray) {
							// console.log("func", func);
							func();
						}
					}
				}
			}, 100);
		},
		onModalClosed(mod) {
			// check to make sure this is a close event, not an open event
			if (!mod.get("open")) {
				console.log("closed json modal window ");
				// write results to the model
				const jObj = this.jeditor.getValue();
				let jString = jsStringify(jObj, undefined, undefined, {
					// @ts-ignore: this is real, it's just not in the type definition yet
					skipUndefinedProperties: true
				});
				jString = jString.replace('"', "'");
				const propName = this.model.get("name");

				let empty = true;
				for (var key in jObj) {
					if (jObj.hasOwnProperty(key)) {
						if (!isEmpty(jObj[key])) {
							empty = false;
							break;
						}
					}
				}

				if (!empty) this.model.set("value", jString);
				else {
					removeTraitPropValue(this.model, propName);
					this.inputEl.innerHTML = '""';
				}

				if (this.jeditor) this.jeditor.destroy();
				this.stopListening(mod);
			}
		},
		/**
		 * Triggered when the value of the model is changed
		 */
		onValueChange() {
			console.log("json trait onValuechange");
			const value = this.model.get("value");
			if (value) {
				this.inputEl.innerHTML = value;
				this.model.setTargetValue(value);
			}
		}
	});

	function rebuildJSONEditor(editor: any, schema: object) {
		//const options = editor.options;
		const path = editor.path;
		const parent = editor.parent;
		console.log("parent", parent);
		const jsoneditor = parent.jsoneditor;
		const value = editor.getValue();
		const holder = parent.theme.getChildEditorHolder();
		holder.className = editor.container.className;
		editor.container.parentElement.appendChild(holder);

		editor.destroy();
		//console.log("destroyed jsoneditor", editor);

		const editorClass = jsoneditor.getEditorClass(schema);

		const newEditor = jsoneditor.createEditor(editorClass, {
			jsoneditor: jsoneditor,
			schema: schema,
			container: holder,
			path: path,
			parent: parent
		});
		parent.editors[newEditor.key] = newEditor;
		parent.cached_editors[newEditor.key] = newEditor;

		//console.log("inited jsoneditor", newEditor);
		newEditor.preBuild();
		newEditor.build();
		newEditor.postBuild();
		newEditor.setValue(value);
		//console.log("postbuild jsoneditor", newEditor);
	}

	function refreshRadioGroupEditor(groupPath: string, jeditor) {
		const groupEditor = jeditor.getEditor(groupPath);
		if (!groupEditor) return;

		const radioPath = groupPath.replace("group", "radioID");
		const radioEditor = jeditor.getEditor(radioPath);
		if (!radioEditor) return;

		const groupVal = groupEditor.getValue();
		if (!groupVal) return;

		const group = groupVal.toString();

		//@ts-ignore
		const newSchema = radioEditor.original_schema;
		if (newSchema === undefined) return;
		newSchema.enum = GetRadioGroupRadioIDsArray(group);
		newSchema.options.enum_titles = GetRadioGroupRadioNamesArray(group);

		const effectTypePath = groupPath.replace("group", "effectType");
		const effectTypeEditor = jeditor.getEditor(effectTypePath);
		if (effectTypeEditor) {
			const effectTypeVal = effectTypeEditor.getValue();
			if (effectTypeVal == "updateRadioGroupSelection") {
				newSchema.enum.push(" "); //can't do empty string, or select2 won't show the option.
				newSchema.options.enum_titles.push("None");
			}
		}

		rebuildJSONEditor(radioEditor, newSchema);
	}
};
