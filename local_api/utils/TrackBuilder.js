///** Will build a glossary track based on a list of titles and related terms. GLOSSARY PAGES MUST ALREADY EXIST in Project/config/editor.json */
const fs = require("fs");
// const unzip = require("unzip-stream");
// const request = require("request");
const path = require("path");
// const rimraf = require("rimraf");
// const normalizePath = require("normalize-path");
// const formidable = require("formidable");
const pretty = require("pretty");
// const cssbeautify = require("cssbeautify");
// const uuidv4 = require("uuid/v4");
const stringSimilarity= require("string-similarity");

const projectDirectoryName = "project";
const projectPath = path.join(".", "..", projectDirectoryName);
const configPath = path.join(projectPath, "config");
const projectConfigPath = path.join(configPath, "project.json");
const editorConfigPath = path.join(configPath, "editor.json");
const pagePath = path.join(projectPath, "pages");

const bulkFileDataPath= path.join(".","..", "BulkPageCreate.json");

//read the bulk page file, parse into object
//put page names into a string array
var bulkPageData;
fs.access(bulkFileDataPath, err => {
	if (err) {
		console.error("error getting bulk file config. error: " + err);
	} else {
		console.log(
			"success accessing bulk file config.",
		);
		fs.readFile(bulkFileDataPath, "utf8", (err, data) => {
			if (err) {
				console.error("error reading bulk file config. error: " + err);
				return;
			} else {
				if (data == undefined) {
					console.error("error. bulk file config has no data.");
					return;
				}
				bulkPageData = JSON.parse(data); 
				GetEditorData();
			}
		});
	}
});

//read editor.json for pages in glossary, parse into object
var editorData;
var editorPages= {};
function GetEditorData() {
	fs.access(editorConfigPath, err => {
		if (err) {
			console.error("error editor file config. error: " + err);
		} else {
			console.log(
				"success accessing editor file config.",
			);
			fs.readFile(editorConfigPath, "utf8", (err, data) => {
				if (err) {
					console.error("error reading editor file config. error: " + err);
					return;
				} else {
					if (data == undefined) {
						console.error("error. editor file config has no data.");
						return;
					}
					editorData = JSON.parse(data);
					//put page names into a string array
					editorPages.glossary= editorData.glossary.map(x => { return x.name });
					editorPages.case = editorData.case.map(x => { return x.name });
					editorPages.guide= editorData.guide.map(x => { return x.name });
					// console.log(editorPages);
					GetProjectData();
				}
			});
		}
	});
}

//read project file, parse into object
var projectData;
function GetProjectData() {
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
					CreateNewTracks();
				}
			});
		}
	});
}
//store tracks in a dictionary by name
var NewTracks= {};
var SectionColors= ["#f95858", "#fcb259", "#fffa99", "#c1ff8a", "#83ffd6", "#85cbff", "#a9b3fc", "#e399ff"];

