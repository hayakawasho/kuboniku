/* eslint-disable */
import type * as Types from '../../../../../../@types'

export type Methods = {
  get: {
    query?: {
      /** このリクエストが作成されたスコープ。レスポンスに含まれるフィールドはスコープにより異なります。 */
      context?: view | embed | edit | undefined
    } | undefined

    status: 200
    /** OK */
    resBody: Types.Application_password
  }

  post: {
    status: 200
    /** OK */
    resBody: Types.Application_password
    reqFormat: URLSearchParams

    reqBody: {
      /** アプリケーションが提供した固有識別用 UUID。UUID v5を URL または DNS の名前空間と共に使うことをおすすめします。 */
      app_id: string
      /** アプリケーションパスワードの名称。 */
      name: string
    }
  }

  put: {
    status: 200
    /** OK */
    resBody: Types.Application_password
    reqFormat: URLSearchParams

    reqBody: {
      /** アプリケーションが提供した固有識別用 UUID。UUID v5を URL または DNS の名前空間と共に使うことをおすすめします。 */
      app_id: string
      /** アプリケーションパスワードの名称。 */
      name: string
    }
  }

  patch: {
    status: 200
    /** OK */
    resBody: Types.Application_password
    reqFormat: URLSearchParams

    reqBody: {
      /** アプリケーションが提供した固有識別用 UUID。UUID v5を URL または DNS の名前空間と共に使うことをおすすめします。 */
      app_id: string
      /** アプリケーションパスワードの名称。 */
      name: string
    }
  }

  delete: {
    status: 200
    /** OK */
    resBody: Types.Application_password
  }
}
