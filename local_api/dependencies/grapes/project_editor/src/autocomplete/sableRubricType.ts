import { Answer, Skill } from "../data models/rubricModels";

export function RubricTypeAutoComplete(editorInstance: any, path: string) {
	const typeEditor = editorInstance.getEditor(path);
	if (typeEditor) {
		// console.log(
		// 	"field with path: [" +
		// 		path +
		// 		"] changed to [" +
		// 		JSON.stringify(editorInstance.getEditor(path).getValue()) +
		// 		"]"
		// );
		const type: Skill["resource_activity_skill"] = typeEditor.getValue();
		// console.log("type: ", type);
		// console.log("editor: ", typeEditor);
		// console.log(
		// 	"picked: ",
		// 	typeEditor.enum_display[typeEditor.input.selectedIndex]
		// );
		switch (type) {
			case "Repeat Attempts":
				AutoFillRepeatAttempts(
					editorInstance,
					path,
					typeEditor.enum_display[typeEditor.input.selectedIndex]
				);
				break;
			case "Multiple Choice":
				AutoFillMultipleChoice(editorInstance, path);
				break;
			case "Short Answer":
				AutoFillShortAnswer(
					editorInstance,
					path,
					typeEditor.enum_display[typeEditor.input.selectedIndex]
				);
				break;
			case "Long Answer":
				AutoFillLongAnswer(editorInstance, path);
				break;
		}
	} else console.warn(path, "is unabled to get the type editor.");
}

function SetEditorValue(
	editorInstance: any,
	path: string,
	editorName: string,
	value: string | boolean | Array<Answer> | Array<string>
) {
	editorInstance
		.getEditor(path.replace("resource_activity_rubric_type", editorName))
		.setValue(value);
}
type RepeatAttemptsVersion =
	| "Repeat Attempts"
	| "Repeat Attempts [drag and drop]";
function AutoFillRepeatAttempts(
	editorInstance: any,
	path: string,
	version: RepeatAttemptsVersion
) {
	SetEditorValue(editorInstance, path, "autograde", true); //set autograde true
	const defaultAnswers: Answer[] = [];
	defaultAnswers.push({
		answer: "correct in 1 try",
		points: 2
	});
	defaultAnswers.push({
		answer: "correct in 2 tries",
		points: 1
	});
	//set default answer
	SetEditorValue(
		editorInstance,
		path,
		"resource_activity_rubric_answers",
		defaultAnswers
	);
	switch (version) {
		case "Repeat Attempts":
			SetEditorValue(
				editorInstance,
				path,
				"exemplar_answer",
				"<ul><li>Meas1: Normal</li><li>Meas2: High</li><li>Meas3: Low</li><li>Meas4: Normal</li><li>Meas5: High</li></ul>"
			);
			break;
		case "Repeat Attempts [drag and drop]":
			SetEditorValue(
				editorInstance,
				path,
				"exemplar_answer",
				"See Screenshot for reference answer."
			);
			break;
	}
	SetEditorValue(
		editorInstance,
		path,
		"rubrique",
		"<p>Score depends on number of tries to get the correct answer.</p><ul> <li>2 points for one try</li><li>1 point for two tries</li><li>0 points for three or more tries</li></ul>"
	);
	SetEditorValue(editorInstance, path, "resource_activity_rubric_screenshots", [
		""
	]); //pushing an empty array to screenshots will trigger the screenshot auto complete.
}

function AutoFillMultipleChoice(editorInstance: any, path: string) {
	SetEditorValue(editorInstance, path, "autograde", true); //set autograde true
	const defaultAnswers: Answer[] = [];
	defaultAnswers.push({
		answer: "[Type Button Value]", //varies from page to page
		points: 1
	});
	//set default answer
	SetEditorValue(
		editorInstance,
		path,
		"resource_activity_rubric_answers",
		defaultAnswers
	);
	SetEditorValue(
		editorInstance,
		path,
		"exemplar_answer",
		"[Type Button Value]<br><br>[Type Explanations On Page]"
	);
	SetEditorValue(
		editorInstance,
		path,
		"rubrique",
		"1 point for the correct answer, only one try allowed."
	);
	SetEditorValue(editorInstance, path, "resource_activity_rubric_screenshots", [
		""
	]); //pushing an empty array to screenshots will trigger the screenshot auto complete.
}

type ShortAnswerVersion = "Short Answer" | "Short Answer [revisable]";
function AutoFillShortAnswer(
	editorInstance: any,
	path: string,
	version: ShortAnswerVersion
) {
	SetEditorValue(editorInstance, path, "autograde", false); //set autograde true
	const defaultAnswers: Answer[] = [];
	defaultAnswers.push({
		answer: "Teacher Graded", //varies from page to page
		points: 3
	});
	//set default answer
	SetEditorValue(
		editorInstance,
		path,
		"resource_activity_rubric_answers",
		defaultAnswers
	);
	SetEditorValue(
		editorInstance,
		path,
		"exemplar_answer",
		"[Type exemplar from content team]"
	);
	switch (version) {
		case "Short Answer":
			SetEditorValue(
				editorInstance,
				path,
				"rubrique",
				"<ul><li>1 point for ...</li><li>1 point for ...</li><li>1 point for clear and concise writing</li></ul>"
			);
			break;
		case "Short Answer [revisable]":
			SetEditorValue(
				editorInstance,
				path,
				"rubrique",
				"<p>The student explains their selection for the cause of ...<br>Students are able to revise their answer 3 times</p><ul><li>1 point for ...</li><li>1 point for ...</li><li>1 point for clear and concise writing</li></ul>"
			);
			break;
	}
	SetEditorValue(editorInstance, path, "resource_activity_rubric_screenshots", [
		""
	]); //pushing an empty array to screenshots will trigger the screenshot auto complete.
}

function AutoFillLongAnswer(editorInstance: any, path: string) {
	SetEditorValue(editorInstance, path, "autograde", false); //set autograde true
	const defaultAnswers: Answer[] = [];
	defaultAnswers.push({
		answer: "Teacher Graded", //varies from page to page
		points: 15
	});
	//set default answer
	SetEditorValue(
		editorInstance,
		path,
		"resource_activity_rubric_answers",
		defaultAnswers
	);

	SetEditorValue(
		editorInstance,
		path,
		"exemplar_answer",
		"<p></p><ol><li>[Question1 text]<br>[Question1 - exemplar text]</li><li>[Question2 text]<br>[Question2 - exemplar text]</li><li>[Question3 text]<br>[Question3 - exemplar text]</li><li>[Question4 text]<br>[Question4 - exemplar text]</li></ol><p></p>"
	);

	SetEditorValue(
		editorInstance,
		path,
		"rubrique",
		"<p></p><ol><li>[Question1 text]<ul><li>1 point for ...</li><li>1 point for ...</li></ul></li><li>[Question2 text]<ul><li>1 point for ...</li><li>1 point for ...</li></ul></li><li>[Question3 text]<ul><li>1 point for ...</li><li>1 point for ...</li></ul></li><li>[Question4 text]<ul><li>1 point for ...</li><li>1 point for ...</li></ul></li></ol>"
	);
	SetEditorValue(editorInstance, path, "resource_activity_rubric_screenshots", [
		""
	]); //pushing an empty array to screenshots will trigger the screenshot auto complete.
}
