precision mediump float;

#pragma glslify: cover = require('../../../_gl/cover');

uniform sampler2D u_texture;

uniform vec2 u_mesh_size;
uniform vec2 u_image_size;
uniform vec2 u_mouse;

uniform float u_alpha;
uniform float u_lightStrength;

varying vec2 vUv;

void main() {
  vec2 uv = vUv;

  float edge = 1. - distance(uv, vec2(0.5)) - 0.3;

  vec2 mouse = u_mouse;
  float circle = 1. - distance(vec2(uv.x, (uv.y - 0.5) * (u_mesh_size.y / u_mesh_size.x) + 0.5), mouse);
  circle = circle * 0.7;
  circle *= edge;
  circle *= u_lightStrength;

  vec2 texCenter = vec2(0.5);
  vec2 texUv = cover(u_mesh_size, u_image_size, uv);
  vec4 tex = texture2D(u_texture, texUv);

  tex.rgb += circle;
  tex.a *= u_alpha;

  gl_FragColor = tex;
}
