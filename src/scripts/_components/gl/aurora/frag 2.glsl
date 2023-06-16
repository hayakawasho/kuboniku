
// テクスチャと解像度を定義
uniform sampler2D uAuroraTex;
uniform vec2 uRes;

// 頂点シェーダから渡されたUV座標
varying vec2 vUv;

// 2Dランダムノイズ関数
float random(in vec2 _st_1540259130) {
  return fract(sin(dot(_st_1540259130.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {
  // 画面のアスペクト比を計算
  vec2 aspect = uRes / max(uRes.x, uRes.y);

  // UV座標をアスペクト比で正規化
  vec2 st = (gl_FragCoord.xy / uRes) / aspect;

  // テクスチャからピクセルの色を取得
  vec3 color = texture2D(uAuroraTex, vUv).rgb;

  // ランダムノイズを加える
  float wn = random(st);
  color = mix(color * color, color, wn * 0.5 + 0.5);

  // 出力する色を設定
  gl_FragColor = vec4(color, 1.0);
}
