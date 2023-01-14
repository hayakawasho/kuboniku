/* eslint-disable */
import type * as Types from '../../../@types'

export type Methods = {
  get: {
    query?: {
      /** 1つ以上のステータスが割り当てられたテーマに結果を絞り込む。 */
      status?: string | undefined
    } | undefined

    status: 200
    /** OK */
    resBody: Types.Theme
  }
}
