/* eslint-disable */
import type * as Types from '../../../../@types'

export type Methods = {
  get: {
    query?: {
      /** このリクエストが作成されたスコープ。レスポンスに含まれるフィールドはスコープにより異なります。 */
      context?: view | embed | edit | undefined
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

  put: {
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

  patch: {
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

  delete: {
    status: 200
    /** OK */
    resBody: Types.Attachment
    reqFormat: URLSearchParams

    reqBody: {
      /** ゴミ箱に入れずに強制的に削除するかどうか。 */
      force: boolean
    }
  }
}
