
var fs = require('fs');

const buildFile = "./build.js";
fs.readFile(buildFile, 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  var result = data.replace(/\.\.\/node_modules\/@is3d\/playcanvasengine\/basis/g, './lib/basis');

  fs.writeFile(buildFile, result, 'utf8', function (err) {
     if (err) return console.log(err);
  });
});