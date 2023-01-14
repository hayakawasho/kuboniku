/* eslint-disable */
import type * as Types from '../../../@types'

export type Methods = {
  get: {
    query?: {
      /** このリクエストが作成されたスコープ。レスポンスに含まれるフィールドはスコープにより異なります。 */
      context?: view | embed | edit | undefined
      /** ウィジェットを戻すためのサイドバー。 */
      sidebar?: string | undefined
    } | undefined

    status: 200
    /** OK */
    resBody: Types.Widget
  }

  post: {
    status: 200
    /** OK */
    resBody: Types.Widget
    reqFormat: URLSearchParams

    reqBody: {
      /** ウィジェットの固有識別子。 */
      id?: string | undefined
      /** ウィジェットのタイプ。widget-types エンドポイントの ID と対応します。 */
      id_base?: string | undefined
      /** ウィジェットが属するサイドバー。 */
      sidebar: string
      /** ウィジェット管理フォームから URL エンコードしたフォームデータ。インスタンスをサポートしないウィジェットの更新に使用されます。書き込みのみ。 */
      form_data?: string | undefined
    }
  }
}
