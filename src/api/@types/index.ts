/* eslint-disable */
export type Post = {
  /** 投稿のグローバル一意識別子 (GUID)。 */
  guid?:
    | {
        /** データベースに存在する形態の、投稿の GUID。 */
        raw?: string | undefined
        /** 表示用に変換された、投稿の GUID。 */
        rendered?: string | undefined
      }
    | undefined

  /** 投稿の一意識別子。 */
  id?: number | undefined
  /** 投稿の URL。 */
  link?: string | undefined
  /** 投稿の最終更新日 (サイトのタイムゾーン)。 */
  modified?: string | undefined
  /** 投稿の最終更新日 (GMT)。 */
  modified_gmt?: string | undefined
  /** そのタイプに特有な、投稿の英数字識別子。 */
  slug?: string | undefined
  /** 投稿に対して名前がついているステータス。 */
  status?: 'publish' | 'future' | 'draft' | 'pending' | 'private' | 'acf-disabled' | undefined
  /** 投稿タイプ。 */
  type?: string | undefined
  /** コンテンツや抜粋へのアクセスを保護するパスワード。 */
  password?: string | undefined
  /** 投稿のパーマリンクテンプレート。 */
  permalink_template?: string | undefined
  /** 投稿のタイトルから自動生成されたスラッグ。 */
  generated_slug?: string | undefined

  /** 投稿のタイトル。 */
  title?:
    | {
        /** データベースに存在する形態の、投稿のタイトル。 */
        raw?: string | undefined
        /** 表示用に整形された、投稿の HTML タイトル。 */
        rendered?: string | undefined
      }
    | undefined

  /** 投稿のコンテンツ。 */
  content?:
    | {
        /** データベースに存在する形態の、投稿のコンテンツ。 */
        raw?: string | undefined
        /** 表示用に変換された、投稿の HTML コンテンツ。 */
        rendered?: string | undefined
        /** 投稿が使用するコンテンツブロック形式のバージョン。 */
        block_version?: number | undefined
        /** コンテンツをパスワードで保護するかどうか。 */
        protected?: boolean | undefined
      }
    | undefined

  /** 投稿者の ID。 */
  author?: number | undefined

  /** 投稿の抜粋。 */
  excerpt?:
    | {
        /** データベースに存在する形態の、投稿の抜粋。 */
        raw?: string | undefined
        /** 表示用に変換された、投稿の HTML の抜粋。 */
        rendered?: string | undefined
        /** 抜粋がパスワードで保護されているかどうか。 */
        protected?: boolean | undefined
      }
    | undefined

  /** 投稿のアイキャッチとなるメディアの ID。 */
  featured_media?: number | undefined
  /** 投稿がコメントを受け付けているかどうか。 */
  comment_status?: 'open' | 'closed' | undefined
  /** 投稿がピンバックを受け付けているかどうか。 */
  ping_status?: 'open' | 'closed' | undefined
  /** 投稿のフォーマット。 */
  format?:
    | 'standard'
    | 'aside'
    | 'chat'
    | 'gallery'
    | 'link'
    | 'image'
    | 'quote'
    | 'status'
    | 'video'
    | 'audio'
    | undefined

  /** メタフィールド。 */
  meta?:
    | {
        /** Flag on whether transformation should be overwritten for a featured image. */
        _cloudinary_featured_overwrite?: boolean | undefined
      }
    | undefined

  /** 投稿を先頭固定表示にするかどうか。 */
  sticky?: boolean | undefined
  /** 投稿を表示するために使用するテーマファイル。 */
  template?: string | undefined
  /** タクソノミー「category」に属し、その投稿に割り当てられているターム。 */
  categories?: number[] | undefined
  /** タクソノミー「post_tag」に属し、その投稿に割り当てられているターム。 */
  tags?: number[] | undefined
}

export type Post_revision = {
  /** リビジョンの投稿者 ID。 */
  author?: number | undefined
  /** リビジョンの公開日 (サイトのタイムゾーン)。 */
  date?: string | undefined
  /** リビジョンの公開日 (GMT)。 */
  date_gmt?: string | undefined

  /** 投稿のグローバル一意識別子 (GUID)。 */
  guid?:
    | {
        /** データベースに存在する形態の、投稿の GUID。 */
        raw?: string | undefined
        /** 表示用に変換された、投稿の GUID。 */
        rendered?: string | undefined
      }
    | undefined

  /** リビジョンの固有識別子。 */
  id?: number | undefined
  /** リビジョンの最終更新日 (サイトのタイムゾーン)。 */
  modified?: string | undefined
  /** リビジョンの最終更新日 (GMT)。 */
  modified_gmt?: string | undefined
  /** 親リビジョンの ID。 */
  parent?: number | undefined
  /** そのタイプに特有な、リビジョンの英数字識別子。 */
  slug?: string | undefined

  /** 投稿のタイトル。 */
  title?:
    | {
        /** データベースに存在する形態の、投稿のタイトル。 */
        raw?: string | undefined
        /** 表示用に整形された、投稿の HTML タイトル。 */
        rendered?: string | undefined
      }
    | undefined

  /** 投稿のコンテンツ。 */
  content?:
    | {
        /** データベースに存在する形態の、投稿のコンテンツ。 */
        raw?: string | undefined
        /** 表示用に変換された、投稿の HTML コンテンツ。 */
        rendered?: string | undefined
        /** 投稿が使用するコンテンツブロック形式のバージョン。 */
        block_version?: number | undefined
        /** コンテンツをパスワードで保護するかどうか。 */
        protected?: boolean | undefined
      }
    | undefined

  /** 投稿の抜粋。 */
  excerpt?:
    | {
        /** データベースに存在する形態の、投稿の抜粋。 */
        raw?: string | undefined
        /** 表示用に変換された、投稿の HTML の抜粋。 */
        rendered?: string | undefined
        /** 抜粋がパスワードで保護されているかどうか。 */
        protected?: boolean | undefined
      }
    | undefined

  /** 投稿のリンクをプレビューします。 */
  preview_link?: string | undefined
}

