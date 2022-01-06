var Turntable = pc.createScript('turntable');

Turntable.attributes.add('cameraEntity', {type: 'entity', title: 'Camera Entity'});
Turntable.attributes.add('orbitSensitivity', {
    type: 'number', 
    default: 0.3, 
    title: 'Orbit Sensitivity', 
    description: 'How fast the camera moves around the orbit. Higher is faster'
});
Turntable.attributes.add('rotateX', {
    type: 'boolean', 
    default: true, 
    title: 'Turntable X Axis', 
    description: 'Turntable around the X axis'
});
Turntable.attributes.add('rotateY', {
    type: 'boolean', 
    default: true, 
    title: 'Turntable Y Axis', 
    description: 'Turntable around the Y axis'
});


// initialize code called once per entity
Turntable.prototype.initialize = function() {
    this.app.mouse.on(pc.EVENT_MOUSEMOVE, this.onMouseMove, this);
    this.app.mouse.on(pc.EVENT_MOUSEUP, this.onMouseUp, this);
    
    this.timeSinceLastClick = doubleClickSpeed; 
    
    this.lastTouchPoint = new pc.Vec2();
    if (this.app.touch) {
        this.app.touch.on(pc.EVENT_TOUCHSTART, this.onTouchStart, this);
        this.app.touch.on(pc.EVENT_TOUCHMOVE, this.onTouchMove, this);     
    }

    this.horizontalQuat = new pc.Quat();
    this.verticalQuat = new pc.Quat();
    this.resultQuat = new pc.Quat();

    this.on('attr:rotateX', function(name, value, prev) {
        this.reset();
    });

    this.on('attr:rotateY', function(name, value, prev) {
        this.reset();
    });
};



var doubleClickSpeed = 0.5;

Turntable.prototype.rotate = function (dx, dy) {
    if (this.entity.enabled && (this.rotateX || this.rotateY)) {
        var horzQuat = this.horizontalQuat;
        var vertQuat = this.verticalQuat;
        var resultQuat = this.resultQuat;

        // Create a rotation around the camera's orientation in order for them to be in 
        // screen space  
        if(this.rotateY) horzQuat.setFromAxisAngle(this.cameraEntity.up, dx * this.orbitSensitivity);
        if(this.rotateX) vertQuat.setFromAxisAngle(this.cameraEntity.right, dy * this.orbitSensitivity);

        // Apply both the rotations to the existing entity rotation
        resultQuat.mul2(horzQuat, vertQuat);
        resultQuat.mul(this.entity.getRotation());

        this.entity.setRotation(resultQuat);    
    }
};


Turntable.prototype.onTouchStart = function (event) {
    if (this.entity.enabled) {
        var touch = event.touches[0];
        this.lastTouchPoint.set(touch.x, touch.y);

        if (event.touches.length > 1) {
            return;
        }
        
        // Check if user has previously tapped within the time window to be registered as a double tap
        if (this.timeSinceLastClick < doubleClickSpeed) {
            // User has double tapped so let's perform an action
            this.onDoubleClick();

            // We should also set the timeSinceLastTap to be outside the time window so their third tap
            // won't accidently be registered as a double tap
            this.timeSinceLastClick = doubleClickSpeed;  
        }
        else {
            // Reset timeSinceLastTap if the click was done after the time allowed for a double
            // tap to register
            this.timeSinceLastClick = 0;
        }
    }
};

Turntable.prototype.onTouchMove = function (event) {
    if (this.entity.enabled) {
        var touch = event.touches[0];
        var dx = touch.x - this.lastTouchPoint.x;
        var dy = touch.y - this.lastTouchPoint.y;
        
        this.rotate(dx, dy);
        this.timeSinceLastClick = doubleClickSpeed;  
        
        this.lastTouchPoint.set(touch.x, touch.y);
    }
};

Turntable.prototype.onMouseMove = function (event) {    
    if (this.entity.enabled) {
        var mouse = this.app.mouse;
        if (mouse.isPressed(pc.MOUSEBUTTON_LEFT)) {
            this.rotate(event.dx, event.dy);
            this.timeSinceLastClick = doubleClickSpeed;  
        }
    }
};

Turntable.prototype.onMouseUp = function (event) {    
    if (this.entity.enabled) {
        if (this.timeSinceLastClick < doubleClickSpeed) {
            // User has double clicked so let's perform an action
            this.onDoubleClick();
            
            // We should also set the timeSinceLastClick to be outside the time window so their third click
            // won't accidently be registered as a double click
            this.timeSinceLastClick = doubleClickSpeed;  
        }
        else {
            // Reset timeSinceLastClick if the click was done after the time allowed for a double
            // click to register
            this.timeSinceLastClick = 0;
        }
    }
};

// update code called every frame
Turntable.prototype.update = function(dt) {
    if (this.entity.enabled) {
        // Always add time since last frame to timeSinceLastClick so we know when the user has 
        // clicked last
        this.timeSinceLastClick += dt;
    }
};

Turntable.prototype.onDoubleClick = function() {
    // console.log("OnDoubleClick. rotateX:  ",this.rotateX,", rotateY: ", this.rotateY);
    this.reset();
};

Turntable.prototype.reset = function() {
    if (this.entity.enabled && (this.rotateX || this.rotateY)) {
        this.entity.setLocalRotation(0,0,0,0);  

        this.timeSinceLastClick = doubleClickSpeed; 
    
        this.lastTouchPoint = new pc.Vec2();

        this.horizontalQuat = new pc.Quat();
        this.verticalQuat = new pc.Quat();
        this.resultQuat = new pc.Quat();

        // this.entity
        // 		.tween(this.entity.getLocalRotation())
        //         .to({x:0,y:0,z:0,w:0}, 1.0, pc.ElasticOut)
        //         .start();
    }
}
