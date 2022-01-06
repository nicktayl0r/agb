import axios from "axios";

import { ScreenshotAutoComplete } from "../autocomplete/sableRubricScreenshot";
import { RubricTypeAutoComplete } from "../autocomplete/sableRubricType";

import { Project } from "../types/projectModels";
import { ShowFailure, ShowSuccess } from "../utils/alerts";
import { Popper } from "../utils/popper";
import Editor from "./editor";
import { PublishRubrics } from "./rubricsPublishModal";
import { JsonEditorRubricsObject } from "../data models/rubricModels";
import { SanitizeRubricHTML } from "../utils/sanitizer";

const config = {
	// Enable fetching schemas via ajax
	ajax: true,
	// The schema for the editor
	schema: {
		$ref: require("../schema/rubricSchema.json"),
	},
	disable_edit_json: true,
	disable_properties: true,
	disable_array_delete: true,
	enable_array_copy: true,
};

export class RubricEditor extends Editor {
	constructor(elementID: string) {
		super(elementID, config);
		// console.log("project.ts");
	}
	project: Project;
	editorReady() {
		this.requestData("/rubrics");
		axios
			.get("/project")
			.then((res) => {
				this.project = res.data;
			})
			.catch((error) => {
				console.log(error);
			});
	}

	editorInitialized() {
		//after file data is pushed to editor
		const submitButton = document.getElementById("submit");
		if (submitButton) {
			submitButton.addEventListener("click", () => {
				this.onSubmitClick();
			});
		}

		const publishDevButton = document.getElementById("publishDev");
		if (publishDevButton) {
			publishDevButton!.addEventListener("click", () => {
				PublishRubrics("devEnv", this.project.name, this.editorInstance.getValue() as JsonEditorRubricsObject);
			});
		}

		const publishStageButton = document.getElementById("publishStage");
		if (publishStageButton) {
			publishStageButton!.addEventListener("click", () => {
				PublishRubrics("stageEnv", this.project.name, this.editorInstance.getValue() as JsonEditorRubricsObject);
			});
		}

		const publishProdutionButton = document.getElementById("publishProd");
		if (publishProdutionButton) {
			publishProdutionButton!.addEventListener("click", () => {
				PublishRubrics("productionEnv", this.project.name, this.editorInstance.getValue() as JsonEditorRubricsObject);
			});
		}

		const addRubricButtonParent = document.getElementsByClassName("col-md-12");
		//find the button that adds new rubrics
		if (addRubricButtonParent[0]) {
			const addRubricButton = addRubricButtonParent[0].getElementsByClassName(
				"btn btn-default json-editor-btn-add"
			)[0];
			addRubricButton!.addEventListener("click", () => {
				//listen to new rubric, which is last in the list
				this.ListenToChanges(
					//@ts-ignore
					this.editorInstance.editors,
					//@ts-ignore
					"root.rubrics." + (this.editorInstance.getValue().rubrics.length - 1)
				);
				this.AddHTMLHelperButtons();
			});

			const removeRubricButton = addRubricButtonParent[0].getElementsByClassName(
				"btn btn-default json-editor-btn-delete"
			)[0];
			removeRubricButton!.addEventListener("click", () => {
				//listen to new rubric, which is last in the list
				this.ListenToChanges(
					//@ts-ignore
					this.editorInstance.editors,
					//@ts-ignore
					"root.rubrics." + this.editorInstance.getValue().rubrics.length,
					true
				);
			});
		} else console.log("no button");
		//@ts-ignore
		this.ListenToChanges(this.editorInstance.editors, "root"); //listen to all available editors after loaded

		this.AddHTMLHelperButtons();
	}

	onSubmitClick() {
		// if (this.validateTracks())
		this.saveRubrics();
	}

	saveRubrics() {
		const newRubrics = this.editorInstance.getValue();
		axios
			.post("rubrics", newRubrics)
			.then((res) => {
				ShowSuccess("Rubrics Saved!", "Successfully saved the rubrics.");
				console.log("save rubrics success");
			})
			.catch((error) => {
				ShowFailure(
					"API ERROR!",
					"There was a problem saving your rubrics. See the browser console for details."
				);
			});
	}



