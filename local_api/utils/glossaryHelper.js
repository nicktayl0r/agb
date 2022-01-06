const { Sequelize } = require('sequelize');
const fs = require('fs');

const editorConfig = "../project/config/editor.json";
const projectConfig = "../project/config/project.json"
const pagesRoute = "../project/pages";
const projectTracks = {
  "E": {
    "trackID": "glossary-E",
    "name": "glossary-E",
    "pages": []
  },
  "Ex": {
    "trackID": "glossary-Ex",
    "name": "glossary-Ex",
    "pages": []
  },
  "M": {
    "trackID": "glossary-M",
    "name": "glossary-M",
    "pages": []
  },
  "Mx": {
    "trackID": "glossary-Mx",
    "name": "glossary-Mx",
    "pages": []
  },
  "H": {
    "trackID": "glossary-H",
    "name": "glossary-H",
    "pages": []
  },
  "Hx": {
    "trackID": "glossary-Hx",
    "name": "glossary-Hx",
    "pages": []
  },
  "A": {
    "trackID": "glossary-A",
    "name": "glossary-A",
    "pages": []
  },
  "Ax": {
    "trackID": "glossary-Ax",
    "name": "glossary-Ax",
    "pages": []
  }
};

const getTerms = async function() {
  if(process.argv.length < 3){
    throw new Error("You must include the name of the glossary.");
  }
  const glossaryName = process.argv[2];
  const host = "sql.elclouddev.net";
  const db = "Glossary-Manager";
  const username = process.env.PROD_GM_USERNAME;
  const password = process.env.PROD_GM_PASSWORD;
  const mssqlDB = new Sequelize(db, username, password,{
    host,
    dialect: 'mssql',
    storage: './store.mssql',
    dialectOptions: {
      options: {
          encrypt: true,
      }
    }
  });

  const glossary = mssqlDB.define('glossaries', {
    GlossaryName: Sequelize.STRING,
    GlossaryID: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    GlossaryStatus: Sequelize.STRING,
  })

  const slideReferences = mssqlDB.define('slideReferences', {
    SlideReferenceID: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    SlideLinkDescription: Sequelize.STRING,
    SlideLink: Sequelize.STRING,
    TermID: Sequelize.STRING,
  })

  const terms = mssqlDB.define('terms', {
    TermID: {
      type: Sequelize.STRING,
      primaryKey: true,
    }, 
    Term: Sequelize.STRING,
    GlossaryID: Sequelize.STRING
  });

  const tracks = mssqlDB.define('tracks', {
    TrackID:{
      type: Sequelize.STRING,
      primaryKey: true,
    },
    Active: Sequelize.BOOLEAN,
    Definition: Sequelize.STRING,
    TermID: Sequelize.STRING,
    TrackDetailID: Sequelize.INTEGER
  });

  const relatedTerms = mssqlDB.define('relatedTerms', {
    RelatedTermID: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    ParentTermID: Sequelize.STRING,
    ChildTermID: Sequelize.STRING
  })

  const trackDetails = mssqlDB.define('trackTypes', {
    TrackName: Sequelize.STRING,
    TrackKey: Sequelize.STRING,
    TrackDetailID: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    }
  })

  glossary.hasMany(terms,{foreignKey: 'GlossaryID'});
  terms.belongsTo(glossary);

  terms.hasMany(tracks, {foreignKey: 'TermID'});
  tracks.belongsTo(terms);

  terms.hasMany(relatedTerms, {foreignKey: 'ParentTermID'});
  relatedTerms.belongsTo(terms);

  terms.hasMany(slideReferences, {foreignKey: 'TermID'});
  slideReferences.belongsTo(terms)

  tracks.belongsTo(trackDetails, {
    foreignKey: 'TrackDetailID'})
  trackDetails.hasOne(tracks, {
    targetKey:  'TrackDetailID' })
    return await glossary.findAll({
      attributes: ['GlossaryName'],
      where: {GlossaryName: glossaryName},
      order: [
        ['GlossaryName', 'ASC'],
        [terms, 'Term', 'ASC'],
      ],
      include: [{
        model: terms,
        attributes: ['Term', 'TermID'],
        include: [{
          model: relatedTerms,
          attributes: ['RelatedTermID', 'ChildTermID'],
        },{
          model: tracks,
          attributes: ['Definition', 'Active', 'TrackDetailID'],
          include: [{
            model: trackDetails,
            attributes: ['TrackName', 'TrackCode']
          }]
        }]
      }]
    });
}