export type Page = {
  /** 投稿のグローバル一意識別子 (GUID)。 */
  guid?:
    | {
        /** データベースに存在する形態の、投稿の GUID。 */
        raw?: string | undefined
        /** 表示用に変換された、投稿の GUID。 */
        rendered?: string | undefined
      }
    | undefined

  /** 投稿の一意識別子。 */
  id?: number | undefined
  /** 投稿の URL。 */
  link?: string | undefined
  /** 投稿の最終更新日 (サイトのタイムゾーン)。 */
  modified?: string | undefined
  /** 投稿の最終更新日 (GMT)。 */
  modified_gmt?: string | undefined
  /** そのタイプに特有な、投稿の英数字識別子。 */
  slug?: string | undefined
  /** 投稿に対して名前がついているステータス。 */
  status?: 'publish' | 'future' | 'draft' | 'pending' | 'private' | 'acf-disabled' | undefined
  /** 投稿タイプ。 */
  type?: string | undefined
  /** コンテンツや抜粋へのアクセスを保護するパスワード。 */
  password?: string | undefined
  /** 投稿のパーマリンクテンプレート。 */
  permalink_template?: string | undefined
  /** 投稿のタイトルから自動生成されたスラッグ。 */
  generated_slug?: string | undefined
  /** 親投稿の ID。 */
  parent?: number | undefined

  /** 投稿のタイトル。 */
  title?:
    | {
        /** データベースに存在する形態の、投稿のタイトル。 */
        raw?: string | undefined
        /** 表示用に整形された、投稿の HTML タイトル。 */
        rendered?: string | undefined
      }
    | undefined

  /** 投稿のコンテンツ。 */
  content?:
    | {
        /** データベースに存在する形態の、投稿のコンテンツ。 */
        raw?: string | undefined
        /** 表示用に変換された、投稿の HTML コンテンツ。 */
        rendered?: string | undefined
        /** 投稿が使用するコンテンツブロック形式のバージョン。 */
        block_version?: number | undefined
        /** コンテンツをパスワードで保護するかどうか。 */
        protected?: boolean | undefined
      }
    | undefined

  /** 投稿者の ID。 */
  author?: number | undefined

  /** 投稿の抜粋。 */
  excerpt?:
    | {
        /** データベースに存在する形態の、投稿の抜粋。 */
        raw?: string | undefined
        /** 表示用に変換された、投稿の HTML の抜粋。 */
        rendered?: string | undefined
        /** 抜粋がパスワードで保護されているかどうか。 */
        protected?: boolean | undefined
      }
    | undefined

  /** 投稿のアイキャッチとなるメディアの ID。 */
  featured_media?: number | undefined
  /** 投稿がコメントを受け付けているかどうか。 */
  comment_status?: 'open' | 'closed' | undefined
  /** 投稿がピンバックを受け付けているかどうか。 */
  ping_status?: 'open' | 'closed' | undefined
  /** 他の投稿との関連による、投稿の順番。 */
  menu_order?: number | undefined

  /** メタフィールド。 */
  meta?:
    | {
        /** Flag on whether transformation should be overwritten for a featured image. */
        _cloudinary_featured_overwrite?: boolean | undefined
      }
    | undefined

  /** 投稿を表示するために使用するテーマファイル。 */
  template?: string | undefined
}

export type Page_revision = {
  /** リビジョンの投稿者 ID。 */
  author?: number | undefined
  /** リビジョンの公開日 (サイトのタイムゾーン)。 */
  date?: string | undefined
  /** リビジョンの公開日 (GMT)。 */
  date_gmt?: string | undefined

  /** 投稿のグローバル一意識別子 (GUID)。 */
  guid?:
    | {
        /** データベースに存在する形態の、投稿の GUID。 */
        raw?: string | undefined
        /** 表示用に変換された、投稿の GUID。 */
        rendered?: string | undefined
      }
    | undefined

  /** リビジョンの固有識別子。 */
  id?: number | undefined
  /** リビジョンの最終更新日 (サイトのタイムゾーン)。 */
  modified?: string | undefined
  /** リビジョンの最終更新日 (GMT)。 */
  modified_gmt?: string | undefined
  /** 親リビジョンの ID。 */
  parent?: number | undefined
  /** そのタイプに特有な、リビジョンの英数字識別子。 */
  slug?: string | undefined

  /** 投稿のタイトル。 */
  title?:
    | {
        /** データベースに存在する形態の、投稿のタイトル。 */
        raw?: string | undefined
        /** 表示用に整形された、投稿の HTML タイトル。 */
        rendered?: string | undefined
      }
    | undefined

  /** 投稿のコンテンツ。 */
  content?:
    | {
        /** データベースに存在する形態の、投稿のコンテンツ。 */
        raw?: string | undefined
        /** 表示用に変換された、投稿の HTML コンテンツ。 */
        rendered?: string | undefined
        /** 投稿が使用するコンテンツブロック形式のバージョン。 */
        block_version?: number | undefined
        /** コンテンツをパスワードで保護するかどうか。 */
        protected?: boolean | undefined
      }
    | undefined

  /** 投稿の抜粋。 */
  excerpt?:
    | {
        /** データベースに存在する形態の、投稿の抜粋。 */
        raw?: string | undefined
        /** 表示用に変換された、投稿の HTML の抜粋。 */
        rendered?: string | undefined
        /** 抜粋がパスワードで保護されているかどうか。 */
        protected?: boolean | undefined
      }
    | undefined

  /** 投稿のリンクをプレビューします。 */
  preview_link?: string | undefined
}

export type Attachment = {
  /** 投稿のグローバル一意識別子 (GUID)。 */
  guid?:
    | {
        /** データベースに存在する形態の、投稿の GUID。 */
        raw?: string | undefined
        /** 表示用に変換された、投稿の GUID。 */
        rendered?: string | undefined
      }
    | undefined

  /** 投稿の一意識別子。 */
  id?: number | undefined
  /** 投稿の URL。 */
  link?: string | undefined
  /** 投稿の最終更新日 (サイトのタイムゾーン)。 */
  modified?: string | undefined
  /** 投稿の最終更新日 (GMT)。 */
  modified_gmt?: string | undefined
  /** そのタイプに特有な、投稿の英数字識別子。 */
  slug?: string | undefined
  /** 投稿に対して名前がついているステータス。 */
  status?: 'publish' | 'future' | 'draft' | 'pending' | 'private' | 'acf-disabled' | undefined
  /** 投稿タイプ。 */
  type?: string | undefined
  /** 投稿のパーマリンクテンプレート。 */
  permalink_template?: string | undefined
  /** 投稿のタイトルから自動生成されたスラッグ。 */
  generated_slug?: string | undefined

  /** 投稿のタイトル。 */
  title?:
    | {
        /** データベースに存在する形態の、投稿のタイトル。 */
        raw?: string | undefined
        /** 表示用に整形された、投稿の HTML タイトル。 */
        rendered?: string | undefined
      }
    | undefined

  /** 投稿者の ID。 */
  author?: number | undefined
  /** 投稿がコメントを受け付けているかどうか。 */
  comment_status?: 'open' | 'closed' | undefined
  /** 投稿がピンバックを受け付けているかどうか。 */
  ping_status?: 'open' | 'closed' | undefined

  /** メタフィールド。 */
  meta?:
    | {
        /** Flag on whether transformation should be overwritten for a featured image. */
        _cloudinary_featured_overwrite?: boolean | undefined
      }
    | undefined

  /** 投稿を表示するために使用するテーマファイル。 */
  template?: string | undefined
  /** 添付ファイルが表示されないときに表示する代替テキスト。 */
  alt_text?: string | undefined

  /** 添付ファイルのキャプション。 */
  caption?:
    | {
        /** データベースに存在する形態の、添付ファイルのキャプション。 */
        raw?: string | undefined
        /** 表示用に変換された、添付ファイルの HTML キャプション。 */
        rendered?: string | undefined
      }
    | undefined

  /** 添付ファイルの説明。 */
  description?:
    | {
        /** データベースに存在する形態の、添付ファイルの説明。 */
        raw?: string | undefined
        /** 表示用に変換された、添付ファイルの HTML の説明。 */
        rendered?: string | undefined
      }
    | undefined

  /** 添付ファイルのタイプ。 */
  media_type?: 'image' | 'file' | undefined
  /** 添付ファイルの MIME タイプ。 */
  mime_type?: string | undefined
  /** 添付ファイルの関連投稿の ID。 */
  post?: number | undefined
  /** 添付ファイルの元データへの URL。 */
  source_url?: string | undefined
  /** 添付ファイルの不足している画像サイズのリスト。 */
  missing_image_sizes?: string[] | undefined
}

