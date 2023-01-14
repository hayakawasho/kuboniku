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
      /** 特定の ID を結果から除外します。 */
      exclude?: string | undefined
      /** 特定の ID に結果を限定します。 */
      include?: string | undefined
      /** 特定の項目数で結果をオフセットします。 */
      offset?: string | undefined
      /** 属性で昇順または降順に並べ替えます。 */
      order?: asc | desc | undefined
      /** ユーザーの属性でコレクションを並べ替えます。 */
      orderby?: id | include | name | registered_date | slug | include_slugs | email | url | undefined
      /** 一つ以上の特定のスラッグを持つユーザーに結果を限定します。 */
      slug?: string | undefined
      /** 入力された、少なくとも一つ以上の特定の権限グループに一致するユーザーに結果を限定します。csv ファイルのリスト、あるいは一つの権限グループも可能です。 */
      roles?: string | undefined
      /** 提供された少なくとも一つ以上の特定の権限に一致するユーザーに結果セットを限定します。csv ファイルのリスト、あるいは一つの権限も可能です。 */
      capabilities?: string | undefined
      /** 投稿者とみなされるユーザーに結果を限定する。 */
      who?: authors | undefined
      /** 投稿を公開したユーザーに結果を限定する。 */
      has_published_posts?: string | undefined
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
      name?: string | undefined
      /** ユーザーの名。 */
      first_name?: string | undefined
      /** ユーザーの姓。 */
      last_name?: string | undefined
      /** ユーザーのメールアドレス。 */
      email: string
      /** ユーザーの URL。 */
      url?: string | undefined
      /** ユーザーの説明。 */
      description?: string | undefined
      /** ユーザーのロケール。 */
      locale?: string | undefined
      /** ユーザーのニックネーム。 */
      nickname?: string | undefined
      /** ユーザーの英数字の識別子。 */
      slug?: string | undefined
      /** ユーザーのパスワード (含まれることはありません)。 */
      password: string
    }
  }
}
