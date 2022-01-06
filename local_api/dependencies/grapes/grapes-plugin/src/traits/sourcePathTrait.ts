import grapesjs from "grapesjs";

export default (editor: grapesjs.EditorInstance, config = {}) => {
	const TraitView = editor.TraitManager.getTraitsViewer().itemView;

	editor.TraitManager.addType("sourcePath", {
		// initialize(o) {
		// 	this.model.set("type", "checkbox");
		// 	TraitView.prototype.initialize.apply(this, arguments);
		// 	var iconCls = this.ppfx + "chk-icon";
		// 	this.tmpl =
		// 		'<div class="' +
		// 		this.fieldClass +
		// 		'"><label class="' +
		// 		this.inputhClass +
		// 		'"><i class="' +
		// 		iconCls +
		// 		'"></i></label></div>';
		// },
		events: {
			dblclick: "openAssets"
		},

		/**
		 * Fires when the input is changed
		 * @private
		 */
		openAssets() {
			console.log("open assets with trait model", this.model);
			var traitmodel = this.model;
			editor.runCommand("open-assets", {
				// target: traitmodel.get("value"),
				types: this.getAssetType(
					traitmodel.target.get("tagName"),
					traitmodel.get("name")
				),
				accept: "*/*",
				onSelect(selected) {
					// console.log(selected.get("src"));
					// console.log(traitmodel);
					traitmodel.set("value", selected.get("src"));
					traitmodel.target //hack to get to the TraitManager and force a rerender of the panel to reflect the new sim state options.
						.get("traits")
						.em.get("TraitManager")
						.render();
				}
			});
		},
		getAssetType(tagName, traitName) {
			console.log("getAssetType", tagName, traitName);
			switch (tagName) {
				case "widget-animated-svg":
					return ["animated-svg"];
				case "widget-transparent-video":
				case "widget-video-player":
					if (traitName == "poster" || traitName == "static-mask")
						return ["image"];
					else if (traitName == "src-mp4" || traitName == "src-mp4ios")
						return ["video-mp4"];
					else if (traitName == "src-webm") return ["video-webm"];
					break;
				case "widget-image":
					return ["image"];
				case "widget-svg":
					return ["image"]; //would be nice to filter by svg
			}
			return [];
		}

		// getInputEl(...args) {
		// 	var first;
		// 	if (!this.$input) first = 1;
		// var el = TraitView.prototype.getInputEl.apply(this, args);
		// 	if (first) {
		// 		var md = this.model;
		// 		var name = md.get("name");
		// 		var target = this.target;
		// 		if (md.get("changeProp")) {
		// 			//console.log(name, "changeProp");
		// 			el.checked = target.get(name);
		// 		} else {
		// 			var attrs = target.get("attributes");
		// 			el.checked =
		// 				attrs[name] && (attrs[name] === true || attrs[name] === "true");
		// 			this.model.set("value", el.checked);
		// 			//console.log(name, el.checked, attrs);
		// 		}
		// 	}
		// 	//console.log(name, "checkboxFix value", attrs[name], el.checked, el);
		// 	return el;
		// }
	});
};
