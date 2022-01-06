export function ScreenshotAutoComplete(editorInstance: any, path: string) {
	// console.log(path);
	// console.log(
	// 	"field with path: [" +
	// 		path +
	// 		"] changed to [" +
	// 		JSON.stringify(editorInstance.getEditor(path).getValue()) +
	// 		"]"
	// );
	// Do something

	const shotEditor: any = editorInstance.getEditor(path);
	if (shotEditor) {
		const shots: string[] = shotEditor.getValue();
		if (shots[shots.length - 1] == "") {
			let name = editorInstance
				.getEditor(path.replace("resource_activity_rubric_screenshots", "key"))
				.getValue();
			if (
				editorInstance
					.getEditor(
						path.replace("resource_activity_rubric_screenshots", "autograde")
					)
					.getValue()
			) {
				name += "_Correct.jpg";
			} else {
				name += "_Submitted.jpg";
			}
			shots[shots.length - 1] = name;
			shotEditor.setValue(shots);
		}
	} else console.warn(path, "is unabled to get the screenshot editor.");
}
