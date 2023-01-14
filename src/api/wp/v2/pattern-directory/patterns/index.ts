/* eslint-disable */
import type * as Types from '../../../../@types'

export type Methods = {
  get: {
    query?: {
      /** このリクエストが作成されたスコープ。レスポンスに含まれるフィールドはスコープにより異なります。 */
      context?: view | embed | edit | undefined
      /** 文字列に一致するものに結果を限定します。 */
      search?: string | undefined
      /** カテゴリー ID に一致するものに結果を限定します。 */
      category?: string | undefined
      /** キーワード ID に一致するものに結果を限定します。 */
      keyword?: string | undefined
      /** パターン (スラッグ) に一致するものに結果を限定します。 */
      slug?: string | undefined
    } | undefined

    status: 200
    /** OK */
    resBody: Types.Pattern_directory_item
  }
}