const getPageIDs = function(otherIDs = []) {
  const editor = JSON.parse(fs.readFileSync(editorConfig));
  return [
    ...editor.case.map(casePage => casePage.id), 
    ...editor.guide.map(handbookPage => handbookPage.id),
    ...otherIDs
  ];
}

const makePageID = function() {
  let id = Math.floor(Math.random()*1048576 ).toString(16);
  while(id.length < 5) {
    id = "0" + id;
  }
  //TODO: only checks for IDs in editor json currently, which is bad
  return getPageIDs().includes(id) 
    ? makePageID() 
    : id;
}

const deriveProjectData = function(terms, termDictionary) {
  let tracks = terms
    .reduce((acc, term) => {
      const trackKeys = Object.keys(term.dataValues.tracks);
      const relatedTermKeys = Object.keys(term.dataValues.relatedTerms);
      // for each track in the term, push to the appropriate track in the accumulator
      for(const track of trackKeys) {
        const currentTrack = term.dataValues.tracks[track]
        for(const page of termDictionary[term.Term]) {
          const isPageInTrack = page.trackCode.split('-').some(page => currentTrack.dataValues.trackType.dataValues.TrackCode === page);
          if(currentTrack.dataValues.Active && isPageInTrack) { 
            // ensure we only add the page associated with the track
            let newPage = {
              "name": term.Term.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()),
              "pageID": page.id,
              "relatedTerms": []
            };
            const key = term.dataValues.tracks[track].dataValues.trackType.dataValues.TrackCode;
            for(const relatedTerm of relatedTermKeys) {
              // if that related term is active for the current track, we want to add it to the related terms of our new page
              const termID = term.dataValues.relatedTerms[relatedTerm].dataValues.ChildTermID;
              // find term with matching ID, the current relatedTerm
              const [ currentRelatedTerm ] = terms.filter((term) => term.TermID === termID);
              
              const termPage = termDictionary[currentRelatedTerm.Term]
                .find(page => page.trackCode.split('-')
                  .some(code => code === key));

                const parentTrackID = term.dataValues.tracks[track].TrackDetailID;
                const relatedTermActivityMap = Object.keys(currentRelatedTerm.dataValues.tracks)
                  .reduce((acc, current) => {
                    const trackID = currentRelatedTerm.dataValues.tracks[current].TrackDetailID;
                    const activity = currentRelatedTerm.dataValues.tracks[current].Active;
                    acc[trackID] = activity;
                    return acc;
                  }, {});

              if(relatedTermActivityMap[parentTrackID] && termPage) {
                // find the page in the array that contains the acc Key
                newPage.relatedTerms.push({
                  "name": currentRelatedTerm.Term.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()),
                  "pageID": termPage.id
                });
                newPage.relatedTerms.sort((a, b) => (a.name > b.name) ? 1 : -1);
              }
            }

            acc[key].pages.push(newPage);
          }
        }
      }
      return acc;
    }, projectTracks);

    tracks = Object.keys(tracks)
      .map(t => tracks[t])
      .filter(track => track.pages.length);
  // add related Terms to each page
  return { tracks };
}

const deriveCodeString = function(tracks) {
  return tracks
    .map((track) => track.dataValues)
    .filter((track) => track.Active)
    .map((track) => track.trackType.dataValues.TrackCode)
    .sort()
    .join('-');
}

