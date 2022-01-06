const fs =require('fs');
var path = require('path');
var css = require('css');
const { parse, stringify } = require('svgson');

// this should set all project specific SVGs to use roboto and roboto bold where appropriate
const svgDirectory = "./../project/assets/Finals/SVGs";
const projectSVGs = fromDir(svgDirectory, '.svg');
let svgs = [];

function fromDir(startPath,filter){
  if (!fs.existsSync(startPath)){
      console.log("no dir ",startPath);
      return;
  }

  var files=fs.readdirSync(startPath);
  for(var i=0;i<files.length;i++){
      var filename=path.join(startPath,files[i]);
      var stat = fs.lstatSync(filename);
      if (stat.isDirectory()){
          fromDir(filename,filter); //recurse
      }
      if (filename.indexOf(filter)>=0) {
          svgs.push(filename);
        };
      };
  return svgs
};


function updateSVGStyles(_svg, isBold = false, needsImport = true) {
  // the font styles should be found in the attributes of nodes

  for(const child of _svg.children) {
    let fontFamily = child.attributes['font-family'] || '';

    if(fontFamily.includes('Roboto-Regular')) {
      child.attributes['font-family'] = 'Roboto, sans-serif';
    }

    if (fontFamily.includes('Roboto-Bold')) {
      isBold = true;
      child.attributes['font-family'] = 'Roboto, sans-serif'
      child.attributes['font-weight'] = 'bold';
    }
    if(child.name === 'style' && child.children.length && child.children[0].value.includes('@import')) {
      //if we've already imported a font, we shouldn't need to import it again
      needsImport = false;
    }

    if(child.name === 'style' && child.children.length && child.children[0].value.includes('font-family')) {
      // if the errant fonts are included as css, we'll need to step through that css to correct things
      const ast = css.parse(child.children[0].value);
      for (const rule of ast.stylesheet.rules) {
        for(const declaration of rule.declarations) {
          if(declaration.property === 'font-family' && declaration.value.includes('Roboto')) {
            declaration.value = 'Roboto, sans-serif'
          }
          if(declaration.property === 'font-weight') {
            declaration.value = 'bold'
          }
        }
      }
      child.children[0].value = css.stringify(ast)
    }

    if(child.children.length) {
      updateSVGStyles(child, isBold, needsImport)
    }
  }
  return [_svg, isBold, needsImport];
}

async function fixSVGs() {
  console.log(projectSVGs);
  if(projectSVGs.length) {
    for(const svgPath of projectSVGs) {
      const svg = await parse(fs.readFileSync(svgPath, 'utf8'));
      const [_svg, isBold, needsImport] = updateSVGStyles(svg);
      let fontLink;
      
      if (isBold && needsImport) {
        fontLink = `@import url(https://fonts.googleapis.com/css?family=Roboto:bold,regular)`
      } else if(needsImport)  {
        fontLink = `@import url(https://fonts.googleapis.com/css?family=Roboto)`
      }

      _svg.children.push({
        name: "style",
        attributes: {
          type: "text/css"
        },
        children: [{
          name: "",
          type: "text",
          value: fontLink,
          attribute: {},
          children: []
        }]
      })

      const newSVG = stringify(_svg);
      fs.writeFile(svgPath, newSVG, (err) => { 
        if (err) {
          console.log(svgPath)
          console.log(err); 
        }
      });
    }
    console.log("Files written successfully!"); 
  } else {
    console.warn("🤔 No SVGs found in the directory")
  }
}

fixSVGs();
