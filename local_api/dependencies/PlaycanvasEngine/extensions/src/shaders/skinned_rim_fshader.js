export var shader = 
`precision highp float;
#ifdef GL2
precision highp sampler2DShadow;
#endif
uniform vec4 uColor;
varying vec2 vUv0;
uniform sampler2D texture_diffuseMap;
uniform vec3 rimColor;
uniform float rimWidth;

varying vec4 position;
varying vec3 normal;

vec4 rim_light()
{
    vec3 n = normalize(normal);
    vec3 v = normalize(-position.xyz);

    float intensity = rimWidth - max(dot(v, n), 0.0);
    intensity = max(0.0, intensity); // ignore rim light if negative

    return vec4(intensity * rimColor, 1.0);
}

void main(void)
{
    gl_FragColor = texture2D(texture_diffuseMap, vUv0);
    gl_FragColor *= uColor;
    gl_FragColor += rim_light();
}`