const fs = require("fs");
const path = require("path");

const pretty = require("pretty");
const cssbeautify = require("cssbeautify");
const uuidv4 = require("uuid/v4");

const projectDirectoryName = "project";
const projectPath = path.join(".", "..", projectDirectoryName);
const configPath = path.join(projectPath, "config");

const editorConfigPath = path.join(configPath, "editor.json");
const pagePath = path.join(projectPath, "pages");

const bulkFileDataPath= path.join(".","..", "BulkPageCreate.json");

const NewPage= {
	name: "new",
	"gjs-components": '[{"tag Name":"div","type":"text","name":"","removable":true,"draggable":true,"droppable":false,"badgable":true,"stylable":true,"stylable-require":"","unstylable":"","highlightable":true,"copyable":true,"resizable":false,"editable":true,"layerable":true,"selectable":true,"hoverable":true,"void":false,"state":"","status":"","content":"Welcome to page ID!","icon":"","style":"","attributes":{},"classes":[{"name":"ID!","label":"ID!","type":1,"active":true,"private":false,"protected":false}],"script":"","traits":[{"type":"text","label":"","name":"id","min":"","max":"","unit":"","step":1,"value":"","default":"","placeholder":"eg. Text here","changeProp":0,"options":[]},{"type":"text","label":"","name":"title","min":"","max":"","unit":"","step":1,"value":"","default":"","placeholder":"eg. Text here","changeProp":0,"options":[]}],"propagate":"","custom-name":"definition","components":[],"open":false}]',
	"gjs-assets": "",
	"gjs-styles": '[{"selectors":[{"name":"ID!","label":"ID!","type":1,"active":true,"private":false,"protected":false}],"selectorsAdd":"","style":{},"mediaText":"","state":"","stylable":true,"atRuleType":"","singleAtRule":0,"important":0}]',
	"gjs-css": "",
	"gjs-html": '<div class="ID!" data-gjs-custom-name="definition">Welcome to page ID!</div>'
}

fs.access(bulkFileDataPath, err => {
	if (err) {
		console.error("error getting bulk file config. error: " + err);
	} else {
		console.log("success accessing bulk file config.");
		fs.readFile(bulkFileDataPath, "utf8", (err, data) => {
			if (err) {
				console.error("error reading bulk file config. error: " + err);
				return;
			} else {
				if (data == undefined) {
					console.error("error. bulk file config has no data.");
					return;
				}
				let bulkPageData = JSON.parse(data);
				var i = 0;                     //  set your counter to 1

				function myLoop () {           //  create a loop function
					setTimeout(function () {    //  call a 3s setTimeout when the loop is called
						const id= uuidv4().split("-")[0].slice(0,5);
						const dupPage= Object.assign({}, NewPage);
						CreatePage(bulkPageData[i].module, id, dupPage, bulkPageData[i].name, bulkPageData[i].content);
						i++;                     //  increment the counter
						if (i < bulkPageData.length) {            //  if the counter < 10, call the loop function
							myLoop();             //  ..  again which will trigger another 
						}                       //  ..  setTimeout()
					}, 500);
				}

				myLoop();    
			}
		});
	}
});

