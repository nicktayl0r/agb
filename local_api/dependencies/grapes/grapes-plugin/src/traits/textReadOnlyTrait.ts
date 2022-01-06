import grapesjs from "grapesjs";

/**
 *  I use this for the id trait on widgets,
 * since we don't want them to be modified by the user
 */
export default (editor: grapesjs.EditorInstance, config = {}) => {
	const defaultTextTrait = editor.TraitManager.getType("text");
	editor.TraitManager.addType("textReadOnly", {
		getInputEl() {
			if (!this.inputEl) {
				this.inputEl = defaultTextTrait.prototype.getInputEl.apply(
					this,
					arguments
				);
			}
			this.inputEl.disabled = true;
			return this.inputEl;
		}
	});
};
