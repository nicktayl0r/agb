import { logWarning, logError } from "./helpers/debugHelper";

function GetAssetIdOfMaterial(app, material) {
	// console.log("entityChagnes");
	var assets = app.assets.filter(function (asset) {
		return asset.type == "material" && asset.resource && asset.resource.id == material.id;
	});
	if (assets && assets.length > 0) {
		return assets[0]._id;
	} else {
		if(material.id === 1){
			return 1;
		}
		logWarning("No asset found for material: ", material.name);
		return undefined;
	}
}

export function ApplySimStateDataToEntity(app, entity, simStateData, trackUndo, customMaterials) {
	for (var p in simStateData) {
		var value = simStateData[p];
		// console.log("PLAYCANVAS:: simState property: ", p, " with value: ", value);
		switch (p) {
			case "enabled":
				if (trackUndo != undefined) trackUndo[entity._guid][p] = entity[p];
				entity[p] = value;
				break;
			case "pos":
				if (trackUndo != undefined) {
					trackUndo[entity._guid][p] = entity.getPosition().clone(); //don't want a reference to the vector3!
				}
				entity.setPosition(value.data[0], value.data[1], value.data[2]);
				break;
			case "localPos":
				if (trackUndo != undefined) {
					trackUndo[entity._guid][p] = entity.getLocalPosition().clone(); //don't want a reference to the vector3!
				}
				entity.setLocalPosition(value.data[0], value.data[1], value.data[2]);
				break;
			case "rot":
				if (trackUndo != undefined) {
					trackUndo[entity._guid][p] = entity.getRotation().clone(); //don't want a reference to the quaternion!
				}
				entity.setRotation(value.x, value.y, value.z, value.w);
				break;
			case "localRot":
				if (trackUndo != undefined) {
					trackUndo[entity._guid][p] = entity.getLocalRotation().clone(); //don't want a reference to the quaternion!
				}
				entity.setLocalRotation(value.x, value.y, value.z, value.w);
				break;
			case "scale":
				if (trackUndo != undefined) {
					trackUndo[entity._guid][p] = entity.getLocalScale().clone(); //don't want a reference to the vector3!
				}
				entity.setLocalScale(value.data[0], value.data[1], value.data[2]);
				break;
			case "model":
				if (trackUndo != undefined) {
					trackUndo[entity._guid][p] = {}; //adding empty "model" property
				}
				Apply_Model(app, entity, value, trackUndo, customMaterials);
				break;
			case "animation":
				if (trackUndo != undefined) {
					trackUndo[entity._guid][p] = {}; //adding empty "animation" property
				}
				Apply_Animation(app, entity, value, trackUndo);
				break;
			case "scripts":
				if (trackUndo != undefined) {
					trackUndo[entity._guid][p] = {}; //adding empty "script" property
				}
				Apply_ScriptAttributes(app, entity, value, trackUndo);
				break;
			case "element":
				if (trackUndo != undefined) {
					trackUndo[entity._guid][p] = {}; //adding empty "element" property
				}
				Apply_ElementAttributes(app, entity, value, trackUndo);
				break;
		}
	}
}

function Apply_Model(app, entity, dataToApply, trackUndo, customMaterials) {
	var modelComponent = entity["model"];
	if(modelComponent) {
		for (var p in dataToApply) {
			//loop through the properties in incoming model data
			var value = dataToApply[p];
			// console.log("PLAYCANVAS:: 'Model' property: ", p, " with value: ", value);
			switch (p) {
				case "show":
					if (trackUndo != undefined) {
						trackUndo[entity._guid]["model"][p] = !value; //store the opposite value for undo purposes.
					}
					if (value) modelComponent.show();else modelComponent.hide();
					break;
				case "materialAsset":
					if (trackUndo != undefined) {
						trackUndo[entity._guid]["model"][p] = modelComponent.materialAsset; //store the current material asset.
					}
					modelComponent.materialAsset = value;
					break;
				case "meshInstances":
					if (trackUndo != undefined) {
						trackUndo[entity._guid]["model"][p] = {}; //set an empty "meshInstances" object
					}
					if(modelComponent.asset != undefined) {
						var modelAsset = app.assets.get(modelComponent.asset);
						if(modelAsset) {
							if(modelAsset.loaded) {
								Apply_Model_MeshInstances(app, entity._guid, modelComponent, value, trackUndo, customMaterials);
							} else {
								app.assets.load(modelAsset);
								modelAsset.ready(() => {
									Apply_Model_MeshInstances(app, entity._guid, modelComponent, value, trackUndo, customMaterials);
								});
							}
						} else {
							logWarning("Apply_Model 'modelAsset' is undefined");
						}
					}
					break;
			}
		}
	}
}

