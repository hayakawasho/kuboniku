import { create } from './lake'

const __lake = create()

export const lake = __lake.definitions
export const define = __lake.define
export const require = __lake.require
export const onInit = __lake.onInit
export const onDestroy = __lake.onDestroy

export * from './withSvelte'
