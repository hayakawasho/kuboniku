#define GLSLIFY 1           // GLSLIFY 1 というマクロを定義しています

varying vec2 vUv;          // テクスチャー座標の情報を受け取る varying 変数を宣言しています

void main(){              // main 関数の始まりを宣言しています
    vUv = uv;             // varying 変数にテクスチャー座標をセットしています
    gl_Position = vec4(position, 1.0);  // 頂点座標に変換行列をかけて、gl_Position 変数にセットしています
}
