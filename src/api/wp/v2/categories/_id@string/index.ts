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
    resBody: Types.Category
  }

  post: {
    status: 200
    /** OK */
    resBody: Types.Category
    reqFormat: URLSearchParams

    reqBody: {
      /** タームの HTML の説明。 */
      description: string
      /** タームの HTML タイトル。 */
      name: string
      /** そのタイプに特有な、タームの英数字識別子。 */
      slug: string
      /** 親のターム ID。 */
      parent: number
    }
  }

  put: {
    status: 200
    /** OK */
    resBody: Types.Category
    reqFormat: URLSearchParams

    reqBody: {
      /** タームの HTML の説明。 */
      description: string
      /** タームの HTML タイトル。 */
      name: string
      /** そのタイプに特有な、タームの英数字識別子。 */
      slug: string
      /** 親のターム ID。 */
      parent: number
    }
  }

  patch: {
    status: 200
    /** OK */
    resBody: Types.Category
    reqFormat: URLSearchParams

    reqBody: {
      /** タームの HTML の説明。 */
      description: string
      /** タームの HTML タイトル。 */
      name: string
      /** そのタイプに特有な、タームの英数字識別子。 */
      slug: string
      /** 親のターム ID。 */
      parent: number
    }
  }

  delete: {
    status: 200
    /** OK */
    resBody: Types.Category
    reqFormat: URLSearchParams

    reqBody: {
      /** タームがゴミ箱機能に対応していないため、true でなければなりません。 */
      force: boolean
    }
  }
}
