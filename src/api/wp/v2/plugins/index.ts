/* eslint-disable */
import type * as Types from '../../../@types'

export type Methods = {
  get: {
    query?: {
      /** このリクエストが作成されたスコープ。レスポンスに含まれるフィールドはスコープにより異なります。 */
      context?: view | embed | edit | undefined
      /** 文字列に一致するものに結果を限定します。 */
      search?: string | undefined
      /** 指定したステータスに一致するプラグインのみに結果を制限します。 */
      status?: string | undefined
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
      /** WordPress.org プラグインディレクトリのスラッグ。 */
      slug: string
      /** プラグインの有効化ステータス。 */
      status?: string | undefined
    }
  }
}
