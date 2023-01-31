/* eslint-disable */
import type * as Types from '../../../../@types'

export type Methods = {
  get: {
    query?: {
      /** このリクエストが作成されたスコープ。レスポンスに含まれるフィールドはスコープにより異なります。 */
      context?: view | embed | edit | undefined
      /** コメントの親投稿のパスワード (投稿がパスワード保護されている場合)。 */
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

  put: {
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

  patch: {
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

  delete: {
    status: 200
    /** OK */
    resBody: Types.Comment
    reqFormat: URLSearchParams

    reqBody: {
      /** ゴミ箱に入れずに強制的に削除するかどうか。 */
      force: boolean
      /** コメントの親投稿のパスワード (投稿がパスワード保護されている場合)。 */
      password: string
    }
  }
}
