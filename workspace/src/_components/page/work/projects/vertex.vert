precision mediump float;

#pragma glslify: sheerY = require('../../../../_gl/sheer');

varying vec2 vUv;
uniform float u_skewY;
uniform vec2 u_mouse;
uniform float u_curviness;
uniform float u_ripple;
uniform float u_scaleProgress;

float parabola(float x) {
  return -4.0 * pow(x - 0.5, 2.0) + 1.0;
}

void main() {
  vec4 pos = modelViewMatrix * vec4(position, 1.0);
  pos.xy *= sheerY(u_skewY);

  float dist = length(u_mouse.xy - pos.xy);
  float bulgeAmount = 16.2;
  float bulgeRadius = 300.9;
  float falloff = 1.0 - smoothstep(0.0, bulgeRadius, dist);
  float displacement = falloff * bulgeAmount * u_curviness;
  pos.z += displacement;

  float cent = length(pos.xy - u_mouse.xy);
  float amp = 1.0 - smoothstep(u_ripple, u_ripple * 1.5, cent);
  float freq = 7.0;
  float rip = sin(cent * freq + parabola(u_ripple)) * amp * 0.025 * parabola(u_ripple);
  // float buld = (1.0 - smoothstep(0.0, 0.75, length(pos.xy))) * 1.5 * parabola(u_scaleProgress);
  pos.z -= rip;
  // pos.z -= buld;

  gl_Position = projectionMatrix * pos;
  vUv = uv;
}
