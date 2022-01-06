// var ObjectID = require('mongodb').ObjectID;
const fs = require("fs");
const unzip = require("unzip-stream");
const request = require("request");
const progress = require("request-progress");
const path = require("path");
const rimraf = require("rimraf");
const normalizePath = require("normalize-path");
const formidable = require("formidable");
const pretty = require("pretty");
const cssbeautify = require("cssbeautify");

module.exports = function(app) {
	const projectDirectoryName = "project";

	const projectPath = path.join(".", "..", projectDirectoryName);
	const configPath = path.join(projectPath, "config");
	const projectConfigPath = path.join(configPath, "project.json");
	const editorConfigPath = path.join(configPath, "editor.json");
	const pagePath = path.join(projectPath, "pages");
	const simConfigPath = path.join(configPath, "sims.json");
	const simPath = path.join(projectPath, "sims");
	const simFilesPath = path.join(projectPath, "assets/scenes");

	/* 
    Tell the app to allow communcation from any source.
    */
	app.use(function(req, res, next) {
		var allowedOrigins = [
			"http://localhost:8000",
			"http://localhost:8080",
			"http://localhost:8081",
			"https://launch.playcanvas.com",
			"https://playcanvas.com",
			"https://*.googleusercontent.com"
		];
		var origin = req.headers.origin;
		if (allowedOrigins.indexOf(origin) > -1 || (origin != undefined && origin.includes("googleusercontent.com"))) {
			res.setHeader("Access-Control-Allow-Origin", origin);
		}// else console.log("Did not find ",origin,"in allowedOrigins");
		// res.header("Access-Control-Allow-Origin", "http://localhost:8080");
		res.header("Access-Control-Allow-Credentials", true);
		res.header(
			"Access-Control-Allow-Headers",
			"Origin, X-Requested-With, Content-Type, Accept",
		);
		res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, DELETE");
		next();
	});

	/* 
    Route: /api/project
    Request: GET
    Response_OK: status [200], body ["ip address"]
    */
	const ip = require("ip");
	app.get("/api/ip", (req, res) => {
		console.log("API:GET:[/api/ip/] returning ip: " + ip.address());
		res.status(200);
		res.send(ip.address());
	});
	/* 
    Route: /api/project
    Request: GET
    Response_OK: status [200], body [{project.json file data}]
    Response_FAIL: status [400], body ['error message']
    */
	app.get("/api/project", (req, res) => {
		fs.access(projectConfigPath, err => {
			//is project.json accessible?
			if (err) {
				//if any problem getting project.json
				console.log(
					"API:GET:[/api/project/] error getting " +
						projectConfigPath +
						", error: " +
						err,
				);
				res.status(400);
				res.send("error getting " + projectConfigPath + ", error: " + err);
			} else {
				//project.json accessible
				console.log(
					"API:GET:[/api/project/] found project file: " + projectConfigPath,
				);
				fs.readFile(projectConfigPath, "utf8", (err, data) => {
					//get the file contents
					if (err) {
						res.status(400);
						res.send("error reading " + projectConfigPath + ", error: " + err);
					} else {
						//convert file text to JSON
						console.log(
							"API:GET:[/api/project/] success reading project file: " +
								projectConfigPath,
						);
						fileData = JSON.parse(data);
						//return JSON
						res.status(200);
						res.send(fileData);
					}
				});
			}
		});
	});

	/* 
    Route: /api/project
    Request: POST, header [content-type= application/json], body [json of the project]
    Response_OK: status [200], body ['success message']
    Response_FAIL: status [400], body ['error message']
    */
	app.post("/api/project", (req, res) => {
		//write contents to a project file
		// console.log(
		// 	"API:POST:[/api/project/] project data to write: " +
		// 		JSON.stringify(req.body),
		// );
		//run validation test?
		if (req.body != "undefined") {
			fs.writeFile(
				projectConfigPath,
				JSON.stringify(req.body, null, "\t"),
				function(err) {
					if (err) {
						res.status(400);
						res.send("error writing project file. error: " + err);
						console.log(
							"API:POST:[/api/project/] error writing project file. error: " +
								err,
						);
					} else {
						res.status(200);
						res.send(projectConfigPath + " created successfully.");
						console.log(
							"API:POST:[/api/project/] The file was saved to: " +
								projectConfigPath,
						);
					}
				},
			);
		} else {
			res.status(400);
			res.send(
				"API:POST:[/api/project/] Request body is empty, ignoring save.",
			);
		}
	});

	/*
    Route: /api/project/files/:moduleID/:fileName.:ext
    Request: POST, header [content-type= multipart/form-data], file data to be uploaded
    Response_OK: status [200], body [{uploaded local project server filepath}]
    Response_FAIL: status [400], body [‘error message’]
    */
	app.post("/api/project/files/:moduleID", (req, res) => {
		// use formidable to parse incoming files for upload
		var form = new formidable.IncomingForm();
		form.parse(req, function(err, fields, files) {
			if (err) {
				//if any problem parsing form data
				console.log(
					"API:POST:[/api/project/files/:moduleID] form file parse error: " +
						err,
				);
				res.status(400);
				res.send("form file parse error: " + err);
			} else {
				// grab file by grapes upload key 'files[]'
				// key from assetManager.uploadName
				var file = files["files[]"];
				if (file) {
					// console.log(file);
					var old_path = file.path, // temp path of uploaded file
						file_name = file.name.split(".").shift(), // orig file name
						file_ext = file.name.split(".").pop(); // orig file ext

					// determine asset type for organization
					let asset_type = "/misc/";
					if (file_ext.toUpperCase() === "JSON") {
						asset_type = "/models/";
					} else if (
						file_ext.toUpperCase() === "JPG" ||
						file_ext.toUpperCase() === "JPEG" ||
						file_ext.toUpperCase() === "PNG"
					) {
						asset_type = "/images/";
					}
					// use moduleID and asset_type to construct new asset path
					var new_path = path.join(
						projectPath,
						"/assets/",
						req.params.moduleID,
						asset_type,
						file_name + "." + file_ext,
					);

					fs.readFile(old_path, function(err, data) {
						fs.writeFile(new_path, data, function(err) {
							fs.unlink(old_path, function(err) {
								if (err) {
									res.status(400);
									res.send("error uploading file: " + err);
								} else {
									res.status(200);
									res.json({
										// path returned and added to assetmanager
										data: [
											// convert from local path to local project server path
											new_path.replace("../project/", "http://localhost:8000/"),
										],
									});
								}
							});
						});
					});
				} else {
					res.status(400);
					console.log("error uploading file");
					res.send("error uploading file");
				}
			}
		});
	});

	/*
    Route: /api/project/files/sims/:simID
    Request: POST, header [content-type= application/json], body [url of the zipped playcanvas scene export]
    Response_OK: status [200], body ['success message']
    Response_FAIL: status [400], body [‘error message’]
    */
    app.post("/api/project/files/sims/:simID", (req, res) => {
        if (req.body != "undefined" && req.body.url != "undefined") {
			console.log("Project Export URL:",req.body.url);
			let errorCount = 0;

            const extractPath = path.join(simFilesPath, req.params.simID);
            //request and extract playcanvas scene export zip file to project scenes path
			progress(request(req.body.url))
			.on('progress', (state) => {process.stdout.write('Download Progress: '+(state.percent * 100).toFixed(0)+'%\r');})
			.on('end', () => {console.log('Download Complete: 100%');})
			.pipe(unzip.Extract({ path: extractPath })
			.on("close", () => { 
				fs.readdir(extractPath, async (err, files) => {
					files.forEach(file => {
						var fPath = path.join(extractPath, file);

						if (
							file === "__game-scripts.js" ||
							file === "__loading__.js" ||
							file === "__start__.js" ||
							file === "__modules__.js" ||
							file === "__settings__.js" ||
							file === "index.html" ||
							file === "logo.png" ||
							file === "manifest.json" ||
							file === "playcanvas-stable.min.js" ||
							file === "styles.css"
						) {
							//remove unused exported files
							try {
								fs.unlinkSync(fPath);
							} catch (error) {
								console.log(fPath, "| deleted [FAILED]", error);
								errorCount++;
							}	
							console.log(fPath, "| deleted [SUCCESSFUL]");
						} else {
							if (file.endsWith(".json")) {
								let data = {}

								try {
									data = fs.readFileSync(fPath);
								} catch (error) {
									console.log(fPath, "| read [FAILED]", error);
									errorCount++;
								}

								if(data !== {}) {

									let jsonData = JSON.parse(data.toString("utf8"));
									//pretty print json files
									let jData = JSON.stringify(
										jsonData,
										null,
										"\t",
									);

									if (file === "config.json") {

										var re = /\"url\": \"files\/assets\/([0-9]*)\/1\/playcanvas-scripts.dev.build.js\"/;
										
										var matches = jData.match(re)
										var assetID = 0;
										//capture playcanvas-scripts.dev.build.js assetID
										if(matches && matches.length > 1) {
											assetID = matches[1];
										}
										
										//re-path gamescripts url reference
										jData = jData.replace(
											re,
											'"url": "../../../../node_modules/@is3d/playcanvasengine/playcanvas-scripts.min.js"',
										);
										//correct asset types for json exported animations
										jData = jData.replace(
											/"type": "json"/g,
											'"type": "animation"',
										);
										
										//remove unused playcanvas-scripts dev bundle
										if(assetID != 0) {
											var assetPath = path.join(extractPath, 'files', 'assets', assetID, '1', 'playcanvas-scripts.dev.build.js');
											try {
												fs.unlinkSync(assetPath);
											} catch (error) {
												console.log(assetPath, "| deleted [FAILED]", error);
												errorCount++;
											}	
											console.log(assetPath, "| deleted [SUCCESSFUL]");
										}
										
									}

									//match scene file
									//compare all sim states agasint the scene file and remove any unnessecery entity data from sim states
									if (file.match(/([0-9]+.json)/)) {

										let simConfigData = fs.readFileSync(simConfigPath)

										let sims = JSON.parse(simConfigData.toString("utf8"));
										if (sims[req.params.simID] == undefined) {
											return;
										} else {
											let values = Object.keys(sims[req.params.simID].simStates);

											values.forEach(val => {
												var statePath = path.join(simPath, req.params.simID, val+".json")
												let stateData = fs.readFileSync(statePath)

												let state = JSON.parse(stateData.toString("utf8"));

												var missing = [];

												//find any entities in sim states that are not present in the scene
												Object.keys(state.entities).forEach(ent => {
													if(jsonData.entities[ent] === undefined){
														console.log("removed missing entity: "+ent+" from sim state: "+val);
														missing.push(ent);
													} else if (jsonData.entities[ent].tags.includes("sim_state_ignore")){
														console.log("removed sim_state_ignore entity: "+ent+" from sim state: "+val);
														missing.push(ent);
													}
												})

												if(missing.length > 0) {
													missing.forEach(miss => {
														delete state.entities[miss];
													})

													//pretty print sim state data
													var stateString = JSON.stringify(
														state,
														null,
														"\t",
													);

													fs.writeFileSync(statePath, stateString);
												}
												
											})
										}

									}
									
									//write pretty printed data
									try {
										fs.writeFileSync(fPath, jData);
									} catch (error) {
										console.log(fPath, "| pretty printed [FAILED]", error);
										errorCount++;
									}
									console.log(fPath, "| pretty printed [SUCCESSFUL]");
								}
							}
						}
					});

					if(errorCount > 0) {
						res.status(400);
						res.send(
							"API:POST:[/api/project/files/sims/:simID] Failed to export sim with id: " +
							req.params.simID, "| too many file errors"
						);
						console.log("Sim Export Failed. Try Again")
					} else {
						res.status(200);
						res.send(
							"API:POST:[/api/project/files/sims/:simID] Succesfully exported sim with id: " +
							req.params.simID,
						);
						console.log("Sim Export Completed Successfully")
					}
				});
			}),);
        } else {
            res.status(400);
            res.send(
                "API:POST:[/api/project/files/sims/:simID] Request body is empty or url is missing",
			);
			console.log("Sim Export Failed")
        }
    });

	/* 
    Route: /api/project/files
    Request: GET
    Response_OK: status [200], body  json { "_name":"root",  "_directories": [ { "_name":<directory name>,  "_directories": {...} ,   "_files": [ <fileName.ext>, <fileName.ext>, ... ] }, ... ] , "_files": ["file1.ext", "file2.ext", "file3.ext"] }
    Response_FAIL: status [400], body ['error message']
    */
	app.get("/api/project/files", (req, res) => {
		fs.access(projectPath, err => {
			//is project accessible?
			if (err) {
				//if any problem getting project
				console.log(
					"API:GET:[/api/project/file] error getting " +
						projectPath +
						", error: " +
						err,
				);
				res.status(400);
				res.send("error getting " + projectPath + ", error: " + err);
			} else {
				//project directory accessible

				let recurseReadDir = (p, f) => {
					var fd = {
						path: normalizePath(p),
						name: f,
						directories: [],
						files: [],
					};
					var files = fs.readdirSync(p, "utf8");
					if (!files) {
						res.status(400);
						console.log("error reading directory " + p);
						res.send("error getting " + p);
					} else {
						for (i in files) {
							var name = files[i];
							if (name) {
								var childPath = path.join(p, name);
								if (fs.statSync(childPath).isDirectory()) {
									fd["directories"].push(recurseReadDir(childPath, name));
								} else {
									fd["files"].push(name);
								}
							} else {
								console.log(name + " does not exist");
							}
						}
						return fd;
					}
				};
				console.log(
					"API:GET:[/api/project/file] found project directory: " + projectPath,
				);
				fileData = recurseReadDir(
					projectPath,
					projectDirectoryName,
					null,
					true,
				);
				res.status(200);
				res.send(fileData);
			}
		});
	});

	/* 
    Route: /api/project/sims/:simID
    Request: POST, header [content-type= application/json], body [json of the page]
    Response_OK: status [200], body ['success message']
    Response_FAIL: status [400], body ['error message']
    */
	app.post("/api/project/sims/:simID", (req, res) => {
		fs.access(projectConfigPath, err => {
			if (err) {
				console.log(
					"API:POST:[/api/project/sims/:simID] error getting project.json, error: " +
						err,
				);
				res.status(400);
				res.send("error getting project.json, error: " + err);
				return;
			} else {
				console.log(
					"API:POST:[/api/project/sims/:simID] success accessing project.json",
				);
				fs.readFile(projectConfigPath, "utf8", (err, data) => {
					if (err) {
						console.log(
							"API:POST:[/api/project/sims/:simID] error reading project.json, error: " +
								err,
						);
						res.status(400);
						res.send("error reading project.json, error: " + err);
					} else {
						console.log(
							"API:POST:[/api/project/sims/:simID] success reading project.json",
						);
						let project = JSON.parse(data);
						let sims = project.sims;
						sims.push(req.body);
						fs.writeFile(
							projectConfigPath,
							JSON.stringify(project, null, "\t"),
							function(err) {
								if (err) {
									res.status(400);
									res.send("error writing project file. error: " + err);
									console.log(
										"API:POST:[/api/project/sims/:simID] error writing project.json, error: " +
											err,
									);
									return;
								} else {
									console.log(
										"API:POST:[/api/project/sims/:simID] success writing project.json: " +
											projectConfigPath,
									);
									res.status(200);
									res.send(
										"updated " +
											req.params.simID +
											"to " +
											JSON.stringify(req.body),
									);
								}
							},
						);
					}
				});
			}
		});
	});

	/* 
    Route: /api/pages
    Request: GET
    Response_OK: status [200], body [{object with case, guide, and glossary properties}]
    Response_FAIL: status [400], body ['error message']
    */
	app.get("/api/pages", (req, res) => {
		fs.access(editorConfigPath, err => {
			if (err) {
				res.status(400);
				res.send("error getting pages, editor file not found. error: " + err);
				console.log(
					"API:GET:[/api/pages/] error accessing editor file. error: " + err,
				);
			} else {
				console.log("API:GET:[/api/pages/] success accessing editor file.");
				fs.readFile(editorConfigPath, "utf8", (err, data) => {
					if (err) {
						res.status(400);
						res.send("error reading editor file. error: " + err);
						console.log(
							"API:GET:[/api/pages/] error reading editor file. error: " + err,
						);
					} else {
						console.log("API:GET:[/api/pages/] success reading editor file.");
						let editorPages = JSON.parse(data);
						let pages = {
							case: editorPages.case,
							guide: editorPages.guide,
							glossary: editorPages.glossary,
						};
						res.status(200);
						res.send(pages);
					}
				});
			}
		});
	});

	/* 
    Route: /api/pages/:pageID
    Request: GET
    Response_OK: status [200], body [{page json data}]
    Response_FAIL: status [400], body ['error message']
    */
	app.get("/api/pages/:pageID", (req, res) => {
		const pagePathID = path.join(
			pagePath,
			req.params.pageID,
			req.params.pageID + ".json",
		);
		fs.access(pagePathID, err => {
			if (err) {
				res.status(400);
				res.send("error getting page. error: " + err);
				console.log(
					"API:GET:[/api/pages/:PageID] error accessing page file, error: " +
						err,
				);
			} else {
				console.log(
					"API:GET:[/api/pages/:PageID] success accessing page file, path: " +
						pagePathID,
				);
				fs.readFile(pagePathID, "utf8", (err, data) => {
					if (err) {
						res.status(400);
						res.send("error reading page file. error: " + err);
						console.log(
							"API:GET:[/api/pages/:PageID] error reading page file, error: " +
								err,
						);
					} else {
						console.log(
							"API:GET:[/api/pages/:PageID] success reading page file, path: " +
								pagePathID,
						);
						let page = JSON.parse(data);

						// this is necessary with new readable pages
						// where these are not stored as a string, but an object
						if (typeof page["gjs-components"] !== "string")
							page["gjs-components"] = JSON.stringify(page["gjs-components"]);
						if (typeof page["gjs-styles"] !== typeof "string")
							page["gjs-styles"] = JSON.stringify(page["gjs-styles"]);

						res.status(200);
						// console.log(page);
						res.send(page);
					}
				});
			}
		});
	});

	/* 
    Route: /api/pages/:pageID/name
    Request: GET
    Response_OK: status [200], body ["page name"]
    Response_FAIL: status [400], body ['error message']
    */
	app.get("/api/pages/:pageID/name", (req, res) => {
		fs.access(editorConfigPath, err => {
			if (err) {
				res.status(400);
				res.send("error getting pages, editor file not found. error: " + err);
				console.log(
					"API:GET:[/api/pages/:pageID/name] error accessing editor file. error: " +
						err,
				);
			} else {
				console.log(
					"API:GET:[/api/pages/:pageID/name] success accessing editor file, path: " +
						editorConfigPath,
				);
				fs.readFile(editorConfigPath, "utf8", (err, data) => {
					if (err) {
						res.status(400);
						res.send("error reading editor file. error: " + err);
						console.log(
							"API:GET:[/api/pages/:PageID/name] error reading editor file, error: " +
								err,
						);
					} else {
						console.log(
							"API:GET:[/api/pages/:PageID/name] success reading editor file, path: " +
								editorConfigPath,
						);
						let editorJson = JSON.parse(data);
						const allPages = editorJson.case.concat(
							editorJson.guide.concat(editorJson.glossary),
						);
						let page = allPages.find((currentValue, index) => {
							return currentValue.id === req.params.pageID;
						});
						if (page != undefined) {
							res.status(200);
							res.send(page.name);
						} else {
							res.status(400);
							res.send("Could not find name of pageID: " + req.params.pageID);
						}
					}
				});
			}
		});
	});

	/* 
    Route: /api/pages/:moduleID/:pageID
    Request: POST, header [content-type= application/json], body [json of the page, name property required.]
    Response_OK: status [200], body ['success message']
    Response_FAIL: status [400], body ['error message']
    */
	app.post("/api/pages/:moduleID/:pageID", (req, res) => {
		jsonBody = { response: "" };
		if (
			req.body["gjs-html"] == undefined ||
			req.body["gjs-css"] == undefined ||
			req.body["gjs-components"] == undefined
		) {
			res.status(400);
			res.send(
				"Request is missing name, gjs-html, gjs-css, or gjs-components keys. request.body= " +
					JSON.stringify(req.body),
			);
			return;
		}
		fs.access(editorConfigPath, err => {
			if (err) {
				res.status(400);
				res.send("error getting editor config. error: " + err);
			} else {
				console.log(
					"API:POST:[/api/pages/:moduleID:/:PageID] success accessing project file.",
				);
				fs.readFile(editorConfigPath, "utf8", (err, data) => {
					if (err) {
						res.status(400);
						res.send("error reading editor config. error: " + err);
						console.log(
							"API:POST:[/api/pages/:moduleID:/:PageID] error reading editor file, error: " +
								err,
						);
						return;
					} else {
						if (data == undefined) {
							console.log(
								"API:POST:[/api/pages/:moduleID:/:PageID] error. Editor.json has no data.",
							);
							res.status(400);
							res.send("error. Editor.json has no data.");
							return;
						}
						let editorPages = JSON.parse(data);
						//make sure params.moduleID is valid
						if (editorPages[req.params.moduleID] == undefined) {
							console.log(
								"API:POST:[/api/pages/:moduleID:/:PageID] error, bad moduleID: " +
									req.params.moduleID +
									". Must be case, guide, or glossary.",
							);
							res.status(400);
							res.send('error. Module must be "case", "guide", or "glossary".');
							return;
						}

						//get list of pages with editorPages[params.moduleID]
						let projectModule = editorPages[req.params.moduleID];
						//check if params.pageID already exists, update name
						let page = projectModule.find((currentValue, index) => {
							return currentValue.id === req.params.pageID;
						});
						let writeEditor= false;
						if (page !== undefined) {
							if (req.body.name !== undefined && req.body.name != page.name) {
								console.log(
									"API:POST:[/api/pages/:moduleID:/:PageID] Found page UID in editor file: " +
										req.params.pageID +
										", changing name to: " +
										req.body.name,
								);
								page.name = req.body.name;
								writeEditor= true;
							}
						} else {
							console.log(
								"API:POST:[/api/pages/:moduleID:/:PageID] No page UID in editor file: " +
									req.params.pageID +
									", adding one.",
							);
							if (req.body.name == undefined) req.body.name = "new";
							projectModule.push({
								id: req.params.pageID,
								name: req.body.name,
							});
							writeEditor= true;
						}
						if (writeEditor) {
							console.log(
								"API:POST:[/api/pages/:moduleID:/:PageID] updated module data: " +
									JSON.stringify(projectModule),
							);
							//write editor data back out
							fs.writeFile(
								editorConfigPath,
								JSON.stringify(editorPages, null, "\t"),
								function(err) {
									if (err) {
										res.status(400);
										res.send("error writing editor file. error: " + err);
										console.log(
											"API:POST:[/api/pages/:moduleID:/:PageID] error writing editor file, error: " +
												err,
										);
										return;
									} else {
										console.log(
											"API:POST:[/api/pages/:moduleID:/:PageID] success writing editor file: " +
												editorConfigPath,
										);
									}
								},
							);
						}

						//check if pageID directory exists, create if not
						const pageIDPath = path.join(pagePath, req.params.pageID);
						fs.access(pageIDPath, err => {
							if (err) {
								console.log(
									"API:POST:[/api/pages/:moduleID:/:PageID] the directory doesn't exist: " +
										pageIDPath +
										", creating one.",
								);
								fs.mkdir(pageIDPath, err => {
									if (err) {
										console.log(
											"API:POST:[/api/pages/:moduleID:/:PageID] error creating directory: " +
												pageIDPath +
												", error: " +
												err,
										);
										res.status(400);
										res.send(err);
									} else {
										console.log(
											"API:POST:[/api/pages/:moduleID:/:PageID] successfully created directory: " +
												pageIDPath,
										);
										CreatePageFiles(pageIDPath, req.params.pageID, req, err => {
											if (err) {
												console.log(
													"API:POST:[/api/pages/:moduleID:/:PageID] CreatePageFiles failed: " +
														err,
												);
												res.status(400);
												res.send(err);
												return;
											} else {
												res.status(200);
												jsonBody.response =
													"Grapes data, html, and css files created successfully.";
												res.send(JSON.stringify(jsonBody, null, "\t"));
												console.log(
													"API:POST:[/api/pages/:moduleID:/:PageID] Success creating Grapes data, html, and css files for: " +
														req.params.pageID,
												);
												return;
											}
										});
									}
								});
							} else {
								console.log("directory exists: " + pageIDPath);
								CreatePageFiles(pageIDPath, req.params.pageID, req, err => {
									if (err) {
										console.log(
											"API:POST:[/api/pages/:moduleID:/:PageID] CreatePageFiles failed: " +
												err,
										);
										res.status(400);
										res.send(err);
										return;
									} else {
										res.status(200);
										jsonBody.response =
											"Grapes data, html, and css files created successfully.";
										res.send(JSON.stringify(jsonBody, null, "\t"));
										console.log(
											"API:POST:[/api/pages/:moduleID:/:PageID] Success creating Grapes data, html, and css files for: " +
												req.params.pageID,
										);
										return;
									}
								});
							}
						});
					}
				});
			}
		});
	});

	/* 
    Route: /api/pages/:moduleID/
    Request: POST, header [content-type= application/json], body [array of changes to make]
    Response_OK: status [200], body ['success message']
    Response_FAIL: status [400], body ['error message']
    */
	app.post("/api/pages/:moduleID", (req, res) => {
		fs.access(editorConfigPath, err => {
			if (err) {
				res.status(400);
				res.send("error getting editor config. error: " + err);
			} else {
				console.log(
					"API:POST:[/api/pages/:moduleID] success accessing project file.",
				);
				fs.readFile(editorConfigPath, "utf8", (err, data) => {
					if (err) {
						res.status(400);
						res.send("error reading editor config. error: " + err);
						console.log(
							"API:POST:[/api/pages/:moduleID] error reading editor file, error: " +
								err,
						);
						return;
					} else {
						if (data == undefined) {
							console.log(
								"API:POST:[/api/pages/:moduleID] error. Editor.json has no data.",
							);
							res.status(400);
							res.send("error. Editor.json has no data.");
							return;
						}
						let editorPages = JSON.parse(data);
						//make sure params.moduleID is valid
						if (editorPages[req.params.moduleID] == undefined) {
							console.log(
								"API:POST:[/api/pages/:moduleID] error, bad moduleID: " +
									req.params.moduleID +
									". Must be case, guide, or glossary.",
							);
							res.status(400);
							res.send('error. Module must be "case", "guide", or "glossary".');
							return;
						}
						changeArray = req.body;
						for (change of changeArray) {
							if (
								change.index >= 0 &&
								change.index < editorPages[req.params.moduleID].length
							)
								editorPages[req.params.moduleID][change.index] = {
									id: change.id,
									name: change.name,
								};
							else
								console.error(
									"API:POST:[/api/pages/:moduleID] bad index, ignoring change with .index: " +
										change.index,
								);
						}
						fs.writeFile(
							editorConfigPath,
							JSON.stringify(editorPages, null, "\t"),
							function(err) {
								if (err) {
									res.status(400);
									res.send("error writing editor file. error: " + err);
									console.log(
										"API:POST:[/api/pages/:moduleID] error writing editor file, error: " +
											err,
									);
									return;
								} else {
									res.status(200);
									res.send(
										req.params.moduleID + " module edited is a success.",
									);
									console.log(
										"API:POST:[/api/pages/:moduleID] success writing editor file: " +
											editorConfigPath,
									);
								}
							},
						);
					}
				});
			}
		});
	});
	/*  
    CreatePageFiles(pageDir: string, pageID: string, req: request, callback(error: string))
    -pageDir: the directory for the page files. ex: project/pages/1234/
    -pageID: the UID of the page. ex: 1234
    -req: the request containing the data to be written to each file.
    -callback: a function(error: string) to respond to errors.

    Sequentially writes the json, html, and css files based on the request.body.
    Only calls successful callback when all three files are written successflly.
    */
	function CreatePageFiles(pageDir, pageID, req, callback) {
		//write grapes data to pageID.json
		const pageGrapes = path.join(pageDir, pageID + ".json");
		const grapesData = {
			// eval turns these into nice readable objects instead of huge strings
			"gjs-components": eval(req.body["gjs-components"]),
			"gjs-styles": eval(req.body["gjs-styles"]),
		};
		fs.writeFile(pageGrapes, JSON.stringify(grapesData, null, "\t"), function(
			err,
		) {
			if (err) {
				callback("error writing grapes data file. error: " + err);
				return;
			} else {
				console.log("grapes data file was saved to: " + pageGrapes);
				//write html to pageID.html
				const pageHtml = path.join(pageDir, pageID + ".html");
				const htmlData = pretty(req.body["gjs-html"], { ocd: true }); // pretty print html from response to make diffs more readable
				fs.writeFile(pageHtml, htmlData, function(err) {
					if (err) {
						callback("error writing html file. error: " + err);
						return;
					} else {
						console.log("html file was saved to: " + pageHtml);
						//write css to pageID.css
						const pageCss = path.join(pageDir, pageID + ".css");
						const cssData = cssbeautify(req.body["gjs-css"], { indent: "\t" }); // pretty print css from response to make diffs more readable
						fs.writeFile(pageCss, cssData, function(err) {
							if (err) {
								callback("error writing css file. error: " + err);
								return;
							} else {
								console.log("css file was saved to: " + pageCss);
								callback();
							}
						});
					}
				});
			}
		});
	}

	/* 
    Route: /api/pages/:moduleID/:pageID
    Request: DELETE
    Response_OK: status [200], body ['success message']
    Response_FAIL: status [400], body ['error message']
    */
	app.delete("/api/pages/:moduleID/:pageID", (req, res) => {
		fs.access(editorConfigPath, err => {
			if (err) {
				res.status(400);
				res.send("error getting editor config. error: " + err);
				console.log(
					"API:DELETE:[/api/pages/:moduleID:/:PageID] error accessing editor file, error: " +
						err,
				);
			} else {
				fs.readFile(editorConfigPath, "utf8", (err, data) => {
					if (err) {
						res.status(400);
						res.send(
							"API:DELETE:[/api/pages/:moduleID:/:PageID] error reading editor config. error: " +
								err,
						);
						return;
					} else {
						console.log(
							"API:DELETE:[/api/pages/:moduleID:/:PageID] success reading Editor.json.",
						);
						if (data == undefined) {
							console.log(
								"API:DELETE:[/api/pages/:moduleID:/:PageID] error. Editor.json has no data.",
							);
							res.status(400);
							res.send("error. Editor.json has no data.");
							return;
						}
						let editorPages = JSON.parse(data);
						//make sure params.moduleID is valid
						if (editorPages[req.params.moduleID] == undefined) {
							console.log(
								"API:DELETE:[/api/pages/:moduleID:/:PageID] error, : " +
									req.params.moduleID +
									". Must be case, guide, or glossary.",
							);
							res.status(400);
							res.send('error. Module must be "case", "guide", or "glossary".');
							return;
						}

						//get list of pages with editorPages[params.moduleID]
						let projectModule = editorPages[req.params.moduleID];
						//check if params.pageID already exists, make it undefined
						let page = projectModule.find((currentValue, index) => {
							return currentValue.id === req.params.pageID;
						});
						if (page !== undefined) {
							console.log(
								"API:DELETE:[/api/pages/:moduleID:/:PageID] Found page UID in editor file, deleting: " +
									req.params.pageID,
							);
							projectModule.splice(projectModule.indexOf(page), 1); //delete the page out of the array
							console.log(
								"API:DELETE:[/api/pages/:moduleID:/:PageID] updated module data: " +
									JSON.stringify(projectModule),
							);
							fs.writeFile(
								editorConfigPath,
								JSON.stringify(editorPages, null, "\t"),
								function(err) {
									if (err) {
										res.status(400);
										res.send("error writing editor file. error: " + err);
										res.send(
											"API:DELETE:[/api/pages/:moduleID:/:PageID] error writing editor config. error: " +
												err,
										);
										return;
									} else {
										console.log(
											"API:DELETE:[/api/pages/:moduleID:/:PageID] success writing editor config: " +
												projectConfigPath,
										);
									}
								},
							);
						}

						//check if pageID directory exists, delete
						const pageIDPath = path.join(pagePath, req.params.pageID);
						fs.access(pageIDPath, err => {
							if (err) {
								console.log(
									"API:DELETE:[/api/pages/:moduleID:/:PageID] error, directory doesn't exist: " +
										pageIDPath,
								);
								res.status(400);
								res.send(
									"error. cannot delete page because the directory: " +
										pageIDPath +
										" doesn't exist, error: " +
										err,
								);
							} else {
								console.log(
									"API:DELETE:[/api/pages/:moduleID:/:PageID] found directory: " +
										pageIDPath,
								);
								rimraf(pageIDPath, err => {
									if (err) {
										console.log(
											"API:DELETE:[/api/pages/:moduleID:/:PageID] error deleting page directory. error: " +
												err,
										);
										res.status(400);
										res.send("error deleting page directory. error: " + err);
										return;
									} else {
										console.log(
											"API:DELETE:[/api/pages/:moduleID:/:PageID] successfully deleted directory: " +
												pageIDPath +
												", and all files.",
										);
										res.status(200);
										res.send(
											"Grapes data, html, and css files deleted successfully.",
										);
									}
								});
							}
						});
					}
				});
			}
		});
	});

	/* 
    Route: /api/sims
    Request: GET
    Response_OK: status [200], body [array string[]]
    Response_FAIL: status [400], body ['error message']
    */
	app.get("/api/sims", (req, res) => {
		//get sims.json
		fs.access(simConfigPath, err => {
			if (err) {
				console.log(
					"API:GET:[/api/sims] error getting sims.json, error: " + err,
				);
				res.status(400);
				res.send("error getting sims.json, error: " + err);
				return;
			} else {
				console.log("API:GET:[/api/sims] success accessing sims.json");
				fs.readFile(simConfigPath, "utf8", (err, data) => {
					if (err) {
						console.log(
							"API:GET:[/api/sims] error reading sims.json, error: " + err,
						);
						res.status(400);
						res.send("error reading sims.json, error: " + err);
					} else {
						console.log("API:GET:[/api/sims] success reading sims.json");
						let sims = JSON.parse(data);
						//get the keys in the sims object
						let keys = Object.keys(sims);
						console.log("API:GET:[/api/sims] sims found: " + keys.toString());
						res.status(200);
						//send back in response
						res.send(keys);
					}
				});
			}
		});
	});

	/* 
    Route: /api/sims/:simID
    Request: GET
    Response_OK: status [200], body [{json sim object}]
    Response_FAIL: status [400], body ['error message']
    */
	app.get("/api/sims/:simID", (req, res) => {
		fs.access(simConfigPath, err => {
			if (err) {
				console.log(
					"API:GET:[/api/sims/:simID] error getting sims.json, error: " + err,
				);
				res.status(400);
				res.send("error getting sims.json, error: " + err);
				return;
			} else {
				console.log("API:GET:[/api/sims/:simID] success accessing sims.json");
				fs.readFile(simConfigPath, "utf8", (err, data) => {
					if (err) {
						console.log(
							"API:GET:[/api/sims/:simID] error reading sims.json, error: " +
								err,
						);
						res.status(400);
						res.send("error reading sims.json, error: " + err);
					} else {
						console.log("API:GET:[/api/sims/:simID] success reading sims.json");
						let sims = JSON.parse(data);
						//get the keys in the sims object
						if (sims[req.params.simID] == undefined) {
							res.status(400);
							res.send("No sim found with the name: " + req.params.simID);
							console.log(
								"API:GET:[/api/sims/:simID] error. No sim found with the name: " +
									req.params.simID,
							);
							return;
						} else {
							console.log(
								"API:GET:[/api/sims/:simID] success finding simState data for: " +
									req.params.simID,
							);
							res.status(200);
							//send back in response
							res.send(sims[req.params.simID]);
						}
					}
				});
			}
		});
	});

	/* 
    Route: /api/sims/:simID
    Request: POST, header [content-type= application/json], body [json of the page]
    Response_OK: status [200], body ['success message']
    Response_FAIL: status [400], body ['error message']
    */
	app.post("/api/sims/:simID", (req, res) => {
		fs.access(simConfigPath, err => {
			if (err) {
				console.log(
					"API:POST:[/api/sims/:simID] error getting sims.json, error: " + err,
				);
				res.status(400);
				res.send("error getting sims.json, error: " + err);
				return;
			} else {
				console.log("API:POST:[/api/sims/:simID] success accessing sims.json");
				fs.readFile(simConfigPath, "utf8", (err, data) => {
					if (err) {
						console.log(
							"API:POST:[/api/sims/:simID] error reading sims.json, error: " +
								err,
						);
						res.status(400);
						res.send("error reading sims.json, error: " + err);
					} else {
						console.log(
							"API:POST:[/api/sims/:simID] success reading sims.json",
						);
						let sims = JSON.parse(data);
						sims[req.params.simID] = req.body;
						fs.writeFile(
							simConfigPath,
							JSON.stringify(sims, null, "\t"),
							function(err) {
								if (err) {
									res.status(400);
									res.send("error writing sim file. error: " + err);
									console.log(
										"API:POST:[/api/sims/:simID] error writing sims.json, error: " +
											err,
									);
									return;
								} else {
									console.log(
										"API:POST:[/api/sims/:simID] success writing sims.json: " +
											simConfigPath,
									);
									res.status(200);
									res.send(
										"updated " +
											req.params.simID +
											"to " +
											JSON.stringify(sims[req.params.simID]),
									);
								}
							},
						);
					}
				});
			}
		});
	});

	/* 
    Route: /api/sims/:simID
    Request: DELETE
    Response_OK: status [200], body ['success message']
    Response_FAIL: status [400], body ['error message']
    */
	app.delete("/api/sims/:simID", (req, res) => {
		fs.access(simConfigPath, err => {
			if (err) {
				console.log(
					"API:DELETE:[/api/sims/:simID] error accessing sims.json, error: " +
						err,
				);
				res.status(400);
				res.send("error getting sims.json, error: " + err);
				return;
			} else {
				console.log(
					"API:DELETE:[/api/sims/:simID] success accessing sims.json",
				);
				fs.readFile(simConfigPath, "utf8", (err, data) => {
					if (err) {
						console.log(
							"API:DELETE:[/api/sims/:simID] error reading sims.json, error: " +
								err,
						);
						res.status(400);
						res.send("error reading sims.json, error: " + err);
					} else {
						console.log(
							"API:DELETE:[/api/sims/:simID] success reading sims.json",
						);
						let sims = JSON.parse(data);
						sims[req.params.simID] = undefined;
						console.log(
							"API:DELETE:[/api/sims/:simID] deleted sim: " + req.params.simID,
						);
						fs.writeFile(
							simConfigPath,
							JSON.stringify(sims, null, "\t"),
							function(err) {
								if (err) {
									console.log(
										"API:DELETE:[/api/sims/:simID] error writing sims.json, error: " +
											err,
									);
									res.status(400);
									res.send("error writing sim file. error: " + err);
									return;
								} else {
									console.log(
										"API:DELETE:[/api/sims/:simID] success writing sims.json: " +
											simConfigPath,
									);
									res.status(200);
									res.send("deleted " + req.params.simID);
									//send back in response
								}
							},
						);
					}
				});
			}
		});
	});

	/* 
    Route: /api/sims/:simID/states
    Request: GET
    Response_OK: status [200], body [string array[]]
    Response_FAIL: status [400], body ['error message']
    */
	app.get("/api/sims/:simID/states", (req, res) => {
		fs.access(simConfigPath, err => {
			if (err) {
				console.log(
					"API:GET:[/api/sims/:simID/states] error accessing sims.json, error: " +
						err,
				);
				res.status(400);
				res.send("error getting sims.json, error: " + err);
				return;
			} else {
				console.log(
					"API:GET:[/api/sims/:simID/states] success accessing sims.json",
				);
				fs.readFile(simConfigPath, "utf8", (err, data) => {
					if (err) {
						console.log(
							"API:GET:[/api/sims/:simID/states] error reading sims.json, error: " +
								err,
						);
						res.status(400);
						res.send("error reading sims.json, error: " + err);
					} else {
						console.log(
							"API:GET:[/api/sims/:simID/states] success reading sims.json",
						);
						let sims = JSON.parse(data);
						if (sims[req.params.simID] == undefined) {
							console.log(
								"API:GET:[/api/sims/:simID/states] error. No sim found with the name: " +
									req.params.simID,
							);
							res.status(400);
							res.send("No sim found with the name: " + req.params.simID);
							return;
						} else {
							console.log(
								"API:GET:[/api/sims/:simID/states] sim found with the name: " +
									req.params.simID,
							);
							res.status(200);
							let values = Object.values(sims[req.params.simID].simStates);
							console.log(
								"API:GET:[/api/sims/:simID/states] returning simStates: " +
									values.toString(),
							);
							res.send(values);
						}
					}
				});
			}
		});
	});

	/* 
    Route: /api/sims/:simID/states
    Request: POST
    Response_OK: status [200], body [string array[]]
    Response_FAIL: status [400], body ['error message']
    */
   	app.post("/api/sims/:simID/states", (req, res) => {
		fs.access(simConfigPath, err => {
			if (err) {
				console.log(
					"API:POST:[/api/sims/:simID/states] error accessing sims.json, error: " +
						err,
				);
				res.status(400);
				res.send("error getting sims.json, error: " + err);
				return;
			} else {
				console.log(
					"API:POST:[/api/sims/:simID/states] success accessing sims.json",
				);
				fs.readFile(simConfigPath, "utf8", (err, data) => {
					if (err) {
						console.log(
							"API:POST:[/api/sims/:simID/states] error reading sims.json, error: " +
								err,
						);
						res.status(400);
						res.send("error reading sims.json, error: " + err);
					} else {
						console.log(
							"API:POST:[/api/sims/:simID/states] success reading sims.json",
						);
						let sims = JSON.parse(data);
						if (sims[req.params.simID] == undefined) {
							console.log(
								"API:POST:[/api/sims/:simID/states] error. No sim found with the name: " +
									req.params.simID,
							);
							res.status(400);
							res.send("No sim found with the name: " + req.params.simID);
							return;
						} else {
							console.log(
								"API:POST:[/api/sims/:simID/states] sim found with the name: " +
									req.params.simID,
							);
							let values = Object.keys(sims[req.params.simID].simStates);

							if(req.body.prop === undefined || req.body.toReplace === undefined || req.body.replaceBy === undefined) {
								res.status(400);
								console.log(
									"API:POST:[/api/sims/:simID/states] missing required parameter for (prop, toReplace, replaceBy)" 
								);
								res.send("missing required parameter for (prop, toReplace, replaceBy)");
								return;
							}

							if(req.body.prop !== "stateAnimation" && req.body.prop !== "material") {
								res.status(400);
								console.log(
									"API:POST:[/api/sims/:simID/states] invalid prop: "+req.body.prop 
								);
								res.send("invalid prop: "+req.body.prop );
								return;
							}

							//transform request prop and values into find and replace strings
							let findString = "\\\""+req.body.prop+"\\\": "+req.body.toReplace;
							let replaceString = "\""+req.body.prop+"\": "+req.body.replaceBy;

							let find = new RegExp(findString, 'g');

							values.forEach(val => {
								var statePath = path.join(simPath, req.params.simID, val+".json")
								let stateData;

								try {
									stateData = fs.readFileSync(statePath)
								} catch (error) {
									res.status(400);
									console.log(
										"API:POST:[/api/sims/:simID/states] failed to read sim state at path: "+statePath
									);
									res.send("failed to read sim state at path: "+statePath);
									return;
								}

								let state = JSON.parse(stateData.toString("utf8"));

								//pretty print the state
								var stateString = JSON.stringify(
									state,
									null,
									"\t",
								);

								let newStateString = stateString.replace(find, replaceString);

								try {
									fs.writeFileSync(statePath, newStateString);
								} catch (error) {
									console.log(
										"API:POST:[/api/sims/:simID/states] failed to write sim state at path: "+statePath
									);
									res.send("failed to write sim state at path: "+statePath);
									return;
								}
							})

							res.status(200);
							res.send(
								req.params.simID +
									" simState files modified successfully.",
							);
						}
					}
				});
			}
		});
	});
	/* 
    Route: /api/sims/:simID/states/:simStateID
    Request: POST, header [content-type= application/json], body [json of the page]
    Response_OK: status [200], body ['success message']
    Response_FAIL: status [400], body ['error message']
    */
	app.post("/api/sims/:simID/states/:simStateID", (req, res) => {
		fs.access(simConfigPath, err => {
			if (err) {
				console.log(
					"API:POST:[/api/sims/:simID/states/:simStateID] error accessing sims.json, error: " +
						err,
				);
				res.status(400);
				res.send("error getting sims.json, error: " + err);
				return;
			} else {
				fs.readFile(simConfigPath, "utf8", (err, data) => {
					if (err) {
						console.log(
							"API:POST:[/api/sims/:simID/states/:simStateID] error reading sims.json, error: " +
								err,
						);
						res.status(400);
						res.send("error reading sims.json, error: " + err);
					} else {
						console.log(
							"API:POST:[/api/sims/:simID/states/:simStateID] success reading sims.json",
						);
						let sims = JSON.parse(data);
						if (sims[req.params.simID] == undefined) {
							console.log(
								"API:POST:[/api/sims/:simID/states/:simStateID] error. No sim found with the name: " +
									req.params.simID,
							);
							res.status(400);
							res.send(
								'"' +
									req.params.simID +
									'" is not defined, cannot create simState: ' +
									req.params.simStateID,
							);
							return;
						}
						sims[req.params.simID].simStates[req.params.simStateID] =
							req.body.name;
						console.log(
							"API:POST:[/api/sims/:simID/states/:simStateID] sim states are now: " +
								JSON.stringify(sims[req.params.simID].simStates),
						);
						fs.writeFile(
							simConfigPath,
							JSON.stringify(sims, null, "\t"),
							function(err) {
								if (err) {
									console.log(
										"API:POST:[/api/sims/:simID/states/:simStateID] error writing sims.json, error: " +
											err,
									);
									res.status(400);
									res.send("error writing sim file. error: " + err);
									return;
								} else {
									console.log(
										"API:POST:[/api/sims/:simID/states/:simStateID] success writing sims.json: " +
											simConfigPath,
									);
								}
							},
						);
						const simStatePath = path.join(
							projectPath,
							"sims",
							req.params.simID,
						);
						fs.access(simStatePath, err => {
							if (err) {
								console.log(
									"API:POST:[/api/sims/:simID/states/:simStateID] directory doesn't exist: " +
										simStatePath +
										", creating one.",
								);
								fs.mkdir(simStatePath, err => {
									if (err) {
										console.log(
											"API:POST:[/api/sims/:simID/states/:simStateID] error creating directory: " +
												simStatePath +
												", error: " +
												err,
										);
										res.status(400);
										res.send(err);
									} else {
										console.log(
											"API:POST:[/api/sims/:simID/states/:simStateID] successfully created directory: " +
												simStatePath,
										);
										CreateSimStateFiles(
											simStatePath,
											req.params.simStateID,
											req.body,
											err => {
												if (err) {
													console.log(
														"API:POST:[/api/sims/:simID/states/:simStateID] CreateSimStateFiles failed: " +
															err,
													);
													res.status(400);
													res.send(err);
													return;
												} else {
													res.status(200);
													res.send(
														req.params.simStateID +
															" simState files created successfully.",
													);
													console.log(
														"API:POST:[/api/sims/:simID/states/:simStateID] successfully created simState files for: " +
															req.params.simStateID,
													);
													return;
												}
											},
										);
									}
								});
							} else {
								console.log(
									"API:POST:[/api/sims/:simID/states/:simStateID] directory exists: " +
										simStatePath,
								);
								CreateSimStateFiles(
									simStatePath,
									req.params.simStateID,
									req.body,
									err => {
										if (err) {
											console.log(
												"API:POST:[/api/sims/:simID/states/:simStateID] CreateSimStateFiles failed: " +
													err,
											);
											res.status(400);
											res.send(err);
											return;
										} else {
											res.status(200);
											res.send(
												req.params.simStateID +
													" simState files created successfully.",
											);
											console.log(
												"API:POST:[/api/sims/:simID/states/:simStateID] successfully created simState files for: " +
													req.params.simStateID,
											);
											return;
										}
									},
								);
							}
						});
					}
				});
			}
		});
	});

	/*  
    CreateSimStateFiles(filePath: string, simStateID: string, simData: string, callback(error: string))
    -filePath: the directory for the simState files. ex: project/sims/sim1/
    -simStateID: the UID of the simState. ex: firstState
    -simData: the data to be written to each file.
    -callback: a function(error: string) to respond to errors.

    Writes the json based on simData.
    Only calls successful callback when file is written successflly.
    */
	function CreateSimStateFiles(filePath, simStateID, simData, callback) {
		const simStatePath = path.join(filePath, simStateID + ".json");
		fs.writeFile(simStatePath, JSON.stringify(simData, null, "\t"), function(
			err,
		) {
			if (err) {
				callback("error writing simState data file. error: " + err);
				return;
			} else {
				console.log("simState data file was saved to: " + simStatePath);
				callback();
			}
		});
	}

	/* 
    Route: /api/sims/:simID/states/:simStateID
    Request: GET
    Response_OK: status [200], body [{json of simState}]
    Response_FAIL: status [400], body ['error message']
    */
	app.get("/api/sims/:simID/states/:simStateID", (req, res) => {
		const simStatePath = path.join(
			simPath,
			req.params.simID,
			req.params.simStateID + ".json",
		);
		fs.access(simStatePath, err => {
			if (err) {
				console.log(
					"API:GET:[/api/sims/:simID/states/:simStateID] error finding simState file: " +
						simStatePath +
						", error: " +
						err,
				);
				res.status(400);
				res.send(
					"error finding simState file: " + simStatePath + ", error: " + err,
				);
			} else {
				console.log(
					"API:GET:[/api/sims/:simID/states/:simStateID] success accessing simState file: " +
						simStatePath,
				);
				fs.readFile(simStatePath, "utf8", (err, data) => {
					if (err) {
						console.log(
							"API:POST:[/api/sims/:simID/states/:simStateID] error reading simState file: " +
								simStatePath +
								", error: " +
								err,
						);
						res.status(400);
						res.send(err);
					} else {
						console.log(
							"API:GET:[/api/sims/:simID/states/:simStateID] success reading simState file: " +
								simStatePath,
						);
						let simStateData = JSON.parse(data);
						res.status(200);
						res.send(simStateData);
					}
				});
			}
		});
	});

	/* 
    Route: /api/sims/:simID/states/:simStateID
    Request: DELETE
    Response_OK: status [200], body ['success message']
    Response_FAIL: status [400], body ['error message']
    */
	app.delete("/api/sims/:simID/states/:simStateID", (req, res) => {
		const simStatePath = path.join(
			simPath,
			req.params.simID,
			req.params.simStateID + ".json",
		);
		fs.access(simConfigPath, err => {
			if (err) {
				console.log(
					"API:DELETE:[/api/sims/:simID/states/:simStateID] error getting sims.json, error: " +
						err,
				);
				res.status(400);
				res.send("error getting sims.json, error: " + err);
				return;
			} else {
				console.log(
					"API:DELETE:[/api/sims/:simID/states/:simStateID] success getting sims.json",
				);
				fs.readFile(simConfigPath, "utf8", (err, data) => {
					if (err) {
						console.log(
							"API:DELETE:[/api/sims/:simID/states/:simStateID] error reading sims.json, error: " +
								err,
						);
						res.status(400);
						res.send("error reading sims.json, error: " + err);
					} else {
						console.log(
							"API:DELETE:[/api/sims/:simID/states/:simStateID] success reading sims.json",
						);
						let sims = JSON.parse(data);
						if (sims[req.params.simID] == undefined) {
							console.log(
								"API:DELETE:[/api/sims/:simID/states/:simStateID] error. no sim: " +
									req.params.simID,
							);
							res.status(400);
							res.send(
								"error deleting simState: " +
									req.params.simStateID +
									", Sim not found.",
							);
							return;
						}
						if (
							sims[req.params.simID].simStates[req.params.simStateID] ==
							undefined
						) {
							console.log(
								"API:DELETE:[/api/sims/:simID/states/:simStateID] error. no sim state: " +
									req.params.simStateID,
							);
							res.status(400);
							res.send(
								"error deleting simState: " +
									req.params.simStateID +
									", simstate not found.",
							);
							return;
						}
						sims[req.params.simID].simStates[req.params.simStateID] = undefined;
						fs.writeFile(
							simConfigPath,
							JSON.stringify(sims, null, "\t"),
							err => {
								if (err) {
									console.log(
										"API:DELETE:[/api/sims/:simID/states/:simStateID] error writing sims.json, error: " +
											err,
									);
									res.status(400);
									res.send("error saving sims.json, error: " + err);
								} else {
									console.log(
										"API:DELETE:[/api/sims/:simID/states/:simStateID] success writing sims.json",
									);
									fs.access(simStatePath, err => {
										if (err) {
											console.log(
												"API:DELETE:[/api/sims/:simID/states/:simStateID] success accessing simState file: " +
													simStatePath +
													", error: " +
													err,
											);
											res.status(400);
											res.send(err);
										} else {
											console.log(
												"API:DELETE:[/api/sims/:simID/states/:simStateID] success accessing simState file: " +
													simStatePath,
											);
											fs.unlink(simStatePath, err => {
												if (err) {
													console.log(
														"API:DELETE:[/api/sims/:simID/states/:simStateID] error deleting simState, error: " +
															err,
													);
													res.status(400);
													res.send("error deleting simState, error: " + err);
												} else {
													console.log(
														"API:DELETE:[/api/sims/:simID/states/:simStateID] successfully deleted: " +
															simStatePath,
													);
													res.status(200);
													res.send("successfully deleted: " + simStatePath);
												}
											});
										}
									});
								}
							},
						);
					}
				});
			}
		});
	});

	/* 
    Route: /api/editor/blocks
    Request: GET
    Response_OK: status [200], body  json {  }
    Response_FAIL: status [400], body ['error message']
    */
	app.get("/api/editor/blocks", (req, res) => {
		fs.access(editorConfigPath, err => {
			if (err) {
				res.status(400);
				res.send("error getting blocks, editor file not found. error: " + err);
				console.log(
					"API:GET:[/api/editor/blocks] error accessing editor file. error: " +
						err,
				);
			} else {
				console.log(
					"API:GET:[/api/editor/blocks] success accessing editor file.",
				);
				fs.readFile(editorConfigPath, "utf8", (err, data) => {
					if (err) {
						res.status(400);
						res.send("error reading editor file. error: " + err);
						console.log(
							"API:GET:[/api/editor/blocks] error reading editor file. error: " +
								err,
						);
					} else {
						console.log(
							"API:GET:[/api/editor/blocks] success reading editor file.",
						);
						let editorData = JSON.parse(data);
						res.status(200);
						res.send(editorData.blocks);
					}
				});
			}
		});
	});

	/* 
    Route: /api/editor/blocks
    Request: POST, header [content-type= application/json], body [json of the project]
    Response_OK: status [200], body ['success message']
    Response_FAIL: status [400], body ['error message']
    */
	app.post("/api/editor/blocks", (req, res) => {
		//write contents to a project file
		console.log(
			"API:POST:[/api/editor/blocks/] blocks data to write: " +
				JSON.stringify(req.body),
		);
		//run validation test?
		if (req.body != "undefined" && Array.isArray(req.body)) {
			if (req.body[0]) {
				if (
					!req.body[0].hasOwnProperty("id") ||
					!req.body[0].hasOwnProperty("label") ||
					!req.body[0].hasOwnProperty("category") ||
					!req.body[0].hasOwnProperty("content")
				) {
					res.status(400);
					res.send(
						"Request objects are missing id, label, category, or content keys. request.body= " +
							JSON.stringify(req.body),
					);
					return;
				}
			}
			fs.access(editorConfigPath, err => {
				if (err) {
					res.status(400);
					res.send(
						"error getting blocks, editor file not found. error: " + err,
					);
					console.log(
						"API:POST:[/api/editor/blocks] error accessing editor file. error: " +
							err,
					);
				} else {
					console.log(
						"API:POST:[/api/editor/blocks] success accessing editor file.",
					);
					fs.readFile(editorConfigPath, "utf8", (err, data) => {
						if (err) {
							res.status(400);
							res.send("error reading editor file. error: " + err);
							console.log(
								"API:POST:[/api/editor/blocks] error reading editor file. error: " +
									err,
							);
						} else {
							console.log(
								"API:POST:[/api/editor/blocks] success reading editor file.",
							);
							let editorData = JSON.parse(data);
							editorData.blocks = req.body;
							fs.writeFile(
								editorConfigPath,
								JSON.stringify(editorData, null, "\t"),
								function(err) {
									if (err) {
										res.status(400);
										res.send("error writing project file. error: " + err);
										console.log(
											"API:POST:[/api/editor/blocks/] error writing project file. error: " +
												err,
										);
									} else {
										res.status(200);
										res.send(editorConfigPath + " created successfully.");
										console.log(
											"API:POST:[/api/editor/blocks/] The file was saved to: " +
												editorConfigPath,
										);
									}
								},
							);
						}
					});
				}
			});
		} else {
			res.status(400);
			res.send(
				"API:POST:[/api/editor/blocks/] Request body is undefined, is not an array, or array is empty, ignoring save.",
			);
		}
	});
};
