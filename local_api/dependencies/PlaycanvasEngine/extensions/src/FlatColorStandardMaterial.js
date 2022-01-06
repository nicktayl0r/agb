var FlatColorStandardMaterial = pc.createScript('flatColorStandardMaterial', pc.script.app);
FlatColorStandardMaterial.attributes.add("name", {type:"string"}); //the custom name to use
FlatColorStandardMaterial.attributes.add("color", {type:"rgba"}); //the color of the mesh


FlatColorStandardMaterial.prototype.initialize = function() {
    
	this.material= new pc.StandardMaterial();
	this.material.name= "FlatColorStandardMaterial";
    this.material.diffuse.set(this.color.r, this.color.g, this.color.b);
    this.material.lightMap = new pc.Texture(this.app.graphicsDevice, {
        width: 1,
        height: 1,
        format: pc.PIXELFORMAT_R8_G8_B8
    });
    this.material.lightMapChannel = 'a';
    this.material.useFog = this.material.useLighting = this.material.useGammaTonemap = this.material.useSkybox = false;
    // this.material.fresnelModel = pc.FRESNEL_NONE;
    // this.material.shadingModel = pc.SPECULAR_PHONG
    // this.material.update();
	this.app.fire("CustomMaterialCreated", {name: this.name, material: this.material} );
	
    //this.UpdateMesh();
};


// update code called every frame
// FlatColorStandardMaterial.prototype.update = function(dt) {
// };

// FlatColorStandardMaterial.prototype.UpdateMesh = function() {
//     var model = this.entity.model;
//     var mInstances = model.meshInstances;
//     var i = 0;
//     while(i < mInstances.length) {
//         mInstances[i].material= this.material;     
//         i = i+1;
//     }
// };