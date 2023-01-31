/* eslint-disable */
import type * as Types from '../../../@types'

export type Methods = {
  get: {
    query?: {
      /** このリクエストが作成されたスコープ。レスポンスに含まれるフィールドはスコープにより異なります。 */
      context?: view | embed | edit | undefined
      /** 特定の投稿タイプに関連付けられたタクソノミーに結果を制限します。 */
      type?: string | undefined
    } | undefined

    status: 200
    /** OK */
    resBody: Types.Taxonomy
  }
}
