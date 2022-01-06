var editor = require("../../../project/config/editor.json");
const fs = require("fs");


exports.findCss = function () {
    //create css file path array
    //add case.css
    let cssObj = {
        entry0: "../project/assets/case.css",
    };

    //every css for every page
    //read editor.json object
    // console.log("file: "+JSON.stringify(editor));

    // let editor= JSON.parse(file);
    //get all the pages .case, .guide, .glossary
    for (let i = 0; i < editor.case.length; i++) {
        let pageID = editor.case[i].id;
        // console.log("pageID: " + pageID);
        try {
            fs.accessSync("../project/pages/" + pageID + "/" + pageID + ".css");
            cssObj[pageID] = "../project/pages/" + pageID + "/" + pageID + ".css";
        } catch (error) {
            //not there, don't add to the css.
        }
    }
    for (let i = 0; i < editor.guide.length; i++) {
        let pageID = editor.guide[i].id;
        // console.log("pageID: " + pageID);
        try {
            fs.accessSync("../project/pages/" + pageID + "/" + pageID + ".css");
            cssObj[pageID] = "../project/pages/" + pageID + "/" + pageID + ".css";
        } catch (error) {
            //not there, don't add to the css.
        }
    }
    for (let i = 0; i < editor.glossary.length; i++) {
        let pageID = editor.glossary[i].id;
        // console.log("pageID: " + pageID);
        try {
            fs.accessSync("../project/pages/" + pageID + "/" + pageID + ".css");
            cssObj[pageID] = "../project/pages/" + pageID + "/" + pageID + ".css";
        } catch (error) {
            //not there, don't add to the css.
        }
    }
    // console.log("cssObj: " + JSON.stringify(cssObj));
    //if files exist, then add to css file path array
    //return css path.
    return cssObj;
};