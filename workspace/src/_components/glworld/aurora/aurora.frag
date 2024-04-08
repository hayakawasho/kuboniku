precision mediump float;

#pragma glslify: cnoise3 = require('glsl-noise/classic/3d');
#pragma glslify: snoise3 = require('glsl-noise/simplex/3d');

uniform vec2 u_resolution;
uniform float u_time;
uniform vec3 u_color1;
uniform vec3 u_color2;
uniform vec3 u_color3;
uniform vec3 u_color4;
uniform vec2 u_noiseIntensity;
uniform vec2 u_noiseScale;
uniform vec2 u_lightness;

varying vec2 vUv;

void main () {
  vec2 st = vUv;
  float time = u_time;

  st -= 0.5;
  st -= time * 0.1;

  vec2 aspect = u_resolution / min(u_resolution.x, u_resolution.y);
  st *= aspect;

  float noise1 = snoise3(vec3(st * 1.0 * u_noiseScale.x, time) + 0.1 + time * 0.05) * .25 + .1;
  float noise2 = snoise3(vec3(st * 2.0 * u_noiseScale.y, time) + 0.1 + time * 0.05) * .25 + .1;
  float noise3 = snoise3(vec3(st * 2.0 * u_noiseScale.y, time) + 0.2 + time * 0.02) * .25 + .1;

  vec3 color1 = mix(u_color4, u_color3, noise1);
  vec3 color2 = mix(u_color1, u_color2, noise2);
  vec3 color = mix(color1, color2, noise3);

  vec3 _color = pow(color * 1.2, vec3(1.15));
  color = pow(color * 1.1, vec3(1.25));

  // color = pow(color, vec3(1.2));
  color *= u_lightness.x;

  color = mix(_color, color, u_lightness.y);

  gl_FragColor = vec4(color, 1.0);
}
