/* eslint-disable */
import type * as Types from '../../../../@types'

export type Methods = {
  get: {
    query?: {
      /** このリクエストが作成されたスコープ。レスポンスに含まれるフィールドはスコープにより異なります。 */
      context?: edit | undefined
      /** ブロックの属性。 */
      attributes?: string | undefined
      /** 投稿コンテキストの ID。 */
      post_id?: string | undefined
    } | undefined

    status: 200
    /** OK */
    resBody: Types.Rendered_block
  }

  post: {
    status: 200
    /** OK */
    resBody: Types.Rendered_block
    reqFormat: URLSearchParams

    reqBody: {
      /** このリクエストが作成されたスコープ。レスポンスに含まれるフィールドはスコープにより異なります。 */
      context: string
      /** 投稿コンテキストの ID。 */
      post_id: number
    }
  }
}