export type Nav_menu_item = {
  /** オブジェクトのタイトル。 */
  title?:
    | {
        /** データベースに存在する形態の、オブジェクトのタイトル。 */
        raw?: string | undefined
        /** 表示用に整形された、オブジェクトの HTML タイトル。 */
        rendered?: string | undefined
      }
    | undefined

  /** オブジェクトの一意識別子。 */
  id?: number | undefined
  /** このタイプのメニュー項目を説明するために使う単数形のラベル。 */
  type_label?: string | undefined
  /** "post_type" や "taxonomy" のように、元々表わされていたオブジェクトのファミリー。 */
  type?: 'taxonomy' | 'post_type' | 'post_type_archive' | 'custom' | undefined
  /** オブジェクトに対して名前がついているステータス。 */
  status?: 'publish' | 'future' | 'draft' | 'pending' | 'private' | 'acf-disabled' | undefined
  /** 親オブジェクトの ID。 */
  parent?: number | undefined
  /** このメニュー項目のリンク要素のタイトル属性のテキスト。 */
  attr_title?: string | undefined
  /** このメニュー項目のリンク要素のクラス名。 */
  classes?: string[] | undefined
  /** このメニュー項目の説明。 */
  description?: string | undefined
  /** この項目の親メニューである nav_menu_item の DB ID (もしあれば)。ない場合は0。 */
  menu_order?: number | undefined
  /** 「カテゴリー」、「投稿」、「添付ファイル」など、元々表わされていたオブジェクトのタイプ。 */
  object?: string | undefined
  /** このメニュー項目が表す元のオブジェクトのデータベース ID。例: 投稿の ID やカテゴリーの term_id。 */
  object_id?: number | undefined
  /** このメニュー項目のリンク要素のターゲット属性。 */
  target?: '_blank' | '' | undefined
  /** このメニュー項目が指す URL。 */
  url?: string | undefined
  /** このメニュー項目のリンクで表現された XFN 関係。 */
  xfn?: string[] | undefined
  /** メニュー項目が存在しないオブジェクトを表すかどうか。 */
  invalid?: boolean | undefined
  /** タクソノミー「nav_menu」に属し、そのオブジェクトに割り当てられているターム。 */
  menus?: number | undefined

  /** メタフィールド。 */
  meta?:
    | {
        /** Flag on whether transformation should be overwritten for a featured image. */
        _cloudinary_featured_overwrite?: boolean | undefined
      }
    | undefined
}

export type Nav_menu_item_revision = {
  /** リビジョンの投稿者 ID。 */
  author?: number | undefined
  /** リビジョンの公開日 (サイトのタイムゾーン)。 */
  date?: string | undefined
  /** リビジョンの公開日 (GMT)。 */
  date_gmt?: string | undefined
  /** データベースに存在する形態の、リビジョンの GUID。 */
  guid?: string | undefined
  /** リビジョンの固有識別子。 */
  id?: number | undefined
  /** リビジョンの最終更新日 (サイトのタイムゾーン)。 */
  modified?: string | undefined
  /** リビジョンの最終更新日 (GMT)。 */
  modified_gmt?: string | undefined
  /** 親リビジョンの ID。 */
  parent?: number | undefined
  /** そのタイプに特有な、リビジョンの英数字識別子。 */
  slug?: string | undefined

  /** オブジェクトのタイトル。 */
  title?:
    | {
        /** データベースに存在する形態の、オブジェクトのタイトル。 */
        raw?: string | undefined
        /** 表示用に整形された、オブジェクトの HTML タイトル。 */
        rendered?: string | undefined
      }
    | undefined

  /** 投稿のリンクをプレビューします。 */
  preview_link?: string | undefined
}

export type Wp_block = {
  /** 投稿のグローバル一意識別子 (GUID)。 */
  guid?:
    | {
        /** データベースに存在する形態の、投稿の GUID。 */
        raw?: string | undefined
        /** 表示用に変換された、投稿の GUID。 */
        rendered?: string | undefined
      }
    | undefined

  /** 投稿の一意識別子。 */
  id?: number | undefined
  /** 投稿の URL。 */
  link?: string | undefined
  /** 投稿の最終更新日 (サイトのタイムゾーン)。 */
  modified?: string | undefined
  /** 投稿の最終更新日 (GMT)。 */
  modified_gmt?: string | undefined
  /** そのタイプに特有な、投稿の英数字識別子。 */
  slug?: string | undefined
  /** 投稿に対して名前がついているステータス。 */
  status?: 'publish' | 'future' | 'draft' | 'pending' | 'private' | 'acf-disabled' | undefined
  /** 投稿タイプ。 */
  type?: string | undefined
  /** コンテンツや抜粋へのアクセスを保護するパスワード。 */
  password?: string | undefined

  /** 投稿のタイトル。 */
  title?:
    | {
        /** データベースに存在する形態の、投稿のタイトル。 */
        raw?: string | undefined
      }
    | undefined

  /** 投稿のコンテンツ。 */
  content?:
    | {
        /** データベースに存在する形態の、投稿のコンテンツ。 */
        raw?: string | undefined
        /** 投稿が使用するコンテンツブロック形式のバージョン。 */
        block_version?: number | undefined
        /** コンテンツをパスワードで保護するかどうか。 */
        protected?: boolean | undefined
      }
    | undefined

  /** 投稿を表示するために使用するテーマファイル。 */
  template?: string | undefined
}

export type Wp_block_revision = {
  /** リビジョンの投稿者 ID。 */
  author?: number | undefined
  /** リビジョンの公開日 (サイトのタイムゾーン)。 */
  date?: string | undefined
  /** リビジョンの公開日 (GMT)。 */
  date_gmt?: string | undefined

  /** 投稿のグローバル一意識別子 (GUID)。 */
  guid?:
    | {
        /** データベースに存在する形態の、投稿の GUID。 */
        raw?: string | undefined
        /** 表示用に変換された、投稿の GUID。 */
        rendered?: string | undefined
      }
    | undefined

  /** リビジョンの固有識別子。 */
  id?: number | undefined
  /** リビジョンの最終更新日 (サイトのタイムゾーン)。 */
  modified?: string | undefined
  /** リビジョンの最終更新日 (GMT)。 */
  modified_gmt?: string | undefined
  /** 親リビジョンの ID。 */
  parent?: number | undefined
  /** そのタイプに特有な、リビジョンの英数字識別子。 */
  slug?: string | undefined

  /** 投稿のタイトル。 */
  title?:
    | {
        /** データベースに存在する形態の、投稿のタイトル。 */
        raw?: string | undefined
      }
    | undefined

  /** 投稿のコンテンツ。 */
  content?:
    | {
        /** データベースに存在する形態の、投稿のコンテンツ。 */
        raw?: string | undefined
        /** 投稿が使用するコンテンツブロック形式のバージョン。 */
        block_version?: number | undefined
        /** コンテンツをパスワードで保護するかどうか。 */
        protected?: boolean | undefined
      }
    | undefined

  /** 投稿のリンクをプレビューします。 */
  preview_link?: string | undefined
}

