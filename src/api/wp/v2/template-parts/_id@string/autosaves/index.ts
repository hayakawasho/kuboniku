/* eslint-disable */
import type * as Types from '../../../../../@types'

export type Methods = {
  get: {
    query?: {
      /** 親自動保存の ID。 */
      parent?: string | undefined
      /** このリクエストが作成されたスコープ。レスポンスに含まれるフィールドはスコープにより異なります。 */
      context?: view | embed | edit | undefined
    } | undefined

    status: 200
    /** OK */
    resBody: Types.Wp_template_part_revision
  }

  post: {
    status: 200
    /** OK */
    resBody: Types.Wp_template_part_revision
    reqFormat: URLSearchParams

    reqBody: {
      /** 親自動保存の ID。 */
      parent: number
      /** テンプレートを識別する固有のスラッグ。 */
      slug: string
      /** テンプレートのテーマ固有識別子。 */
      theme: string
      /** テンプレートのタイプ */
      type: string
      /** テンプレートの説明。 */
      description: string
      /** テンプレートの状態。 */
      status: string
      /** テンプレートの作成者の ID。 */
      author: number
      /** テンプレートパーツの使用を目的とした場所 (ヘッダー、フッター、など) */
      area: string
    }
  }
}
