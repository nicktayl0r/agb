module.exports.srcAttrs = ["src", "src-webm", "src-mp4", "src-mp4ios", "src-ogv", "data",  "poster" ,"static-mask"];
module.exports.audioAttrs = ["srcWebm", "srcMp3"];

module.exports.getSrcAttributes = function getSrcAttributes() {
	let attrs = [];
	for (srcAttr of module.exports.srcAttrs) {
		attrs.push(`:${srcAttr}`);
	}
	return attrs;
}