	ListenToChanges(editors: any, whitelist: string, unsubscribe?: boolean) {
		for (var key in editors) {
			// console.log(key);
			if (key.includes("root.rubrics")) {
				//only care about rubric keys
				//Listen to changes in rubric screenshots
				if (whitelist && key.includes(whitelist)) {
					if (key.endsWith("resource_activity_rubric_screenshots")) {
						if (unsubscribe)
							this.UnsubscribeToEditorKey(key, ScreenshotAutoComplete);
						else this.SubscribeToEditorKey(key, ScreenshotAutoComplete);
					} else if (key.endsWith("resource_activity_rubric_type")) {
						//Listen to changes in rubric type
						if (unsubscribe)
							this.UnsubscribeToEditorKey(key, RubricTypeAutoComplete);
						else this.SubscribeToEditorKey(key, RubricTypeAutoComplete);
					}
				}
			}
		}
	}
	SubscribeToEditorKey(
		key: string,
		callback: (editorInstance: any, path: string) => void
	) {
		if (
			//@ts-ignore
			this.editorInstance.editors.hasOwnProperty(key) &&
			key !== "root"
		) {
			// console.log("subscribing to:", key);
			this.editorInstance.watch(
				key,
				callback.bind(
					this.editorInstance, //sets "this" context
					this.editorInstance,
					key
				)
			);
		}
	}
	UnsubscribeToEditorKey(
		key: string,
		callback: (editorInstance: any, path: string) => void
	) {
		if (
			//@ts-ignore
			this.editorInstance.editors.hasOwnProperty(key) &&
			key !== "root"
		) {
			// console.log("unsubscribing to:", key);
			this.editorInstance.unwatch(
				key,
				callback.bind(
					this.editorInstance, //sets "this" context
					this.editorInstance,
					key
				)
			);
		}
	}
	AddHTMLHelperButtons() {
		const exemplarSections = document.querySelectorAll('[data-schemapath*="exemplar_answer"');
		// console.log("exemplar sections:", exemplarSections.length);
		exemplarSections.forEach(element => {
			if (element.firstElementChild?.firstElementChild?.className !== "infoButton") {
				const ibutton = this.createStyleButton();
				ibutton.addEventListener("click", () => {
					this.clickShowStyle(ibutton, "exemplar")
				});
				element.firstElementChild!.insertBefore(ibutton, element.firstElementChild?.firstElementChild!);

				const cleanButton = this.createCleanHTMLButton();
				cleanButton.addEventListener("click", () => {
					const index: number = Number(element.getAttribute("data-schemapath")?.split(".")[2]);
					const value: JsonEditorRubricsObject = this.editorInstance.getValue() as JsonEditorRubricsObject;
					value.rubrics[index].exemplar_answer = SanitizeRubricHTML(value.rubrics[index].exemplar_answer);
					this.editorInstance.setValue(value);
				});
				element.firstElementChild!.insertBefore(cleanButton, element.firstElementChild?.firstElementChild!);
			}
		})
		const rubricSections = document.querySelectorAll('[data-schemapath*="rubrique"');
		// console.log("rubrique sections:", rubricSections.length);
		rubricSections.forEach(element => {
			if (element.firstElementChild?.firstElementChild?.className !== "infoButton") {
				const ibutton = this.createStyleButton();
				ibutton.addEventListener("click", () => {
					this.clickShowStyle(ibutton, "rubric")
				});
				element.firstElementChild!.insertBefore(ibutton, element.firstElementChild?.firstElementChild!);

				const cleanButton = this.createCleanHTMLButton();
				cleanButton.addEventListener("click", () => {
					const index: number = Number(element.getAttribute("data-schemapath")?.split(".")[2]);
					const value: JsonEditorRubricsObject = this.editorInstance.getValue() as JsonEditorRubricsObject;
					value.rubrics[index].rubrique = SanitizeRubricHTML(value.rubrics[index].rubrique);
					this.editorInstance.setValue(value);
				});
				element.firstElementChild!.insertBefore(cleanButton, element.firstElementChild?.firstElementChild!);
			}
		})
	}

	createCleanHTMLButton() {
		const icon = document.createElement("i");
		icon.className = "fa fa-fire-extinguisher";
		const button = document.createElement("button");
		button.className = "infoButton";
		button.title = "Clean HTML";
		button.appendChild(icon);
		return button;
	}

	createStyleButton() {
		const icon = document.createElement("i");
		icon.className = "fa fa-info-circle";
		const button = document.createElement("button");
		button.className = "infoButton";
		button.appendChild(icon);
		return button;
	}

	clickShowStyle(buttonElement: Element, sectionName: string) {
		// console.log("clicked", buttonElement, sectionName);
		const index = buttonElement.parentElement?.parentElement?.getAttribute("data-schemapath")?.split(".")[2];
		const rubricType = this.editorInstance.getEditor('root.rubrics.' + index + '.resource_activity_rubric_type').getValue();
		// console.log("rubricType", rubricType);
		if (rubricType !== null) Popper(sectionName, rubricType.toString(), buttonElement);
	}
}
