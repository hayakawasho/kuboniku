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
      /** 特定の投稿者に割り当てられた投稿に結果を限定します。 */
      author?: string | undefined
      /** 特定の投稿者が割り当てられた投稿を結果から除外します。 */
      author_exclude?: string | undefined
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
      /** 特定の親 ID に属する項目に結果を限定します。 */
      parent?: string | undefined
      /** 特定の親 ID に属さない項目に結果を限定します。 */
      parent_exclude?: string | undefined
      /** 一つ以上の特定のスラッグを持つ投稿に結果を限定します。 */
      slug?: string | undefined
      /** 一つ以上のステータスが割り当てられた投稿に結果を限定します。 */
      status?: string | undefined
      /** 特定のメディアタイプが割り当てられた添付ファイルに結果を限定します。 */
      media_type?: image | video | text | application | audio | undefined
      /** 特定の MIME タイプが割り当てられた添付ファイルに結果を限定します。 */
      mime_type?: string | undefined
    } | undefined

    status: 200
    /** OK */
    resBody: Types.Attachment
  }

  post: {
    status: 200
    /** OK */
    resBody: Types.Attachment
    reqFormat: URLSearchParams

    reqBody: {
      /** そのタイプに特有な、投稿の英数字識別子。 */
      slug: string
      /** 投稿に対して名前がついているステータス。 */
      status: string
      /** 投稿者の ID。 */
      author: number
      /** 投稿がコメントを受け付けているかどうか。 */
      comment_status: string
      /** 投稿がピンバックを受け付けているかどうか。 */
      ping_status: string
      /** 投稿を表示するために使用するテーマファイル。 */
      template: string
      /** 添付ファイルが表示されないときに表示する代替テキスト。 */
      alt_text: string
      /** 添付ファイルの関連投稿の ID。 */
      post: number
    }
  }
}
