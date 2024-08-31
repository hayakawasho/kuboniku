precision mediump float;

uniform sampler2D uNoiseTex;
uniform float uAlpha;

varying vec2 vUv;

void main() {
  vec2 uv = vUv;

  vec4 noise = texture2D(uNoiseTex, uv);
  noise.a = uAlpha;

  gl_FragColor = noise;
}
