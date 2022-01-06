import { widgetIdInfo } from "../widgetIDs";


export function CreateSelect2Options(options: string[], trait: any) {
	let returnArray: widgetIdInfo[] = [];
	for (const option of options) {
		returnArray.push({
			value: option,
			name: option,
			type: "",
			model: trait.target
		});
	}
	return returnArray;
}
