precision mediump float;

#pragma glslify: cover = require('../../../../_gl/cover');
#pragma glslify: MONO_CHROME_RGB = require('../../../../_gl/monochome');

uniform sampler2D u_texture;
uniform vec2 u_mesh_size;
uniform vec2 u_image_size;
uniform float u_alpha;

varying vec2 vUv;

void main() {
  vec2 uv = vUv;

  vec2 texUv = cover(u_mesh_size, u_image_size, uv);
  vec4 tex = texture2D(u_texture, texUv);

  float grayScale = dot(tex.rgb, MONO_CHROME_RGB);
  tex = vec4(vec3(grayScale), 1.0);
  tex.a *= u_alpha;

  gl_FragColor = tex;
}
