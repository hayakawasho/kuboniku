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
    resBody: Types.Nav_menu_item
  }

  post: {
    status: 200
    /** OK */
    resBody: Types.Nav_menu_item
    reqFormat: URLSearchParams

    reqBody: {
      /** "post_type" や "taxonomy" のように、元々表わされていたオブジェクトのファミリー。 */
      type: string
      /** オブジェクトに対して名前がついているステータス。 */
      status: string
      /** 親オブジェクトの ID。 */
      parent: number
      /** このメニュー項目のリンク要素のタイトル属性のテキスト。 */
      attr_title: string
      /** このメニュー項目の説明。 */
      description: string
      /** この項目の親メニューである nav_menu_item の DB ID (もしあれば)。ない場合は0。 */
      menu_order: number
      /** 「カテゴリー」、「投稿」、「添付ファイル」など、元々表わされていたオブジェクトのタイプ。 */
      object: string
      /** このメニュー項目が表す元のオブジェクトのデータベース ID。例: 投稿の ID やカテゴリーの term_id。 */
      object_id: number
      /** このメニュー項目のリンク要素のターゲット属性。 */
      target: string
      /** このメニュー項目が指す URL。 */
      url: string
      /** タクソノミー「nav_menu」に属し、そのオブジェクトに割り当てられているターム。 */
      menus: number
    }
  }

  put: {
    status: 200
    /** OK */
    resBody: Types.Nav_menu_item
    reqFormat: URLSearchParams

    reqBody: {
      /** "post_type" や "taxonomy" のように、元々表わされていたオブジェクトのファミリー。 */
      type: string
      /** オブジェクトに対して名前がついているステータス。 */
      status: string
      /** 親オブジェクトの ID。 */
      parent: number
      /** このメニュー項目のリンク要素のタイトル属性のテキスト。 */
      attr_title: string
      /** このメニュー項目の説明。 */
      description: string
      /** この項目の親メニューである nav_menu_item の DB ID (もしあれば)。ない場合は0。 */
      menu_order: number
      /** 「カテゴリー」、「投稿」、「添付ファイル」など、元々表わされていたオブジェクトのタイプ。 */
      object: string
      /** このメニュー項目が表す元のオブジェクトのデータベース ID。例: 投稿の ID やカテゴリーの term_id。 */
      object_id: number
      /** このメニュー項目のリンク要素のターゲット属性。 */
      target: string
      /** このメニュー項目が指す URL。 */
      url: string
      /** タクソノミー「nav_menu」に属し、そのオブジェクトに割り当てられているターム。 */
      menus: number
    }
  }

  patch: {
    status: 200
    /** OK */
    resBody: Types.Nav_menu_item
    reqFormat: URLSearchParams

    reqBody: {
      /** "post_type" や "taxonomy" のように、元々表わされていたオブジェクトのファミリー。 */
      type: string
      /** オブジェクトに対して名前がついているステータス。 */
      status: string
      /** 親オブジェクトの ID。 */
      parent: number
      /** このメニュー項目のリンク要素のタイトル属性のテキスト。 */
      attr_title: string
      /** このメニュー項目の説明。 */
      description: string
      /** この項目の親メニューである nav_menu_item の DB ID (もしあれば)。ない場合は0。 */
      menu_order: number
      /** 「カテゴリー」、「投稿」、「添付ファイル」など、元々表わされていたオブジェクトのタイプ。 */
      object: string
      /** このメニュー項目が表す元のオブジェクトのデータベース ID。例: 投稿の ID やカテゴリーの term_id。 */
      object_id: number
      /** このメニュー項目のリンク要素のターゲット属性。 */
      target: string
      /** このメニュー項目が指す URL。 */
      url: string
      /** タクソノミー「nav_menu」に属し、そのオブジェクトに割り当てられているターム。 */
      menus: number
    }
  }

  delete: {
    status: 200
    /** OK */
    resBody: Types.Nav_menu_item
    reqFormat: URLSearchParams

    reqBody: {
      /** ゴミ箱に入れずに強制的に削除するかどうか。 */
      force: boolean
    }
  }
}