export type Wp_template = {
  /** テンプレートの ID。 */
  id?: string | undefined
  /** テンプレートを識別する固有のスラッグ。 */
  slug?: string | undefined
  /** テンプレートのテーマ固有識別子。 */
  theme?: string | undefined
  /** テンプレートのタイプ */
  type?: string | undefined
  /** テンプレートの元 */
  source?: string | undefined
  /** カスタマイズテンプレートのソース */
  origin?: string | undefined

  /** テンプレートのコンテンツ。 */
  content?:
    | {
        /** データベースに存在する状態のテンプレートのコンテンツ。 */
        raw?: string | undefined
        /** テンプレートが使用するコンテンツブロック形式のバージョン。 */
        block_version?: number | undefined
      }
    | undefined

  /** テンプレートのタイトル。 */
  title?:
    | {
        /** データベースに存在する状態の、テンプレートのタイトル。 */
        raw?: string | undefined
        /** 表示用に整形された、テンプレートの HTML タイトル。 */
        rendered?: string | undefined
      }
    | undefined

  /** テンプレートの説明。 */
  description?: string | undefined
  /** テンプレートの状態。 */
  status?: 'publish' | 'future' | 'draft' | 'pending' | 'private' | 'acf-disabled' | undefined
  /** 投稿 ID。 */
  wp_id?: number | undefined
  /** テンプレートの作成者の ID。 */
  author?: number | undefined
}

export type Wp_template_revision = {
  /** リビジョンの投稿者 ID。 */
  author?: number | undefined
  /** リビジョンの公開日 (サイトのタイムゾーン)。 */
  date?: string | undefined
  /** リビジョンの公開日 (GMT)。 */
  date_gmt?: string | undefined
  /** データベースに存在する形態の、リビジョンの GUID。 */
  guid?: string | undefined
  /** リビジョンの固有識別子。 */
  id?: number | undefined
  /** リビジョンの最終更新日 (サイトのタイムゾーン)。 */
  modified?: string | undefined
  /** リビジョンの最終更新日 (GMT)。 */
  modified_gmt?: string | undefined
  /** 親リビジョンの ID。 */
  parent?: number | undefined
  /** そのタイプに特有な、リビジョンの英数字識別子。 */
  slug?: string | undefined

  /** テンプレートのタイトル。 */
  title?:
    | {
        /** データベースに存在する状態の、テンプレートのタイトル。 */
        raw?: string | undefined
        /** 表示用に整形された、テンプレートの HTML タイトル。 */
        rendered?: string | undefined
      }
    | undefined

  /** テンプレートのコンテンツ。 */
  content?:
    | {
        /** データベースに存在する状態のテンプレートのコンテンツ。 */
        raw?: string | undefined
        /** テンプレートが使用するコンテンツブロック形式のバージョン。 */
        block_version?: number | undefined
      }
    | undefined

  /** 投稿のリンクをプレビューします。 */
  preview_link?: string | undefined
}

export type Wp_template_part = {
  /** テンプレートの ID。 */
  id?: string | undefined
  /** テンプレートを識別する固有のスラッグ。 */
  slug?: string | undefined
  /** テンプレートのテーマ固有識別子。 */
  theme?: string | undefined
  /** テンプレートのタイプ */
  type?: string | undefined
  /** テンプレートの元 */
  source?: string | undefined
  /** カスタマイズテンプレートのソース */
  origin?: string | undefined

  /** テンプレートのコンテンツ。 */
  content?:
    | {
        /** データベースに存在する状態のテンプレートのコンテンツ。 */
        raw?: string | undefined
        /** テンプレートが使用するコンテンツブロック形式のバージョン。 */
        block_version?: number | undefined
      }
    | undefined

  /** テンプレートのタイトル。 */
  title?:
    | {
        /** データベースに存在する状態の、テンプレートのタイトル。 */
        raw?: string | undefined
        /** 表示用に整形された、テンプレートの HTML タイトル。 */
        rendered?: string | undefined
      }
    | undefined

  /** テンプレートの説明。 */
  description?: string | undefined
  /** テンプレートの状態。 */
  status?: 'publish' | 'future' | 'draft' | 'pending' | 'private' | 'acf-disabled' | undefined
  /** 投稿 ID。 */
  wp_id?: number | undefined
  /** テンプレートの作成者の ID。 */
  author?: number | undefined
  /** テンプレートパーツの使用を目的とした場所 (ヘッダー、フッター、など) */
  area?: string | undefined
}

export type Wp_template_part_revision = {
  /** リビジョンの投稿者 ID。 */
  author?: number | undefined
  /** リビジョンの公開日 (サイトのタイムゾーン)。 */
  date?: string | undefined
  /** リビジョンの公開日 (GMT)。 */
  date_gmt?: string | undefined
  /** データベースに存在する形態の、リビジョンの GUID。 */
  guid?: string | undefined
  /** リビジョンの固有識別子。 */
  id?: number | undefined
  /** リビジョンの最終更新日 (サイトのタイムゾーン)。 */
  modified?: string | undefined
  /** リビジョンの最終更新日 (GMT)。 */
  modified_gmt?: string | undefined
  /** 親リビジョンの ID。 */
  parent?: number | undefined
  /** そのタイプに特有な、リビジョンの英数字識別子。 */
  slug?: string | undefined

  /** テンプレートのタイトル。 */
  title?:
    | {
        /** データベースに存在する状態の、テンプレートのタイトル。 */
        raw?: string | undefined
        /** 表示用に整形された、テンプレートの HTML タイトル。 */
        rendered?: string | undefined
      }
    | undefined

  /** テンプレートのコンテンツ。 */
  content?:
    | {
        /** データベースに存在する状態のテンプレートのコンテンツ。 */
        raw?: string | undefined
        /** テンプレートが使用するコンテンツブロック形式のバージョン。 */
        block_version?: number | undefined
      }
    | undefined

  /** 投稿のリンクをプレビューします。 */
  preview_link?: string | undefined
}

export type Wp_navigation = {
  /** 投稿のグローバル一意識別子 (GUID)。 */
  guid?:
    | {
        /** データベースに存在する形態の、投稿の GUID。 */
        raw?: string | undefined
        /** 表示用に変換された、投稿の GUID。 */
        rendered?: string | undefined
      }
    | undefined

  /** 投稿の一意識別子。 */
  id?: number | undefined
  /** 投稿の URL。 */
  link?: string | undefined
  /** 投稿の最終更新日 (サイトのタイムゾーン)。 */
  modified?: string | undefined
  /** 投稿の最終更新日 (GMT)。 */
  modified_gmt?: string | undefined
  /** そのタイプに特有な、投稿の英数字識別子。 */
  slug?: string | undefined
  /** 投稿に対して名前がついているステータス。 */
  status?: 'publish' | 'future' | 'draft' | 'pending' | 'private' | 'acf-disabled' | undefined
  /** 投稿タイプ。 */
  type?: string | undefined
  /** コンテンツや抜粋へのアクセスを保護するパスワード。 */
  password?: string | undefined

  /** 投稿のタイトル。 */
  title?:
    | {
        /** データベースに存在する形態の、投稿のタイトル。 */
        raw?: string | undefined
        /** 表示用に整形された、投稿の HTML タイトル。 */
        rendered?: string | undefined
      }
    | undefined

  /** 投稿のコンテンツ。 */
  content?:
    | {
        /** データベースに存在する形態の、投稿のコンテンツ。 */
        raw?: string | undefined
        /** 表示用に変換された、投稿の HTML コンテンツ。 */
        rendered?: string | undefined
        /** 投稿が使用するコンテンツブロック形式のバージョン。 */
        block_version?: number | undefined
        /** コンテンツをパスワードで保護するかどうか。 */
        protected?: boolean | undefined
      }
    | undefined

  /** 投稿を表示するために使用するテーマファイル。 */
  template?: string | undefined
}

