const fs = require("fs");
const rmraf = require("rimraf");
const postcss = require("postcss");
const cssnano = require("cssnano");

// //copy files
// fs.access("/dependencies/app/dist/production/build.js", error => {
// 	if (error) {
// 		console.error(error);
// 	} else {
// 		fs.copyFile(
// 			"/dependencies/app/dist/production/build.js",
// 			"../publish/build.js",
// 			error => {
// 				if (error) {
// 					console.error(error);
// 				} else console.log("copied build.js into publish");
// 			},
// 		);
// 	}
// });
// fs.access("/dependencies/app/dist/production/build.js.map", error => {
// 	if (error) {
// 		console.error(error);
// 	} else {
// 		fs.copyFile(
// 			"/dependencies/app/dist/production/build.js.map",
// 			"../publish/build.js.map",
// 			error => {
// 				if (error) {
// 					console.error(error);
// 				} else console.log("copied build.js.map into publish");
// 			},
// 		);
// 	}
// });

fs.access("./dependencies/app/dist/production/player-version.txt", (error) => {
  if (error) {
    console.error(error);
  } else {
    fs.copyFile(
      "./dependencies/app/dist/production/player-version.txt",
      "../publish/player-version.txt",
      (error) => {
        if (error) {
          console.error(error);
        } else console.log("copied player-version.txt into publish");
      }
    );
  }
});
fs.access("../project-version.txt", (error) => {
  if (error) {
    console.error(error);
  } else {
    fs.copyFile(
      "../project-version.txt",
      "../publish/project-version.txt",
      (error) => {
        if (error) {
          console.error(error);
        } else console.log("copied project-version.txt into publish");
      }
    );
  }
});

// fs.mkdir("../publish/lib", error => {
// 	if (error) {
// 		console.error(error);
// 	} else {
// 		/** Get playcanvas scripts and put in /publish */
// 		const pcfiles = [
// 			"playcanvas-engine.min.js",
// 			"polyfill.min.js",
// 			"playcanvas-scripts.min.js",
// 		];
// 		for (const file of pcfiles) {
// 			fs.access("/node_modules/@is3d/playcanvasengine/" + file, error => {
// 				if (error) {
// 					console.error(error);
// 				} else {
// 					fs.copyFile(
// 						"/node_modules/@is3d/playcanvasengine/" + file,
// 						path.join("../publish/lib/" + file),
// 						error => {
// 							if (error) {
// 								console.error(error);
// 							} else console.log("copied ", file, " into publish");
// 						},
// 					);
// 				}
// 			});
// 		}
// 	}
// });

var GetAllSims = require("./buildHelper").GetAllSims;
const ProjectSims = GetAllSims();
const ncp = require("ncp").ncp;

/** Make a scenes directory in /publish, then  */
fs.mkdir("../publish/assets/scenes", (err) => {
  if (err) console.log(err);
  else {
    const sceneRoot = "../project/assets/scenes/";
    for (const sim of ProjectSims) {
      const dest = "../publish/assets/scenes/" + sim.id;
      ncp(sceneRoot + sim.id, dest, (err) => {
        if (err) {
          return console.error(err);
        } else {
          console.log("Copied the ", sim.id, " playcanvas scene directory.");
          EditPlayCanvasConfig(dest);
          MinifySceneFiles(dest);
        }
      });
    }
  }
});

function EditPlayCanvasConfig(dirPath) {
  const configFilePath = dirPath + "/config.json";
  fs.readFile(configFilePath, "utf8", (err, data) => {
    //get the file contents
    if (err) console.error(err);
    else {
      const fileData = JSON.parse(data);
      for (asset in fileData.assets) {
        if (fileData.assets[asset].name == "main.build.js") {
          console.log("found main.build.js in ", configFilePath);
          fileData.assets[asset].file.url =
            "../../../lib/playcanvas-scripts.min.js";
          break;
        } else if (
          fileData.assets[asset].name == "playcanvas-scripts.dev.build.js"
        ) {
          console.log(
            "found playcanvas-scripts.dev.build.js in ",
            configFilePath
          );
          fileData.assets[asset].file.url =
            "../../../lib/playcanvas-scripts.min.js";
          break;
        }
      }
      fs.writeFile(configFilePath, JSON.stringify(fileData), (err) => {
        if (err) console.error(err);
        else {
          console.log(
            "success writing updated config file to: ",
            configFilePath
          );
        }
      });
    }
  });
}

function MinifySceneFiles(dest) {
  fs.readdir(dest, (err, files) => {
    if (err) console.error(err);
    else {
      for (file of files) {
        if (file.includes(".json")) {
          if (!file.includes("config") && !file.includes("manifest")) {
            //should be the scene file.
            console.log("found scene file: ", file);
            MinifyJson(path.join(dest, file));
          }
        }
      }
    }
  });
}

