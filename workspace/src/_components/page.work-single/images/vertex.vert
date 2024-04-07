precision lowp float;
precision lowp int;
#define SHADER_NAME ShaderMaterial
#define VERTEX_TEXTURES
#define GAMMA_FACTOR 2
#define MAX_BONES 0
#define BONE_TEXTURE
uniform mat4 modelMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat3 normalMatrix;
uniform vec3 cameraPosition;
attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;
#ifdef USE_COLOR
	attribute vec3 color;
#endif
#ifdef USE_MORPHTARGETS
	attribute vec3 morphTarget0;
	attribute vec3 morphTarget1;
	attribute vec3 morphTarget2;
	attribute vec3 morphTarget3;
	#ifdef USE_MORPHNORMALS
		attribute vec3 morphNormal0;
		attribute vec3 morphNormal1;
		attribute vec3 morphNormal2;
		attribute vec3 morphNormal3;
	#else
		attribute vec3 morphTarget4;
		attribute vec3 morphTarget5;
		attribute vec3 morphTarget6;
		attribute vec3 morphTarget7;
	#endif
#endif
#ifdef USE_SKINNING
	attribute vec4 skinIndex;
	attribute vec4 skinWeight;
#endif

precision lowp float;

  uniform float time;
  uniform vec2 mousePos;
  uniform float intensity;
  uniform float frequency;
  uniform float offsetZ;
  uniform float deltaZ;
  uniform float offset;
  uniform float waveSpeed;
  uniform float waveIntensity;

  varying vec2 vUv;
  varying vec3 vecPos;
  varying vec3 vecNormal;

  void main() {
    vUv = uv;
    vecPos = (modelViewMatrix * vec4(position, 1.0)).xyz;
    vecNormal = (modelViewMatrix * vec4(normal, 0.0)).xyz;
    vec2 mouse = mousePos.xy;

    vec3 pos = position;

    float dist = distance(vec2(0.5), pos.xy);

    pos.y += (cos(pos.x + time * 2.) / 50.) * intensity;
    pos.x += (cos(pos.y + time) / 50.) * intensity;
    pos.z += ((cos(pos.x * frequency + offset)) * offsetZ + deltaZ) * intensity;
    pos.z += ((cos(pos.y * frequency + offset)) * offsetZ + deltaZ)  * intensity;
    pos.z += sin(dist * 3. - time * waveSpeed) / dist * waveIntensity;

    gl_Position = projectionMatrix *
                  modelViewMatrix *
                  vec4(pos,1.0);
  }
