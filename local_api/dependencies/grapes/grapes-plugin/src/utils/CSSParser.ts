import css from "css";

//https://www.npmjs.com/package/css
//https://github.com/reworkcss/css

export const CSSParser: any = {
	//export default function () => {
	parseString(cssSheetStr, handleRuleFunc) {
		this.parseSheet(css.parse(cssSheetStr.trim()), handleRuleFunc);
	},

	//CSS Syntax Tree
	//StyleSheet "type": "stylesheet", "stylesheet": { "rules" : [ rule | media ] }
	//		Rule "type": "rule", "selectors": [ ".c439" ], "declarations":  [ declaration ]
	//			Declaration "type": "declaration", "property": "margin", "value": "100px 100px 25px",
	//		Media "type": "media", "media": "screen and (min-width: 480px)", "rules": [ rule | media? ]
	//			Unclear if a @media can contain additional @media
	parseSheet(sheetAST, handleRuleFunc): void {
		if (sheetAST["type"] == "stylesheet") {
			this.parseRules(
				sheetAST,
				sheetAST["stylesheet"]["rules"],
				handleRuleFunc
			);
		}
	},

	parseRules(sheetAST, rules, handleRuleFunc) {
		for (var i in rules) {
			if (rules[i]["type"] == "rule") {
				handleRuleFunc(sheetAST, rules, rules[i]);
			} else if (rules[i]["type"] == "media") {
				this.parseMedia(sheetAST, rules[i], handleRuleFunc);
			}
		}
	},

	parseMedia(sheetAST, media, handleRuleFunc) {
		var rules = media["rules"];
		for (var i in rules) {
			if (rules[i]["type"] == "rule") {
				handleRuleFunc(sheetAST, rules, rules[i], media["media"]);
			}
		}
	},

	getAST(cssSheetStr: string) {
		return css.parse(cssSheetStr.trim());
	},

	verify(cssSheetStr: string) {
		var sheetAST = css.parse(cssSheetStr, { silent: true });
		if (sheetAST.type == "stylesheet") {
			return sheetAST.stylesheet.parsingErrors;
		}
		return [];
	}
};
