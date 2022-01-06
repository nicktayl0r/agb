//read project file, parse into object
const path = require("path");
const fs = require("fs");

const projectDirectoryName = "project";
const projectPath = path.join(".", "..", projectDirectoryName);
const configPath = path.join(projectPath, "config");
const projectConfigPath = path.join(configPath, "project.json");

var projectData;
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
				ColorTracks(projectData.case.tracks);
				ColorTracks(projectData.guide.tracks);
				WriteProject();
			}
		});
	}
});
var SectionColors= ["#f95858", "#fcb259", "#fffa99", "#c1ff8a", "#83ffd6", "#85cbff", "#a9b3fc", "#e399ff"];
function ColorTracks(tracks) { //track[]
	for (var i=0; i< tracks.length; i ++) {
		for (var j=0; j< tracks[i].sections.length; j ++) {
				//if length of sections > length of section colors repeat
				let color= -1; 
				if (j >= SectionColors.length) {
					color = j % SectionColors.length;
					// console.log(bP.module, "length exceeds colors, modulo =",color);
				}
				else color = j;
				tracks[i].sections[j].tocColor= SectionColors[color];
				tracks[i].sections[j].entryColor= SectionColors[color];
				console.log(tracks[i].sections[j].name," color = ",tracks[i].sections[j].tocColor);
		}
	}
}

function WriteProject() {
	//write project file
	fs.writeFile(
		projectConfigPath,
		JSON.stringify(projectData, null, "\t"),
		function(err) {
			if (err) {
				console.log(
					"API:POST:[/api/project/] error writing project file. error: " +
						err,
				);
			} else {
				console.log(
					"The file was saved to: " +
						projectConfigPath,
				);
			}
		},
	);
}