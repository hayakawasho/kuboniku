precision mediump float;

#pragma glslify: sheerY = require('../../../../_foundation/gl/sheer');

varying vec2 vUv;
uniform float uSkewY;
uniform vec2 uMouse;
uniform float uCurviness;
uniform float uRipple;
uniform float uScaleProgress;

float parabola(float x) {
  return -4.0 * pow(x - 0.5, 2.0) + 1.0;
}

void main() {
  vec4 pos = modelViewMatrix * vec4(position, 1.0);
  pos.xy *= sheerY(uSkewY);

  float dist = length(uMouse.xy - pos.xy);
  float bulgeAmount = 16.2;
  float bulgeRadius = 300.9;
  float falloff = 1.0 - smoothstep(0.0, bulgeRadius, dist);
  float displacement = falloff * bulgeAmount * uCurviness;
  pos.z += displacement;

  float cent = length(pos.xy - uMouse.xy);
  float amp = 1.0 - smoothstep(uRipple, uRipple * 1.5, cent);
  float freq = 7.0;
  float rip = sin(cent * freq + parabola(uRipple)) * amp * 0.025 * parabola(uRipple);
  // float buld = (1.0 - smoothstep(0.0, 0.75, length(pos.xy))) * 1.5 * parabola(uScaleProgress);
  pos.z -= rip;
  // pos.z -= buld;

  gl_Position = projectionMatrix * pos;
  vUv = uv;
}