export type Wp_navigation_revision = {
  /** リビジョンの投稿者 ID。 */
  author?: number | undefined
  /** リビジョンの公開日 (サイトのタイムゾーン)。 */
  date?: string | undefined
  /** リビジョンの公開日 (GMT)。 */
  date_gmt?: string | undefined

  /** 投稿のグローバル一意識別子 (GUID)。 */
  guid?:
    | {
        /** データベースに存在する形態の、投稿の GUID。 */
        raw?: string | undefined
        /** 表示用に変換された、投稿の GUID。 */
        rendered?: string | undefined
      }
    | undefined

  /** リビジョンの固有識別子。 */
  id?: number | undefined
  /** リビジョンの最終更新日 (サイトのタイムゾーン)。 */
  modified?: string | undefined
  /** リビジョンの最終更新日 (GMT)。 */
  modified_gmt?: string | undefined
  /** 親リビジョンの ID。 */
  parent?: number | undefined
  /** そのタイプに特有な、リビジョンの英数字識別子。 */
  slug?: string | undefined

  /** 投稿のタイトル。 */
  title?:
    | {
        /** データベースに存在する形態の、投稿のタイトル。 */
        raw?: string | undefined
        /** 表示用に整形された、投稿の HTML タイトル。 */
        rendered?: string | undefined
      }
    | undefined

  /** 投稿のコンテンツ。 */
  content?:
    | {
        /** データベースに存在する形態の、投稿のコンテンツ。 */
        raw?: string | undefined
        /** 表示用に変換された、投稿の HTML コンテンツ。 */
        rendered?: string | undefined
        /** 投稿が使用するコンテンツブロック形式のバージョン。 */
        block_version?: number | undefined
        /** コンテンツをパスワードで保護するかどうか。 */
        protected?: boolean | undefined
      }
    | undefined

  /** 投稿のリンクをプレビューします。 */
  preview_link?: string | undefined
}

export type Type = {
  /** 投稿タイプの、人間が読める説明。 */
  description?: string | undefined
  /** 投稿タイプが子を持つことがあるかどうか。 */
  hierarchical?: boolean | undefined
  /** 投稿タイプを表示させるかどうか。 */
  viewable?: boolean | undefined
  /** 投稿タイプのタイトル。 */
  name?: string | undefined
  /** 投稿タイプの英数字の識別子。 */
  slug?: string | undefined
  /** 投稿タイプに関連付けられているタクソノミー。 */
  taxonomies?: string[] | undefined
  /** 投稿タイプの REST ベースルート。 */
  rest_base?: string | undefined
  /** 投稿タイプの REST ルートの名前空間。 */
  rest_namespace?: string | undefined

  /** 投稿タイプの表示設定。 */
  visibility?:
    | {
        /** この投稿タイプを管理するデフォルト UI を生成するかどうか。 */
        show_ui?: boolean | undefined
        /** 投稿タイプをナビゲーションメニューで選択可能にするかどうか。 */
        show_in_nav_menus?: boolean | undefined
      }
    | undefined
}

export type Status = {
  /** ステータスのタイトル。 */
  name?: string | undefined
  /** このステータスの投稿が非公開であるべきかどうか。 */
  private?: boolean | undefined
  /** このステータスの投稿が保護されているかどうか。 */
  protected?: boolean | undefined
  /** このステータスの投稿がサイトのフロントエンドに表示されるべきかどうか。 */
  public?: boolean | undefined
  /** このステータスの投稿を公開クエリー可能にするかどうか。 */
  queryable?: boolean | undefined
  /** 投稿タイプの編集リストに投稿を含むかどうか。 */
  show_in_list?: boolean | undefined
  /** ステータスの英数字の識別子。 */
  slug?: string | undefined
  /** このステータスの投稿に浮動公開日を設定可能かどうか。 */
  date_floating?: boolean | undefined
}

export type Taxonomy = {
  /** 人間が読めるタクソノミーの説明。 */
  description?: string | undefined
  /** このタクソノミーが子を持つことがあるかどうか。 */
  hierarchical?: boolean | undefined
  /** タクソノミーのタイトル。 */
  name?: string | undefined
  /** タクソノミーの英数字の識別子。 */
  slug?: string | undefined
  /** タグクラウドを表示すべきかどうか。 */
  show_cloud?: boolean | undefined
  /** タクソノミーに関連付けられているタイプ。 */
  types?: string[] | undefined
  /** タクソノミーの REST ベースルート。 */
  rest_base?: string | undefined
  /** タクソノミーの REST 名前空間ルート。 */
  rest_namespace?: string | undefined

  /** タクソノミーの表示設定。 */
  visibility?:
    | {
        /** 管理画面から、またはフロントエンドからアクセスするユーザーによるタクソノミーの公開利用を意図するかどうか。 */
        public?: boolean | undefined
        /** タクソノミーが公開でクエリー可能かどうか。 */
        publicly_queryable?: boolean | undefined
        /** このタクソノミーを管理するデフォルト UI を生成するかどうか。 */
        show_ui?: boolean | undefined
        /** 関連付けられた投稿タイプでのテーブルタクソノミーカラムの自動生成を許可するかどうか。 */
        show_admin_column?: boolean | undefined
        /** タクソノミーをナビゲーションメニューで選択可能にするかどうか。 */
        show_in_nav_menus?: boolean | undefined
        /** タクソノミーをクイック/一括編集パネルで表示するかどうか。 */
        show_in_quick_edit?: boolean | undefined
      }
    | undefined
}

export type Category = {
  /** タームの一意識別子。 */
  id?: number | undefined
  /** タームの公開された記事の数。 */
  count?: number | undefined
  /** タームの HTML の説明。 */
  description?: string | undefined
  /** タームの URL。 */
  link?: string | undefined
  /** タームの HTML タイトル。 */
  name?: string | undefined
  /** そのタイプに特有な、タームの英数字識別子。 */
  slug?: string | undefined
  /** タームのタイプ属性。 */
  taxonomy?: 'category' | undefined
  /** 親のターム ID。 */
  parent?: number | undefined

  /** メタフィールド。 */
  meta?: {} | undefined
}

export type Tag = {
  /** タームの一意識別子。 */
  id?: number | undefined
  /** タームの公開された記事の数。 */
  count?: number | undefined
  /** タームの HTML の説明。 */
  description?: string | undefined
  /** タームの URL。 */
  link?: string | undefined
  /** タームの HTML タイトル。 */
  name?: string | undefined
  /** そのタイプに特有な、タームの英数字識別子。 */
  slug?: string | undefined
  /** タームのタイプ属性。 */
  taxonomy?: 'post_tag' | undefined

  /** メタフィールド。 */
  meta?: {} | undefined
}

