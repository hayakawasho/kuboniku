precision mediump float;

#pragma glslify: cover = require('../../../../_foundation/gl/cover');
#pragma glslify: MONO_CHROME_RGB = require('../../../../_foundation/gl/monochome');

uniform sampler2D uTexture;
uniform vec2 uMeshSize;
uniform vec2 uImageSize;
uniform float uAlpha;

varying vec2 vUv;

void main() {
  vec2 uv = vUv;

  vec2 texCenter = vec2(0.5);
  vec2 texUv = cover(uMeshSize, uImageSize, uv);
  vec4 tex = texture2D(uTexture, texUv);

  float grayScale = dot(tex.rgb, MONO_CHROME_RGB);
  tex = vec4(vec3(grayScale), 1.0);
  tex.a *= uAlpha;

  gl_FragColor = tex;
}
