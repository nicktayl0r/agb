import {logMessage} from './helpers/debugHelper';

var AnimationDataListener = pc.createScript('animationDataListener');

AnimationDataListener.attributes.add("sharedDataKey", {type:"string"});

// initialize code called once per entity
AnimationDataListener.prototype.initialize = function() {
    var messageReceived = function(pair){
        if(pair.key === this.sharedDataKey) {
            logMessage("IncomingSharedDataMessage received", pair.key, pair.value);
            this.sharedDataValue = pair.value;
            this.updateAnimation(this.sharedDataValue);
        }
    }.bind(this);
        
    this.app.on("IncomingSharedDataMessage", messageReceived);
    
    this.on("destroy", function() {
        this.app.off("IncomingSharedDataMessage", messageReceived);
    });

    this.app.on("LoadSimState", function (simStateData) {
        this.lastSharedDataValue = 0;
        this.updateAnimation(this.sharedDataValue);
    }.bind(this));
};

AnimationDataListener.prototype.updateAnimation = function(sdv) {
    if(pc.Application._currentApplication === this.app) {
        if(this.entity.animation && this.entity.animation.skeleton) {
            if(sdv !== undefined) {
                if(sdv != this.lastSharedDataValue) {
                    
                    var scaledTime = this.entity.animation.skeleton.startTime + ((this.entity.animation.skeleton.endTime - this.entity.animation.skeleton.startTime) * (this.sharedDataValue/100));
                    logMessage("set AnimationSharedData: ", scaledTime);
                    this.entity.animation.skeleton.setTime(scaledTime);
                    this.entity.animation.skeleton.updateGraph();
                    this.lastSharedDataValue = sdv;

                    this.app.fire("AnimationSharedDataChanged", this.entity.name, sdv)
                }
            }
        }
    }
};
