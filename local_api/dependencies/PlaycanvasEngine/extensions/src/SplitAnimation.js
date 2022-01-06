import { logMessage } from "./helpers/debugHelper";

//Overwrite Playcanvas Skeleton ANimation addTime function to include a startframe and end frame
//sourced from: https://forum.playcanvas.com/t/splitting-animations/4677/8

pc.Skeleton.prototype.setTime = function(currentTime) {
    if (this._animation !== null) {
        var i;
        var node, nodeName;
        var keys, interpKey;
        var k1, k2, alpha;
        var nodes = this.animatedNodes ? this.animatedNodes : this._animation._nodes;

        //set current animation time to past frame's time
        this._time = currentTime;
        this._isDone = false;
        
        for (i = 0;i < nodes.length;i++) {
            node = nodes[i];
            nodeName = node._name;
            keys = node._keys;
            interpKey = this._interpolatedKeyDict[nodeName];
            var foundKey = false;
            if(!interpKey) {
                // console.warn("No key", nodeName);
                continue;
            }
            if (keys.length !== 1) {
                // for (var currKeyIndex = indices[nodeName], count = 0, l = length - 1; count < l; count++, currKeyIndex += offset) {
                for (var currKeyIndex = 0;currKeyIndex < keys.length - 1;currKeyIndex ++) {
                    //switched back to implementation to handle both forward and backward animations
                    k1 = keys[currKeyIndex];
                    k2 = keys[currKeyIndex + 1];
                    if (k1 && k2 && k1.time <= this._time && k2.time >= this._time) {
                        // alpha = (this._time - k1.time) / (k2.time - k1.time);
                        // interpKey._pos.lerp(k1.position, k2.position, alpha);
                        // interpKey._quat.slerp(k1.rotation, k2.rotation, alpha);
                        // interpKey._scale.lerp(k1.scale, k2.scale, alpha);
                        // interpKey._written = true;
                        this._currKeyIndices[nodeName] = currKeyIndex;
                        foundKey = true;
                        break;
                    }
                }
            }
       
            // If there's only a single key, just copy the key to the interpolated key...
            if (keys.length === 1 || !foundKey) {
                if(currentTime === 0.0) {
                    // interpKey._pos.copy(keys[0].position);
                    // interpKey._quat.copy(keys[0].rotation);
                    // interpKey._scale.copy(keys[0].scale);
                    // interpKey._written = true;
                    this._currKeyIndices[nodeName] = 0;
                } else {
                    if (currentTime >= keys[keys.length-1].time) {
                        // interpKey._pos.copy(keys[keys.length-1].position);
                        // interpKey._quat.copy(keys[keys.length-1].rotation);
                        // interpKey._scale.copy(keys[keys.length-1].scale);
                        // interpKey._written = true;
                        this._currKeyIndices[nodeName] = keys.length-2;
                    }
                }
            }
        }
        this.addTime(0);
   }
};
pc.Skeleton.prototype.addTime = function(delta) {
    if (this._animation !== null &&
        pc.Application._currentApplication === this.graph.parent._app) {

        // console.log("addTime ", pc.Application._currentApplication.graphicsDevice.canvas.id, " entity ", this.graph.parent.name);
       
        this.last = this._animation.last;
        var i;
        var node, nodeName;
        var keys, interpKey;
        var k1, k2, alpha;
        var nodes = this.animatedNodes ? this.animatedNodes : this._animation._nodes;
        var animStart, animEnd, duration;
        
        if(nodes.length > 0) {
            this.startTime =  this.startTime !== undefined ? this.startTime : 0;
            this.endTime = this.endTime !== undefined ? this.endTime : this._animation.duration;
            animStart = this.startTime;
            animEnd = this.endTime;
            duration = animEnd - animStart;
        }
        //return if not looping and animation has played once
        if (delta != 0) {
            if(delta > 0) {
                if(this._time - animStart >= duration && !this.looping){ 
                    if(!this._isDone) {
                        if(!this.graph.parent.tags.has("sim_state_ignore")) {
                            if(!this.graph.parent.animation.hasOwnProperty("animationEvents") || this.graph.parent.animation.animationEvents > 1) {
                                pc.Application._currentApplication.fire("OnAnimationDone");
                                logMessage("fire OnAnimationDone for animation: "+ this.graph.parent.animation.currAnim +
                                    " on entity: "+this.graph.parent.name+
                                    " in sim: "+ pc.Application._currentApplication.graphicsDevice.canvas.id);
                            }
                        }
                        this._isDone = true;
                    }
                    return;
                }
            } else {
                if(this._time - animStart <= 0 && !this.looping) {
                    if(!this._isDone) {
                        if(!this.graph.parent.tags.has("sim_state_ignore")) {
                            if(!this.graph.parent.animation.hasOwnProperty("animationEvents") || this.graph.parent.animation.animationEvents > 1) {
                                pc.Application._currentApplication.fire("OnAnimationDone");
                                logMessage("fire OnAnimationDone for animation: "+ this.graph.parent.animation.currAnim +
                                    " on entity: "+this.graph.parent.name+
                                    " in sim: "+ pc.Application._currentApplication.graphicsDevice.canvas.id);
                            }
                        }
                        this._isDone = true;
                    }
                    return;
                }
            }
        }
        this._time += delta;
        //loop if we are about to pass start or end frame animating forward or backwards
        if (this.looping && this._time - animStart > duration) {
            this._time = this.looping ? animStart : duration + animStart;
            if(duration !== 0) {
                if(!this.graph.parent.tags.has("sim_state_ignore")) {
                    if(!this.graph.parent.animation.hasOwnProperty("animationEvents") || this.graph.parent.animation.animationEvents === 1 || this.graph.parent.animation.animationEvents === 3) {
                        pc.Application._currentApplication.fire("OnAnimationLoop");
                        logMessage("fire OnAnimationLoop for animation: "+ this.graph.parent.animation.currAnim +
                                " on entity: "+this.graph.parent.name+
                                " in sim: "+ pc.Application._currentApplication.graphicsDevice.canvas.id);
                    }
                }
            }
            for (i = 0;i < nodes.length;i++) {
                node = nodes[i];
                nodeName = node._name;
                this._currKeyIndices[nodeName] = 0;
            }
        } else {
            if (this.looping && this._time - animStart < 0) {
                this._time = this.looping ? animEnd : animStart;
                if(duration !== 0) {
                    if(!this.graph.parent.tags.has("sim_state_ignore")) {
                        if(!this.graph.parent.animation.hasOwnProperty("animationEvents") || this.graph.parent.animation.animationEvents === 1 || this.graph.parent.animation.animationEvents === 3) {
                            pc.Application._currentApplication.fire("OnAnimationLoop");
                            logMessage("fire OnAnimationLoop for animation: "+ this.graph.parent.animation.currAnim +
                                " on entity: "+this.graph.parent.name+
                                " in sim: "+ pc.Application._currentApplication.graphicsDevice.canvas.id);
                        }
                    }
                }
                for (i = 0;i < nodes.length;i++) {
                    node = nodes[i];
                    nodeName = node._name;
                    this._currKeyIndices[nodeName] = node._keys.length - 2;
                }
            }
        }
        var offset = delta >= 0 ? 1 : -1;
        var foundKey;
        for (i = 0;i < nodes.length;i++) {
            node = nodes[i];
            nodeName = node._name;
            keys = node._keys;
            interpKey = this._interpolatedKeyDict[nodeName];
            if(!interpKey) {
                // console.warn("No key", nodeName);
                continue;
            }
            foundKey = false;
            var indices = this._currKeyIndices;
            //loop only the frames between first and last frames
            if (keys.length !== 1) {
                // for (var currKeyIndex = indices[nodeName], count = 0, l = length - 1; count < l; count++, currKeyIndex += offset) {
                for (var currKeyIndex = indices[nodeName];currKeyIndex < keys.length - 1 && currKeyIndex >= 0;currKeyIndex += offset) {
                    //switched back to implementation to handle both forward and backward animations
                    k1 = keys[currKeyIndex];
                    k2 = keys[currKeyIndex + 1];
                    if (k1 && k2 && k1.time <= this._time && k2.time >= this._time) {
                        alpha = (this._time - k1.time) / (k2.time - k1.time);
                        interpKey._pos.lerp(k1.position, k2.position, alpha);
                        interpKey._quat.slerp(k1.rotation, k2.rotation, alpha);
                        interpKey._scale.lerp(k1.scale, k2.scale, alpha);
                        interpKey._written = true;
                        this._currKeyIndices[nodeName] = currKeyIndex;
                        foundKey = true;
                        break;
                    }
                }
            }
            // If there's only a single key, just copy the key to the interpolated key...
            if (keys.length === 1 || !foundKey) {
                if(this._time <= keys[0].time ) { //&& this.looping) {
                    interpKey._pos.copy(keys[0].position);
                    interpKey._quat.copy(keys[0].rotation);
                    interpKey._scale.copy(keys[0].scale);
                    interpKey._written = true;
                    this._currKeyIndices[nodeName] = 0;
                } else {
                    if (this._time >= keys[keys.length-1].time) {
                        interpKey._pos.copy(keys[keys.length-1].position);
                        interpKey._quat.copy(keys[keys.length-1].rotation);
                        interpKey._scale.copy(keys[keys.length-1].scale);
                        interpKey._written = true;
                        this._currKeyIndices[nodeName] = keys.length-2;
                    }
                }
            }
        }
    }
};

pc.Skeleton.prototype.getAnimatedNodes = function() {
    if(this._animation && this._animation._nodes) {
        if(this.ignoreAnimation !== undefined && this.ignoreAnimation !== []) {
            return this._animation._nodes.filter((node) => {
                return !this.ignoreAnimation.includes(node._name);
            });
        } 
        return this._animation._nodes;
    }
    return undefined;
}
