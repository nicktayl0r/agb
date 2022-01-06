// import { error } from 'util';

var path = require("path");
var fs = require("fs");
const ip = require("ip");
var getUsedPages = require("../../utils/projectHelper").GetUsedPages;
var addSectionToAllTracks =
  require("../../utils/projectHelper").AddSectionToAllTracks;

module.exports = function (app) {
  // app.use(function(req, res, next) {
  //     res.header("Access-Control-Allow-Origin", "*");
  //     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //     next();
  // });

  //general editor route
  app.get("/editor/page", (req, res) => {
    res.redirect("/dependencies/grapes/dist/index.html");
  });
  app.get("/editor/project", (req, res) => {
    res.redirect("/dependencies/grapes/dist/jsonEditor/index.html");
  });
  app.get("/editor/sim", (req, res) => {
    res.send("The route (/editor/sim) is not ready yet.");
    // res.redirect('/node_modules/@is3d/grapes/index.html')
  });
  // app.get('/preview*', (req, res, next) => { //toying with the idea of triggering a webpack rebuild when visiting the preview
  //     console.log('/preview');
  //     next();
  // });

  //these routes are called specifically by the player app when running from /dependencies/app/dist/index.html
  //this one is for the project.json file, but would work for any file requested in node_modules/@is3d/app/data/
  app.get("/dependencies/app/dist/data/:filename", (req, res) => {
    // var newPath= path.combine('/..','project','config',req.params.filename);
    let newPath = "/../project/config/" + req.params.filename;
    console.log("redirecting to: " + newPath);
    res.redirect(newPath);
  });
  //this one is for the page names, it converts a node_modules/@is3d/app/data/pages/pageID.html path into a project/pages/pageID/pageID.html
  app.get("/dependencies/app/dist/data/pages/:filename", (req, res) => {
    let pageName = req.params.filename.split(".")[0];
    let newPath = "/../project/pages/" + pageName + "/" + req.params.filename;
    console.log("redirecting to: " + newPath);
    res.redirect(newPath);
  });

  //this one is for the case.css file, but would work for any file requested in /Project/assets/
  app.get("/project/assets/:filename", (req, res) => {
    // var newPath= path.combine('/..','project','config',req.params.filename);
    let newPath = "/../project/assets/" + req.params.filename;
    console.log("redirecting to: " + newPath);
    res.redirect(newPath);
  });

  //this one is for images in the grapes editor canvas. When grapes moved to a module, the image paths are one folder deeper.
  //this catches those asset calls and redirects to the project assets.
  app.get("/node_modules/assets/*/", (req, res) => {
    let newPath = "/../project/assets/";
    // console.log("origURL", req.originalUrl);
    // console.log("path", req.path);
    newPath = newPath + req.path.replace("//node_modules/assets/", "");
    console.log("redirecting to: " + newPath);
    res.redirect(newPath);
  });

  //these routes are called specifically by the player app when running from /preview/index.html
  //this one is for the project.json file, but would work for any file requested in preview/data/
  app.get("/preview/data/:filename", (req, res) => {
    // var newPath= path.combine('/..','project','config',req.params.filename);

    //To add in pages not yet in the project, read the project.json file, inject all pages created by the editor, return project data (write to a temp file if necessary and return that)
    if (req.params.filename == "project.json") {
      const projConfigPath = "../project/config/project.json";
      fs.access(projConfigPath, (err) => {
        if (err) {
          console.log(
            "PROJECT:GET:[/preview/data/:filename] error accessing file, error: " +
              err
          );
          res.status(400);
          res.send("error accessing project.json, error: " + err);
          return;
        } else {
          console.log(
            "PROJECT:GET:[/preview/data/:filename] success accessing file",
            projConfigPath
          );
          fs.readFile(projConfigPath, (err, data) => {
            if (err) {
              console.log(
                "PROJECT:GET:[/preview/data/:filename] error reading file, error: " +
                  err
              );
              res.status(400);
              res.send("error reading project.json, error: " + err);
              return;
            } else {
              let project = JSON.parse(data);
              //read editor.json
              //compare filenames to see if any are missing
              //if so, then add them
              const editorConfigPath = "../project/config/editor.json";
              fs.access(editorConfigPath, (err) => {
                if (err) {
                  console.log(
                    "PROJECT:GET:[/preview/data/:filename] error accessing file, error: " +
                      err
                  );
                  res.status(400);
                  res.send("error accessing editor.json, error: " + err);
                  return;
                } else {
                  console.log(
                    "PROJECT:GET:[/preview/data/:filename] success accessing file",
                    editorConfigPath
                  );
                  fs.readFile(editorConfigPath, (err, data) => {
                    if (err) {
                      console.log(
                        "PROJECT:GET:[/preview/data/:filename] error reading file, error: " +
                          err
                      );
                      res.status(400);
                      res.send("error reading editor.json, error: " + err);
                      return;
                    } else {
                      let editor = JSON.parse(data);
                      //use helper to generate list of pages
                      let usedPages = getUsedPages(project); //obj with all pages in all tracks per module
                      let casePreviewSection = {
                        name: "case preview (not in a track)",
                        tocColor: "#be2a3d",
                        pages: [],
                      };
                      for (let i = 0; i < editor.case.length; i++) {
                        let includesPage = false;
                        for (let j = 0; j < usedPages.case.length; j++) {
                          if (usedPages.case[j] == editor.case[i].id) {
                            includesPage = true;
                            break;
                          }
                        }
                        if (!includesPage) {
                          //if any editor page isn't in the list, add it to a new section.
                          casePreviewSection.pages.push({
                            name: editor.case[i].name,
                            pageID: editor.case[i].id,
                          });
                        }
                      }
                      if (casePreviewSection.pages.length > 0)
                        addSectionToAllTracks(project.case, casePreviewSection);

                      let guidePreviewSection = {
                        name: "guide preview (not in a track)",
                        tocColor: "#be2a3d",
                        pages: [],
                      };
                      for (let i = 0; i < editor.guide.length; i++) {
                        let includesPage = false;
                        for (let j = 0; j < usedPages.guide.length; j++) {
                          if (usedPages.guide[j] == editor.guide[i].id) {
                            includesPage = true;
                            break;
                          }
                        }
                        if (!includesPage) {
                          //if any editor page isn't in the list, add it to a new section.
                          guidePreviewSection.pages.push({
                            name: editor.guide[i].name,
                            pageID: editor.guide[i].id,
                          });
                        }
                      }
                      if (guidePreviewSection.pages.length > 0)
                        addSectionToAllTracks(
                          project.guide,
                          guidePreviewSection
                        );

                      // let glossaryPreviewSection= {"name": "glossary preview (not in a track)", "tocColor": "#be2a3d","pages": []}
                      // for (let i= 0; i<editor.glossary.length; i++){
                      //     let includesPage = false;
                      //     for(let j=0; j < usedPages.glossary.length; j++)
                      //     {
                      //         if(usedPages.glossary[j] == editor.glossary[i].id)
                      //         {
                      //             includesPage = true;
                      //             break;
                      //         }
                      //     }
                      //     if (!includesPage){
                      //         //if any editor page isn't in the list, add it to a new section.
                      //         glossaryPreviewSection.pages.push({"name": editor.glossary[i].name, "pageID": editor.glossary[i].id})
                      //     }
                      // }
                      // if(glossaryPreviewSection.pages.length > 0)
                      //     addSectionToAllTracks(project.glossary, glossaryPreviewSection);

                      res.status(200);
                      res.send(project);
                      return;
                    }
                  });
                }
              });
            }
          });
        }
      });
    } else {
      let newPath = "/../project/config/" + req.params.filename;
      console.log("redirecting to: " + newPath);
      res.redirect(newPath);
    }
  });
  //this one is for the page names, it converts a preview/data/pages/pageID.html path into a project/pages/pageID/pageID.html
  app.get("/preview/data/pages/:filename", (req, res) => {
    let pageName = req.params.filename.split(".")[0];
    let newPath = "/../project/pages/" + pageName + "/" + req.params.filename;
    console.log("redirecting to: " + newPath);
    res.redirect(newPath);
  });

  //this one is for the page names, it converts a preview/assets/scenes/:simID/:filename path into a project/assets/scenes/:simID/:filename
  //app.get('/preview/assets/scenes/:simID/:filename', (req, res) => {
  app.get("/preview/assets/scenes/:simID/*", (req, res) => {
    // let pageName= req.params.filename.split(".")[0];
    //console.log(req);
    let newPath =
      "/../project/assets/scenes/" + req.params.simID + "/" + req.params[0];
    console.log("redirecting to: " + newPath);
    res.redirect(newPath);
  });

  //this one is for the page names, it converts a preview/data/sims/:simID/:filename path into a project/data/sims/:simID/:filename
  //app.get('/preview/data/sims/:simID/:filename', (req, res) => {
  app.get("/preview/data/sims/:simID/*", (req, res) => {
    // let pageName= req.params.filename.split(".")[0];
    let newPath = "/../project/sims/" + req.params.simID + "/" + req.params[0];
    console.log("redirecting to: " + newPath);
    res.redirect(newPath);
  });

  //this one is for the distributed vue app bundles
  app.get("/preview/bundles/:filename", (req, res) => {
    // let pageName= req.params.filename.split(".")[0];
    //console.log(req);
    let newPath = "/dependencies/app/dist/bundles/" + req.params.filename;
    console.log("redirecting to: " + newPath);
    res.redirect(newPath);
  });

  app.get("/preview/player-version.txt", (req, res) => {
    // let pageName= req.params.filename.split(".")[0];
    //console.log(req);
    let newPath = "/dependencies/app/dist/player-version.txt";
    console.log("redirecting to: " + newPath);
    res.redirect(newPath);
  });

  app.get("/preview/project-version.txt", (req, res) => {
    // let pageName= req.params.filename.split(".")[0];
    //console.log(req);
    let newPath = "/../project-version.txt";
    console.log("redirecting to: " + newPath);
    res.redirect(newPath);
  });
};
