import { logWarning } from "./helpers/debugHelper";

var ScrollingMaterial = pc.createScript('ScrollingMaterial');

ScrollingMaterial.attributes.add('scrollX', {
    type: 'boolean',
    default: false
});

ScrollingMaterial.attributes.add('scrollY', {
    type: 'boolean',
    default: false
});

ScrollingMaterial.attributes.add('scrollSpeed', {
    type: 'number',
    default: 0.0,
    title: 'UV Offset per frame (speed)'
});

// initialize code called once per entity
ScrollingMaterial.prototype.initialize = function () {

    if(this.entity.model) {

        if(this.entity.model.meshInstances === null) {
            let modelAsset = pc.app.assets.get(this.entity.model.asset);
            if(!modelAsset.loaded && modelAsset.loading) {
                modelAsset.ready(this.getMaterial, this); 
            }
        }
        else {
            this.getMaterial();
        }
    } else {
        logWarning("ScrollingMaterial: Missing model for entity:", this.entity.name)
    }
};

ScrollingMaterial.prototype.getMaterial = function (asset) {

    this.offsetMaterial = this.entity.model.meshInstances[0].material;

    if(this.offsetMaterial) {

        // Store the original offset of the material so we can offset from it
        this.startOffset = this.offsetMaterial.diffuseMapOffset.clone();

        // Keep track of the current offset
        this.offset = new pc.Vec2();

        this.on('enable', function () {
            this.reset();
        });
        this.on('disable', function () {
            this.reset();
        });
    }
}

// update code called every frame
ScrollingMaterial.prototype.update = function (dt) {
    if(this.offsetMaterial){
        if(this.scrollX || this.scrollY) {

            this.offset.copy(this.offsetMaterial.diffuseMapOffset);
            this.offset.x = this.scrollX ? (this.offsetMaterial.diffuseMapOffset.x+this.scrollSpeed)%1 : this.offsetMaterial.diffuseMapOffset.x;
            this.offset.y = this.scrollY ? (this.offsetMaterial.diffuseMapOffset.y+this.scrollSpeed)%1 : this.offsetMaterial.diffuseMapOffset.y;

            this.offsetMaterial.diffuseMapOffset = this.offset;

            this.offsetMaterial.update();
        }
    }
    
};

ScrollingMaterial.prototype.reset = function () {

    // Keep track of the current offset
    this.offset = new pc.Vec2();

    this.offsetMaterial.diffuseMapOffset = this.startOffset;
    this.offsetMaterial.update();
}