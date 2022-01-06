import Awesomplete from "awesomplete";
import grapesjs from "grapesjs";
import { uniq } from "lodash";

export default async function (editor: grapesjs.EditorInstance) {
	await delay(1000); // give things a moment to load up

	const iFrameEl = document.querySelector(".gjs-frame") as HTMLIFrameElement;
	// console.log(iFrameEl);
	if (!iFrameEl) return;

	const iFrameWindow = iFrameEl.contentWindow;
	if (!iFrameWindow) return;
	const iFrameDocument = iFrameWindow.document;
	if (!iFrameDocument) return;

	// console.log(iFrameDocument.readyState);

	const classes = new Array<string>();

	// console.log("stylesheet length", iFrameDocument.styleSheets.length);

	for (let i = 0; i < iFrameDocument.styleSheets.length; i++) {
		const sheet = iFrameDocument.styleSheets[i];
		// console.log(sheet);
		if (sheet && sheet.href && (sheet.href.includes("vue") || sheet.href.includes("case"))) {
			// console.log("sheet", sheet.href);
			const cssSheet = iFrameDocument.styleSheets[i] as CSSStyleSheet;
			// console.log(cssSheet);

			let loaded = false;
			let delayCount = 0;
			while (!loaded) {
				try {
					if (cssSheet.cssRules) {
						// console.log(cssSheet.cssRules);
						loaded = true;
					}
				} catch {
					delayCount++;
					// console.log("delay", delayCount, sheet.href);
					if (delayCount > 10) {
						// console.log("stopped waiting for ", sheet.href, " to load");
						break;
					} else await delay(100);
				}
			}
			if (delayCount >= 10 && !loaded) {
				continue;
			}
			for (let j = 0; j < cssSheet.cssRules.length; j++) {
				if (cssSheet.cssRules[j].type === CSSRule.STYLE_RULE) {
					// @ts-ignore;
					const selector = cssSheet.cssRules[j].selectorText; //cssText.split("{")[0].trim();
					// console.log(selector);
					const validClassNameRegEx = new RegExp(
						"\\.-?[_a-zA-Z]+[_a-zA-Z0-9-]+"
					);
					const matches = selector.match(validClassNameRegEx);
					// console.log("matches", matches);
					if (matches) {
						for (let m = 0; m < matches.length; m++) {
							classes.push(matches[m].replace(".", ""));
						}
					}
				}
			}
		}
	}

	autoCompleteClasses = uniq(classes);
	// console.log("autoCompleteClasses", autoCompleteClasses);

	const classInputEl = document.querySelector("#gjs-clm-new");
	// console.log("classInputEl", classInputEl);
	if (!classInputEl) return;

	AddClassAutocompleteToInputSingle(classInputEl);
}

export let autoCompleteClasses: string[] = [];

export function AddClassAutocompleteToInputSingle(
	input: string | Element | HTMLElement
) {
	const awesome = new Awesomplete(input, {
		minChars: 1,
		maxItems: 25,
		list: autoCompleteClasses
	});
}

export function AddClassAutocompleteToInputMultiple(
	inputEl: string | Element | HTMLElement
) {
	if (
		inputEl instanceof Element &&
		inputEl.parentElement &&
		inputEl.parentElement.classList.contains("awesomplete")
	) {
		return; // already an awesomplete on this input
	}

	const awesome = new Awesomplete(inputEl, {
		minChars: 1,
		maxItems: 25,
		list: autoCompleteClasses,
		filter: (text: string, input: string) => {
			// @ts-ignore
			return Awesomplete.FILTER_CONTAINS(text, input.match(/[^ ]*$/)[0]);
		},
		item: (text: string, input: string) => {
			// @ts-ignore
			return Awesomplete.ITEM(text, input.match(/[^ ]*$/)[0]);
		},
		replace: (text: string) => {
			// @ts-ignore
			const before = this.input.value.match(/^.+ \s*|/)[0];
			// @ts-ignore
			this.input.value = before + text + " ";
		}
	});
}

async function delay(milliseconds: number) {
	return new Promise<void>(resolve => {
		setTimeout(resolve, milliseconds);
	});
}
