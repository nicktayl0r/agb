import { logMessage } from './helpers/debugHelper'

const ApiReporter = pc.createScript('ApiReporter', pc.script.app);
const ApplySimStateDataToEntity= require("./EntityChanges").ApplySimStateDataToEntity;

ApiReporter.prototype.initialize = async function() {
	ApiReporter.prototype._undoChanges= {};

	this.app.on("UpdateEntity", function (entityID, changes) {
		logMessage("this.entity: ", this.entity);
		this.onUpdateEntity(entityID, changes, this.entity);
	}, this);

	this.app.on("LoadSimState", function (simStateData) {
		this.UndoAllChanges(simStateData, this.entity);
		this._undoChanges= {} //reset undoChanges back to empty, so old values aren't retained.
		logMessage("ApiReporter - LoadSimState complete. _undochanges: ", this._undoChanges);
	}, this);

}

ApiReporter.prototype.onUpdateEntity = function(entityID, changes, thisEntity){
	if (entityID === thisEntity._guid) {
		logMessage("UpdateEntity- entityID: ",entityID,", changes: ", changes);
		logMessage("entity = ", thisEntity);
		const trackUndo= {};
		trackUndo[entityID]= {};
		ApplySimStateDataToEntity(thisEntity, changes, trackUndo);
		logMessage("UpdateEntity now has undo of : ", trackUndo);
		this.MergeUndo(trackUndo, thisEntity, this._undoChanges);
	}
}
//** Take the latest set of undoChanges and merge them into this._undoChanges.
//Only keep new changes in _undoChanges. As each UpdateEntity call is made, there's a greater chance that the properties being changed are
//not the original values we want to return to.
//For example: If position is changed twice, the second newChanges.position might have a postiion affected by animations, etc.  */
ApiReporter.prototype.MergeUndo= function (newChanges, thisEntity, mergeInto){
	for (const p in newChanges[thisEntity._guid]){
		logMessage("newChange: ",p);
		if (mergeInto[p] == undefined) { //only save changes to undo if there isn't one there yet
		logMessage("newChange: ",p, " is undefined.");
			mergeInto[p] = newChanges[thisEntity._guid][p];
		}
	}
	logMessage("_undoChanges is now: ", mergeInto);
}

ApiReporter.prototype.UndoAllChanges = function(simStateData, thisEntity){
	//undo my changes.
	//look through .entities, if guid matches thisEntity._guid...
	if (simStateData.entities[thisEntity._guid] !== undefined) {
		//if properties in incoming sim state match those in undo list, don't undo because the incoming simState will reset them anyway
		//if properties in undo aren't in incoming simState, then undo them so they return to normal.
		const strippedUndo= {};
		for (const p in this._undoChanges) {
			if (simStateData.entities[thisEntity._guid][p] == undefined) {
				strippedUndo[p]= this._undoChanges[p]
			}
		}
		//now that we have all the properties for this entity that ARE NOT in the incoming simStater, reset them to the undo value
		this.onUpdateEntity(thisEntity._guid, strippedUndo, thisEntity);
	}
	else {
		//the incoming simstate doesn't have data for this entity, so reset everything we changed.
		this.onUpdateEntity(thisEntity._guid, this._undoChanges, thisEntity);
	}
}