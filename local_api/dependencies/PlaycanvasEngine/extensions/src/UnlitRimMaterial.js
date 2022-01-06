var UnlitRimMaterial = pc.createScript('unlitRimMaterial', pc.script.app);

UnlitRimMaterial.attributes.add('rimColor', { type: 'rgb', default: [1, 0.494, 0.494]});
UnlitRimMaterial.attributes.add('rimWidth', { type: 'number', default: 0.3 });

const vs= require('./shaders/unskinned_vshader').shader;
const fs= require('./shaders/unlit_texture_fshader').shader;
const vs_skinned_rim= require('./shaders/skinned_rim_vshader').shader;
const fs_skinned_rim= require('./shaders/skinned_rim_fshader').shader;

var skinnedShader, unskinnedShader;

var materialCache = {};

// initialize code called once per entity
UnlitRimMaterial.prototype.initialize = function() {

    // console.log(this.entity.name);
    
    var model = this.entity.model;
    
    var mInstances = model.meshInstances;
    
    var i = 0;
    
    var basic = new pc.Material();
    
    while(i < mInstances.length) {

        var bm;
        
        var mat = mInstances[i].material;

        var asset = this.app.assets.filter(function(asset) {
            return asset.resource && asset.resource.id == mat.id;
        })[0];

        if(!(bm = materialCache[asset.resource.id])) {

            bm = basic.clone();
        
            var shaderDef;
            if(mInstances[i].skinInstance){
                
                // console.log("skinned");

                if(!skinnedShader) {
                    shaderDef = {
                        attributes: {
                            vertex_boneIndices: "BLENDINDICES",
                            vertex_boneWeights: "BLENDWEIGHT",
                            vertex_position: "POSITION",
                            vertex_texCoord0: "TEXCOORD0",
                            vertex_normal: "NORMAL"
                        },
                        vshader: vs_skinned_rim,
                        fshader: fs_skinned_rim
                    };

                    skinnedShader = new pc.Shader(this.app.graphicsDevice, shaderDef)
                }
                
                bm.setShader(skinnedShader);
                
                bm.setParameter('rimColor', [this.rimColor.r, this.rimColor.g, this.rimColor.b]);
                bm.setParameter('rimWidth', this.rimWidth);

            } else {
                
                // console.log("un-skinned");

                if(!unskinnedShader){
                    shaderDef = {
                        attributes: {
                            vertex_position: "POSITION",
                            vertex_texCoord0: "TEXCOORD0"
                        },
                        vshader: vs,
                        fshader: fs
                    };

                    unskinnedShader = new pc.Shader(this.app.graphicsDevice, shaderDef)
                }

                bm.setShader(unskinnedShader);
            }
            
            bm.setParameter('texture_diffuseMap', mat.diffuseMap);
            bm.setParameter('uColor', [mat.diffuse.r,mat.diffuse.g,mat.diffuse.b,1.0]);

            bm.blendType = pc.BLEND_NORMAL;

            // replace orig material asset data
            bm.id = asset.resource.id;
            asset.resource = bm;

            materialCache[asset.resource.id] = bm;
        }

        mInstances[i].material = bm;
        
        i = i+1;
    }  
};
