const fs = require("fs");
const path = require("path");
const projectDirectoryName = "project";
const projectPath = path.join(".", "..", projectDirectoryName);
const configPath = path.join(projectPath, "config");
const projectConfigPath = path.join(configPath, "project.json");
const editorConfigPath = path.join(configPath, "editor.json");
const pagePath = path.join(projectPath, "pages");

//read the project for sims
fs.access(projectConfigPath, err => {
	if (err) {
		console.error("error getting project file config. error: " + err);
	} else {
		console.log(
			"success accessing project file config.",
		);
		fs.readFile(projectConfigPath, "utf8", (err, data) => {
			if (err) {
				console.error("error reading project file config. error: " + err);
				return;
			} else {
				if (data == undefined) {
					console.error("error. project file config has no data.");
					return;
				}
				projectData = JSON.parse(data); 
				for(sim of projectData.sims) {
					// console.log(sim);
					readSimFile(sim);
				}
			}
		});
	}
});
//get the scene file
function readSimFile(sim) {
	const scenePath = path.join(projectPath, "assets", "scenes", sim.id, sim.scenes[0].fileName);
	fs.access(scenePath, err => {
		if (err) {
			console.error("error getting scenefile. error: " + err);
		} else {
			console.log(
				"success accessing scene file.",
			);
			fs.readFile(scenePath, "utf8", (err, data) => {
				if (err) {
					console.error("error reading scene file. error: " + err);
					return;
				} else {
					if (data == undefined) {
						console.error("error. scene file has no data.");
						return;
					}
					sceneData = JSON.parse(data); 
					const ignoredEntities= [];
					for (entity in sceneData.entities) {
						// console.log(entity);
						//read the scene for ignored entities
						if (sceneData.entities[entity].tags.includes("sim_state_ignore")) {
							// console.log("====",sim.name,"====",entity);
							ignoredEntities.push(entity);
						}
					}
					ReadSimStateDirectory(sim, ignoredEntities);
				}
			});
		}
	});
}
//get all the sim states
function ReadSimStateDirectory(sim, ignoredEntities) {
	const stateDirectory = path.join(projectPath, "sims", sim.id);
	fs.readdir(stateDirectory, function (err, files) {
		if (err) {
			console.error("error sim directory. error: " + err);
			return;
		} else {
			files.forEach(function (file) {
				// console.log(file); 
				EditSimState(path.join(stateDirectory,file), ignoredEntities);
			});
		}
	});
}
//read each sim state
function EditSimState(statePath, ignoredEntities) {
	fs.readFile(statePath, "utf8", (err, data) => {
		if (err) {
			console.error("error reading state file. error: " + err);
			return;
		} else {
			if (data == undefined) {
				console.error("error. state file has no data.");
				return;
			}
			stateData = JSON.parse(data); 
			for (entityID of ignoredEntities) {
				//remove ignored entities from sim states
				stateData.entities[entityID]= undefined;
			}
			WriteSimState(statePath, stateData);
		}
	});
}

//write each sim state
function WriteSimState(statePath, data) {
	fs.writeFile(
		statePath,
		JSON.stringify(data, null, "\t"),
		function(err) {
			if (err) {
				console.log(
					"error writing state file. error: " +
						err,
				);
			} else {
				console.log(
					"The file was saved to: " +
					statePath,
				);
			}
		},
	);
}