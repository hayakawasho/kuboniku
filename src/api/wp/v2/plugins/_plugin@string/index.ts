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
    resBody: Types.Plugin
  }

  post: {
    status: 200
    /** OK */
    resBody: Types.Plugin
    reqFormat: URLSearchParams

    reqBody: {
      /** このリクエストが作成されたスコープ。レスポンスに含まれるフィールドはスコープにより異なります。 */
      context: string
      /** プラグインの有効化ステータス。 */
      status: string
    }
  }

  put: {
    status: 200
    /** OK */
    resBody: Types.Plugin
    reqFormat: URLSearchParams

    reqBody: {
      /** このリクエストが作成されたスコープ。レスポンスに含まれるフィールドはスコープにより異なります。 */
      context: string
      /** プラグインの有効化ステータス。 */
      status: string
    }
  }

  patch: {
    status: 200
    /** OK */
    resBody: Types.Plugin
    reqFormat: URLSearchParams

    reqBody: {
      /** このリクエストが作成されたスコープ。レスポンスに含まれるフィールドはスコープにより異なります。 */
      context: string
      /** プラグインの有効化ステータス。 */
      status: string
    }
  }

  delete: {
    status: 200
    /** OK */
    resBody: Types.Plugin
    reqFormat: URLSearchParams

    reqBody: {
      /** このリクエストが作成されたスコープ。レスポンスに含まれるフィールドはスコープにより異なります。 */
      context: string
    }
  }
}
