precision mediump float;

varying vec2 vUv;
uniform vec2 uImageSize;
uniform float uMaxDistance;
uniform float uMagnitude;
uniform float uProgress;

float q(float t)
{
  float p = 2.0 * t * t;
  return t < 0.5 ? p : -p + (4.0 * t) - 1.0;
}

void main() {
  float distance = length(position.xy);
  float zChange = 0.;

  // if (distance < uMaxDistance) {
    float normalizedDistance = distance / uMaxDistance;

    zChange = q(normalizedDistance);
    zChange = -2. - (zChange);
    zChange *= uMagnitude;
    // zChange *= uProgress;
  // }

  vec3 pos = position;
  pos.z += zChange;

  vUv = uv;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
}
