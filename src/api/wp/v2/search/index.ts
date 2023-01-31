/* eslint-disable */
import type * as Types from '../../../@types'

export type Methods = {
  get: {
    query?: {
      /** このリクエストが作成されたスコープ。レスポンスに含まれるフィールドはスコープにより異なります。 */
      context?: view | embed | undefined
      /** コレクションの現在のページ。 */
      page?: string | undefined
      /** 結果として返される項目の最大数。 */
      per_page?: string | undefined
      /** 文字列に一致するものに結果を限定します。 */
      search?: string | undefined
      /** オブジェクトタイプのアイテムの結果を制限します。 */
      type?: post | term | post-format | undefined
      /** 1つ以上のオブジェクトサブタイプのアイテムの結果を制限します。 */
      subtype?: string | undefined
    } | undefined

    status: 200
    /** OK */
    resBody: Types.Search_result
  }
}
