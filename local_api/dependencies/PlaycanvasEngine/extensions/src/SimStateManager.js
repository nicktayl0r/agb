import { logMessage, logError, logWarning } from './helpers/debugHelper';

const SimStateManager = pc.createScript('SimStateManager', pc.script.app);
const ApplySimStateDataToEntity= require("./EntityChanges").ApplySimStateDataToEntity;

SimStateManager.prototype.initialize = async function() {
	logMessage("PLAYCANVAS:: sim state manager init.");
	this.app.on("LoadSimState", function (simStateData) {
		if (simStateData.cameraView) {
			this.MoveCameraToTarget(
				simStateData.cameraView,
				simStateData.smoothCam, 
				simStateData.smoothCamSpeed, 
				simStateData.smoothCamInterpolate, 
				simStateData.transformWithCam
			);
		}
		else {
			logError("no camera view defined. simStateData: "+simStateData);
			return;
		}
		this.LoadSimState(simStateData.entities, this._customShaders);
	}, this);

	this.app.on("PlayAllAnimations", function (simStateData) {
		this.PlayAllAnimations();
	}, this);

	this.app.on("PauseAllAnimations", function (simStateData) {
		this.PauseAllAnimations();
	}, this);

	this.app.on("StopAllAnimations", function (simStateData) {
		this.StopAllAnimations();
	}, this);

	this.app.on("ApplyChanges", function(entityData) {
		this.ApplyToMatchingEntities(entityData, true);
	}, this);

	this.app.on("MuteAudio", function(mute) {
		this.MuteSim(mute);
	}, this);

	this.app.on("CustomMaterialCreated", function(materialData) {
		this._customShaders[materialData.name]= materialData;
		// console.log("added custom material with name:",materialData.name, this._customShaders[materialData.name]);
	}, this);
	
	this._customShaders= {}; //dictionary - key: materialName, value: {name: string, material: material}
	this._undoLastState= {};
	this._cameras= [];
	this._animations= this.app.root.find(function (entity) {
		return entity.animation;
	});
	// force animations to activate to get around an issue with undefined animations on applying sim state animation changes
	// see: https://forum.playcanvas.com/t/testing-animation-duration-causes-uncaught-error/4889/4
	this._animations.forEach(function(entity){ entity.animation.activate = true; })
	this.GatherAndDisableCameras();
}

SimStateManager.prototype.MuteSim= function(mute) {
	this.app.systems.sound.volume = mute ? 0 : 1; 
}

SimStateManager.prototype.PlayAllAnimations= function() {
	if(!this._animations){
		this._animations= this.app.root.find(function (entity) {
			return entity.animation;
		});
	}

	for (const anim of this._animations) {
		if(anim.enabled && anim.animation.skeleton && anim.animation.skeleton.animation !== null) {
			logMessage("Playing animation: ", anim.animation.currAnim," starting at time: ", anim.animation.skeleton ? anim.animation.currentTime : 0);
			anim.animation.playing = true;
		}
	}
}

SimStateManager.prototype.PauseAllAnimations= function() {
	if(!this._animations){
		this._animations= this.app.root.find(function (entity) {
			return entity.animation;
		});
	}

	for (const anim of this._animations) {
		if(anim.enabled) {
			logMessage("Pausing animation: ",anim.animation.currAnim," at time: ", anim.animation.currentTime);
			anim.animation.playing = false;
		}
	}
}

SimStateManager.prototype.StopAllAnimations= function() {
	if(!this._animations){
		this._animations= this.app.root.find(function (entity) {
			return entity.animation;
		});
	}

	for (const anim of this._animations) {
		if(anim.enabled) {
			anim.animation.playing = false;
			if(anim.animation.speed >= 0) {
				anim.animation.skeleton.setTime(anim.animation.skeleton.startTime);
				logMessage("Stoping animation: ", anim.animation.currAnim, " and return to time: ", anim.animation.skeleton.startTime);
			} else {
				anim.animation.skeleton.setTime(anim.animation.skeleton.endTime);
				logMessage("Stoping animation: ", anim.animation.currAnim, " and return to time: ", anim.animation.skeleton.endTime);
			}
			anim.animation.skeleton.updateGraph();
		}
	}
}

