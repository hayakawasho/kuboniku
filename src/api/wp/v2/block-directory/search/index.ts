/* eslint-disable */
import type * as Types from '../../../../@types'

export type Methods = {
  get: {
    query: {
      /** このリクエストが作成されたスコープ。レスポンスに含まれるフィールドはスコープにより異なります。 */
      context?: view | undefined
      /** コレクションの現在のページ。 */
      page?: string | undefined
      /** 結果として返される項目の最大数。 */
      per_page?: string | undefined
      /** 検索キーワードに一致するブロックのみに結果を制限します。 */
      term: string
    }

    status: 200
    /** OK */
    resBody: Types.Block_directory_item
  }
}
