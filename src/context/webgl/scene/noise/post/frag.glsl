precision highp float;

#pragma glslify: PI = require('../../../../webgl/utils/PI.glsl')
#pragma glslify: random2d = require('../../../../webgl/utils/random2d.glsl')
#pragma glslify: circle = require('../../../../webgl/utils/circle.glsl')
#pragma glslify: rect = require('../../../../webgl/utils/rect.glsl')

uniform sampler2D uSamplerOut;
uniform sampler2D uSamplerIn;
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
  vec2 uv2 = -1. + 1. * gl_FragCoord.xy / uResolution.xy;
  uv2.x *= uResolution.x / uResolution.y;

  vec4 visualIn = texture2D(uSamplerIn, vUv);
  vec4 visualOut = texture2D(uSamplerOut, vUv);

  vec2 coord = vec2(0.);

  if (uActiveClouds == 1.) {
    coord = vec2(.2, -.5);
    visualIn.rgb += circle(uCol, uRad * 1.25, uBlur, coord, uv2) * (uAlpha * .75);
    visualOut.rgb += circle(uCol, uRad * 1.25, uBlur, coord, uv2) * (uAlpha * .75);

    coord = vec2( -2., .1);
    visualIn.rgb += circle( uCol, uRad * 2., uBlur, coord, uv2 ) * ( uAlpha * 1.);
    visualOut.rgb += circle( uCol, uRad * 2., uBlur, coord, uv2 ) * ( uAlpha * 1.);
  }

  vec3 mask = vec3(0.);
  float mixf = clamp(mask.r, 0.0, .0);

  vec3 color = mix(visualOut, visualIn, mixf).rgb;

  if (uActiveNoise == 1.) {
    float b = random2d(vUv * 200.0 + uTime);
    color += b * uAmount;
  }

  gl_FragColor = vec4(color, 1.0);
}
