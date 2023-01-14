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
    resBody: Types.User
  }

  post: {
    status: 200
    /** OK */
    resBody: Types.User
    reqFormat: URLSearchParams

    reqBody: {
      /** ユーザーのログイン名。 */
      username: string
      /** ユーザーの、ブログ上の表示名。 */
      name: string
      /** ユーザーの名。 */
      first_name: string
      /** ユーザーの姓。 */
      last_name: string
      /** ユーザーのメールアドレス。 */
      email: string
      /** ユーザーの URL。 */
      url: string
      /** ユーザーの説明。 */
      description: string
      /** ユーザーのロケール。 */
      locale: string
      /** ユーザーのニックネーム。 */
      nickname: string
      /** ユーザーの英数字の識別子。 */
      slug: string
      /** ユーザーのパスワード (含まれることはありません)。 */
      password: string
    }
  }

  put: {
    status: 200
    /** OK */
    resBody: Types.User
    reqFormat: URLSearchParams

    reqBody: {
      /** ユーザーのログイン名。 */
      username: string
      /** ユーザーの、ブログ上の表示名。 */
      name: string
      /** ユーザーの名。 */
      first_name: string
      /** ユーザーの姓。 */
      last_name: string
      /** ユーザーのメールアドレス。 */
      email: string
      /** ユーザーの URL。 */
      url: string
      /** ユーザーの説明。 */
      description: string
      /** ユーザーのロケール。 */
      locale: string
      /** ユーザーのニックネーム。 */
      nickname: string
      /** ユーザーの英数字の識別子。 */
      slug: string
      /** ユーザーのパスワード (含まれることはありません)。 */
      password: string
    }
  }

  patch: {
    status: 200
    /** OK */
    resBody: Types.User
    reqFormat: URLSearchParams

    reqBody: {
      /** ユーザーのログイン名。 */
      username: string
      /** ユーザーの、ブログ上の表示名。 */
      name: string
      /** ユーザーの名。 */
      first_name: string
      /** ユーザーの姓。 */
      last_name: string
      /** ユーザーのメールアドレス。 */
      email: string
      /** ユーザーの URL。 */
      url: string
      /** ユーザーの説明。 */
      description: string
      /** ユーザーのロケール。 */
      locale: string
      /** ユーザーのニックネーム。 */
      nickname: string
      /** ユーザーの英数字の識別子。 */
      slug: string
      /** ユーザーのパスワード (含まれることはありません)。 */
      password: string
    }
  }

  delete: {
    status: 200
    /** OK */
    resBody: Types.User
    reqFormat: URLSearchParams

    reqBody: {
      /** ユーザーがゴミ箱機能に対応していないため、true でなければなりません。 */
      force?: boolean | undefined
      /** 削除するユーザーの投稿とリンクを、指定 ID のユーザーに割り当てます。 */
      reassign: number
    }
  }
}