SimStateManager.prototype.GatherAndDisableCameras= function() {
	this._cameras= this.app.root.find(function (entity) {
		return entity.camera && entity.name != "MainCamera";
	});
	// console.log("_cameras: ",this._cameras)
	for (const camera of this._cameras) {
		// console.log("Disabling entity: ",camera.name);
		camera.enabled= false;
	}
	this._mainCamera= this.app.root.findByName('MainCamera');
	if(!this._mainCamera){
		logError("missing MainCamera in scene")
	} else {
		this._mainCamera._defaultProjection = this._mainCamera.camera.projection;
		this._mainCamera._defaultNearClip = this._mainCamera.camera.nearClip;
		this._mainCamera._defaultFarClip = this._mainCamera.camera.farClip;
	}
}

SimStateManager.prototype.MoveCameraToTarget = function(toCamera, smooth, smoothSpeed, smoothInterp, transform) {
	if(this._mainCamera){
		var toCameraEntity= this.app.root.findByGuid(toCamera);
		if(!toCameraEntity) {
			toCameraEntity= this.app.root.findByName(toCamera);
			if(!toCameraEntity) {
				logWarning("Cannot find camera with name: "+toCamera)
				return;
			}
		}

		//kill all running tweens 
		if(this.app._tweenManager) {
			this.app._tweenManager.killall();
		} else {
			this.app.addTweenManager();
		}

		//unfollow any active follow camera
		this._mainCamera.unfollow();

		smoothSpeed = smoothSpeed !== undefined ? smoothSpeed : 3.0;
		smoothInterp = typeof(pc[smoothInterp]) == "function" ? smoothInterp : "SineOut";

		var cams = { to: toCameraEntity, main: this._mainCamera };

		//if this is a camera and not just a locator
		//set fov or orthoheight based on toCamera projection
		if(toCameraEntity.camera) {
			if(toCameraEntity.camera.projection == 0){
				this._mainCamera.camera.projection = 0;

				if(!smooth) {
					this._mainCamera.camera.fov = toCameraEntity.camera.fov;
				} else {
					//tween FOV
					var startFOV = { fov: this._mainCamera.camera.fov };
					var endFOV = { fov: toCameraEntity.camera.fov };

					if(startFOV.fov != endFOV.fov) {
						this.app.tween(startFOV)
							.to(endFOV, smoothSpeed, pc[smoothInterp])
							.on('update', function () {
								if(this.fov != startFOV.fov) {
									this.fov = startFOV.fov;
								}
							}.bind(this._mainCamera.camera)).start();
					}
				}

			} else if (toCameraEntity.camera.projection == 1) {
				this._mainCamera.camera.projection = 1;

				if(!smooth) {
					this._mainCamera.camera.orthoHeight = toCameraEntity.camera.orthoHeight;
				} else {
					//tween orthoHeight
					var startOrthoHeight = { orthoHeight: this._mainCamera.camera.orthoHeight };
					var endOrthoHeight = { orthoHeight: toCameraEntity.camera.orthoHeight };

					if(startOrthoHeight.orthoHeight != endOrthoHeight.orthoHeight) {

						this.app.tween(startOrthoHeight)
							.to(endOrthoHeight, smoothSpeed, pc[smoothInterp])
							.on('update', function () {
								if(this.orthoHeight != startOrthoHeight.orthoHeight) {
									this.orthoHeight = startOrthoHeight.orthoHeight;
								}
							}.bind(this._mainCamera.camera)).start();
					}
				}
			}
			this._mainCamera.camera.nearClip = toCameraEntity.camera.nearClip;
			this._mainCamera.camera.farClip = toCameraEntity.camera.farClip ;
		} else {
			this._mainCamera.camera.projection = this._mainCamera._defaultProjection;
			this._mainCamera.camera.nearClip = this._mainCamera._defaultNearClip;
			this._mainCamera.camera.farClip = this._mainCamera._defaultFarClip ;
		}

		if(smooth){
			this._mainCamera
			.tween(this._mainCamera.getLocalPosition())
			.to(toCameraEntity.getPosition(), smoothSpeed, pc[smoothInterp])
			.on('complete', function () {
				if(transform) {
					this.main.follow(this.to);
				} else {
					this.main.follow(this.to);
					this.main.unfollow();
					this.main._app.fire("FinishedMoveCameraToTarget");
				}
			}.bind(cams))
			.start();
			this._mainCamera
			.tween(this._mainCamera.getEulerAngles())
			.rotate(toCameraEntity.getEulerAngles(), smoothSpeed, pc[smoothInterp])
			.start();
		} else {
			if(transform) {
				this._mainCamera.follow(toCameraEntity);
			} else {
				this._mainCamera.setPosition(toCameraEntity.getPosition());
				this._mainCamera.setRotation(toCameraEntity.getRotation());
				this._mainCamera._app.fire("FinishedMoveCameraToTarget");
			}
		}
	}	
}

