precision mediump float;

uniform sampler2D u_texture;
uniform vec2 u_mesh_size;
uniform vec2 u_image_size;

varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  vec4 tex = texture2D(u_texture, uv);
  gl_FragColor = tex;
}
