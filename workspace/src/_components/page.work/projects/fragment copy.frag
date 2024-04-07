#define PI 3.141592653589793
#define PR 2.0
precision highp int;
precision highp float;

varying vec2 vUv;

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

uniform sampler2D tDiffuse1;
uniform sampler2D tDiffuse2;
uniform sampler2D tDiffuse3;

uniform vec2 uMeshResolution;
uniform vec2 uOffset;
uniform vec2 uScale;
uniform vec2 uRatio;
uniform float uAlpha;

// uniform float uScrollEffect;
// uniform float uDragEffect;
// uniform float uHoverEffect;
// uniform float uSlideEffect;

void main() {
	vec2 uv = vUv;

	vec2 mouse = vec2((mouse.x / resolution.x) * 2.0 - 1.0, -(mouse.y / resolution.y) * 2.0 + 1.0);

	vec2 ratio = vec2(
		min( ( uMeshResolution.x / uMeshResolution.y ) / ( uRatio.x / uRatio.y ), 1.0 ),
		min( ( uMeshResolution.y / uMeshResolution.x ) / ( uRatio.y / uRatio.x ), 1.0 )
	);

	vec2 coverUv = vec2(
		( uv.x * ratio.x + ( 1.0 - ratio.x ) * 0.5 ),
		( uv.y * ratio.y + ( 1.0 - ratio.y ) * 0.5 )
	);

	vec2 scale = vec2(uScale.x - 1.0, uScale.y - 1.0) + ( 0.1 - uAlpha * 0.1 );
	vec2 offset = vec2(
		coverUv.x - ( coverUv.x * scale.x ) + ( scale.x * 0.5 ) + uOffset.x,
		coverUv.y - ( coverUv.y * scale.y ) + ( scale.y * 0.5 ) + uOffset.y
	);
	vec2 pos = vec2(offset.x, offset.y);

	if ( pos.x > 1.0 ) { pos.x =  2.0 - offset.x; }
	if ( pos.x < 0.0 ) { pos.x = -1.0 * offset.x; }
	if ( pos.y > 1.0 ) { pos.y =  2.0 - offset.y; }
	if ( pos.y < 0.0 ) { pos.y = -1.0 * offset.y; }

	vec2 uvDisplaced = vec2(pos.x, pos.y);
	vec4 finalColor = texture2D(tDiffuse1, uvDisplaced);

	vec4 bgColor =  vec4(1.0, 1.0, 1.0, 0.0);

	if ( uAlpha == 0.0 ) {
		gl_FragColor = bgColor;
	} else {
		gl_FragColor = mix(bgColor, vec4(finalColor.rgb, uAlpha), uAlpha);
	}
}
