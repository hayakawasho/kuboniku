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
    resBody: Types.Widget
  }

  post: {
    status: 200
    /** OK */
    resBody: Types.Widget
    reqFormat: URLSearchParams

    reqBody: {
      /** ウィジェットのタイプ。widget-types エンドポイントの ID と対応します。 */
      id_base: string
      /** ウィジェットが属するサイドバー。 */
      sidebar: string
      /** ウィジェット管理フォームから URL エンコードしたフォームデータ。インスタンスをサポートしないウィジェットの更新に使用されます。書き込みのみ。 */
      form_data: string
    }
  }

  put: {
    status: 200
    /** OK */
    resBody: Types.Widget
    reqFormat: URLSearchParams

    reqBody: {
      /** ウィジェットのタイプ。widget-types エンドポイントの ID と対応します。 */
      id_base: string
      /** ウィジェットが属するサイドバー。 */
      sidebar: string
      /** ウィジェット管理フォームから URL エンコードしたフォームデータ。インスタンスをサポートしないウィジェットの更新に使用されます。書き込みのみ。 */
      form_data: string
    }
  }

  patch: {
    status: 200
    /** OK */
    resBody: Types.Widget
    reqFormat: URLSearchParams

    reqBody: {
      /** ウィジェットのタイプ。widget-types エンドポイントの ID と対応します。 */
      id_base: string
      /** ウィジェットが属するサイドバー。 */
      sidebar: string
      /** ウィジェット管理フォームから URL エンコードしたフォームデータ。インスタンスをサポートしないウィジェットの更新に使用されます。書き込みのみ。 */
      form_data: string
    }
  }

  delete: {
    status: 200
    /** OK */
    resBody: Types.Widget
    reqFormat: URLSearchParams

    reqBody: {
      /** 強制的にウィジェットを削除するか、無効化サイドバーに移動するかどうか。 */
      force: boolean
    }
  }
}
