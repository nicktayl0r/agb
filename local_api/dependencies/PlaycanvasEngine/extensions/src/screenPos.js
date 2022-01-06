import { logMessage, logError, logWarning } from './helpers/debugHelper';

var ScreenPos = pc.createScript('screenPos');

// set the proper camera in the inspector
ScreenPos.attributes.add("cameraEntity", {type:"entity"});
ScreenPos.attributes.add("sharedDataKey", {type:"string"});
ScreenPos.attributes.add("followNode", {type:"string"});

// initialize code called once per entity
ScreenPos.prototype.initialize = function() {
    this.screenPos = new pc.Vec3();
    this.lastScreenPos = new pc.Vec3();
    this.viewportPos = new pc.Vec2();
    this.modelEntity= null;
    this.meshInst= null;
    this.time= 0;
};

ScreenPos.prototype.GetParentModel= function(graphNode) {
    if (graphNode != undefined) {
        if (graphNode.parent != undefined) {
            if (graphNode.parent.model != undefined) {
                logMessage("found parent: ",graphNode.parent);
                return graphNode.parent;
            }
            else {
                return this.GetParentModel(graphNode.parent);
            }
        }
        else {
            logMessage("null parent: ");
            return null;
        } 
    }
    else logError("Cannot get the parent of undefined node with name "+this.followNode);
};

// update code called every frame
ScreenPos.prototype.update = function(dt) {
    this.time+= dt;
    if (this.time > 1/15) { //only do calculations if 
        this.time= 0;
        if(this.cameraEntity){
            if (this.followNode != undefined && this.followNode != "") {
                if (this.node== null) {
                    const graph= this.app.root.findByName(this.followNode);
                    const parent = this.GetParentModel(graph);
                    this.modelEntity = parent;
                    // console.log("modelEntity is: ", this.modelEntity);
                    if (this.modelEntity == null) {
                        logError("Cannot find parent model entity of "+ this.followNode+ ". Cannot get accurate screen position.");
                        return;
                    }
                    // console.log("mesh instances: ",this.modelEntity.model.meshInstances);
                    this.node= this.modelEntity.model.meshInstances.find(x => x.node.name == this.followNode);
                    // console.log("gotNode: ", this.node);
                }
                if (this.node!= null) {
                    // console.log("node.getPostion() = ", this.node.getPosition());
                    // console.log("node.getPostion() = ", this.node.getLocalPosition());
                    this.screenPos = this.cameraEntity.camera.worldToScreen(this.node.aabb.center, this.screenPos);
                }
                else logError("cannot find a node by the name: "+this.followNode);
            }
            else this.screenPos = this.cameraEntity.camera.worldToScreen(this.entity.getPosition(), this.screenPos);
            this.viewportPos.x = this.screenPos.x / this.app.graphicsDevice.width;
            this.viewportPos.y = this.screenPos.y / this.app.graphicsDevice.height;
            
            if(this.sharedDataKey && this.sharedDataKey !== ""){
                // we probably don't need to send across changes that are less than a pixel, so round to an int
                // also this avoids floating point imprecision
                var screenXint = Math.round(this.screenPos.x);
                var screenYint = Math.round(this.screenPos.y);
                var lastXint = Math.round(this.lastScreenPos.x);
                var lastYint = Math.round(this.lastScreenPos.y);
                // console.log(screenXint, lastXint, screenYint, lastYint);
                // console.log(this.app.graphicsDevice.width, this.app.graphicsDevice.height);
                
                if(screenXint !== lastXint || screenYint !== lastYint)
                    this.app.fire("SharedDataMessage", this.sharedDataKey, JSON.stringify({x: screenXint, y: screenYint}));
                // else
                //     console.log("same position");
                // console.log(this.screenPos, this.lastScreenPos);
            }
            else
                logWarning("No sharedDataKeySet on the screenPos script on",this.entity.name,"?");
            
            this.lastScreenPos.copy(this.screenPos);
        }
        else{
            logWarning("did you hook up the camera on the screenPos script on",this.entity.name,"?");
        }
    }
};

// swap method called for script hot-reloading
// inherit your script state here
// ScreenPos.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/