export type Nav_menu = {
  /** タームの一意識別子。 */
  id?: number | undefined
  /** タームの HTML の説明。 */
  description?: string | undefined
  /** タームの HTML タイトル。 */
  name?: string | undefined
  /** そのタイプに特有な、タームの英数字識別子。 */
  slug?: string | undefined

  /** メタフィールド。 */
  meta?: {} | undefined

  /** メニューに割り当てられた位置。 */
  locations?: string[] | undefined
  /** 自動的にトップレベルのページをこのメニューに追加するかどうか。 */
  auto_add?: boolean | undefined
}

export type User = {
  /** ユーザーの一意識別子。 */
  id?: number | undefined
  /** ユーザーのログイン名。 */
  username?: string | undefined
  /** ユーザーの、ブログ上の表示名。 */
  name?: string | undefined
  /** ユーザーの名。 */
  first_name?: string | undefined
  /** ユーザーの姓。 */
  last_name?: string | undefined
  /** ユーザーのメールアドレス。 */
  email?: string | undefined
  /** ユーザーの URL。 */
  url?: string | undefined
  /** ユーザーの説明。 */
  description?: string | undefined
  /** ユーザーの投稿者 URL。 */
  link?: string | undefined
  /** ユーザーのロケール。 */
  locale?: '' | 'en_US' | 'ja' | undefined
  /** ユーザーのニックネーム。 */
  nickname?: string | undefined
  /** ユーザーの英数字の識別子。 */
  slug?: string | undefined
  /** ユーザーの登録日。 */
  registered_date?: string | undefined
  /** ユーザーに割り当てられた権限グループ。 */
  roles?: string[] | undefined
  /** ユーザーのパスワード (含まれることはありません)。 */
  password?: string | undefined

  /** ユーザーのアバター URL。 */
  avatar_urls?:
    | {
        /** 画像サイズが24ピクセルのアバター URL。 */
        '24'?: string | undefined
        /** 画像サイズが48ピクセルのアバター URL。 */
        '48'?: string | undefined
        /** 画像サイズが96ピクセルのアバター URL。 */
        '96'?: string | undefined
      }
    | undefined

  /** メタフィールド。 */
  meta?: {} | undefined
}

export type Application_password = {
  /** アプリケーションパスワードの一意の識別子。 */
  uuid?: string | undefined
  /** アプリケーションが提供した固有識別用 UUID。UUID v5を URL または DNS の名前空間と共に使うことをおすすめします。 */
  app_id?: string | undefined
  /** アプリケーションパスワードの名称。 */
  name?: string | undefined
  /** 生成されたパスワード。アプリケーション追加後にのみ利用可能になります。 */
  password?: string | undefined
  /** アプリケーションパスワードが生成された日付 (GMT/世界標準時)。 */
  created?: string | undefined
}

export type Comment = {
  /** コメントの一意識別子。 */
  id?: number | undefined
  /** 投稿者がユーザーだった場合の、ユーザーオブジェクトの ID。 */
  author?: number | undefined
  /** コメント投稿者のメールアドレス。 */
  author_email?: string | undefined
  /** コメント投稿者の IP アドレス。 */
  author_ip?: string | undefined
  /** コメント作成者の名前を表示します。 */
  author_name?: string | undefined
  /** コメント投稿者の URL。 */
  author_url?: string | undefined
  /** コメント投稿者のユーザーエージェント。 */
  author_user_agent?: string | undefined

  /** コメントのコンテンツ。 */
  content?:
    | {
        /** データベースに存在する形態の、コメントのコンテンツ。 */
        raw?: string | undefined
        /** 表示用に変換された、コメントの HTML コンテンツ。 */
        rendered?: string | undefined
      }
    | undefined

  /** コメントの公開日 (サイトのタイムゾーン)。 */
  date?: string | undefined
  /** コメントの公開日 (GMT)。 */
  date_gmt?: string | undefined
  /** コメントの URL。 */
  link?: string | undefined
  /** 親コメントの ID。 */
  parent?: number | undefined
  /** 関連投稿オブジェクトの ID。 */
  post?: number | undefined
  /** コメントのステータス。 */
  status?: string | undefined
  /** コメントのタイプ。 */
  type?: string | undefined

  /** コメント投稿者のアバター URL。 */
  author_avatar_urls?:
    | {
        /** 画像サイズが24ピクセルのアバター URL。 */
        '24'?: string | undefined
        /** 画像サイズが48ピクセルのアバター URL。 */
        '48'?: string | undefined
        /** 画像サイズが96ピクセルのアバター URL。 */
        '96'?: string | undefined
      }
    | undefined

  /** メタフィールド。 */
  meta?: {} | undefined
}

export type Search_result = {
  /** オブジェクトのタイトル。 */
  title?: string | undefined
  /** オブジェクトへの URL。 */
  url?: string | undefined
  /** オブジェクトタイプ。 */
  type?: 'post' | 'term' | 'post-format' | undefined
  /** オブジェクトサブタイプ。 */
  subtype?: 'post' | 'page' | 'category' | 'post_tag' | undefined
}

export type Rendered_block = {
  /** レンダリングされたブロック。 */
  rendered?: string | undefined
}

export type Block_type = {
  /** ブロック API のバージョン。 */
  api_version?: number | undefined
  /** ブロックタイプのタイトル。 */
  title?: string | undefined
  /** ブロックタイプを識別する固有の名前。 */
  name?: string | undefined
  /** ブロックタイプの説明。 */
  description?: string | undefined

  /** ブロックの属性。 */
  attributes?: {} | undefined

  /** このタイプのブロックによって提供されるコンテキスト。 */
  provides_context?:
    | {
        [key: string]: string | undefined
      }
    | undefined

  /** このタイプのブロックによって継承されるコンテキスト値。 */
  uses_context?: string[] | undefined

  /** ブロックサポート。 */
  supports?: {} | undefined

  /** ブロックは動的にレンダリングされるか。 */
  is_dynamic?: boolean | undefined
  /** ブロックスタイルバリエーション。 */
  styles?:
    | {
        /** スタイルを識別する固有の名前。 */
        name?: string | undefined
        /** 人が判読可能なスタイルのラベル。 */
        label?: string | undefined
        /** スタイルに必要な CSS クラスを登録するインライン CSS コード。 */
        inline_style?: string | undefined
        /** ブロックスタイルを定義するハンドルを含みます。 */
        style_handle?: string | undefined
      }[]
    | undefined
  /** ブロックバリエーション。 */
  variations?:
    | {
        /** 固有の機械判別可能な名前。 */
        name?: string | undefined
        /** 人間が解読できるバリエーションのタイトル。 */
        title?: string | undefined
        /** 詳細なバリエーションの説明。 */
        description?: string | undefined
        /** 現在のバリエーションがデフォルトのバリエーションかどうかを示します。 */
        isDefault?: boolean | undefined
        /** 例に使用されるインナーブロックのリスト。 */
        innerBlocks?:
          | {
              /** 内部ブロックの名前。 */
              name?: string | undefined
            }[]
          | undefined

        /** ブロックの例。 */
        example?:
          | {
              /** 例に使用されるインナーブロックのリスト。 */
              innerBlocks?:
                | {
                    /** 内部ブロックの名前。 */
                    name?: string | undefined
                  }[]
                | undefined
            }
          | undefined

        /** ブロックキーワード。 */
        keywords?: string[] | undefined
      }[]
    | undefined
  /** ブロックキーワード。 */
  keywords?: string[] | undefined

  /** ブロックの例。 */
  example?:
    | {
        /** 例に使用されるインナーブロックのリスト。 */
        innerBlocks?:
          | {
              /** 内部ブロックの名前。 */
              name?: string | undefined
            }[]
          | undefined
      }
    | undefined
}

