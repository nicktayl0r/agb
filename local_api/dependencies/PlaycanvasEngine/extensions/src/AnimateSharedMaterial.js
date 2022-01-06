var AnimateSharedMaterial = pc.createScript('AnimateSharedMaterial');

AnimateSharedMaterial.attributes.add('materialAsset', {
    type: 'asset',
    assetType: 'material'
});

AnimateSharedMaterial.attributes.add('animateDiffuse', {
    type: 'boolean',
    default: true,
    description: 'If the material has a diffuse map, should we animate it?'
});

AnimateSharedMaterial.attributes.add('numFrames', {
    type: 'number',
    default: 1,
    description: 'Number of frames to play before looping'
});

AnimateSharedMaterial.attributes.add('startFrame', {
    type: 'number',
    default: 0,
    description: 'Frame to start animation from'
});

AnimateSharedMaterial.attributes.add('width', {
    type: 'number',
    default: 1,
    description: 'Number of frames wide'
});

AnimateSharedMaterial.attributes.add('height', {
    type: 'number',
    default: 1,
    description: 'Number of frames high'
});

AnimateSharedMaterial.attributes.add('frameRate', {
    type: 'number',
    default: 1,
    description: 'Playback frames per second'
});

AnimateSharedMaterial.attributes.add('animateAmbient', {
    type: 'boolean',
    default: false,
    description: 'If the material has an ambient map, should we animate it?'
});

AnimateSharedMaterial.attributes.add('animateEmissive', {
    type: 'boolean',
    default: false,
    description: 'If the material has an emissive map, should we animate it?'
});

AnimateSharedMaterial.attributes.add('animateGloss', {
    type: 'boolean',
    default: false,
    description: 'If the material has a gloss map, should we animate it?'
});

AnimateSharedMaterial.attributes.add('animateHeight', {
    type: 'boolean',
    default: false,
    description: 'If the material has a height map, should we animate it?'
});

AnimateSharedMaterial.attributes.add('animateLight', {
    type: 'boolean',
    default: false,
    description: 'If the material has a light map, should we animate it?'
});

AnimateSharedMaterial.attributes.add('animateMetalness', {
    type: 'boolean',
    default: false,
    description: 'If the material has a metalness map, should we animate it?'
});

AnimateSharedMaterial.attributes.add('animateNormal', {
    type: 'boolean',
    default: false,
    description: 'If the material has a normal map, should we animate it?'
});

AnimateSharedMaterial.attributes.add('animateOpacity', {
    type: 'boolean',
    default: false,
    description: 'If the material has a opacity map, should we animate it?'
});

AnimateSharedMaterial.attributes.add('animateSpecular', {
    type: 'boolean',
    default: false,
    description: 'If the material has a specular map, should we animate it?'
});

// initialize code called once per entity
AnimateSharedMaterial.prototype.initialize = function () {
    if (this.materialAsset) {
        this.material = this.materialAsset.resource;
    }

    this.timer = 1 / this.frameRate;
    this.frame = this.startFrame;
    // this.transform = new pc.Vec4();

    this.updateMaterial(this.frame);
};

// update code called every frame
AnimateSharedMaterial.prototype.update = function (dt) {
    // calculate when to animate to next frame
    this.timer -= dt;
    if (this.timer < 0) {
        // move to next frame
        this.frame++;
        if (this.frame >= this.numFrames + this.startFrame) {
            this.frame = this.startFrame;
        }

        this.updateMaterial(this.frame);

        // reset the timer
        this.timer = 1 / this.frameRate;
    }
};

AnimateSharedMaterial.prototype.updateMaterial = function (frame) {
    // calculate how much to change UV to go to next frame
    var dx = 1 / this.width;
    var dy = 1 / this.height;

    // Convert frame number into UV co-ordinate
    var x = frame % this.width;
    var y = Math.floor(frame / this.width);

    //** original for mesh instance specific
    // var meshes = this.entity.model.meshInstances;

    // create the transform vector (tilingx, tilingy, offsetx, offsety)
    // and override the material properties for this mesh
    // This allows us to use different settings for different Entities, but share the same material
    // this.transform.set(dx, dy, x * dx, (1 - dy) - (y * dy));

    // meshes[0].setParameter("texture_diffuseMapTransform", this.transform.data);
    // meshes[0].setParameter("texture_emissiveMapTransform", this.transform.data);
    // meshes[0].setParameter("texture_opacityMapTransform", this.transform.data);
    //** end mesh instance specific

    //the below doesn't want to work, no idea why.
    // this.material.setParameter("texture_diffuseMapTransform", this.transform.data);
    // this.material.setParameter("texture_emissiveMapTransform", this.transform.data);
    // this.material.setParameter("texture_opacityMapTransform", this.transform.data);

    //these actually work
    //diffuse
    if(this.animateDiffuse && this.material.diffuseMap) {
        this.material.diffuseMapOffset = new pc.Vec2(x * dx, 1 - dy - y * dy);
        this.material.diffuseMapTiling = new pc.Vec2(dx, dy);
    }
    //ambient
    if(this.animateAmbient && this.material.aoMap) {
        this.material.aoMapOffset = new pc.Vec2(x * dx, 1 - dy - y * dy);
        this.material.aoMapTiling = new pc.Vec2(dx, dy);
    }
    //emissive
    if(this.animateEmissive && this.material.emissiveMap) {
        this.material.emissiveMapOffset = new pc.Vec2(x * dx, 1 - dy - y * dy);
        this.material.emissiveMapTiling = new pc.Vec2(dx, dy);
    }
    //gloss
    if(this.animateGloss && this.material.glossMap) {
        this.material.glossMapOffset = new pc.Vec2(x * dx, 1 - dy - y * dy);
        this.material.glossMapTiling = new pc.Vec2(dx, dy);
    }
    //height
    if(this.animateHeight && this.material.heightMap) {
        this.material.heightMapOffset = new pc.Vec2(x * dx, 1 - dy - y * dy);
        this.material.heightMapTiling = new pc.Vec2(dx, dy);
    }
    //light
    if(this.animateLight && this.material.lightMap) {
        this.material.lightMapOffset = new pc.Vec2(x * dx, 1 - dy - y * dy);
        this.material.lightMapTiling = new pc.Vec2(dx, dy);
    }
    //metalness
    if(this.animateMetalness && this.material.metalnessMap) {
        this.material.metalnessMapOffset = new pc.Vec2(x * dx, 1 - dy - y * dy);
        this.material.metalnessMapTiling = new pc.Vec2(dx, dy);
    }
    //normal
    if(this.animateNormal && this.material.normalMap) {
        this.material.normalMapOffset = new pc.Vec2(x * dx, 1 - dy - y * dy);
        this.material.normalMapTiling = new pc.Vec2(dx, dy);
    }
    //opacity
    if(this.animateOpacity && this.material.opacityMap) {
        this.material.opacityMapOffset = new pc.Vec2(x * dx, 1 - dy - y * dy);
        this.material.opacityMapTiling = new pc.Vec2(dx, dy);
    }
    //specular
    if(this.animateSpecular && this.material.specularMap) {
        this.material.specularMapOffset = new pc.Vec2(x * dx, 1 - dy - y * dy);
        this.material.specularMapTiling = new pc.Vec2(dx, dy);
    }

    this.material.update();
};
