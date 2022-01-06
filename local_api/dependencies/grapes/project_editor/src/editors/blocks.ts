import axios from "axios";

import { ShowFailure, ShowSuccess } from "../utils/alerts";
import Editor from "./editor";

// declare var Awesomplete;

const config = {
	// Enable fetching schemas via ajax
	ajax: true,
	// The schema for the editor
	schema: {
		$ref: require("../schema/editorBlocksSchema.json")
	},
	disable_edit_json: true,
	disable_properties: true
};

export class BlocksEditor extends Editor {
	constructor(elementID: string) {
		super(elementID, config);
	}

	editorReady() {
		this.requestData("/editor/blocks");
	}

	editorInitialized() {
		const submitButton = document.getElementById("submit-blocks");
		if (submitButton) {
			submitButton.addEventListener("click", () => {
				this.onSubmitClick();
			});
		}
	}

	onSubmitClick() {
		const newBlocks = this.editorInstance.getValue();
		if (this.ValidateBlocks(newBlocks)) this.SaveBlocksRequest(newBlocks);
	}

	ValidateBlocks(data) {
		for (const block of data) {
			if (!block.id || !block.label || !block.category || !block.content) {
				ShowFailure(
					"Missing Data",
					"Block: Item " +
						data.indexOf(block) +
						" is missing a required id: [" +
						block.id +
						"], label[" +
						block.label +
						"], category[" +
						block.category +
						"], or content. Please fix and try again."
				);
				return false;
			}
		}
		return true;
	}

	SaveBlocksRequest(data) {
		axios
			.post("editor/blocks", data)
			.then(res => {
				ShowSuccess(
					"Blocks Saved!",
					"Successfully saved the the blocks to the project."
				);
				console.log("save blocks success");
			})
			.catch(error => {
				ShowFailure(
					"API ERROR!",
					"There was a problem saving blocks to the project. See the browser console for details."
				);
			});
	}
}
