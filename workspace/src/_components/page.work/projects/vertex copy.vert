#define PI 3.1415926535897932384626433832795

precision highp float;
#define GLSLIFY 1

uniform vec2 uMouse;
uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uRealSize;
uniform vec4 uCorners;
uniform float uStrength;
uniform float uOpacity;
uniform float uYScale;
uniform vec2 uPlaneSizes;
uniform float uYBottom;

attribute float aDirection;
attribute float aPress;

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;

void main() {
    vec4 newPosition = (modelViewMatrix) * vec4(position, 1.);
    newPosition.z += sin(newPosition.x / uResolution.y * PI + PI / 2.) * (((1. - uOpacity) * -12.) + uStrength * -24.) / 10000.;

    vec4 bigstate = modelViewMatrix * vec4(position, 1.);
    bigstate.x *= uRealSize.x * 1. / uRealSize.x;
    bigstate.y *= uRealSize.y  * 1. / uRealSize.y;

    float cornerProgress = mix(mix(uCorners.x, uCorners.y, newPosition.x), mix(uCorners.z, uCorners.w, newPosition.y), newPosition.y);
    float sine = sin(PI * cornerProgress);
    float waves = sine * .1 * sin(12. * length(uv) + sin(uTime * 0.00002) + 6. * cornerProgress);

    vec4 finalState = mix(newPosition, bigstate, cornerProgress + waves);

    vUv = uv;
    finalState.y = mix(uYBottom, finalState.y, uYScale);

    gl_Position = projectionMatrix * finalState;
}