const scaffoldData = function(glossary) {

  const nameTerm = (term, trackCode) => `g_${term.toLowerCase().replace(/[\/\ .]/g,"_")}_${trackCode}`
  const termDictionary = glossary.terms.reduce((acc, current) => {
    let uniqueDefinitions = Object.keys(current.dataValues.tracks)
      .filter((trackKey) => current.dataValues.tracks[trackKey].dataValues.Active) // remove active tracks
      .map(track => {
        const commonTracks = Object.keys(current.dataValues.tracks)
          .map(t => current.dataValues.tracks[t])
          .filter(t => t.dataValues.Definition === current.dataValues.tracks[track].dataValues.Definition ); // all the tracks with an identical definition
        const trackDatum = {
          definition: current.dataValues.tracks[track].dataValues.Definition,
          trackCode: deriveCodeString(commonTracks),
        };
        
        return trackDatum;
      })
      .map(t => JSON.stringify(t));
    uniqueDefinitions = [...new Set(uniqueDefinitions)];
    uniqueDefinitions = uniqueDefinitions.map(t => {
      let parsedObj = JSON.parse(t);
      // parsedObj.id = `g_${current.Term.replace(/[\/\ .]/g,"_")}_${parsedObj.trackCode}`
      parsedObj.id = nameTerm(current.Term, parsedObj.trackCode);
      return parsedObj;
    })

    acc[current.Term] = uniqueDefinitions;
    return acc;
  }, {});

  let editorData = [];

  for(key of Object.keys(termDictionary)) {
    for(page of termDictionary[key]) {
      editorData.push({
        // id: `g_${key.replace(/[\/\ .]/g,"_")}_${page.trackCode}`,
        id: nameTerm(key, page.trackCode),
        name: nameTerm(key, page.trackCode),
      });
    }
  }

  const projectData = deriveProjectData(glossary.terms, termDictionary);
  // various and sundry changes and mutations
  return [projectData, editorData, termDictionary];
}

const writeConfig = function(data, route) {
  // get json from file
  const json = JSON.parse(fs.readFileSync(route));
  // mutate json
  json['glossary'] = data;
  // write new json to file
  fs.writeFileSync(route, JSON.stringify(json, null, 2));
  console.log('Config file written.')
};



const writePages  = function(dict, glossary, route) {

  for(const term of glossary.terms) {
    for(const page of dict[term.Term]) {
      // for each term, write a directory containing 3 files
    const id = page.id;
    let definition = page.definition.replace(/\<\/\p\>/g, "</p><br>");
    definition = definition.replace(/style=".*?"/g, "");
    const pageDir = `${route}/${id}`;
    // isDir?
    if (!fs.existsSync(pageDir)) {
      fs.mkdirSync(pageDir);
    }
    fs.writeFileSync(pageDir + `/${id}.css`, "");
    const HTML = 
    `<div class="page-${id}">
  <p>${definition}</p>
</div>`;

    fs.writeFileSync(pageDir + `/${id}.html`, HTML);

    const escapedDefinitition = definition.replace(/"/g, '\\"');
    fs.writeFileSync(pageDir + `/${id}.json`,`
{
  "gjs-components": [
    {
      "tagName": "div",
      "type": "text",
      "name": "",
      "removable": true,
      "draggable": true,
      "droppable": false,
      "badgable": true,
      "stylable": true,
      "stylable-require": "",
      "style-signature": "",
      "unstylable": "",
      "highlightable": true,
      "copyable": true,
      "resizable": false,
      "editable": true,
      "layerable": true,
      "selectable": true,
      "hoverable": true,
      "void": false,
      "state": "",
      "status": "selected",
      "content": "<p>${escapedDefinitition}</p>",
      "icon": "",
      "style": "",
      "classes": [
        {
          "name": "page-${id}",
          "label": "page-${id}",
          "type": 1,
          "active": true,
          "private": false,
          "protected": false
        }
      ],
      "script": "",
      "attributes": {},
      "propagate": "",
      "dmode": "",
      "tag Name": "div",
      "custom-name": "definition",
      "components": [],
      "open": false
    }
  ],
  "gjs-styles": [
    {
      "selectors": [
        {
          "name": "page-${id}",
          "label": "page-${id}",
          "type": 1,
          "active": true,
          "private": false,
          "protected": false
        }
      ],
      "selectorsAdd": "",
      "style": {},
      "mediaText": "",
      "state": "",
      "stylable": true,
      "atRuleType": "",
      "singleAtRule": 0,
      "important": 0
    }
  ]
}
`);
    }
  }
  console.log("Pages written.")
};

const main = async function() {
  try {
    // fetch glossary terms
    console.log('(1/5) fetching terms...')
    const [ glossary ] = await getTerms();
    // build scaffolding
    console.log('(2/5) scaffolding data...');
    const [projectData, editorData, termDictionary] = scaffoldData(glossary);

    console.log('(3/5) writing to project.json...')
    writeConfig(projectData, projectConfig);

    console.log('(4/5) writing to editor.json...')
    writeConfig(editorData, editorConfig);
    
    console.log('(5/5) writing pages...')
    writePages(termDictionary, glossary, pagesRoute);
    console.log('\nAll done! Verify output manually.')
  } catch(err) {
    console.log('Error: ', err);
  }
};

main();