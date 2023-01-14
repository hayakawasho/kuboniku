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
    resBody: Types.Wp_block_revision
  }

  delete: {
    status: 200
    /** OK */
    resBody: Types.Wp_block_revision
    reqFormat: URLSearchParams

    reqBody: {
      /** リビジョンがゴミ箱機能に対応していないため、true でなければなりません。 */
      force: boolean
    }
  }
}
