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
      /** 入力された ISO8601 準拠の日付より後に公開された投稿にレスポンスを限定します。 */
      after?: string | undefined
      /** 入力された ISO8601 準拠の日付より後に更新された投稿にレスポンスを限定します。 */
      modified_after?: string | undefined
      /** 入力された ISO8601 準拠の日付より前に公開された投稿にレスポンスを限定します。 */
      before?: string | undefined
      /** 入力された ISO8601 準拠の日付より前に更新された投稿にレスポンスを限定します。 */
      modified_before?: string | undefined
      /** 特定の ID を結果から除外します。 */
      exclude?: string | undefined
      /** 特定の ID に結果を限定します。 */
      include?: string | undefined
      /** 特定の項目数で結果をオフセットします。 */
      offset?: string | undefined
      /** 属性で昇順または降順に並べ替えます。 */
      order?: asc | desc | undefined
      /** オブジェクト属性でコレクションを並び替えます。 */
      orderby?: author | date | id | include | modified | parent | relevance | slug | include_slugs | title | menu_order | undefined
      /** 一つ以上の特定のスラッグを持つ投稿に結果を限定します。 */
      slug?: string | undefined
      /** 一つ以上のステータスが割り当てられた投稿に結果を限定します。 */
      status?: string | undefined
      /** 結果セットを複数のタクソノミー間の関係に基づいて限定します。 */
      tax_relation?: AND | OR | undefined

      /** 「menus」タクソノミーに割り当てられた特定のタームを持つ項目に結果を限定します。 */
      menus?: number[] | {
        /** ターム ID。 */
        terms?: number[] | undefined
        /** 特定のタームのすべてに項目を割り当てるか、一部に割り当てるか。 */
        operator?: 'AND' | 'OR' | undefined
      } | undefined

      /** 「menus」タクソノミーに割り当てられた特定のタームを持つ項目以外に結果を限定します。 */
      menus_exclude?: number[] | {
        /** ターム ID。 */
        terms?: number[] | undefined
      } | undefined

      /** 特定の menu_order 値を持つ投稿に結果を限定します。 */
      menu_order?: string | undefined
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
}
