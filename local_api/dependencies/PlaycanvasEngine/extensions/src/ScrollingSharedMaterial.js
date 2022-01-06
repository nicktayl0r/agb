var ScrollingSharedMaterial = pc.createScript('ScrollingSharedMaterial');

ScrollingSharedMaterial.attributes.add('offsetMaterialAsset', {
    type: 'asset',
    assetType: 'material'
});

ScrollingSharedMaterial.attributes.add('scrollX', {
    type: 'boolean',
    default: false
});

ScrollingSharedMaterial.attributes.add('scrollY', {
    type: 'boolean',
    default: false
});

ScrollingSharedMaterial.attributes.add('scrollSpeed', {
    type: 'number',
    default: 0.0,
    title: 'UV Offset per frame (speed)'
});

ScrollingSharedMaterial.attributes.add('animateDiffuse', {
    type: 'boolean',
    default: true,
    description: 'If the material has a diffuse map, should we animate it?'
});

ScrollingSharedMaterial.attributes.add('animateAmbient', {
    type: 'boolean',
    default: false,
    description: 'If the material has an ambient map, should we animate it?'
});

ScrollingSharedMaterial.attributes.add('animateEmissive', {
    type: 'boolean',
    default: false,
    description: 'If the material has an emissive map, should we animate it?'
});

ScrollingSharedMaterial.attributes.add('animateGloss', {
    type: 'boolean',
    default: false,
    description: 'If the material has a gloss map, should we animate it?'
});

ScrollingSharedMaterial.attributes.add('animateHeight', {
    type: 'boolean',
    default: false,
    description: 'If the material has a height map, should we animate it?'
});

ScrollingSharedMaterial.attributes.add('animateLight', {
    type: 'boolean',
    default: false,
    description: 'If the material has a light map, should we animate it?'
});

ScrollingSharedMaterial.attributes.add('animateMetalness', {
    type: 'boolean',
    default: false,
    description: 'If the material has a metalness map, should we animate it?'
});

ScrollingSharedMaterial.attributes.add('animateNormal', {
    type: 'boolean',
    default: false,
    description: 'If the material has a normal map, should we animate it?'
});

ScrollingSharedMaterial.attributes.add('animateOpacity', {
    type: 'boolean',
    default: false,
    description: 'If the material has a opacity map, should we animate it?'
});

ScrollingSharedMaterial.attributes.add('animateSpecular', {
    type: 'boolean',
    default: false,
    description: 'If the material has a specular map, should we animate it?'
});

// initialize code called once per entity
ScrollingSharedMaterial.prototype.initialize = function () {
    this.offsetMaterial = this.offsetMaterialAsset.resource;
    if(this.offsetMaterial) {

        // Store the original offset of the material so we can offset from it
        if(this.animateDiffuse && this.offsetMaterial.diffuseMap)this.diffuseOffset = this.offsetMaterial.diffuseMapOffset.clone();
        if(this.animateAmbient && this.offsetMaterial.aoMap)this.ambientOffset = this.offsetMaterial.aoMapOffset.clone();
        if(this.animateEmissive && this.offsetMaterial.emissiveMap)this.emissiveOffset = this.offsetMaterial.emissiveMapOffset.clone();
        if(this.animateGloss && this.offsetMaterial.glossMap)this.glossOffset = this.offsetMaterial.glossMapOffset.clone();
        if(this.animateHeight && this.offsetMaterial.heightMap)this.heightOffset = this.offsetMaterial.heightMapOffset.clone();
        if(this.animateLight && this.offsetMaterial.lightMap)this.lightOffset = this.offsetMaterial.lightMapOffset.clone();
        if(this.animateMetalness && this.offsetMaterial.metalnessMap)this.metalOffset = this.offsetMaterial.metalnessMapOffset.clone();
        if(this.animateNormal && this.offsetMaterial.normalMap)this.normalOffset = this.offsetMaterial.normalMapOffset.clone();
        if(this.animateOpacity && this.offsetMaterial.opacityMap)this.opacityOffset = this.offsetMaterial.opacityMapOffset.clone();
        if(this.animateSpecular && this.offsetMaterial.specularMap) this.specOffset = this.offsetMaterial.specularMapOffset.clone();

        // Keep track of the current offset
        this.offset = new pc.Vec2();

        this.on('enable', function () {
            this.reset();
        });
        this.on('disable', function () {
            this.reset();
        });
    }
};

