/* eslint-disable */
import type * as Types from '../../../@types'

export type Methods = {
  get: {
    query?: {
      /** このリクエストが作成されたスコープ。レスポンスに含まれるフィールドはスコープにより異なります。 */
      context?: view | embed | edit | undefined
      /** ブロック名前空間。 */
      namespace?: string | undefined
    } | undefined

    status: 200
    /** OK */
    resBody: Types.Block_type
  }
}
