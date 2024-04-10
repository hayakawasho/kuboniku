precision lowp float;
precision lowp int;
#define SHADER_NAME ShaderMaterial
#define GAMMA_FACTOR 2
uniform mat4 viewMatrix;
uniform vec3 cameraPosition;
#define TONE_MAPPING
#ifndef saturate
	#define saturate(a) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
uniform float toneMappingWhitePoint;
vec3 LinearToneMapping( vec3 color ) {
	return toneMappingExposure * color;
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
#define Uncharted2Helper( x ) max( ( ( x * ( 0.15 * x + 0.10 * 0.50 ) + 0.20 * 0.02 ) / ( x * ( 0.15 * x + 0.50 ) + 0.20 * 0.30 ) ) - 0.02 / 0.30, vec3( 0.0 ) )
vec3 Uncharted2ToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( Uncharted2Helper( color ) / Uncharted2Helper( vec3( toneMappingWhitePoint ) ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}

vec3 toneMapping( vec3 color ) { return LinearToneMapping( color ); }

vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 GammaToLinear( in vec4 value, in float gammaFactor ) {
	return vec4( pow( value.xyz, vec3( gammaFactor ) ), value.w );
}
vec4 LinearToGamma( in vec4 value, in float gammaFactor ) {
	return vec4( pow( value.xyz, vec3( 1.0 / gammaFactor ) ), value.w );
}
vec4 sRGBToLinear( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.w );
}
vec4 LinearTosRGB( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.w );
}
vec4 RGBEToLinear( in vec4 value ) {
	return vec4( value.rgb * exp2( value.a * 255.0 - 128.0 ), 1.0 );
}
vec4 LinearToRGBE( in vec4 value ) {
	float maxComponent = max( max( value.r, value.g ), value.b );
	float fExp = clamp( ceil( log2( maxComponent ) ), -128.0, 127.0 );
	return vec4( value.rgb / exp2( fExp ), ( fExp + 128.0 ) / 255.0 );
}
vec4 RGBMToLinear( in vec4 value, in float maxRange ) {
	return vec4( value.xyz * value.w * maxRange, 1.0 );
}
vec4 LinearToRGBM( in vec4 value, in float maxRange ) {
	float maxRGB = max( value.x, max( value.g, value.b ) );
	float M      = clamp( maxRGB / maxRange, 0.0, 1.0 );
	M            = ceil( M * 255.0 ) / 255.0;
	return vec4( value.rgb / ( M * maxRange ), M );
}
vec4 RGBDToLinear( in vec4 value, in float maxRange ) {
	return vec4( value.rgb * ( ( maxRange / 255.0 ) / value.a ), 1.0 );
}
vec4 LinearToRGBD( in vec4 value, in float maxRange ) {
	float maxRGB = max( value.x, max( value.g, value.b ) );
	float D      = max( maxRange / maxRGB, 1.0 );
	D            = min( floor( D ) / 255.0, 1.0 );
	return vec4( value.rgb * ( D * ( 255.0 / maxRange ) ), D );
}
const mat3 cLogLuvM = mat3( 0.2209, 0.3390, 0.4184, 0.1138, 0.6780, 0.7319, 0.0102, 0.1130, 0.2969 );
vec4 LinearToLogLuv( in vec4 value )  {
	vec3 Xp_Y_XYZp = value.rgb * cLogLuvM;
	Xp_Y_XYZp = max(Xp_Y_XYZp, vec3(1e-6, 1e-6, 1e-6));
	vec4 vResult;
	vResult.xy = Xp_Y_XYZp.xy / Xp_Y_XYZp.z;
	float Le = 2.0 * log2(Xp_Y_XYZp.y) + 127.0;
	vResult.w = fract(Le);
	vResult.z = (Le - (floor(vResult.w*255.0))/255.0)/255.0;
	return vResult;
}
const mat3 cLogLuvInverseM = mat3( 6.0014, -2.7008, -1.7996, -1.3320, 3.1029, -5.7721, 0.3008, -1.0882, 5.6268 );
vec4 LogLuvToLinear( in vec4 value ) {
	float Le = value.z * 255.0 + value.w;
	vec3 Xp_Y_XYZp;
	Xp_Y_XYZp.y = exp2((Le - 127.0) / 2.0);
	Xp_Y_XYZp.z = Xp_Y_XYZp.y / value.y;
	Xp_Y_XYZp.x = value.x * Xp_Y_XYZp.z;
	vec3 vRGB = Xp_Y_XYZp.rgb * cLogLuvInverseM;
	return vec4( max(vRGB, 0.0), 1.0 );
}

