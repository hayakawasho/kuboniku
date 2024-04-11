precision mediump float;

#pragma glslify: cover = require('../../../_gl/cover');

uniform sampler2D u_texture;
uniform vec2 u_mesh_size;
uniform vec2 u_image_size;

varying vec2 vUv;

void main() {
  vec2 uv = vUv;

  vec2 texUv = cover(u_mesh_size, u_image_size, uv);
  vec4 tex = texture2D(u_texture, texUv);

  gl_FragColor = tex;
}
