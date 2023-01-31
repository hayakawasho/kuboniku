/* eslint-disable */
import type * as Types from '../../../@types'

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
      /** 属性で昇順または降順に並べ替えます。 */
      order?: asc | desc | undefined
      /** タームの属性でコレクションを並べ替えます。 */
      orderby?: id | include | name | slug | include_slugs | term_group | description | count | undefined
      /** どの投稿にも割り当てられていないタームを非表示にするかどうか。 */
      hide_empty?: string | undefined
      /** 特定の親に割り当てられたタームに結果を限定します。 */
      parent?: string | undefined
      /** 特定の投稿に割り当てられたタームに結果を限定します。 */
      post?: string | undefined
      /** 一つ以上の特定のスラッグを持つタームに結果を限定します。 */
      slug?: string | undefined
    } | undefined

    status: 200
    /** OK */
    resBody: Types.Category
  }

  post: {
    status: 200
    /** OK */
    resBody: Types.Category
    reqFormat: URLSearchParams

    reqBody: {
      /** タームの HTML の説明。 */
      description?: string | undefined
      /** タームの HTML タイトル。 */
      name: string
      /** そのタイプに特有な、タームの英数字識別子。 */
      slug?: string | undefined
      /** 親のターム ID。 */
      parent?: number | undefined
    }
  }
}
