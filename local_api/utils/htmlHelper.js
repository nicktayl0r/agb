const cheerio = require('cheerio');
const fs = require('fs');

// const testDict= {};

// fs.readFile('../../project/pages/e079/e079.html', 'utf8', (err, data)=> {
// 	if (err) console.error(err);
// 	else exports.GetSimsAndStates(data, testDict);
// })

const conditionLists = [":conditions", ":click-effects", ":play-effects", ":pause-effects", ":stop-effects", ":end-effects", ":loop-effects", ":scene-loaded-effects"];
exports.GetSimsAndStates = function (html, dict) {
	// console.log("cheerio loading html: ",html);
	$ = cheerio.load(html);
	$('widget-sim-view').each(function (i, elem) {
		// CaptureSimSceneAndStateID(elem, dict);
		AddSimStateToDict($(this).attr('scenename'), $(this).attr('simstateid'), dict);
		//need to check conditions and state effects
	});
	$('widget-turntable').each(function (i, elem) {
		// CaptureSimSceneAndStateID(elem, dict);
		AddSimStateToDict($(this).attr('scenename'), $(this).attr('simstateid'), dict);
		//need to check conditions and state effects
	});
	//..need to check all elements actually
	//can find by selectors :conditions? :clickEffects, etc?
	$('[id]').each(function (i, elem) {
		// console.log("gotcha ",$(this).attr('id'));

		for (attr of conditionLists) {
			eval('var cL=' + $(this).attr(attr)); //the attribute is NOT JSON, but string of object literal
			if (cL != undefined) {
				// console.log("got ",attr);
				FindSimStateComparisons(cL, dict);
			}
		}
	});

	// console.log("dict state: ", dict);
}

function FindSimStateComparisons(conditions, dict) {
	if (conditions.conditionList != undefined) {
		for (condition of conditions.conditionList) {
			var updateWidgetEffects = [];
			if ((condition.effectsPass))
				updateWidgetEffects = condition.effectsPass.filter(effect => effect.effectData.effectType == "updateWidget" && effect.effectData.key == "simstateid");
			if ((condition.effectsFail))
				updateWidgetEffects = updateWidgetEffects.concat(condition.effectsFail.filter(effect => effect.effectData.effectType == "updateWidget" && effect.effectData.key == "simstateid"));

			//console.log("  found these matching effects: ", updateWidgetEffects);
			for (effect of updateWidgetEffects) {
				const sceneName = $('[id=' + effect.effectData.widgetID + ']').attr('scenename');
				AddSimStateToDict(sceneName, effect.effectData.val, dict);
			}
		}
	}
}

function AddSimStateToDict(sceneName, stateID, dict) {
	if (dict[sceneName] == undefined) {
		dict[sceneName] = [];
	}
	if (!dict[sceneName].includes(stateID)) dict[sceneName].push(stateID);
}