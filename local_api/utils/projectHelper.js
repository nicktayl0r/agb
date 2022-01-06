module.exports.GetUsedPages=  function(projectConfig){
    //strip out the pageIDs from each module and return in a new object
    let pagesOnly= {case: [], guide: [], glossary: []};
    GetPagesFromModule(projectConfig.case, pagesOnly.case);
    GetPagesFromModule(projectConfig.guide, pagesOnly.guide);
    GetPagesFromGlossary(projectConfig.glossary, pagesOnly.glossary);
    console.log("pagesOnly= "+JSON.stringify(pagesOnly));
    return pagesOnly;
}

function GetPagesFromModule(_module, list){
    for (let i= 0; i< _module.tracks.length; i++){
        console.log('_module.track.name: '+_module.tracks[i].name);
        for (let j=0; j<_module.tracks[i].sections.length; j++){
            console.log('_module.track.section.name: '+_module.tracks[i].sections[j].name);
            for (let k=0; k<_module.tracks[i].sections[j].pages.length; k++){
                list.push(_module.tracks[i].sections[j].pages[k].pageID);
            }
        }
    }
}

function GetPagesFromGlossary(_module, list){
    for (let i= 0; i< _module.tracks.length; i++){
        if(_module.tracks[i].pages) {
            console.log('_module.track.name: '+_module.tracks[i].name);
            for (let k=0; k<_module.tracks[i].pages.length; k++){
                list.push(_module.tracks[i].pages[k].pageID);
            }        
        }
    }
}

module.exports.AddSectionToAllTracks=  function(_module, newSection){
    //take newSection and add it all tracks in _module
    for (let i= 0; i< _module.tracks.length; i++){
        _module.tracks[i].sections.push(newSection);
    }
}