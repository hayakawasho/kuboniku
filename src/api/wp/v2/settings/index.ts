/* eslint-disable */
import type * as Types from '../../../@types'

export type Methods = {
  get: {
    status: 200
    /** OK */
    resBody: Types.Settings
  }

  post: {
    status: 200
    /** OK */
    resBody: Types.Settings
    reqFormat: URLSearchParams

    reqBody: {
      /** サイト名。 */
      title: string
      /** サイトのキャッチフレーズ。 */
      description: string
      /** サイト URL。 */
      url: string
      /** このアドレスは新規ユーザーの通知などサイト管理のために使われます。 */
      email: string
      /** 現在地と同じタイムゾーンの都市。 */
      timezone: string
      /** 日付文字列の書式。 */
      date_format: string
      /** 時刻文字列の書式。 */
      time_format: string
      /** 週の始まりの曜日番号。 */
      start_of_week: number
      /** WordPress のロケールコード。 */
      language: string
      /** :-) や :-P などの顔文字を絵文字に変換します。 */
      use_smilies: boolean
      /** デフォルトの投稿カテゴリー。 */
      default_category: number
      /** デフォルトの投稿フォーマット。 */
      default_post_format: string
      /** 表示する最大投稿数。 */
      posts_per_page: number
      /** フロントページに表示する内容 */
      show_on_front: string
      /** フロントページに表示するページの ID */
      page_on_front: number
      /** 最新の投稿を表示するページの ID */
      page_for_posts: number
      /** 新しい記事に対し他のブログからの通知 (ピンバック・トラックバック) を受け付ける。 */
      default_ping_status: string
      /** 新しい投稿へのコメントを許可する。 */
      default_comment_status: string
      /** サイトロゴ。 */
      site_logo: number
      /** サイトアイコン。 */
      site_icon: number
    }
  }

  put: {
    status: 200
    /** OK */
    resBody: Types.Settings
    reqFormat: URLSearchParams

    reqBody: {
      /** サイト名。 */
      title: string
      /** サイトのキャッチフレーズ。 */
      description: string
      /** サイト URL。 */
      url: string
      /** このアドレスは新規ユーザーの通知などサイト管理のために使われます。 */
      email: string
      /** 現在地と同じタイムゾーンの都市。 */
      timezone: string
      /** 日付文字列の書式。 */
      date_format: string
      /** 時刻文字列の書式。 */
      time_format: string
      /** 週の始まりの曜日番号。 */
      start_of_week: number
      /** WordPress のロケールコード。 */
      language: string
      /** :-) や :-P などの顔文字を絵文字に変換します。 */
      use_smilies: boolean
      /** デフォルトの投稿カテゴリー。 */
      default_category: number
      /** デフォルトの投稿フォーマット。 */
      default_post_format: string
      /** 表示する最大投稿数。 */
      posts_per_page: number
      /** フロントページに表示する内容 */
      show_on_front: string
      /** フロントページに表示するページの ID */
      page_on_front: number
      /** 最新の投稿を表示するページの ID */
      page_for_posts: number
      /** 新しい記事に対し他のブログからの通知 (ピンバック・トラックバック) を受け付ける。 */
      default_ping_status: string
      /** 新しい投稿へのコメントを許可する。 */
      default_comment_status: string
      /** サイトロゴ。 */
      site_logo: number
      /** サイトアイコン。 */
      site_icon: number
    }
  }

  patch: {
    status: 200
    /** OK */
    resBody: Types.Settings
    reqFormat: URLSearchParams

    reqBody: {
      /** サイト名。 */
      title: string
      /** サイトのキャッチフレーズ。 */
      description: string
      /** サイト URL。 */
      url: string
      /** このアドレスは新規ユーザーの通知などサイト管理のために使われます。 */
      email: string
      /** 現在地と同じタイムゾーンの都市。 */
      timezone: string
      /** 日付文字列の書式。 */
      date_format: string
      /** 時刻文字列の書式。 */
      time_format: string
      /** 週の始まりの曜日番号。 */
      start_of_week: number
      /** WordPress のロケールコード。 */
      language: string
      /** :-) や :-P などの顔文字を絵文字に変換します。 */
      use_smilies: boolean
      /** デフォルトの投稿カテゴリー。 */
      default_category: number
      /** デフォルトの投稿フォーマット。 */
      default_post_format: string
      /** 表示する最大投稿数。 */
      posts_per_page: number
      /** フロントページに表示する内容 */
      show_on_front: string
      /** フロントページに表示するページの ID */
      page_on_front: number
      /** 最新の投稿を表示するページの ID */
      page_for_posts: number
      /** 新しい記事に対し他のブログからの通知 (ピンバック・トラックバック) を受け付ける。 */
      default_ping_status: string
      /** 新しい投稿へのコメントを許可する。 */
      default_comment_status: string
      /** サイトロゴ。 */
      site_logo: number
      /** サイトアイコン。 */
      site_icon: number
    }
  }
}
