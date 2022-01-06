export var shader =
`
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
float _Outline;
float _PulseSpeed;

varying vec3 norm;

uniform float uTime;

vec4 getPosition() {
    dModelMatrix = getModelMatrix();
    vec3 localPos = vertex_position;

    _Outline = 3.0;
    _PulseSpeed = 5.0;

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
}`