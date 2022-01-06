export var shader = 
`precision highp float;
#ifdef GL2
precision highp sampler2DShadow;
#endif
uniform vec4 uColor;
varying vec2 vUv0;
uniform sampler2D texture_diffuseMap;
void main(void)
{
    gl_FragColor = uColor;
    gl_FragColor *= texture2D(texture_diffuseMap, vUv0);
}`