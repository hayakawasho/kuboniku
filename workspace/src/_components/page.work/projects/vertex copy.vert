#define PI 3.141592653589793
#define PR 2.0
precision highp int;
precision highp float;

varying vec2 vUv;

attribute vec2 uv;
attribute vec3 position;
attribute vec3 normal;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

uniform float uScrollEffect;
uniform float uDragEffect;
uniform float uHoverEffect;
uniform float uSlideEffect;

void main() {
	vUv = uv;

	vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
	gl_Position = projectionMatrix * mvPosition;
}
