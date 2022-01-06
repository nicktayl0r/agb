import { logMessage } from './helpers/debugHelper';

var frameBufferHover = pc.createScript('frameBufferHover');

frameBufferHover.attributes.add("layer", {type:"string"});

// initialize code called once per entity
frameBufferHover.prototype.initialize = function() {
    // Create a frame buffer picker with a resolution matching the pixel size of the canvas
    this.picker = new pc.Picker(this.app, this.app.graphicsDevice.canvas.clientWidth, this.app.graphicsDevice.canvas.clientHeight);
    this.camera = this.entity.camera;
    this.scene = this.app.scene;
    this.picker.prepare(this.camera, this.scene, this.scene.layers.getLayerByName(this.layer));

    if(this.app.mouse) {
        this.app.mouse.on(pc.EVENT_MOUSEMOVE, this.onHover, this);
    } else if (this.app.touch) {
        this.app.touch.on(pc.EVENT_TOUCHMOVE, this.onHover, this);
    }

    window.addEventListener("resize", function () {
        logMessage('frameBufferHover: handle window resize')
        this.picker.resize(this.app.graphicsDevice.canvas.clientWidth, this.app.graphicsDevice.canvas.clientHeight);
        this.picker.prepare(this.camera, this.scene, this.scene.layers.getLayerByName(this.layer));
    }.bind(this));

    this.lastProjMatrix = new pc.Mat4();
    this.lastViewMatrix = new pc.Mat4();
    this.lastCamPos = new pc.Mat4();

    this.time= 0;

    this.app.on("FinishedMoveCameraToTarget", function () {
        this.cameraAtTarget = true;

        this.picker.prepare(this.camera, this.scene, this.scene.layers.getLayerByName(this.layer));
    }.bind(this))
};

frameBufferHover.prototype.update = function (dt) {

    this.time+= dt;
    if (this.time > 1 && !this.cameraAtTarget) { 
        this.time= 0;

        if(this.lastViewMatrix && !this.camera.viewMatrix.equals(this.lastViewMatrix))
        {
            logMessage('frameBufferHover: handle camera viewMatrix change')
            this.picker.prepare(this.camera, this.scene, this.scene.layers.getLayerByName(this.layer));
            this.lastViewMatrix.copy(this.camera.viewMatrix);
            return;
        }

        if(this.lastProjMatrix && !this.camera.projectionMatrix.equals(this.lastProjMatrix))
        {
            logMessage('frameBufferHover: handle camera projectionMatrix change')
            this.picker.prepare(this.camera, this.scene, this.scene.layers.getLayerByName(this.layer));
            this.lastProjMatrix.copy(this.camera.projectionMatrix);
            return;
        }
    }
}

frameBufferHover.prototype.onHover = function (event) {

    var picker = this.picker;

    let selected = []

    if(event.event.type === 'touchmove'){
        let touch = event.touches[0];//getTouchById(0, event.touches);

        selected = picker.getSelection(touch.x, touch.y, 1, 1);
    } else {
        selected = picker.getSelection(event.x, event.y, 1, 1);
    }

    if (selected.length > 0) {
        // Get the graph node used by the selected mesh instance
        var entity = selected[0].node;

        // Bubble up the hierarchy until we find an actual Entity
        while (!(entity instanceof pc.Entity) && entity !== null) {
            entity = entity.getParent();
        }
        if (entity && entity !== this.currEntity) {
            
            // logMessage("frameBufferHover: Hovered enttity:", entity);
            entity.script.scripts.forEach(element => {
                if(typeof element.handleHover == 'function')
                {
                    element.handleHover();
                }
            });

            this.currEntity = entity;
        }
    } else {
        if(this.currEntity) {
            this.currEntity.script.scripts.forEach(element => {
                if(typeof element.handleHoverEnd == 'function')
                {
                    element.handleHoverEnd();
                }
            });
            this.currEntity = undefined;
        }
    }
};
