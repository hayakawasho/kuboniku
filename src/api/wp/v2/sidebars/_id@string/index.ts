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
    resBody: Types.Sidebar
  }

  post: {
    status: 200
    /** OK */
    resBody: Types.Sidebar
    reqFormat: URLSearchParams

    reqBody: {
    }
  }

  put: {
    status: 200
    /** OK */
    resBody: Types.Sidebar
    reqFormat: URLSearchParams

    reqBody: {
    }
  }

  patch: {
    status: 200
    /** OK */
    resBody: Types.Sidebar
    reqFormat: URLSearchParams

    reqBody: {
    }
  }
}
