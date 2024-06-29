precision mediump float;

#pragma glslify: sheerY = require('../../../_gl/sheerY');

varying vec2 vUv;
uniform float u_skewY;

void main() {
  vec4 pos = modelViewMatrix * vec4(position, 1.0);
  pos.xy *= sheerY(u_skewY);

  vUv = uv;
  gl_Position = projectionMatrix * pos;
}
