/* eslint-disable */
import type * as Types from '../../../../@types'

export type Methods = {
  get: {
    query?: {
      /** このリクエストが作成されたスコープ。レスポンスに含まれるフィールドはスコープにより異なります。 */
      context?: view | embed | edit | undefined
    } | undefined

    status: 200
    /** OK */
    resBody: Types.Wp_template_part
  }

  post: {
    status: 200
    /** OK */
    resBody: Types.Wp_template_part
    reqFormat: URLSearchParams

    reqBody: {
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

  put: {
    status: 200
    /** OK */
    resBody: Types.Wp_template_part
    reqFormat: URLSearchParams

    reqBody: {
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

  patch: {
    status: 200
    /** OK */
    resBody: Types.Wp_template_part
    reqFormat: URLSearchParams

    reqBody: {
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

  delete: {
    status: 200
    /** OK */
    resBody: Types.Wp_template_part
    reqFormat: URLSearchParams

    reqBody: {
      /** ゴミ箱に入れずに強制的に削除するかどうか。 */
      force: boolean
    }
  }
}
