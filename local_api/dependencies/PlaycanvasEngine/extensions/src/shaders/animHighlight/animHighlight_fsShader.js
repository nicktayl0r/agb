export var shader =`
uniform vec4 highlightColor;

void main() {
    gl_FragColor = highlightColor;
}`