export type Wp_global_styles = {
  /** グローバルスタイル構成の ID。 */
  id?: string | undefined

  /** グローバルスタイルバリエーションのタイトル */
  title?:
    | {
        /** データベース内に存在する形での、グローバルスタイルバリエーションのタイトル。 */
        raw?: string | undefined
        /** 表示用に整形された、投稿の HTML タイトル。 */
        rendered?: string | undefined
      }
    | undefined
}

export type Settings = {
  /** サイト名。 */
  title?: string | undefined
  /** サイトのキャッチフレーズ。 */
  description?: string | undefined
  /** サイト URL。 */
  url?: string | undefined
  /** このアドレスは新規ユーザーの通知などサイト管理のために使われます。 */
  email?: string | undefined
  /** 現在地と同じタイムゾーンの都市。 */
  timezone?: string | undefined
  /** 日付文字列の書式。 */
  date_format?: string | undefined
  /** 時刻文字列の書式。 */
  time_format?: string | undefined
  /** 週の始まりの曜日番号。 */
  start_of_week?: number | undefined
  /** WordPress のロケールコード。 */
  language?: string | undefined
  /** :-) や :-P などの顔文字を絵文字に変換します。 */
  use_smilies?: boolean | undefined
  /** デフォルトの投稿カテゴリー。 */
  default_category?: number | undefined
  /** デフォルトの投稿フォーマット。 */
  default_post_format?: string | undefined
  /** 表示する最大投稿数。 */
  posts_per_page?: number | undefined
  /** フロントページに表示する内容 */
  show_on_front?: string | undefined
  /** フロントページに表示するページの ID */
  page_on_front?: number | undefined
  /** 最新の投稿を表示するページの ID */
  page_for_posts?: number | undefined
  /** 新しい記事に対し他のブログからの通知 (ピンバック・トラックバック) を受け付ける。 */
  default_ping_status?: 'open' | 'closed' | undefined
  /** 新しい投稿へのコメントを許可する。 */
  default_comment_status?: 'open' | 'closed' | undefined
  /** サイトロゴ。 */
  site_logo?: number | undefined
  /** サイトアイコン。 */
  site_icon?: number | undefined
}

export type Theme = {
  /** テーマのスタイルシート。テーマを一意に識別します。 */
  stylesheet?: string | undefined
  /** テーマのテンプレート。子テーマの場合、これは親テーマのことを指します。そうではない場合、テーマのスタイルシートと同様です。 */
  template?: string | undefined

  /** テーマ作者。 */
  author?:
    | {
        /** テーマヘッダー内に記載されたテーマ作者名。 */
        raw?: string | undefined
        /** 表示用に変換された、テーマ作者の HTML。 */
        rendered?: string | undefined
      }
    | undefined

  /** テーマ作者のサイト。 */
  author_uri?:
    | {
        /** テーマヘッダー内に記載されたテーマ作者のサイト。 */
        raw?: string | undefined
        /** 表示用に変換された、テーマ作者のサイト。 */
        rendered?: string | undefined
      }
    | undefined

  /** テーマの説明。 */
  description?:
    | {
        /** テーマヘッダー内に記載されたテーマの説明。 */
        raw?: string | undefined
        /** 表示用に整形されたテーマの説明。 */
        rendered?: string | undefined
      }
    | undefined

  /** テーマ名。 */
  name?:
    | {
        /** テーマヘッダー内に記載されたテーマ名。 */
        raw?: string | undefined
        /** 表示用に変換されたテーマ名。 */
        rendered?: string | undefined
      }
    | undefined

  /** テーマが動作する最低必須 PHP バージョン。 */
  requires_php?: string | undefined
  /** テーマが動作する最低必須 WordPress バージョン。 */
  requires_wp?: string | undefined
  /** テーマのスクリーンショット URL。 */
  screenshot?: string | undefined

  /** テーマのスタイルと機能を示すタグ。 */
  tags?:
    | {
        /** テーマヘッダー内に記載されたテーマタグ。 */
        raw?: string[] | undefined
        /** 表示用に変換されたテーマタグ。 */
        rendered?: string | undefined
      }
    | undefined

  /** テーマのテキストドメイン。 */
  textdomain?: string | undefined

  /** テーマが対応する機能。 */
  theme_supports?:
    | {
        /** Whether theme opts in to wide alignment CSS class. */
        'align-wide'?: boolean | undefined
        /** Whether posts and comments RSS feed links are added to head. */
        'automatic-feed-links'?: boolean | undefined
        /** Whether a theme uses block-based templates. */
        'block-templates'?: boolean | undefined

        /** Custom background if defined by the theme. */
        'custom-background'?:
          | {
              'default-image'?: string | undefined
              'default-preset'?: 'default' | 'fill' | 'fit' | 'repeat' | 'custom' | undefined
              'default-position-x'?: 'left' | 'center' | 'right' | undefined
              'default-position-y'?: 'left' | 'center' | 'right' | undefined
              'default-size'?: 'auto' | 'contain' | 'cover' | undefined
              'default-repeat'?: 'repeat-x' | 'repeat-y' | 'repeat' | 'no-repeat' | undefined
              'default-attachment'?: 'scroll' | 'fixed' | undefined
              'default-color'?: string | undefined
            }
          | undefined

        /** Custom header if defined by the theme. */
        'custom-header'?:
          | {
              'default-image'?: string | undefined
              'random-default'?: boolean | undefined
              width?: number | undefined
              height?: number | undefined
              'flex-height'?: boolean | undefined
              'flex-width'?: boolean | undefined
              'default-text-color'?: string | undefined
              'header-text'?: boolean | undefined
              uploads?: boolean | undefined
              video?: boolean | undefined
            }
          | undefined

        /** Custom logo if defined by the theme. */
        'custom-logo'?:
          | {
              width?: number | undefined
              height?: number | undefined
              'flex-width'?: boolean | undefined
              'flex-height'?: boolean | undefined
              'header-text'?: string[] | undefined
              'unlink-homepage-logo'?: boolean | undefined
            }
          | undefined

        /** Whether the theme enables Selective Refresh for Widgets being managed with the Customizer. */
        'customize-selective-refresh-widgets'?: boolean | undefined
        /** Whether theme opts in to the dark editor style UI. */
        'dark-editor-style'?: boolean | undefined
        /** Whether the theme disables custom colors. */
        'disable-custom-colors'?: boolean | undefined
        /** Whether the theme disables custom font sizes. */
        'disable-custom-font-sizes'?: boolean | undefined
        /** Whether the theme disables custom gradients. */
        'disable-custom-gradients'?: boolean | undefined
        /** Whether theme opts in to the editor styles CSS wrapper. */
        'editor-styles'?: boolean | undefined
        /** Post formats supported. */
        formats?: string[] | undefined
        /** Whether the theme supports responsive embedded content. */
        'responsive-embeds'?: boolean | undefined
        /** Whether the theme can manage the document title tag. */
        'title-tag'?: boolean | undefined
        /** Whether theme opts in to default WordPress block styles for viewing. */
        'wp-block-styles'?: boolean | undefined
      }
    | undefined

  /** テーマのウェブページ URI。 */
  theme_uri?:
    | {
        /** テーマヘッダー内に記載されたテーマのウェブページ URI。 */
        raw?: string | undefined
        /** 表示用に変換された、テーマのウェブページ URI。 */
        rendered?: string | undefined
      }
    | undefined

  /** テーマの現在のバージョン。 */
  version?: string | undefined
  /** テーマに対して名前がついているステータス。 */
  status?: 'inactive' | 'active' | undefined
}

