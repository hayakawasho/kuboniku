precision mediump float;

varying vec2 vUv;
uniform vec2 uImageSize;
uniform float uMaxDistance;
uniform float uMagnitude;
uniform float uProgress;

void main() {
  vec3 pos = position;
  float distance = length(pos.xy);
  float zChange = 100.;

  pos.z += zChange;

  vUv = uv;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
}
