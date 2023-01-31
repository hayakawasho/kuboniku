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
      /** 一つ以上の特定のスラッグを持つ投稿に結果を限定します。 */
      slug?: string | undefined
      /** 一つ以上のステータスが割り当てられた投稿に結果を限定します。 */
      status?: string | undefined
      /** 結果セットを複数のタクソノミー間の関係に基づいて限定します。 */
      tax_relation?: AND | OR | undefined

      /** 「categories」タクソノミーに割り当てられた特定のタームを持つ項目に結果を限定します。 */
      categories?: number[] | {
        /** ターム ID。 */
        terms?: number[] | undefined
        /** 結果を限定したタームに子タームを含めるかどうか。 */
        include_children?: boolean | undefined
        /** 特定のタームのすべてに項目を割り当てるか、一部に割り当てるか。 */
        operator?: 'AND' | 'OR' | undefined
      } | undefined

      /** 「categories」タクソノミーに割り当てられた特定のタームを持つ項目以外に結果を限定します。 */
      categories_exclude?: number[] | {
        /** ターム ID。 */
        terms?: number[] | undefined
        /** 結果を限定したタームに子タームを含めるかどうか。 */
        include_children?: boolean | undefined
      } | undefined

      /** 「tags」タクソノミーに割り当てられた特定のタームを持つ項目に結果を限定します。 */
      tags?: number[] | {
        /** ターム ID。 */
        terms?: number[] | undefined
        /** 特定のタームのすべてに項目を割り当てるか、一部に割り当てるか。 */
        operator?: 'AND' | 'OR' | undefined
      } | undefined

      /** 「tags」タクソノミーに割り当てられた特定のタームを持つ項目以外に結果を限定します。 */
      tags_exclude?: number[] | {
        /** ターム ID。 */
        terms?: number[] | undefined
      } | undefined

      /** 先頭固定表示の項目に結果を限定します。 */
      sticky?: string | undefined
    } | undefined

    status: 200
    /** OK */
    resBody: Types.Post
  }

  post: {
    status: 200
    /** OK */
    resBody: Types.Post
    reqFormat: URLSearchParams

    reqBody: {
      /** そのタイプに特有な、投稿の英数字識別子。 */
      slug: string
      /** 投稿に対して名前がついているステータス。 */
      status: string
      /** コンテンツや抜粋へのアクセスを保護するパスワード。 */
      password: string
      /** 投稿者の ID。 */
      author: number
      /** 投稿のアイキャッチとなるメディアの ID。 */
      featured_media: number
      /** 投稿がコメントを受け付けているかどうか。 */
      comment_status: string
      /** 投稿がピンバックを受け付けているかどうか。 */
      ping_status: string
      /** 投稿のフォーマット。 */
      format: string
      /** 投稿を先頭固定表示にするかどうか。 */
      sticky: boolean
      /** 投稿を表示するために使用するテーマファイル。 */
      template: string
    }
  }
}
