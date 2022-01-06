const srcHelper = require("./helpers/srcHelper.js");

const srcAttrs = srcHelper.srcAttrs;
const audioAttrs = srcHelper.audioAttrs;



module.exports = function requireConditionSrcLoader(source) {
	// console.log(source);
	html = source;

	for (srcAttr of srcAttrs) {
		html = regexReplace(new RegExp(
			"key:'" + srcAttr + "',val:('.+?\\.[a-zA-Z]{3}'|'.+?\\.[a-zA-Z]{4}')}",
			"g",
		), html);
	}

	for (audioAtt of audioAttrs) {
		html = regexReplace(new RegExp(
			audioAtt + ":('\\.+[\\/a-zA-Z0-9_\\-\\.]*')",
			"g",
		), html);
	}

	return html;
};

function regexReplace(regEx, html) {
	let retVal = html;

	
	// console.log("regex:", regEx);
	var regExResult;
	while ((regExResult = regEx.exec(html)) !== null) {
		const match = regExResult[0];
		const url = regExResult[1];
		console.log("regex hit:", url);
		const addRequire = match.replace(url, "'\" + require(" + url + ") + \"'");
		console.log("match:",match);
		console.log("addRequire",addRequire);
		retVal = retVal.replace(match, addRequire);
	}
	return retVal;
}

