precision mediump float;

#pragma glslify: simplex3d = require('glsl-noise/simplex/3d');

uniform vec2 uResolution;
uniform float uTime;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec3 uColor4;
uniform vec2 uNoiseIntensity;
uniform vec2 uNoiseScale;
uniform vec2 uLightness;

varying vec2 vUv;

void main () {
  vec2 st = vUv;
  float time = uTime;

  st -= 0.5;
  st -= time * 0.1;

  vec2 aspect = uResolution / min(uResolution.x, uResolution.y);
  st *= aspect;

  float noise1 = simplex3d(vec3(st * 1.0 * uNoiseScale.x, time) + 0.1 + time * 0.05) * 0.5 + 0.5;
  float noise2 = simplex3d(vec3(st * 2.0 * uNoiseScale.y, time) + 0.1 + time * 0.05) * 0.5 + 0.5;
  float noise3 = simplex3d(vec3(st * 2.0 * uNoiseScale.y, time) + 0.4 + time * 0.02) * 0.5 + 0.5;

  vec3 color1 = mix(uColor4, uColor3, noise1);
  vec3 color2 = mix(uColor1, uColor2, noise2);
  vec3 color = mix(color1, color2, noise3 * noise3);

  vec3 _color = pow(color * 1.4, vec3(1.3));
  color = pow(color * 1.2, vec3(1.5));

  // color = pow(color, vec3(1.5));
  color *= uLightness.x;

  color = mix(_color, color, uLightness.y);

  gl_FragColor = vec4(color, 1.0);
}
