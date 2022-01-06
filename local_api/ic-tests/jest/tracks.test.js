var fs = require('fs');
const { TestScheduler } = require('jest');
const { hasUncaughtExceptionCaptureCallback } = require('process');
var project = JSON.parse(fs.readFileSync('../../project/config/project.json', 'utf8'));

const trackTranslator = function(trackName, pageTypeTo) {
  return {
    "case-hs": {
      "glossary": 'glossary-L',
      "manual": 'manual-L',
      "case": 'case-hs'
    },
    "handbook-hs": {
      "glossary": 'glossary-H',
      "manual": 'manual-L',
      "case": ''
    },
    "case-ap": {
      "glossary": 'glossary-A',
      "manual": 'manual-A',
      "case": 'case-ap'
    },
    "handbook-ap": {
      "glossary": 'glossary-A',
      "manual": 'guide-A',
      "case": 'case-ap'
    },
    "case-es": {
      "glossary": 'glossary-E',
      "manual": 'guide-E',
      "case": 'case-es'
    },
    "handbook-es": {
      "glossary": 'glossary-E',
      "manual": 'guide-EX',
      "case": ''
    },
    "case-ms": {
      "glossary": 'glossary-M',
      "manual": 'guide-M',
      "case": 'case-ms'
    },
    "handbook-ms": {
      "glossary": 'glossary-M',
      "manual": 'guide-MX',
      "case": ''
    },
  }[trackName][pageTypeTo];
}


  // construct track data
  const trackRecord = {}
  Object.keys(project.trackGroups).forEach((key, index) => {
    const trackData = project.trackGroups[key];
    const trackName = trackData["name"];
    trackRecord[trackData["name"]] = trackData;
    trackRecord[trackName].pages = [];
  })
  
  // get case pageIDs
  Object.keys(trackRecord).forEach((key) => {
    // console.log(key)
    const caseTrack = project.case.tracks.find(track => track.trackID === key);

    if(caseTrack) {
      for(const section of caseTrack.sections) {
        for(const page of section.pages) {
          trackRecord[key].pages.push(page.pageID)
        }
      }
    }
    const glossaryTrack = project.glossary.tracks.find(track => track.trackID === trackTranslator(key, 'glossary'));

    if(glossaryTrack) {
      for(const page of glossaryTrack.pages) {
        trackRecord[key].pages.push(page.pageID)
      }
    }

    const guideTrack = project.guide.tracks.find(track => track.trackID === trackTranslator(key, 'manual'));

    if(guideTrack) {
      for(const section of guideTrack.sections) {
        for(const page of section.pages) {
          trackRecord[key].pages.push(page.pageID)
        }
      }
    }
  })
  const recurseComponents = function(components, pages, track) {
    for(const component of components) {
      // check out the attributes of the component, then do this to the children
      const { attributes, type } = component;
      const attributeKeys = Object.keys(attributes);
      const page = eval('(' + attributes[':options'] + ')');
      // all the properties to check for 
      const effectProperties = [
        ':conditions',
        ':click-effects',
        ':scene-loaded-effects',
        ':change-effects',
        ':play-effects',
        ':pause-effects',
        ':stop-effects',
        ':end-effects',
        ':loop-effects'];
      const filteredProperties = effectProperties.filter(prop => attributeKeys.includes(prop));

      if(type === 'widget-link' && page.type === 'internal') {
        // check internal widget links
        test(`widgetLink: ${page.pageId} -- ${track}`, () => {
          expect(pages.includes(page.pageId)).toBe(true);
        });
      }

      if(filteredProperties.length) {
        const conditionLists = filteredProperties.map(key => eval('(' + attributes[key] + ')').conditionList);
        for(const conditionList of conditionLists) {
          for(const condition of conditionList) {
            const {effectsPass, effectsFail} = condition;
            for(const effect of effectsPass) {
              if(effect.effectData.pageID) {
                test(`EffectsPass: ${effect.effectData.pageID} -- ${track}`, () => {
                  expect(pages).toContain(effect.effectData.pageID);
                });
              }
            }
            for(const effect of effectsFail) {
              if(effect.effectData.pageID) {
                test(`EffectsFail: ${effect.effectData.pageID} -- ${track}`, () => {
                  expect(pages).toContain(effect.effectData.pageID);
                });
              }
            }
          }
        }
      }

      // check the component for properties that contain conditionLists

      if(component.components.length > 0) {
        recurseComponents(component.components, pages, track);
      }
    }
  }

  const stepPage = function(page, pages, track) {
    // returns true if all pageIDs in the page json are in the pages array
    var pageJSON = JSON.parse(fs.readFileSync(`../../project/pages/${page}/${page}.json`, 'utf8'));
    return recurseComponents(pageJSON['gjs-components'], pages, track)
  }

  for(const track of Object.keys(trackRecord)) {
    for(const page of trackRecord[track].pages) {
      stepPage(page, trackRecord[track].pages, track);
    }
  }
  // for each page, step through the components recursively. Check for pageIDs where we expect them
