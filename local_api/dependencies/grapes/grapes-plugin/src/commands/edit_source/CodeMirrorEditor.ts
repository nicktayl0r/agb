import Backbone from "backbone";

var CodeMirror = require("codemirror/lib/codemirror");
require("codemirror/mode/htmlmixed/htmlmixed");
require("codemirror/mode/css/css");
require("codemirror-formatting");
require("../../codemirror_plugins/search");
require("../../codemirror_plugins/jump-to-line");

module.exports = Backbone.Model.extend({
	defaults: {
		input: "",
		label: "",
		codeName: "",
		theme: "",
		readOnly: true,
		lineNumbers: true
	},

	/** @inheritdoc */
	init(el) {
		this.editor = CodeMirror.fromTextArea(el, {
			dragDrop: false,
			lineWrapping: true,
			mode: this.get("codeName"),
			...this.attributes
		});
		this.element = el;

		return this;
	},

	getEditor() {
		return this.editor;
	},

	/**
	 * The element where the viewer is attached
	 * @return  HTMLElement
	 */
	getElement() {
		return this.element;
	},

	/**
	 * Set the element which contains the viewer attached.
	 * Generally, it should be just a textarea, but some editor might require
	 * a container for it some in that case this method can be used
	 */
	setElement(el) {
		this.element = el;
		return this;
	},

	/**
	 * Refresh the viewer
	 * @return self
	 */
	refresh() {
		this.getEditor().refresh();
		return this;
	},

	/**
	 * Focus the viewer
	 * @return self
	 */
	focus() {
		this.getEditor().focus();
		return this;
	},

	getContent() {
		const ed = this.getEditor();
		return ed && ed.getValue();
	},

	/** @inheritdoc */
	setContent(v) {
		if (!this.editor) return;
		this.editor.setValue(v);
		if (this.editor.autoFormatRange) {
			CodeMirror.commands.selectAll(this.editor);
			this.editor.autoFormatRange(
				this.editor.getCursor(true),
				this.editor.getCursor(false)
			);
			CodeMirror.commands.goDocStart(this.editor);
		}
	}
});