function Apply_Animation(app, entity, dataToApply, trackUndo) {
	var animationComponent = entity["animation"];

	if(animationComponent && !animationComponent.skeleton) {
		if(entity.model && entity.model.asset) {
			var modelAsset = app.assets.get(entity.model.asset);
			if(!modelAsset.loaded) {
				app.assets.load(modelAsset);
				modelAsset.ready(() => {
					Apply_Animation(app, entity, dataToApply, trackUndo);
				});
				return;
			}
		}
		return;
	}

	if(animationComponent && animationComponent.skeleton) {
		for (var p in dataToApply) {
			//loop through the properties in incoming animation data
			var value = dataToApply[p];
			// console.log("PLAYCANVAS:: 'Animation' property: ", p, " with value: ", value);
			switch (p) {
				case "stateAnimation":
					if (trackUndo != undefined) { 
						trackUndo[entity._guid]["animation"][p] = animationComponent.assets[0]; //store the first current animation asset id for undo purposes.
					}
					var modelAsset = app.assets.get(entity["model"].asset);
					if(modelAsset) {
						if(modelAsset.loaded) {
							if(value === 0) {
								animationComponent.assets = [];
								animationComponent.playing = false;
								return;
							} else {
								var animationAsset = app.assets.get(value);
								
								if(animationAsset) {
									if(animationAsset.loaded) {
										animationComponent.assets = [value];
										break;
									} else {
										// If animation is set to playOnStart but not to preload, make sure to pause it until it is loaded 
										animationComponent.playing = false;
										app.assets.load(animationAsset);
										animationAsset.ready(() => {
											Apply_Animation(app, entity, dataToApply, trackUndo);
										});
										return;
									}
								} else {
									logWarning("Apply_Animation 'animationAsset' is undefined");
									return;
								}
							}
						} else {
							app.assets.load(modelAsset);
							modelAsset.ready(() => {
								Apply_Animation(app, entity, dataToApply, trackUndo);
							});
							return;
						}
					} else {
						logWarning("Apply_Animation 'modelAsset' is undefined");
						return;
					}
					break;
				case "animStartFrame":
					if (trackUndo != undefined) {
						trackUndo[entity._guid]["animation"][p] = animationComponent.skeleton.startTime; //store the current animation currentTime value for undo purposes.
					}
					animationComponent.skeleton.startTime = value;
					break;
				case "animEndFrame":
					if (trackUndo != undefined) {
						trackUndo[entity._guid]["animation"][p] = animationComponent.skeleton.endTime; //store the opposite value for undo purposes.
					}
					animationComponent.skeleton.endTime = value;
					break;
				case "speed":
					if (trackUndo != undefined) {
						trackUndo[entity._guid]["animation"][p] = animationComponent.speed; //store the current animation speed value for undo purposes.
					}
					animationComponent.speed = value;
					break;
				case "loop":
					if (trackUndo != undefined) {
						trackUndo[entity._guid]["animation"][p] = animationComponent.loop; //store the current animation loop value for undo purposes.
					}
					animationComponent.loop = value;
					break;
				case "playOnStart":
					if (trackUndo != undefined) {
						trackUndo[entity._guid]["animation"][p] = !value;  //store the opposite value for undo purposes.
					}
					if(value) {
						if(animationComponent.speed >= 0) {
							animationComponent.skeleton.setTime(animationComponent.skeleton.startTime);
						} else {
							animationComponent.skeleton.setTime(animationComponent.skeleton.endTime);
						}
					}
					animationComponent.playing = value;
					break;
				case "loadFirstFrame":
					if (trackUndo != undefined) {
						trackUndo[entity._guid]["animation"][p] = !value;  //store the opposite value for undo purposes.
					}
					if(value) {
						if(animationComponent.speed >= 0) {
							animationComponent.skeleton.setTime(animationComponent.skeleton.startTime);
						} else {
							animationComponent.skeleton.setTime(animationComponent.skeleton.endTime);
						}
					}
					animationComponent.skeleton.updateGraph();
					break;
				case "ignoreAnimation":
					if (trackUndo != undefined) {
						trackUndo[entity._guid]["animation"][p] = animationComponent.skeleton.ignoreAnimation ? animationComponent.skeleton.ignoreAnimation : []; //store last value or empty array for undo purposes
						animationComponent.skeleton.animatedNodes = animationComponent.skeleton.getAnimatedNodes();
					}
					animationComponent.skeleton.ignoreAnimation = value;
					animationComponent.skeleton.animatedNodes = animationComponent.skeleton.getAnimatedNodes();
					break;
				case "animationEvents":
					if (trackUndo != undefined) {
						trackUndo[entity._guid]["animation"][p] = animationComponent.animationEvents ? animationComponent.animationEvents : 3; //store last value or default value for undo purposes.
					}
					animationComponent.animationEvents = value;
					break;
		
			}
		}
	}	
}

