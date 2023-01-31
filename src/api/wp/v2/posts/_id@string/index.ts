/* eslint-disable */
import type * as Types from '../../../../@types'

export type Methods = {
  get: {
    query?: {
      /** このリクエストが作成されたスコープ。レスポンスに含まれるフィールドはスコープにより異なります。 */
      context?: view | embed | edit | undefined
      /** パスワードで保護されている場合の投稿のパスワード。 */
      password?: string | undefined
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

  put: {
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

  patch: {
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

  delete: {
    status: 200
    /** OK */
    resBody: Types.Post
    reqFormat: URLSearchParams

    reqBody: {
      /** ゴミ箱に入れずに強制的に削除するかどうか。 */
      force: boolean
    }
  }
}
