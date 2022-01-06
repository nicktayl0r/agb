var UnlitMaterial = pc.createScript('unlitMaterial', pc.script.app);

const vs= require('./shaders/unskinned_vshader').shader;
const fs_color= require('./shaders/unlit_color_fshader').shader;
const vs_skinned= require('./shaders/skinned_vshader').shader;
const fs_texture= require('./shaders/unlit_texture_fshader').shader;

var skinnedColorShader, skinnedTextureShader, unskinnedColorShader, unskinnedTextureShader;

var materialCache = {};

// initialize code called once per entity
UnlitMaterial.prototype.initialize = function() {

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

                if(mat.diffuseMap) {
                    if(!skinnedTextureShader) {
                        shaderDef = {
                            attributes: {
                                vertex_boneIndices: "BLENDINDICES",
                                vertex_boneWeights: "BLENDWEIGHT",
                                vertex_position: "POSITION",
                                vertex_texCoord0: "TEXCOORD0"
                            },
                            vshader: vs_skinned,
                            fshader: fs_texture
                        };
    
                        skinnedTextureShader = new pc.Shader(this.app.graphicsDevice, shaderDef)
                    }
                    
                    bm.setShader(skinnedTextureShader);
                } else {
                    if(!skinnedColorShader) {
                        shaderDef = {
                            attributes: {
                                vertex_boneIndices: "BLENDINDICES",
                                vertex_boneWeights: "BLENDWEIGHT",
                                vertex_position: "POSITION",
                                vertex_texCoord0: "TEXCOORD0"
                            },
                            vshader: vs_skinned,
                            fshader: fs_color
                        };
    
                        skinnedColorShader = new pc.Shader(this.app.graphicsDevice, shaderDef)
                    }
                    
                    bm.setShader(skinnedColorShader);
                }

            } else {
                
                // console.log("un-skinned");

                if(mat.diffuseMap) {
                    if(!unskinnedTextureShader){
                        shaderDef = {
                            attributes: {
                                vertex_position: "POSITION",
                                vertex_texCoord0: "TEXCOORD0"
                            },
                            vshader: vs,
                            fshader: fs_texture
                        };

                        unskinnedTextureShader = new pc.Shader(this.app.graphicsDevice, shaderDef)
                    }

                    bm.setShader(unskinnedTextureShader);
                } else {
                    if(!unskinnedColorShader){
                        shaderDef = {
                            attributes: {
                                vertex_position: "POSITION",
                                vertex_texCoord0: "TEXCOORD0"
                            },
                            vshader: vs,
                            fshader: fs_color
                        };

                        unskinnedColorShader = new pc.Shader(this.app.graphicsDevice, shaderDef)
                    }

                    bm.setShader(unskinnedColorShader);
                }
            }
            
            if(mat.diffuseMap) bm.setParameter('texture_diffuseMap', mat.diffuseMap);
            bm.setParameter('uColor', [mat.diffuse.r,mat.diffuse.g,mat.diffuse.b,1.0]);
            
            if(mat.opacityMap) bm.blendType = pc.BLEND_NORMAL;
                
            // replace orig material asset data
            bm.id = asset.resource.id;
            asset.resource = bm;

            materialCache[asset.resource.id] = bm;
        }
        
        mInstances[i].material = bm;
        
        i = i+1;
    }  
};