vec4 mapTexelToLinear( vec4 value ) { return LinearToLinear( value ); }
vec4 envMapTexelToLinear( vec4 value ) { return LinearToLinear( value ); }
vec4 emissiveMapTexelToLinear( vec4 value ) { return LinearToLinear( value ); }
vec4 linearToOutputTexel( vec4 value ) { return LinearToLinear( value ); }


  precision lowp float;

  uniform sampler2D texture;
  uniform sampler2D texture2;

  uniform float time;
  uniform vec2 mousePos;
  uniform vec2 velocity;
  uniform vec2 res;
  uniform vec2 imageSize;
  uniform float intensity;
  uniform float waveSpeed;
  uniform bool isDisplaced;
  uniform bool iOS;
  uniform sampler2D disp;
  uniform float dispFactor;
  uniform float effectFactor;
  uniform float reveal;
  uniform float alpha;

  varying vec2 vUv;
  varying vec3 vecPos;
  varying vec3 vecNormal;

  struct PointLight {
    vec3 color;
    vec3 position;
    float distance;
  };

  uniform PointLight pointLights[2];

  void main() {
    vec4 addedLights = vec4(0.0, 0.0, 0.0, 1.0);

    for (int l = 0; l < 2; l++) {
        vec3 lightDirection = normalize(vecPos - pointLights[l].position);
        addedLights.rgb += clamp(dot(-lightDirection, vecNormal), 0.0, 1.0) * pointLights[l].color * .4;
    }

    vec2 mouse = mousePos / res;
    mouse.y = 1. - mouse.y;
    float dist = distance(mouse + velocity / res, vUv.xy);
    vec4 color = vec4(0.01);
    vec4 tex1 = vec4(0.01);
    vec4 tex2 = vec4(0.01);
    float ratio = clamp(1.0 - dist * 10., 0., 1.);

    vec2 s = res;
    vec2 i = imageSize;

    if(s.x / s.y < 1. && !iOS){
      s.x = res.x / 18.0;
    }

    float rs = s.x / s.y;
    float ri = i.x / i.y;
    // vec2 new = rs < ri ? vec2(i.x, i.y) : vec2(s.x, i.y * s.x / i.x);
    // vec2 offset = (rs < ri ? vec2((new.x - s.x) / 2.0, 0.0) : vec2(0.0, (new.y - s.y) / 2.0)) / new;
    // vec2 uv = vUv * s / new + offset;
    // vec2 new = rs < ri ? vec2(i.x * s.y / i.y, s.y) : vec2(s.x, i.y * s.x / i.x);
    // vec2 offset = (rs < ri ? vec2((new.x - s.x) / 2.0, 0.0) : vec2(0.0, (new.y - s.y) / 2.0)) / new;
    // vec2 uv = vUv * s / new + offset;

    vec2 uv = vUv;

    if (isDisplaced) {
      vec4 disp = texture2D(disp, uv);

      vec2 distortedPosition = vec2(uv.x, uv.y + dispFactor * (disp.r*effectFactor));
      vec2 distortedPosition2 = vec2(uv.x, uv.y - (1.0 - dispFactor) * (disp.r*effectFactor));

      vec4 _texture = texture2D(texture, distortedPosition);
      vec4 _texture2 = texture2D(texture2, distortedPosition2);

      color = mix(_texture, _texture2, dispFactor);
      color.a = 1.;
    } else {
      uv.x -= sin(uv.y) * ratio / 100. * (velocity.x + velocity.y) / 10.;
      uv.y -= sin(uv.x) * ratio / 100. * (velocity.x + velocity.y) / 10.;

      color.r += texture2D(texture, uv).r;

      uv.x -= sin(uv.y) * ratio / 150. * (velocity.x + velocity.y) / 10.;
      uv.y -= sin(uv.x) * ratio / 150. * (velocity.x + velocity.y) / 10.;

      color.g += texture2D(texture, uv).g;

      uv.x -= sin(uv.y) * ratio / 300. * (velocity.x + velocity.y) / 10.;
      uv.y -= sin(uv.x) * ratio / 300. * (velocity.x + velocity.y) / 10.;

      color.b += texture2D(texture, uv).b;

      if (uv.y < reveal) {
        color.a = 1. * alpha;
      } else {
        color.a = 0. * alpha;
      }
    }

    color *= addedLights;

    gl_FragColor = color;
  }