// update code called every frame
ScrollingSharedMaterial.prototype.update = function (dt) {
    if(this.offsetMaterial){
        if(this.scrollX || this.scrollY) {
            if(this.animateDiffuse && this.offsetMaterial.diffuseMap) {
                this.offset.copy(this.offsetMaterial.diffuseMapOffset);
                this.offset.x = this.scrollX ? (this.offsetMaterial.diffuseMapOffset.x+this.scrollSpeed)%1 : this.offsetMaterial.diffuseMapOffset.x;
                this.offset.y = this.scrollY ? (this.offsetMaterial.diffuseMapOffset.y+this.scrollSpeed)%1 : this.offsetMaterial.diffuseMapOffset.y;
    
                this.offsetMaterial.diffuseMapOffset.copy(this.offset);
            }

            if(this.animateAmbient && this.offsetMaterial.aoMap) {
                this.offset.copy(this.offsetMaterial.aoMapOffset);
                this.offset.x = this.scrollX ? (this.offsetMaterial.aoMapOffset.x+this.scrollSpeed)%1 : this.offsetMaterial.aoMapOffset.x;
                this.offset.y = this.scrollY ? (this.offsetMaterial.aoMapOffset.y+this.scrollSpeed)%1 : this.offsetMaterial.aoMapOffset.y;
    
                this.offsetMaterial.aoMapOffset.copy(this.offset);
            }

            if(this.animateEmissive && this.offsetMaterial.emissiveMap) {
                this.offset.copy(this.offsetMaterial.emissiveMapOffset);
                this.offset.x = this.scrollX ? (this.offsetMaterial.emissiveMapOffset.x+this.scrollSpeed)%1 : this.offsetMaterial.emissiveMapOffset.x;
                this.offset.y = this.scrollY ? (this.offsetMaterial.emissiveMapOffset.y+this.scrollSpeed)%1 : this.offsetMaterial.emissiveMapOffset.y;
    
                this.offsetMaterial.emissiveMapOffset.copy(this.offset);
            }

            if(this.animateGloss && this.offsetMaterial.glossMap) {
                this.offset.copy(this.offsetMaterial.glossMapOffset);
                this.offset.x = this.scrollX ? (this.offsetMaterial.glossMapOffset.x+this.scrollSpeed)%1 : this.offsetMaterial.glossMapOffset.x;
                this.offset.y = this.scrollY ? (this.offsetMaterial.glossMapOffset.y+this.scrollSpeed)%1 : this.offsetMaterial.glossMapOffset.y;
    
                this.offsetMaterial.glossMapOffset.copy(this.offset);
            }

            if(this.animateHeight && this.offsetMaterial.heightMap) {
                this.offset.copy(this.offsetMaterial.heightMapOffset);
                this.offset.x = this.scrollX ? (this.offsetMaterial.heightMapOffset.x+this.scrollSpeed)%1 : this.offsetMaterial.heightMapOffset.x;
                this.offset.y = this.scrollY ? (this.offsetMaterial.heightMapOffset.y+this.scrollSpeed)%1 : this.offsetMaterial.heightMapOffset.y;
    
                this.offsetMaterial.heightMapOffset.copy(this.offset);
            }

            if(this.animateLight && this.offsetMaterial.lightMap) {
                this.offset.copy(this.offsetMaterial.lightMapOffset);
                this.offset.x = this.scrollX ? (this.offsetMaterial.lightMapOffset.x+this.scrollSpeed)%1 : this.offsetMaterial.lightMapOffset.x;
                this.offset.y = this.scrollY ? (this.offsetMaterial.lightMapOffset.y+this.scrollSpeed)%1 : this.offsetMaterial.lightMapOffset.y;
    
                this.offsetMaterial.lightMapOffset.copy(this.offset);
            }

            if(this.animateMetalness && this.offsetMaterial.metalnessMap) {
                this.offset.copy(this.offsetMaterial.metalnessMapOffset);
                this.offset.x = this.scrollX ? (this.offsetMaterial.metalnessMapOffset.x+this.scrollSpeed)%1 : this.offsetMaterial.metalnessMapOffset.x;
                this.offset.y = this.scrollY ? (this.offsetMaterial.metalnessMapOffset.y+this.scrollSpeed)%1 : this.offsetMaterial.metalnessMapOffset.y;
    
                this.offsetMaterial.metalnessMapOffset.copy(this.offset);
            }

            if(this.animateNormal && this.offsetMaterial.normalMap) {
                this.offset.copy(this.offsetMaterial.normalMapOffset);
                this.offset.x = this.scrollX ? (this.offsetMaterial.normalMapOffset.x+this.scrollSpeed)%1 : this.offsetMaterial.normalMapOffset.x;
                this.offset.y = this.scrollY ? (this.offsetMaterial.normalMapOffset.y+this.scrollSpeed)%1 : this.offsetMaterial.normalMapOffset.y;
    
                this.offsetMaterial.normalMapOffset.copy(this.offset);
            }

            if(this.animateOpacity && this.offsetMaterial.opacityMap) {
                this.offset.copy(this.offsetMaterial.opacityMapOffset);
                this.offset.x = this.scrollX ? (this.offsetMaterial.opacityMapOffset.x+this.scrollSpeed)%1 : this.offsetMaterial.opacityMapOffset.x;
                this.offset.y = this.scrollY ? (this.offsetMaterial.opacityMapOffset.y+this.scrollSpeed)%1 : this.offsetMaterial.opacityMapOffset.y;
    
                this.offsetMaterial.opacityMapOffset.copy(this.offset);
            }

            if(this.animateSpecular && this.offsetMaterial.specularMap) {
                this.offset.copy(this.offsetMaterial.specularMapOffset);
                this.offset.x = this.scrollX ? (this.offsetMaterial.specularMapOffset.x+this.scrollSpeed)%1 : this.offsetMaterial.specularMapOffset.x;
                this.offset.y = this.scrollY ? (this.offsetMaterial.specularMapOffset.y+this.scrollSpeed)%1 : this.offsetMaterial.specularMapOffset.y;
    
                this.offsetMaterial.specularMapOffset.copy(this.offset);
            }


            this.offsetMaterial.update();
        }
    }
    
};

