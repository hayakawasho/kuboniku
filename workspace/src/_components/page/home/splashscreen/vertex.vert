precision mediump float;

#pragma glslify: PI = require('../../../../_foundation/gl/pi');

uniform vec2 uBend;

varying vec2 vUv;

void main() {
  vUv = uv;

  vec3 pos = position;

  float a = vUv.y * PI + 0.25;
  float aa = vUv.x * PI + 0.25;
  float a1 = sin(a);
  float a2 = sin(aa);

  pos.x -= 0.25 * a1 * (uBend.x * 1.2);
  pos.y -= 0.25 * a2 * (uBend.y * 1.2);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
