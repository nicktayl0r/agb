import "select2";

import grapesjs from "grapesjs";
import $ from "jquery";
import { omit } from "lodash";

import { select2Props } from "../components";
import { nonWidgetIDs } from "../nonWidgetIDs";
import { GetPlayStates, GetSceneNames, GetSharedDataKeys, GetSimStates } from "../projectSimInfo";
import { removeTraitPropValue } from "../traits";
import { CreateSelect2Options } from "../utils/select2Helper";
import { GetWidgetTypesObjs, widgetIDs } from "../widgetIDs";

export default (editor: grapesjs.EditorInstance, config = {}) => {
	const defaultSelectTrait = editor.TraitManager.getType("select");
	editor.TraitManager.addType("select2", {
		// initialize() {
		// 	defaultSelectTrait.prototype.initialize.apply(this, arguments);
		// },
		getInputEl() {

			const model = this.model;
			const propName = model.get("name");

			if (select2Props.indexOf(propName) !== -1) {
				let options = widgetIDs;
				if (propName === "drop-id")
					options = GetWidgetTypesObjs(["WidgetDrop"]);
				else if (propName === "sim-widget-id")
					options = GetWidgetTypesObjs(["WidgetSimView"]);
				else if (
					propName === "anchor-id" ||
					propName === "source-id" ||
					propName === "target-id"
				) {
					// we can't anchor a popper to itself, so remove the component id of the target
					const componentID = this.target.get("attributes").id;
					options = options.filter(id => id.value !== componentID);
					if (propName === "source-id" || propName === "target-id") {
						options = options.concat(nonWidgetIDs);
					}
				} else if (propName === "scenename") {
					options = GetSceneNames(model);
				} else if (propName === "simstateid") {
					const sceneName = this.target.get("attributes").scenename;
					if (sceneName !== undefined) options = GetSimStates(sceneName, model);
				} else if (propName === "play-state") {
					options = GetPlayStates(model);
				} else if (
					propName === "shared-data-read-key" ||
					propName === "shared-data-write-key"
				) {
					options = GetSharedDataKeys(model);
				} else if (propName === "filter") {
					const filterOptions = ["text", "integer", "float", "allow-list"];
					options = CreateSelect2Options(filterOptions, model);
				} else if (propName === "format") {
					const filterOptions = ["colon", "hrs/mins", "secs", "mins"];
					options = CreateSelect2Options(filterOptions, model);
				} else if (propName === "overflow-style") {
					const filterOptions = ["reset-child", "swap"];
					options = CreateSelect2Options(filterOptions, model);
				}
				let modelOptions = options.map(comp => omit(comp, ["model"])); // having the component model reference in the trait model was causing a circular reference error when saving
				model.set("options", modelOptions);
			}

			if (!this.inputEl) {
				this.inputEl = defaultSelectTrait.prototype.getInputEl.apply(
					this,
					arguments
				);
			}
			return this.inputEl;
		},
		renderField() {
			defaultSelectTrait.prototype.renderField.apply(this, arguments);
			const $input = $(this.inputEl);
			$input.select2({
				placeholder: "...",
				allowClear: true
			});
			const model = this.model;
			let value = model.get("value");
			if (!value) {
				const attrVal = this.target.get("attributes")[this.model.get("name")];
				if (attrVal) value = attrVal;
			}
			$input.val(value).trigger("change");
			$input.on("select2:select", this.selected(model));
			$input.on("select2:unselect", this.unselected(model));
		},
		selected(model: any) {
			return (e: any) => {
				var data = e.params.data;
				model.set("value", data.id);
				const propName = model.get("name"); //what prop was just changed

				if (propName === "scenename") {
					// if we've changed the sceneName, then update the the options for simstateid
					// when selecting the sceneName, update the simstateid with values
					const traits = model.target.get("traits"); //get all the traits on the component that's using this trait (should be a simViewWidget)
					const traitArray = traits.where({ name: "simstateid" }); //give me a list of traits that have the name: "simstateid", should only be one
					const options = GetSimStates(data.id, traitArray[0]); //generate a list of sim states based on the sceneName (data.id) and also pass the trait model (required by current implemention of select2)
					let modelOptions = options.map(comp => omit(comp, ["model"])); // having the component model reference in the trait model was causing a circular reference error when saving
					traitArray[0].set("options", modelOptions); //set the data of the simstateid trait to be the list of sim state options.
					traits.em.get("TraitManager").render(); //hack to get to the TraitManager and force a rerender of the panel to reflect the new sim state options.
				}
			};
		},
		unselected(model: any) {
			return (e: any) => {
				var data = e.params.data;
				console.log("select2 unselected data", data);
				const propName = model.get("name");
				removeTraitPropValue(model, propName);
				console.log("model", model);
			};
		}
	});
};
