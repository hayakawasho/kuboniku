/* eslint-disable */
import type * as Types from '../../../../../@types'

export type Methods = {
  get: {
    query?: {
      /** 親自動保存の ID。 */
      parent?: string | undefined
      /** このリクエストが作成されたスコープ。レスポンスに含まれるフィールドはスコープにより異なります。 */
      context?: view | embed | edit | undefined
    } | undefined

    status: 200
    /** OK */
    resBody: Types.Post_revision
  }

  post: {
    status: 200
    /** OK */
    resBody: Types.Post_revision
    reqFormat: URLSearchParams

    reqBody: {
      /** 親自動保存の ID。 */
      parent: number
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
