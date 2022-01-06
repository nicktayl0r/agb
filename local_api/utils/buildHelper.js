var editor = require("../../project/config/editor.json");
var project = require("../../project/config/project.json");
var simStates = require("../../project/config/sims.json");
const fs = require("fs");
const path = require("path");

const finalCssDir = "temp/";
const finalHtmlDir = "temp/pages/";

exports.findPlayerCss = function () {
  let cssObj = {};
  //cssObj[finalCssDir + "a_vue.css"] = "/dependencies/app/dist/production/#.vueStyle.css";
  fs.readdirSync("./dependencies/app/dist/production").forEach((file) => {
    //const p = path.join("./dependencies/app/dist/production", file)
    const p = path.resolve(
      path.join("./dependencies/app/dist/production", file)
    );
    if (fs.statSync(p).isFile() && path.extname(p) === ".css") {
      cssObj[path.join(finalCssDir, path.basename(file))] = p;
    }
  });

  // cssObj[path.join(finalCssDir, "build.js")] = "/dependencies/app/dist/production/build.js";
  // fs.readdirSync("/dependencies/app/dist/production/bundles").forEach(file => {
  // 	const p = path.join("/dependencies/app/dist/production/bundles", file)
  // 	if (fs.statSync(p).isFile() && path.extname(p) === ".js") {
  // 		cssObj[path.join(finalCssDir, "bundles", path.basename(file))] = p;
  // 	}
  // });

  return cssObj;
};

exports.findProjectCssHtml = function () {
  //create css file path array
  //add case.css
  let cssObj = {};
  cssObj = exports.findPlayerCss();

  cssObj[finalCssDir + "b_case.css"] = "../project/assets/case.css";
  // = {
  //     "entry0": "../project/assets/case.css"
  // };

  //every css for every page
  //read project.json object
  // console.log("file: " + JSON.stringify(project));
  for (let track of project.case.tracks) {
    FindTrackPages(track, cssObj);
  }
  for (let track of project.guide.tracks) {
    FindTrackPages(track, cssObj);
  }
  for (let track of project.glossary.tracks) {
    FindTrackPagesGlossary(track, cssObj);
  }
  // console.log("cssObj: " + JSON.stringify(cssObj));
  //if files exist, then add to css file path array
  //return css path.
  return cssObj;
};

function FindTrackPages(track, cssObj) {
  for (let section of track.sections) {
    for (let page of section.pages) {
      const pageID = page.pageID;
      // console.log("pageID: " + pageID);
      try {
        fs.accessSync("../project/pages/" + pageID + "/" + pageID + ".css");
        cssObj[finalCssDir + pageID + ".css"] =
          "../project/pages/" + pageID + "/" + pageID + ".css";
      } catch (error) {
        //not there, don't add to the css.
      }
      try {
        fs.accessSync("../project/pages/" + pageID + "/" + pageID + ".html");
        cssObj[finalHtmlDir + pageID + ".html"] =
          "../project/pages/" + pageID + "/" + pageID + ".html";
      } catch (error) {
        //not there, don't add to the css.
      }
    }
  }
}

function FindTrackPagesGlossary(track, cssObj) {
  if (track.pages) {
    for (let page of track.pages) {
      const pageID = page.pageID;
      // console.log("pageID: " + pageID);
      try {
        fs.accessSync("../project/pages/" + pageID + "/" + pageID + ".css");
        cssObj[finalCssDir + pageID + ".css"] =
          "../project/pages/" + pageID + "/" + pageID + ".css";
      } catch (error) {
        //not there, don't add to the css.
      }
      try {
        fs.accessSync("../project/pages/" + pageID + "/" + pageID + ".html");
        cssObj[finalHtmlDir + pageID + ".html"] =
          "../project/pages/" + pageID + "/" + pageID + ".html";
      } catch (error) {
        //not there, don't add to the css.
      }
    }
  }
}

exports.GetProjectName = function () {
  // console.log("project name: ", project.name);
  return project.name;
};

exports.GetAllSims = function () {
  return project.sims; //array of all the sim data.
};

exports.GetSimStatePath = function (simStateID) {
  console.log("I'm going to look for a simState with the ID: ", simStateID);
};

exports.GetSimID = function (simName) {
  const sim = project.sims.find((x) => {
    // console.log("search ",x.name, ", scene name is ", x.scenes[0].name);
    return x.scenes[0].name === simName;
  });
  if (sim != undefined) return sim.id;
  else {
    console.error("No sim found with the name: ", simName);
    return null;
  }
};
