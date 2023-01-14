/* eslint-disable */
import type * as Types from '../../../../../@types'

export type Methods = {
  get: {
    query?: {
      /** このリクエストが作成されたスコープ。レスポンスに含まれるフィールドはスコープにより異なります。 */
      context?: view | embed | edit | undefined
      /** コレクションの現在のページ。 */
      page?: string | undefined
      /** 結果として返される項目の最大数。 */
      per_page?: string | undefined
      /** 文字列に一致するものに結果を限定します。 */
      search?: string | undefined
      /** 特定の ID を結果から除外します。 */
      exclude?: string | undefined
      /** 特定の ID に結果を限定します。 */
      include?: string | undefined
      /** 特定の項目数で結果をオフセットします。 */
      offset?: string | undefined
      /** 属性で昇順または降順に並べ替えます。 */
      order?: asc | desc | undefined
      /** オブジェクト属性でコレクションを並び替えます。 */
      orderby?: date | id | include | relevance | slug | include_slugs | title | undefined
    } | undefined

    status: 200
    /** OK */
    resBody: Types.Wp_template_part_revision
  }
}