//create a new track object, include trackID, track name, empty pages array
function CreateNewTracks() {

	//fill trackDictionary

	const newGlossaryTrack= {trackID: "autoGen", name: "", pages: []};
	const newCaseGuideTrack= {trackID: "autoGen", name: "", sections: []};
	const section= {pages: [], name: "", visible: true, tocColor: "#000000", entryColor: "#000000"};
	
	const newGlossaryPage= {name: "", pageID: "", relatedTerms: []};
	const newCaseGuidePage= {name: "", pageID: "", popperMessage: "", visible: true};
	const relTerm= {name: "", pageID: ""};
	//for each object in bulkFile
	for (var i=0; i<bulkPageData.length; i++) {
		const bP= bulkPageData[i];
		//create a new page: pageName
		var p;
		if (bP.module == "glossary") {
			p= Object.assign({}, newGlossaryPage);
			p.relatedTerms= []; //shallow copy leaves reference, need to assign a new array
			// console.log(bP);
			p.term= bP.term; //temporarily storing the term name here, to be removed and replace name 
		} 
		else {
			p= Object.assign({}, newCaseGuidePage);
		}
		p.name= bP.name;
		//search through editor-pageArray for best match, get id from editor object
		var editorIdMatch= stringSimilarity.findBestMatch(p.name, editorPages[bP.module]);
		// console.log(p.name, "best match=", editorIdMatch.bestMatch.target);
		var id= editorData[bP.module].find(x => { return x.name == editorIdMatch.bestMatch.target}).id;
		// console.log(p.name," - id=",id);
		//Set pageID to id
		p.pageID= id;
		//loop through relatedTerm array
		if (bP.module == "glossary") {
			for (var rl of bP.relatedTerms) {
				var newRT= Object.assign({}, relTerm);
				//set pageName to relatedTerm[i]
				newRT.name= rl;
				//search through editor-pageArray for best match
				// var relTermsMatch= stringSimilarity.findBestMatch(rl, editorPages[bP.module]);
				// //find matching ID
				// var rId= editorData.glossary.find(x => { return x.name == relTermsMatch.bestMatch.target}).id;
				// newRT.pageID = rId;
				//set related term pageID to matching ID
				p.relatedTerms.push(newRT);
				// console.log(newRT);
			}
		}
		// console.log(p);
		// console.log("num related terms: ",p.name, p.relatedTerms.length);
		for (var t of bP.tracks) {
			if (NewTracks[bP.module] == undefined) NewTracks[bP.module]= {};
			if (bP.module == "glossary"){
				if (NewTracks[bP.module][t]==undefined) {
					var track;
					track = Object.assign({}, newGlossaryTrack);
					track.pages= [];
					track.trackID= "glossary-"+t;
					track.name= "glossary-"+t;
					NewTracks[bP.module][t]= track;
				}
			}
			else if (NewTracks[bP.module][t.tName]==undefined) {
				var track;
				track= track = Object.assign({}, newCaseGuideTrack);
				track.sections= [];
				track.trackID= t.tName;
				track.name= t.tName;
				NewTracks[bP.module][t.tName]= track;
			}
			if (bP.module == "glossary"){
				NewTracks[bP.module][t].pages.push(p);
			}
			else {
				p.name= t.pName; //change the name to be specific to the track
				let s= NewTracks[bP.module][t.tName].sections.find((x) => {return x.name == t.sName}); //look for an existing section by name
				if (s == undefined) {
					s= Object.assign({}, section);
					s.pages= [];
					s.name= t.sName;
					//if length of sections > length of section colors repeat
					let color= -1; 
					if (NewTracks[bP.module][t.tName].sections.length >= SectionColors.length) {
						color = NewTracks[bP.module][t.tName].sections.length % SectionColors.length;
						// console.log(bP.module, "length exceeds colors, modulo =",color);
					}
					else color = NewTracks[bP.module][t.tName].sections.length;
					s.tocColor= SectionColors[color];
					s.entryColor= SectionColors[color];
					// console.log("color = ",s.tocColor);
					NewTracks[bP.module][t.tName].sections.push(s);
				}
				s.pages.push(p);
			}
		}
		//push page to track.pages
	}
	// console.log(newTrack.pages[5]);
	SetRelatedTerms();
}

function SetRelatedTerms() {
	// console.log("NewTracks", NewTracks);
	const glossary= NewTracks.glossary;
	for (var track in glossary) {
		// console.log("track pages", glossary[track].pages);
		var allTrackPages= []
		for (var page of glossary[track].pages) {
			// for (var term in section.pages) {
				// console.log(page);
				allTrackPages.push(page.name);
			// }
		}
		// console.log("allTrackPages:", allTrackPages);
		for (var page of glossary[track].pages) {
			// console.log(page);
			for (var rT of page.relatedTerms) {
				//search through editor-pageArray for best match
				var relTermsMatch= stringSimilarity.findBestMatch(rT.name, allTrackPages);
				//find matching ID
				var rId= editorData.glossary.find(x => { return x.name == relTermsMatch.bestMatch.target}).id;
				rT.pageID = rId;
				//set related term pageID to matching ID
				// p.relatedTerms.push(newRT);
			}
			// console.log("Track",track,"-",page.name,page.relatedTerms);
		}
	}
	for (var track in glossary) {
	//after setting the related terms, fix the page name in the track to something readable	
		for (var page of glossary[track].pages) {
			if (page.term!= undefined) page.name= page.term; //rename the page in the track to the term name
			page.term= undefined; //remove the term property, it is temporary
			// console.log(track," - ",page.name);
		}
	}
	WriteNewTrackToProject();
}

function WriteNewTrackToProject() {
	//push track 
	for (var mod in NewTracks) {
		for (var track in NewTracks[mod]) {
			projectData[mod].tracks.push(NewTracks[mod][track]);
		}
	}
	// console.log(projectData.glossary.tracks);
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
