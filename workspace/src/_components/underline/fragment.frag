precision mediump float;

uniform vec3 uColor;
uniform float uProgress;
uniform float uVelo;
uniform float uBend;
uniform vec2 uMouse;

varying vec2 vUv;

void main() {
  vec2 uv = vUv;

  float t = step(uv.x, uProgress);

  vec4 a = vec4(0., 0., 0., 0);
  vec4 b = vec4(uColor, 1.);
  vec4 color = mix(a, b, t);

  if (color.a < 0.0001) discard;

  gl_FragColor = color;
}
