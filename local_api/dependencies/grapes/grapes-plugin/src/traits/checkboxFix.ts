import grapesjs from "grapesjs";

export default (editor: grapesjs.EditorInstance, config = {}) => {
	const TraitView = editor.TraitManager.getTraitsViewer().itemView;

	editor.TraitManager.addType("checkboxFix", {
		initialize(o) {
			this.model.set("type", "checkbox");
			TraitView.prototype.initialize.apply(this, arguments);
			var iconCls = this.ppfx + "chk-icon";
			this.tmpl =
				'<div class="' +
				this.fieldClass +
				'"><label class="' +
				this.inputhClass +
				'"><i class="' +
				iconCls +
				'"></i></label></div>';
		},

		/**
		 * Fires when the input is changed
		 * @private
		 */
		onChange() {
			this.model.set("value", this.getInputEl().checked);
			//console.log("checkboxFix changed trait model", this.model);
		},

		getInputEl(...args) {
			var first;
			if (!this.$input) first = 1;
			var el = TraitView.prototype.getInputEl.apply(this, args);
			if (first) {
				var md = this.model;
				var name = md.get("name");
				var target = this.target;
				if (md.get("changeProp")) {
					//console.log(name, "changeProp");
					el.checked = target.get(name);
				} else {
					var attrs = target.get("attributes");
					el.checked =
						attrs[name] && (attrs[name] === true || attrs[name] === "true");
					this.model.set("value", el.checked);
					//console.log(name, el.checked, attrs);
				}
			}
			//console.log(name, "checkboxFix value", attrs[name], el.checked, el);
			return el;
		}
	});
};
