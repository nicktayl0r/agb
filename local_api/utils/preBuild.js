const rimraf = require("rimraf");
const commands = require("./commandHelper");

async function prebuild() {
	console.log("pre_build start");

	rimraf.sync("../publish"); //delete the existing publish directory synchronously
	await commands.getGitVersions();

	console.log("pre_build done, now running webpack");
}

prebuild();
