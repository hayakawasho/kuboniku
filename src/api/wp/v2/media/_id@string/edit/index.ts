/* eslint-disable */
export type Methods = {
  post: {
    status: 200
    reqFormat: URLSearchParams

    reqBody: {
      /** 編集された画像ファイルの URL。 */
      src: string
      /** 回転する画像の時計回りの角度。非推奨: 代わりに `modifiers` を使用してください。 */
      rotation?: number | undefined
      /** 元の画像に対する、切り抜く開始位置の x 座標のパーセント指定。非推奨: 代わりに `modifiers` を使用してください。 */
      x?: number | undefined
      /** 元の画像に対する、切り抜く開始位置の y 座標のパーセント指定。非推奨: 代わりに `modifiers` を使用してください。 */
      y?: number | undefined
      /** 元の画像に対する、切り抜く画像の幅のパーセント指定。非推奨: 代わりに `modifiers` を使用してください。 */
      width?: number | undefined
      /** 元の画像に対する、切り抜く画像の高さのパーセント指定。非推奨: 代わりに `modifiers` を使用してください。 */
      height?: number | undefined
    }
  }
}