export type Plugin = {
  /** プラグインファイル。 */
  plugin?: string | undefined
  /** プラグインの有効化ステータス。 */
  status?: 'inactive' | 'active' | undefined
  /** プラグイン名。 */
  name?: string | undefined
  /** プラグインのサイトアドレス。 */
  plugin_uri?: string | undefined
  /** プラグイン作者のサイトアドレス。 */
  author_uri?: string | undefined

  /** プラグインの説明。 */
  description?:
    | {
        /** 加工されていないプラグインの説明。 */
        raw?: string | undefined
        /** 表示用に整形されたプラグインの説明。 */
        rendered?: string | undefined
      }
    | undefined

  /** プラグインのバージョン番号。 */
  version?: string | undefined
  /** プラグインがサイトネットワーク全体のみで有効化できるかどうか。 */
  network_only?: boolean | undefined
  /** WordPress の最低必須バージョン。 */
  requires_wp?: string | undefined
  /** PHP の最低必須バージョン。 */
  requires_php?: string | undefined
  /** プラグインのテキストドメイン。 */
  textdomain?: string | undefined
}

export type Sidebar = {
  /** サイドバーの ID。 */
  id?: string | undefined
  /** サイドバーを識別する固有の名前。 */
  name?: string | undefined
  /** サイドバーの説明。 */
  description?: string | undefined
  /** ウィジェットインターフェース内のサイドバーに割り当てる外部 CSS クラス。 */
  class?: string | undefined
  /** このサイドバーへの割り当て時に各ウィジェットの HTML 出力に先行する HTML コンテンツ。デフォルトはリスト要素の開始タグ。 */
  before_widget?: string | undefined
  /** このサイドバーへの割り当て時に各ウィジェットの HTML 出力に追加される HTML コンテンツ。デフォルトはリスト要素の終了タグ。 */
  after_widget?: string | undefined
  /** 表示時にサイドバータイトルに先行する HTML コンテンツ。デフォルトは h2 要素の開始タグ。 */
  before_title?: string | undefined
  /** 表示時にサイドバータイトルに追加する HTML コンテンツ。デフォルトは h2 要素の終了タグ。 */
  after_title?: string | undefined
  /** サイドバーの状態。 */
  status?: 'active' | 'inactive' | undefined
}

export type Widget_type = {
  /** ウィジェットタイプを識別する固有のスラッグ。 */
  id?: string | undefined
  /** ウィジェットタイプを識別する人間が読める名前。 */
  name?: string | undefined
  /** ウィジェットの説明。 */
  description?: string | undefined
  /** ウィジェットが複数インスタンスをサポートするかどうか */
  is_multi?: boolean | undefined
  /** クラス名 */
  classname?: string | undefined
}

export type Widget = {
  /** ウィジェットの固有識別子。 */
  id?: string | undefined
  /** ウィジェットのタイプ。widget-types エンドポイントの ID と対応します。 */
  id_base?: string | undefined
  /** ウィジェットが属するサイドバー。 */
  sidebar?: string | undefined
  /** ウィジェットの HTML 表現。 */
  rendered?: string | undefined
  /** ウィジェット管理フォームの HTML 表現。 */
  rendered_form?: string | undefined

  /** サポートしている場合、ウィジェットのインスタンス設定。 */
  instance?:
    | {
        /** インスタンス設定の Base64 エンコード表現。 */
        encoded?: string | undefined
        /** インスタンス設定の暗号化ハッシュ。 */
        hash?: string | undefined
      }
    | undefined

  /** ウィジェット管理フォームから URL エンコードしたフォームデータ。インスタンスをサポートしないウィジェットの更新に使用されます。書き込みのみ。 */
  form_data?: string | undefined
}

export type Block_directory_item = {
  /** ブロック名 (namespace/block-name 形式)。 */
  name?: string | undefined
  /** ブロックタイトル (人間が読める形式)。 */
  title?: string | undefined
  /** ブロックの短い説明 (人間が読める形式)。 */
  description?: string | undefined
  /** ブロックのスラッグ。 */
  id?: string | undefined
  /** ブロックの星評価。 */
  rating?: number | undefined
  /** 評価数。 */
  rating_count?: number | undefined
  /** このブロックを有効化したサイトの数。 */
  active_installs?: number | undefined
  /** 同一作者が公開したブロックの平均評価。 */
  author_block_rating?: number | undefined
  /** 同一作者が公開したブロックの数。 */
  author_block_count?: number | undefined
  /** ブロック作成者の WordPress.org ユーザー名。 */
  author?: string | undefined
  /** ブロックのアイコン。 */
  icon?: string | undefined
  /** ブロック最終更新日。 */
  last_updated?: string | undefined
  /** ブロック最終更新日 (人間が読めるあいまいな形式)。 */
  humanized_updated?: string | undefined
}

export type Pattern_directory_item = {
  /** パターン ID。 */
  id?: number | undefined
  /** パターンタイトル (人間が読める形式)。 */
  title?: string | undefined
  /** パターンのコンテンツ。 */
  content?: string | undefined
  /** パターンのカテゴリースラッグ。 */
  categories?: string[] | undefined
  /** パターンのキーワード。 */
  keywords?: string[] | undefined
  /** パターンの説明。 */
  description?: string | undefined
  /** パターンプレビュー時の viewport の適切な幅。ピクセル単位。 */
  viewport_width?: number | undefined
}

export type Block_pattern = {
  /** パターン名。 */
  name?: string | undefined
  /** パターンタイトル (人間が読める形式)。 */
  title?: string | undefined
  /** パターンの詳細な説明。 */
  description?: string | undefined
  /** インサータープレビューのためのパターンのビューポート幅。 */
  viewport_width?: number | undefined
  /** パターンのコンテンツ。 */
  content?: string | undefined
  /** 挿入ツールでパターンを表示するかどうかを決定します。 */
  inserter?: boolean | undefined
}

export type Block_pattern_category = {
  /** カテゴリー名。 */
  name?: string | undefined
  /** 人間が読める形式のカテゴリーラベル。 */
  label?: string | undefined
}

export type Menu_location = {
  /** このメニュー位置の名称。 */
  name?: string | undefined
  /** このメニュー位置の説明。 */
  description?: string | undefined
  /** 割り当てられたメニューの ID。 */
  menu?: number | undefined
}
