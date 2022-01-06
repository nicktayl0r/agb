// More information about curves can be found at: 
// http://developer.playcanvas.com/en/user-manual/scripting/script-attributes/
// http://developer.playcanvas.com/en/api/pc.Curve.html
import { logMessage } from "./helpers/debugHelper";

var AnimatePositionGeneric = pc.createScript('animatePositionGeneric');

// Example of creating curve attribute with multiple curves (in this case, x, y, z)
AnimatePositionGeneric.attributes.add("offsetCurve", {type: "curve", title: "Animation Curve", curves: [ 'x', 'y', 'z' ]});
AnimatePositionGeneric.attributes.add("duration", {type: "number", default: 3, title: "Duration (secs)"});

AnimatePositionGeneric.attributes.add("local", {type: "boolean", default: false, title: "Local"});
AnimatePositionGeneric.attributes.add("loop", {type: "boolean", default: false, title: "Loop"});
AnimatePositionGeneric.attributes.add("fireAnimationEvents", {type: "boolean", default: false, title: "Fire Animation Events"});

// initialize code called once per entity
AnimatePositionGeneric.prototype.initialize = function() {
    // Store the original position of the entity so we can offset from it
    this.startPosition = this.entity.getPosition().clone();

    this.onComplete = false;
    
    // Keep track of the current position
    this.position = new pc.Vec3();
    
    this.time = 0;
    
    this.app.on("LoadSimState", function (simStateData) {
        this.reset();
    }.bind(this));

    this.on('enable', function () {
        this.reset();
    }.bind(this));
    this.on('disable', function () {
        this.reset();
    }.bind(this));
    
    // this.app.on("PlayAllAnimations", function (simStateData) {
    //     this.time = 0;
    // }.bind(this));
        
};

// update code called every frame
AnimatePositionGeneric.prototype.update = function(dt) {
    this.time += dt;
    
    // Loop the animation forever
    if (this.loop && (this.time > this.duration)) {
        this.time -= this.duration;
        if(this.fireAnimationEvents) {
            pc.app.fire("OnAnimationLoop");
            logMessage("fire OnAnimationLoop from AnimatePositionGeneric"+
                " on entity: "+this.entity.name+
                " in sim: "+ pc.app.graphicsDevice.canvas.id);
        }
    }
    if(this.time <= this.duration) {     
        // Calculate how far in time we are for the animation
        var percent = this.time / this.duration;

        this.setPosition(percent);

    } else if (!this.onComplete) {
        this.setPosition(1.0);
        if(this.fireAnimationEvents) {
            pc.app.fire("OnAnimationDone");
            logMessage("fire OnAnimationDone from AnimatePositionGeneric"+
                " on entity: "+this.entity.name+
                " in sim: "+ pc.app.graphicsDevice.canvas.id);
        }
        this.onComplete = true;
    }
};

AnimatePositionGeneric.prototype.setPosition = function(percent) {
    // Get curve values using current time relative to duration (percent)
    // The offsetCurve has 3 curves (x, y, z) so the returned value will be a set of 
    // 3 values
    var curveValue = this.offsetCurve.value(percent);

    if(!this.local) {
        // Create our new position from the startPosition and curveValue
        this.position.x = curveValue[0];
        this.position.y = curveValue[1];
        this.position.z = curveValue[2];
    } else {
        // Create our new position from the startPosition and curveValue
        this.position.copy(this.startPosition);
        this.position.x += curveValue[0];
        this.position.y += curveValue[1];
        this.position.z += curveValue[2];
    }
    
    this.entity.setPosition(this.position);
}

AnimatePositionGeneric.prototype.reset = function() {
    this.time = 0;
    this.onComplete = false;
    this.position = new pc.Vec3();
    this.entity.setPosition(this.startPosition);
}