fs.access("../project/config/project.json", (error) => {
  if (error) {
    console.error(error);
  } else {
    fs.access("../publish/data", (error) => {
      if (error) {
        fs.mkdir("../publish/data", (error) => {
          if (error) {
            console.error(error);
          } else {
            console.log("create directory publish/data");
            CopyProjectConfig();
          }
        });
      } else CopyProjectConfig();
    });
  }
});

function CopyProjectConfig() {
  fs.copyFile(
    "../project/config/project.json",
    "../publish/data/project.json",
    (error) => {
      if (error) {
        console.error(error);
      } else console.log("copied project.json into publish/data");
    }
  );
}
const path = require("path");
var GetSimsAndStates = require("./htmlHelper").GetSimsAndStates;
//** Go through the final html files and look for simstates */
const pageDirPath = "../publish/data/pages";
var GetSimID = require("./buildHelper").GetSimID;
fs.access(pageDirPath, (err) => {
  if (err) {
    console.error(err);
  } else {
    fs.readdir(pageDirPath, (err, files) => {
      const UsedSimDict = {};
      if (err) {
        console.error(err);
      } else {
        for (file of files) {
          const html = fs.readFileSync(path.join(pageDirPath, file), {
            encoding: "utf8",
          });
          if (html) {
            console.log("postBuild->GetSimsAndStates: ", file);
            GetSimsAndStates(html, UsedSimDict);
          }
        }
        console.log("final UsedSimDict: ", UsedSimDict);
        fs.mkdir("../publish/data/sims", (err) => {
          if (err) console.error(err);
          else {
            for (sim in UsedSimDict) {
              const sceneName = sim;
              const simID = GetSimID(sim); //get sim ID
              fs.mkdir(path.join("../publish/data/sims", simID), (err) => {
                if (err) console.error(err);
                else CopyStatesFromSim(simID, UsedSimDict[sceneName]);
              });
            }
          }
        });
      }
    });
  }
});

//** Go through the final svg files and look for malformed image asset links */
const svgDirPath = "../publish/assets/images";
fs.access(svgDirPath, (err) => {
  if (err) {
    console.error(err);
  } else {
    fs.readdir(svgDirPath, (err, files) => {
      if (err) {
        console.error(err);
      } else {
        const svgFiles = files.filter((el) => /\.svg$/.test(el));
        for (file of svgFiles) {
          let svg = fs.readFileSync(path.join(svgDirPath, file), {
            encoding: "utf8",
          });
          if (svg) {
            let regex = /assets\/images\//g;
            if (regex.test(svg)) {
              console.log("postBuild->Modify SVG Image paths ", file);
              svg = svg.replace(regex, "");

              fs.writeFileSync(path.join(svgDirPath, file), svg, {
                encoding: "utf8",
              });
            }
          }
        }
      }
    });
  }
});

function CopyStatesFromSim(sim, statesArray) {
  console.log("CopyStatesFromSim ", sim);
  if (sim != null) {
    for (simstate of statesArray) {
      //copy over to publish
      const simStateID = simstate;
      const dest = path.join(
        "../publish/data/sims/",
        sim,
        simStateID + ".json"
      );
      fs.copyFile(
        path.join("../project/sims", sim, simStateID + ".json"),
        dest,
        (err) => {
          if (err) console.error(err);
          else {
            console.log(
              "success moving simState: ",
              simStateID,
              " to publish."
            );
            MinifyJson(dest);
          }
        }
      );
    }
  }
}

function MinifyJson(dest) {
  fs.readFile(dest, "utf8", (err, data) => {
    const state = JSON.parse(data);
    if (err) console.error(err);
    else {
      fs.writeFile(dest, JSON.stringify(state), "utf8", (err) => {
        if (err) console.error(err);
        else console.log("success minifying json: ", dest);
      });
    }
  });
}

// optimize css
// const cssPath = "../publish/allStyles.css";
// fs.readFile(cssPath, (err, css) => {
// 	if (err) console.error(err);
// 	else {
// 		postcss([
// 			cssnano({
// 				preset: [
// 					"default",
// 					{
// 						// There is a bug in this optimization, disable it for now
// 						// I reported it here: https://github.com/cssnano/cssnano/issues/619
// 						mergeLonghand: false,
// 					},
// 				],
// 			}),
// 		])
// 			.process(css, {
// 				from: cssPath,
// 				to: cssPath,
// 			})
// 			.then(result => {
// 				fs.writeFile(cssPath, result.css);
// 				if (result.map)
// 					fs.writeFile(cssPath.replace(/\.css$/, ".map.css"), result.map);
// 				console.log("success optimizing css", cssPath);
// 			})
// 			.catch(err => console.error(err));
// 	}
// });

//delete temp
rmraf("../publish/temp", (error) => {
  if (error) console.error(error);
  else console.log("deleted temp directory in publish");
});
