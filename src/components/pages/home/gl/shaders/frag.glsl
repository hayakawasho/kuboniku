precision mediump float;

#pragma glslify: cover = require('../../../../components/Webgl/utils/bgcover.glsl')

uniform sampler2D uTexture;
uniform vec2 uMeshSize;
uniform vec2 uImageSize;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;

  uv = cover(uMeshSize, uImageSize, uv);
  vec4 img = texture2D(uTexture, uv);

  gl_FragColor = vec4(img.rgb, 1.);
}
