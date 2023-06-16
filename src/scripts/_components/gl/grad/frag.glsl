precision mediump float;

// uniform vec2  m;       // mouse
uniform float uTime;
uniform vec2  uResolution;
uniform vec3 uColor;
// uniform sampler2D smp; // prev scene

void main(void) {
  const vec4 color1 = vec4(0.09019607843137255, 0.5764705882352941, 0.6627450980392157, 1.0); // 下
  const vec4 color2 = vec4(0.0, 0.0, 0.0, 0.0); // 上

  float percent = 1.0 - (gl_FragCoord.y / uResolution.y);

  gl_FragColor = color1 * percent + color2 * (1.0 - percent);
}
