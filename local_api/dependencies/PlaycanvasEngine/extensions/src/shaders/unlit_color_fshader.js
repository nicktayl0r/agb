
export var shader = 
`precision highp float;
#ifdef GL2
precision highp sampler2DShadow;
#endif
uniform vec4 uColor;
void main(void)
{
    gl_FragColor = uColor;
}`