SimStateManager.prototype.LoadSimState= function(simStateData, customMaterials) {
	// console.log("PLAYCANVAS:: got a simStateName as: ", simStateData);
	if (this._undoLastState != undefined){
		//applying original state before loading another
		this.ReadSimStateData(this._undoLastState, undefined, customMaterials); //apply the undo state data
		this._undoLastState= {}; //reset undoLastState for future use.
	}
	this.ReadSimStateData(simStateData, this._undoLastState, customMaterials);
	// console.log("undoSimState: ", this._undoLastState);
}

SimStateManager.prototype.ReadSimStateData= function(simStateData, trackUndo, customMaterials) {
	for (var e in simStateData){
		if (trackUndo != undefined) trackUndo[e]= {}; //create an empty value for the guid key
		// console.log("PLAYCANVAS:: simState entity: ", e);
		const entity = this.app.root.findByGuid(e);
		if (entity) {
			ApplySimStateDataToEntity(this.app, entity, simStateData[e], trackUndo, customMaterials);
		}
		else logWarning("PLAYCANVAS:: could not find entity with guid: "+ e);
	}
}

SimStateManager.prototype.ApplyToMatchingEntities= function(entityData, enabled) {
	var matchingEntites= this.app.root.find(function(node) {
		//if enabled is true then only continue if the entity is also enabled, or if enabled is false then don't worry about the entity.enabled
		// console.log("enabled is ", enabled, " and ",node.name,".enabled is ", node.enabled);
		if ((enabled && node.enabled) || !enabled) {
			// console.log("searching ", enabled.name,"...");
			var match= true;
			for (const p in entityData) { //go through all the properties in the entityData
				// console.log("searching ", enabled.name, " for ", p);
				
				if (p == "scripts") {
					//need to compare the names of the scripts
					// console.log("searching ", enabled.name, " for ", p, "(actually 'script')");
					if (node["script"]) {
						// console.log("going to search: ", entityData["scripts"]);
						for (const s in entityData["scripts"]) {
							// console.log("searching ", enabled.name, " scripts for ", s);
							if (node["script"][s] == undefined) match= false; //if the entity doesn't have all the scripts then stop
						}
					}
					else {
						match= false;
						// console.log(enabled.name, " doesn't have 'scripts' match=false");
					}
				}
				else if (node[p] == undefined) { 
					// console.log(enabled.name, " doesn't have ", p, ". match=false");
					match= false; //if any of them are missing, then don't use this entity
				}
				// console.log("returning ", enabled.name, " match as ", match);
				if (!match) break;
			}
			return match;
		}
	});
	// console.log("Found these matching entities: ", matchingEntites);
	const undo= {};
	for (const e of matchingEntites) {
		undo[e._guid]= {};
		ApplySimStateDataToEntity(this.app, e, entityData, undo); //change the entity, but keep a local copy of undo
		this.MergeUndo(undo, this._undoLastState);
		// console.log("After merge undo is now: ", this._undoLastState);
	}
}

SimStateManager.prototype.MergeUndo= function (newUndo, origUndo) {
	for (const p in newUndo ) { //entity uid string key
		if (origUndo[p]== undefined) { //original undo doesn't know about this entity at all 
			logMessage("MergeUndo:: no entry with uid: ",p, " so setting it");
			origUndo[p]= newUndo[p]; //just push all values into original undo
		}
		else { //original undo has an entry for this entity
			for (const c in newUndo[p]) { //components in undo for entity
				if (origUndo[p][c] == undefined) { //original undo doesn't have this component (ex: pos)
					logMessage("MergeUndo:: no property: ",c," on ",p, " so setting it");
					origUndo[p][c]= newUndo[p][c]; //just push all values into original undo
				}
				else { //original undo has something for this component
					for (const v in newUndo[p][c]) {
						if (origUndo[p][c][v] == undefined) { //original undo doesn't have this property (ex: rotateX)
							logMessage("MergeUndo:: no property: ",v," on ",c, " so setting it");
							origUndo[p][c][v]= newUndo[p][c][v];
						}
					}
				}
			}
		}
	}
}

SimStateManager.prototype.GetCustomShaderNames= function() {
	if(this._customShaders && this._customShaders !== {}){
		return Object.keys(this._customShaders);
	} else {
		return [];
	}

}