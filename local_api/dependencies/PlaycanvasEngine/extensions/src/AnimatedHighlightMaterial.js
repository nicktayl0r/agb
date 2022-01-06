var AnimatedHighlightMaterial = pc.createScript('animatedHighlightMaterial', pc.script.app);
AnimatedHighlightMaterial.attributes.add("name", {type:"string"}); //the custom name to use
AnimatedHighlightMaterial.attributes.add("highlightColor", {type:"rgba"}); //the color of the mesh
AnimatedHighlightMaterial.attributes.add("highlightSize", {type:"number"}); //how big it gets
AnimatedHighlightMaterial.attributes.add("highlightSpeed", {type:"number"}); //how fast it oscillates 
AnimatedHighlightMaterial.attributes.add('cull', {
    type: 'number',
    enum: [
        { 'front': 1 },
        { 'back': 2 },
        { 'none': 3 }
    ],
    default: 1
});

const highlight_vs= `
precision mediump float;
attribute vec3 vertex_position;
attribute vec3 vertex_normal;
uniform mat4 matrix_model;
uniform mat4 matrix_viewProjection;
mat4 dModelMatrix;

mat4 getModelMatrix() {
    return matrix_model;
}

float _PulseOutline;
uniform float _Outline;
uniform float _PulseSpeed;

varying vec3 norm;

uniform float uTime;

vec4 getPosition() {
    dModelMatrix = getModelMatrix();
    vec3 localPos = vertex_position;

    vec4 lPos = vec4(localPos, 1.0);

    norm= (dModelMatrix * vec4(vertex_normal, 1.0)).xyz;

    _PulseOutline = _Outline + (_Outline * abs(sin(uTime * _PulseSpeed)));
    lPos.xyz += vertex_normal.xyz * _PulseOutline;

    vec4 posW = dModelMatrix * lPos;

    vec4 screenPos;

    screenPos = matrix_viewProjection * posW;

    return screenPos;
}

void main(void)
{
    gl_Position = getPosition();
}`;
const highlight_fs= `
precision mediump float;
uniform vec4 highlightColor;

void main() {
    gl_FragColor = highlightColor;
}`;

AnimatedHighlightMaterial.prototype.initialize = function() {
    this.time = 0;
	const shaderDef = {
		attributes: {
			vertex_position: pc.SEMANTIC_POSITION,
			vertex_normal: pc.SEMANTIC_NORMAL
		},
		vshader: highlight_vs,
		fshader: highlight_fs
	};
	this.shader= new pc.Shader(this.app.graphicsDevice, shaderDef);
	this.material= new pc.Material();
    this.material.name= "AnimatedAnimatedHighlightMaterial";
    switch (this.cull) {
        case 1:
            this.material.cull= pc.CULLFACE_FRONT;
        break;
        case 2:
            this.material.cull= pc.CULLFACE_BACK;
        break;
        case 3:
            this.material.cull= pc.CULLFACE_NONE;
        break;
    }
	this.material.shader= this.shader;
    this.material.setParameter('uTime', 0);
	this.material.setParameter("highlightColor", [this.highlightColor.r,this.highlightColor.g,this.highlightColor.b,this.highlightColor.a]);
    this.material.setParameter("_Outline", this.highlightSize);
    this.material.setParameter("_PulseSpeed", this.highlightSpeed);
    // this.material.update();
	this.app.fire("CustomMaterialCreated", {name: this.name, material: this.material} );
	
    //this.UpdateMesh();
};


// update code called every frame
AnimatedHighlightMaterial.prototype.update = function(dt) {
    this.time+= dt;
    this.material.setParameter("uTime", this.time);
    // this.material.update();
};

// AnimatedHighlightMaterial.prototype.UpdateMesh = function() {
//     var model = this.entity.model;
//     var mInstances = model.meshInstances;
//     var i = 0;
//     while(i < mInstances.length) {
//         mInstances[i].material= this.material;     
//         i = i+1;
//     }
// };