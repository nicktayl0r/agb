import grapesjs from "grapesjs";

import checkboxFix from "./traits/checkboxFix";
import jsonEditorTrait from "./traits/jsonEditorTrait";
import numberFix from "./traits/numberFix";
import select2Trait from "./traits/select2Trait";
import sourcePathTrait from "./traits/sourcePathTrait";
import textReadOnlyTrait from "./traits/textReadOnlyTrait";

export default (editor: grapesjs.EditorInstance, config = {}) => {
	select2Trait(editor, config);
	jsonEditorTrait(editor, config);
	textReadOnlyTrait(editor, config);
	checkboxFix(editor, config);
	numberFix(editor, config);
	sourcePathTrait(editor, config);
};

export function removeTraitPropValue(model, propName: string) {
	model.set("value", undefined);
	const attributes = model.target.getAttributes();
	delete attributes[propName];
	model.target.setAttributes(attributes);
}
