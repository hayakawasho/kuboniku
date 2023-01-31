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
    resBody: Types.Nav_menu
  }

  post: {
    status: 200
    /** OK */
    resBody: Types.Nav_menu
    reqFormat: URLSearchParams

    reqBody: {
      /** タームの HTML の説明。 */
      description: string
      /** タームの HTML タイトル。 */
      name: string
      /** そのタイプに特有な、タームの英数字識別子。 */
      slug: string
      /** 自動的にトップレベルのページをこのメニューに追加するかどうか。 */
      auto_add: boolean
    }
  }

  put: {
    status: 200
    /** OK */
    resBody: Types.Nav_menu
    reqFormat: URLSearchParams

    reqBody: {
      /** タームの HTML の説明。 */
      description: string
      /** タームの HTML タイトル。 */
      name: string
      /** そのタイプに特有な、タームの英数字識別子。 */
      slug: string
      /** 自動的にトップレベルのページをこのメニューに追加するかどうか。 */
      auto_add: boolean
    }
  }

  patch: {
    status: 200
    /** OK */
    resBody: Types.Nav_menu
    reqFormat: URLSearchParams

    reqBody: {
      /** タームの HTML の説明。 */
      description: string
      /** タームの HTML タイトル。 */
      name: string
      /** そのタイプに特有な、タームの英数字識別子。 */
      slug: string
      /** 自動的にトップレベルのページをこのメニューに追加するかどうか。 */
      auto_add: boolean
    }
  }

  delete: {
    status: 200
    /** OK */
    resBody: Types.Nav_menu
    reqFormat: URLSearchParams

    reqBody: {
      /** タームがゴミ箱機能に対応していないため、true でなければなりません。 */
      force: boolean
    }
  }
}
