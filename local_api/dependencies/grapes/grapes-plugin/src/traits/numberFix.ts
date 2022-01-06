import grapesjs from "grapesjs";

export default (editor: grapesjs.EditorInstance, config = {}) => {
	const TraitView = editor.TraitManager.getTraitsViewer().itemView;

	editor.TraitManager.addType("numberFix", {
		events: {
			input: "onChange"
		},
		initialize(o) {
			TraitView.prototype.initialize.apply(this, arguments);

			// console.log("numberFix model", this.model);

			let val = this.model.get("value");
			let defaultVal = this.model.get("default");
			let attrVal = Number(
				this.target.get("attributes")[this.model.get("name")]
			);
			// console.log(
			// 	this.model.get("name"),
			// 	"numberFix before val=",
			// 	val,
			// 	"defaultVal=",
			// 	defaultVal,
			// 	"attrVal=",
			// 	attrVal
			// );
			if (val == undefined || val == "") {
				if (!Number.isNaN(attrVal)) this.model.set("value", attrVal);
				// this is the fix, because grapes wanted to set default values of 0 to undefined
				else if (defaultVal) this.model.set("value", defaultVal);
				else {
					this.model.set("value", 0);
					this.setInputValue(0);
				}
			}

			// val = this.model.get("value");
			// defaultVal = this.model.get("default");
			// attrVal = Number(this.target.get("attributes")[this.model.get("name")]);
			// console.log(
			// 	this.model.get("name"),
			// 	"numberFix after val=",
			// 	val,
			// 	"defaultVal=",
			// 	defaultVal,
			// 	"attrVal=",
			// 	attrVal
			// );
			// console.log("numberFix model", this.model);
		},

		getValueForTarget() {
			var model = this.model;
			// console.log("numberFix model", model);
			var value = model.get("value");
			// console.log("getValueForTarget", value);
			return value;
		},

		getInputEl() {
			if (!this.$input) {
				const md = this.model;
				const plh = md.get("placeholder") || md.get("default") || "";
				const min = md.get("min");
				const max = md.get("max");
				const value = this.getModelValue();
				const input = $(`<input type="number" placeholder="${plh}">`);

				// console.log("getInputEl", value);
				if (value != undefined) {
					input.val(value);
				}

				if (min) {
					input.prop("min", min);
				}

				if (max) {
					input.prop("max", max);
				}

				this.$input = input;
			}
			return this.$input.get(0);
		},

		/**
		 * Fires when the input is changed
		 * @private
		 */
		onChange() {
			let value = Number(this.getInputEl().value);
			// console.log("input", value, Number.isNaN(value));
			if (Number.isNaN(value)) {
				value = 0;
			}
			// console.log("input", value);
			this.model.set("value", value);
			this.setInputValue(value);
		}
	});
};
