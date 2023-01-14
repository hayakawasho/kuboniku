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
      /** 入力された ISO8601 準拠の日付より後に公開された投稿にレスポンスを限定します。 */
      after?: string | undefined
      /** 入力された ISO8601 準拠の日付より後に更新された投稿にレスポンスを限定します。 */
      modified_after?: string | undefined
      /** 入力された ISO8601 準拠の日付より前に公開された投稿にレスポンスを限定します。 */
      before?: string | undefined
      /** 入力された ISO8601 準拠の日付より前に更新された投稿にレスポンスを限定します。 */
      modified_before?: string | undefined
      /** 特定の ID を結果から除外します。 */
      exclude?: string | undefined
      /** 特定の ID に結果を限定します。 */
      include?: string | undefined
      /** 特定の項目数で結果をオフセットします。 */
      offset?: string | undefined
      /** 属性で昇順または降順に並べ替えます。 */
      order?: asc | desc | undefined
      /** 投稿の属性でコレクションを並べ替えます。 */
      orderby?: author | date | id | include | modified | parent | relevance | slug | include_slugs | title | undefined
      /** 一つ以上の特定のスラッグを持つ投稿に結果を限定します。 */
      slug?: string | undefined
      /** 一つ以上のステータスが割り当てられた投稿に結果を限定します。 */
      status?: string | undefined
    } | undefined

    status: 200
    /** OK */
    resBody: Types.Wp_navigation
  }

  post: {
    status: 200
    /** OK */
    resBody: Types.Wp_navigation
    reqFormat: URLSearchParams

    reqBody: {
      /** そのタイプに特有な、投稿の英数字識別子。 */
      slug: string
      /** 投稿に対して名前がついているステータス。 */
      status: string
      /** コンテンツや抜粋へのアクセスを保護するパスワード。 */
      password: string
      /** 投稿を表示するために使用するテーマファイル。 */
      template: string
    }
  }
}
