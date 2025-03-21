float rect( in vec2 _st, in vec2 _size ) {
  _size = vec2( 0.5 ) - _size * 0.5;
  vec2 uv = smoothstep( _size, _size + vec2( 0.001 ), _st );
  uv *= smoothstep( _size, _size + vec2( 0.001 ), vec2( 1.0 ) - _st );

  return uv.x * uv.y;
}

#pragma glslify: export(rect)
