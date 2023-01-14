/* eslint-disable */
import type * as Types from '../../../@types'

export type Methods = {
  get: {
    query?: {
      /** このリクエストが作成されたスコープ。レスポンスに含まれるフィールドはスコープにより異なります。 */
      context?: view | embed | edit | undefined
      /** 指定した投稿 ID に制限します。 */
      wp_id?: string | undefined
      /** 特定のテンプレートパーツエリアに制限する。 */
      area?: string | undefined
      /** テンプレートを取得する投稿タイプ。 */
      post_type?: string | undefined
    } | undefined

    status: 200
    /** OK */
    resBody: Types.Wp_template
  }

  post: {
    status: 200
    /** OK */
    resBody: Types.Wp_template
    reqFormat: URLSearchParams

    reqBody: {
      /** テンプレートを識別する固有のスラッグ。 */
      slug: string
      /** テンプレートのテーマ固有識別子。 */
      theme?: string | undefined
      /** テンプレートのタイプ */
      type?: string | undefined
      /** テンプレートの説明。 */
      description?: string | undefined
      /** テンプレートの状態。 */
      status?: string | undefined
      /** テンプレートの作成者の ID。 */
      author?: number | undefined
    }
  }
}
