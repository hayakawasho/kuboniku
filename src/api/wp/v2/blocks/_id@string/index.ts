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
    resBody: Types.Wp_block
  }

  post: {
    status: 200
    /** OK */
    resBody: Types.Wp_block
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

  put: {
    status: 200
    /** OK */
    resBody: Types.Wp_block
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

  patch: {
    status: 200
    /** OK */
    resBody: Types.Wp_block
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

  delete: {
    status: 200
    /** OK */
    resBody: Types.Wp_block
    reqFormat: URLSearchParams

    reqBody: {
      /** ゴミ箱に入れずに強制的に削除するかどうか。 */
      force: boolean
    }
  }
}