function Apply_Model_MeshInstances(app, guid, meshComponent, dataToApply, trackUndo, customMaterials) {
	for (var i in dataToApply) {
		//properties are indexs in the .meshInstances array
		// console.log("PLAYCANVAS:: 'Model.MeshInstances' property: ", i, " with value: ", dataToApply[i]);
		if (trackUndo != undefined) trackUndo[guid]["model"]["meshInstances"][i] = {}; //give the index an empty object to work with
		if (dataToApply[i].visible !== undefined && meshComponent.meshInstances[i] !== undefined) {
			if (trackUndo != undefined) {
				trackUndo[guid]["model"]["meshInstances"][i].visible = meshComponent.meshInstances[i].visible;
			}
			meshComponent.meshInstances[i].visible = dataToApply[i].visible;
		}
		if (dataToApply[i].material && meshComponent.meshInstances[i] !== undefined) {
			if (trackUndo != undefined) {
				trackUndo[guid]["model"]["meshInstances"][i].material = GetAssetIdOfMaterial(app, meshComponent.meshInstances[i].material);
			}
			const custom= customMaterials[dataToApply[i].material];
			if (custom != undefined) {
				meshComponent.meshInstances[i].material = custom.material; //need to check for skinned mesh..
			}
			else {
				var mat = app.assets.get(dataToApply[i].material);
				if (mat != undefined) {
					 meshComponent.meshInstances[i].material = mat.resource;
				} else {
					if(dataToApply[i].material === 1) {
						meshComponent.meshInstances[i].material = app.scene.defaultMaterial;
						// logWarning("Using Default Material for: " + meshComponent.entity.name + " on meshInstance: " + i);
					} else {
						logError("Cannot find material with the assetID: " + dataToApply[i].material+" for: " + meshComponent.entity.name + " on meshInstance: " + i);
					}
				}
			}
		}
	}
}

function Apply_ScriptAttributes(app, entity, dataToApply, trackUndo) {
	// console.log("PLAYCANVAS:: Apply_ScriptAttributes to entity: ", entity);
	var scriptComponent= entity["script"];
	// console.log("PLAYCANVAS:: scriptComponent: ", scriptComponent);
	if (scriptComponent) {
		for (var p in dataToApply) {
			var script = dataToApply[p];
			// console.log("PLAYCANVAS:: 'Script' property: ", p, " with value: ", value);
			if (trackUndo != undefined) {
				trackUndo[entity._guid]["scripts"][p] = {}; //Give the scripts property an empty object to work with.
				// console.log("undo now: ",trackUndo[entity._guid]["scripts"]);
			}
			if(scriptComponent[p]) {
				for (var a in dataToApply[p]) {
					// console.log(a," in ",p," is: ",dataToApply[p][a]);
					if (trackUndo != undefined) {
						trackUndo[entity._guid]["scripts"][p][a] = scriptComponent[p][a];
					}
					var attributeValue= dataToApply[p][a];
					// console.log("PLAYCANVAS:: property: ", a, " with value: ", attributeValue);
					scriptComponent[p][a] = attributeValue;
				}
			}
		}
		// if (trackUndo!= undefined) console.log("PLAYCANVAS:: script UNDO: ",trackUndo[entity._guid]["scripts"]);
	}
	// else console.log("no script property");
}

function Apply_ElementAttributes(app, entity, dataToApply, trackUndo) {
	// console.log("PLAYCANVAS:: Apply_ElementAttributes to entity: ", entity);
	var elementComponent= entity["element"];
	if (elementComponent) {
		for (var p in dataToApply) {
			var value = dataToApply[p];
			switch (p) {
				case "color":
					if (trackUndo != undefined) {
						trackUndo[entity._guid]["element"][p] = elementComponent[p];
					}
					elementComponent[p] = {r: value.r, g: value.g, b: value.b};
					break;
			}
		}
	}
}