//Take IDs and new page object => insert content => write all files
function CreatePage(moduleID, pageId, newPage, pageName, pageContent) {
	console.log("===== CreatePage: module= ",moduleID,", pageID= ",pageId);
	newPage.name= pageName; //not sure if this is actually used
	if (pageContent!= undefined && pageContent!="") { //set page content
		newPage["gjs-components"] = newPage["gjs-components"].replace("Welcome to page ID!", pageContent);
		newPage["gjs-html"]= newPage["gjs-html"].replace("Welcome to page ID!", pageContent);
		newPage["gjs-html"] = newPage["gjs-html"].replace("page ID!", pageId + "!");
	}
	else{
		newPage["gjs-components"] = newPage["gjs-components"].replace("ID!", pageId + "!"); //set the content to the pageID
		newPage["gjs-html"] = newPage["gjs-html"].replace("page ID!", pageId + "!"); //set the content to the PageID
	}
	newPage["gjs-components"] = newPage["gjs-components"].replace(/ID!/g, "page" + pageId); //set style class with pageID
	newPage["gjs-styles"] = newPage["gjs-styles"].replace(/ID!/g, "page" + pageId); //set css class with pageID
	newPage["gjs-html"] = newPage["gjs-html"].replace("ID!", "page" + pageId);

	//stolen from api_routes - not sure how to reference that code.
	fs.access(editorConfigPath, err => {
		if (err) {
			console.error("error getting editor config. error: " + err);
		} else {
			console.log(" success accessing project file.");
			fs.readFile(editorConfigPath, "utf8", (err, data) => {
				if (err) {
					
					console.error("error reading editor config. error: " + err);
					console.log(" error reading editor file, error: " + err);
					return;
				} else {
					if (data == undefined) {
						console.log(" error. Editor.json has no data.");
						console.error("error. Editor.json has no data.");
						return;
					}
					let editorPages = JSON.parse(data);
					//make sure params.moduleID is valid
					if (editorPages[moduleID] == undefined) {
						console.log(" error, bad moduleID: " + moduleID + ". Must be case, guide, or glossary." );
						
						console.error('error. Module must be "case", "guide", or "glossary".');
						return;
					}

					//get list of pages with editorPages[params.moduleID]
					let projectModule = editorPages[moduleID];
					//check if params.pageID already exists, update name
					let page = projectModule.find((currentValue, index) => {
						return currentValue.id === pageId;
					});
					if (page !== undefined) {
						if (pageName !== undefined) {
							console.log(moduleID," Found page UID in editor file: " + pageId + ", changing name to: " + pageName);
							page.name = pageName;
						}
					} else {
						console.log(moduleID, " No page UID in editor file: " + pageId + ", adding one.");
						if (pageName == undefined) pageName = "new";
						projectModule.push({
							id: pageId,
							name: pageName,
						});
					}
					//write editor data back out
					fs.writeFile(
						editorConfigPath,
						JSON.stringify(editorPages, null, "\t"),
						function(err) {
							if (err) {
								
								console.error("error writing editor file. error: " + err);
								console.log(" error writing editor file, error: " + err);
								return;
							} else {
								console.log(" success writing editor file: " + editorConfigPath);
							}
						},
					);

					//check if pageID directory exists, create if not
					const pageIDPath = path.join(pagePath, pageId);
					fs.access(pageIDPath, err => {
						if (err) {
							console.log(
								" the directory doesn't exist: " +
									pageIDPath +
									", creating one.",
							);
							fs.mkdir(pageIDPath, err => {
								if (err) {
									console.log(
										" error creating directory: " +
											pageIDPath +
											", error: " +
											err,
									);
									
									console.error(err);
								} else {
									console.log(
										" successfully created directory: " +
											pageIDPath,
									);
									CreatePageFiles(pageIDPath, pageId, newPage, err => {
										if (err) {
											console.log(
												" CreatePageFiles failed: " +
													err,
											);
											
											console.error(err);
											return;
										} else {
											console.log(
												" Success creating Grapes data, html, and css files for: " +
													pageId,
											);
											return;
										}
									});
								}
							});
						} else {
							console.log("directory exists: " + pageIDPath);
							CreatePageFiles(pageIDPath, pageId, newPage, err => {
								if (err) {
									console.log(
										" CreatePageFiles failed: " +
											err,
									);
									
									console.error(err);
									return;
								} else {
									console.log(
                    "===== Success creating Grapes data, html, and css files for: " +
                      pageId
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
};

function CreatePageFiles(pageDir, pageID, req, callback) {
	//write grapes data to pageID.json
	const pageGrapes = path.join(pageDir, pageID + ".json");
	// console.log(req["gjs-components"]);
	const grapesData = {
		// eval turns these into nice readable objects instead of huge strings
		"gjs-components": JSON.parse(req["gjs-components"]),
		"gjs-styles": JSON.parse(req["gjs-styles"]),
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
			const htmlData = pretty(req["gjs-html"], { ocd: true }); // pretty print html from response to make diffs more readable
			fs.writeFile(pageHtml, htmlData, function(err) {
				if (err) {
					callback("error writing html file. error: " + err);
					return;
				} else {
					console.log("html file was saved to: " + pageHtml);
					//write css to pageID.css
					const pageCss = path.join(pageDir, pageID + ".css");
					const cssData = cssbeautify(req["gjs-css"], { indent: "\t" }); // pretty print css from response to make diffs more readable
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