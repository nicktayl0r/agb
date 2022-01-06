const util = require("util");
const exec = util.promisify(require("child_process").exec);

exports.executeCommand = async function (command) {
	const { stdout, stderr } = await exec(command);
	console.log("exec stdout:", stdout);
	if (stderr) console.error("exec stderr:", stderr);
};

exports.getGitVersions = async function () {
	try {
		await this.executeCommand("cd node_modules/@is3d/app && yarn && yarn git-version");
		await this.executeCommand(
			"cd node_modules/@is3d/app/production && yarn && yarn git-version",
		);
		await this.executeCommand("yarn && yarn git-version");
	} catch (ex) {
		console.warn(ex);
	}
};
