precision mediump float;

uniform float uTime;
uniform vec2  uResolution;

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;  // 画面サイズに対するUV座標を取得
  uv *= 10.0;  // UV座標を拡大
  uv += uTime * 0.1;  // 時間に応じてUV座標を移動

  float n = 0.0;
  // 複数の層でノイズを重ねる
  for (int i = 0; i < 5; i++) {
      float frequency = pow(2.0, float(i));  // 周波数を2のべき乗で変化させる
      float amplitude = pow(0.5, float(5 - i));  // 振幅を0.5のべき乗で変化させる
      n += amplitude * fract(sin(dot(uv * frequency, vec2(12.9898, 78.233))) * 43758.5453);
  }

  // ノイズの値を0～1の範囲に正規化
  n = clamp(n, 0.0, 1.0);

  // ノイズの値によって色を決定
    vec3 color = vec3(n);  // ノイズの値をカラーに適用
    color *= vec3(1.0, 0.8, 0.2);  // カラーに乗算
    color += vec3(0.1, 0.2, 0.3);  // カラーに加算

    gl_FragColor = vec4(color, .1);
}
