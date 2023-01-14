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
      /** 入力された ISO8601 準拠の日付より後に公開されたコメントにレスポンスを限定します。 */
      after?: string | undefined
      /** 特定のユーザー ID が割り当てられたコメントに結果を限定します。認証が必要です。 */
      author?: string | undefined
      /** 特定のユーザー ID が割り当てられたコメントを結果から除外します。認証が必要です。 */
      author_exclude?: string | undefined
      /** 特定の投稿者のメールからのものに結果を限定します。認証が必要です。 */
      author_email?: string | undefined
      /** 入力された ISO8601 準拠の日付より前に公開されたコメントにレスポンスを限定します。 */
      before?: string | undefined
      /** 特定の ID を結果から除外します。 */
      exclude?: string | undefined
      /** 特定の ID に結果を限定します。 */
      include?: string | undefined
      /** 特定の項目数で結果をオフセットします。 */
      offset?: string | undefined
      /** 属性で昇順または降順に並べ替えます。 */
      order?: asc | desc | undefined
      /** コメントの属性でコレクションを並べ替えます。 */
      orderby?: date | date_gmt | id | include | post | parent | type | undefined
      /** 特定の親 ID に属するコメントに結果を限定します。 */
      parent?: string | undefined
      /** 特定の親 ID を結果から除外します。 */
      parent_exclude?: string | undefined
      /** 特定の投稿 ID に割り当てられたコメントに結果を限定します。 */
      post?: string | undefined
      /** 特定のステータスが割り当てられたコメントに結果を限定します。認証が必要です。 */
      status?: string | undefined
      /** 特定のタイプが割り当てられたコメントに結果を限定します。認証が必要です。 */
      type?: string | undefined
      /** パスワードで保護されている場合の投稿のパスワード。 */
      password?: string | undefined
    } | undefined

    status: 200
    /** OK */
    resBody: Types.Comment
  }

  post: {
    status: 200
    /** OK */
    resBody: Types.Comment
    reqFormat: URLSearchParams

    reqBody: {
      /** 投稿者がユーザーだった場合の、ユーザーオブジェクトの ID。 */
      author: number
      /** コメント投稿者のメールアドレス。 */
      author_email: string
      /** コメント投稿者の IP アドレス。 */
      author_ip: string
      /** コメント作成者の名前を表示します。 */
      author_name: string
      /** コメント投稿者の URL。 */
      author_url: string
      /** コメント投稿者のユーザーエージェント。 */
      author_user_agent: string
      /** コメントの公開日 (サイトのタイムゾーン)。 */
      date: string
      /** コメントの公開日 (GMT)。 */
      date_gmt: string
      /** 親コメントの ID。 */
      parent: number
      /** 関連投稿オブジェクトの ID。 */
      post: number
      /** コメントのステータス。 */
      status: string
    }
  }
}