ScrollingSharedMaterial.prototype.reset = function () {

    // Keep track of the current offset
    this.offset = new pc.Vec2();
    
    if(this.animateDiffuse && this.offsetMaterial.diffuseMap)this.offsetMaterial.diffuseMapOffset = this.diffuseOffset;
    if(this.animateAmbient && this.offsetMaterial.aoMap)this.offsetMaterial.aoMapOffset = this.ambientOffset;
    if(this.animateEmissive && this.offsetMaterial.emissiveMap)this.offsetMaterial.emissiveMapOffset = this.emissiveOffset;
    if(this.animateGloss && this.offsetMaterial.glossMap)this.offsetMaterial.glossMapOffset = this.glossOffset;
    if(this.animateHeight && this.offsetMaterial.heightMap)this.offsetMaterial.heightMapOffset = this.heightOffset;
    if(this.animateLight && this.offsetMaterial.lightMap)this.offsetMaterial.lightMapOffset = this.lightOffset;
    if(this.animateMetalness && this.offsetMaterial.metalnessMap)this.offsetMaterial.metalnessMapOffset = this.metalOffset;
    if(this.animateNormal && this.offsetMaterial.normalMap)this.offsetMaterial.normalMapOffset = this.normalOffset;
    if(this.animateOpacity && this.offsetMaterial.opacityMap)this.offsetMaterial.opacityMapOffset = this.opacityOffset;
    if(this.animateSpecular && this.offsetMaterial.specularMap)this.offsetMaterial.specularMapOffset = this.specOffset;
    this.offsetMaterial.update();
}