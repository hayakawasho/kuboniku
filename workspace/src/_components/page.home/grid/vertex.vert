precision mediump float;

varying vec2 vUv;
uniform float u_velo;

void main() {
  vec4 pos = modelViewMatrix * vec4(position, 1.0);

  pos.y *= 1. - u_velo * .175;
  pos.x *= 1. - u_velo * .175;

  vUv = uv;
  gl_Position = projectionMatrix * pos;
}
