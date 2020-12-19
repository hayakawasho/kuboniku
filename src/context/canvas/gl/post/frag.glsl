precision highp float;

#pragma glslify: PI = require('../_utils/PI.glsl')
#pragma glslify: random2d = require('../_utils/random2d.glsl')
#pragma glslify: circle = require('../_utils/circle.glsl')
#pragma glslify: rect = require('../_utils/rect.glsl')

uniform sampler2D uSamplerOut;
uniform sampler2D uSamplerIn;
uniform sampler2D uSampler;
uniform float uActiveClouds;
uniform float uActiveNoise;
uniform vec2 uResolution;
uniform float uAmount;
uniform float uAlpha;
uniform float uBlur;
uniform float uTime;
uniform float uRad;
uniform vec3 uCol;

varying vec2 vUv;

void main() {

  vec2 uv2 = -1.0 + 2.0 * gl_FragCoord.xy / uResolution.xy;
  uv2.x *= uResolution.x / uResolution.y;

  vec4 visualIn = texture2D(uSamplerIn, vUv);
  vec4 visualOut = texture2D(uSamplerOut, vUv);
  vec4 visual = texture2D(uSampler, vUv);

  vec2 coord = vec2(0.);

  // if (uActiveClouds == 1. && deskscreen) {
    if (uActiveClouds == 1.) {

    float amplitude = 0.;
    float period = 10.;

    amplitude = .25;
    coord = vec2(.75, -.65);
    coord.x = coord.x + amplitude * cos((uTime) * 1.0 * PI / period);
    coord.y = coord.y + amplitude * sin((uTime) * 2.0 * PI / period);
    visualIn.rgb += circle(uCol, uRad * 1.35, uBlur, coord, uv2) * (uAlpha * 1.35);
    visualOut.rgb += circle(uCol, uRad * 1.35, uBlur, coord, uv2) * (uAlpha * 1.35);

    amplitude = .15;
    coord = vec2(-.5, -1.25);
    coord.x = coord.x - amplitude * cos((uTime) * 2.0 * PI / period);
    coord.y = coord.y - amplitude * sin((uTime) * 1.0 * PI / period);
    visualIn.rgb += circle(uCol, uRad * 1.35, uBlur, coord, uv2) * (uAlpha * 1.25);
    visualOut.rgb += circle(uCol, uRad * 1.35, uBlur, coord, uv2) * (uAlpha * 1.25);

    amplitude = -.125;
    coord = vec2(-1.5, 1.15);
    coord.x = coord.x + amplitude * cos((uTime) * 1.0 * PI / period);
    coord.y = coord.y + amplitude * sin((uTime) * 2.0 * PI / period);
    visualIn.rgb += circle(uCol, uRad * 2., uBlur, coord, uv2) * (uAlpha * 1.);
    visualOut.rgb += circle(uCol, uRad * 2., uBlur, coord, uv2) * (uAlpha * 1.);
  }

  vec3 mask = vec3(0.);

  float mixf = clamp(mask.r, 0.0, .0);

  vec3 color = mix(visualOut, visualIn, mixf).rgb;

  if (uActiveNoise == 1.) {
    float b = random2d(vUv * 200.0 + uTime) - 0.5;
    color += b * uAmount;
  }

  gl_FragColor = vec4(color, 1.0);
}
