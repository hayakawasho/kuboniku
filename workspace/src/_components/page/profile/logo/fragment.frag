precision mediump float;

uniform sampler2D uTexture;
uniform vec2 uMeshSize;
uniform vec2 uImageSize;
uniform float uAlpha;

varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  vec4 tex = texture2D(uTexture, uv);

  tex.a *= uAlpha;
  gl_FragColor = tex;
}
