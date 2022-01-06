var FlatColorMaterial = pc.createScript('flatColorMaterial', pc.script.app);
FlatColorMaterial.attributes.add("name", {type:"string"}); //the custom name to use
FlatColorMaterial.attributes.add("color", {type:"rgba"}); //the color of the mesh


FlatColorMaterial.prototype.initialize = function() {
    
	this.material= new pc.BasicMaterial();
	this.material.name= "FlatColorMaterial";
    this.material.color = this.color;
    // this.material.update();
	this.app.fire("CustomMaterialCreated", {name: this.name, material: this.material} );
	
    //this.UpdateMesh();
};


// update code called every frame
// FlatColorMaterial.prototype.update = function(dt) {
// };

// FlatColorMaterial.prototype.UpdateMesh = function() {
//     var model = this.entity.model;
//     var mInstances = model.meshInstances;
//     var i = 0;
//     while(i < mInstances.length) {
//         mInstances[i].material= this.material;     
//         i = i+1;
//     }
// };