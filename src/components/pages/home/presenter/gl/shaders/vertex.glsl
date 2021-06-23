uniform float u_scroll;
varying vec2 vUv;
uniform float u_maxDistance;
uniform float u_magnitude;
uniform float u_progress;

float q(float t) {
  float p = 2.0 * t * t;
  return t < 0.5 ? p : -p + (4.0 * t) - 1.0;
}

void main() {
  float distance = length(position.xy);
  float zChange = 0.;
  float xChange = 0.;

  if (distance < u_maxDistance) {
    float normalizedDistance = distance / u_maxDistance;

    zChange = q(normalizedDistance);
    zChange = -1. - (zChange);
    zChange *= u_magnitude;
    zChange *= u_progress;

    xChange = q(-distance);
    xChange = (xChange * .05);
    xChange *= u_magnitude;
    xChange *= u_progress;
  }

  vec3 pos = vec3(position.x, position.y, position.z);
  pos.x += xChange * .5;
  pos.z += zChange;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);

  vUv = uv;
}
