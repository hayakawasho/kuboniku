import { create } from './lake'

const ___ = create()

export const lake = ___.definitions
export const define = ___.define
export const require = ___.require
export const onInit = ___.onInit
export const onDestroy = ___.onDestroy

export * from './withSvelte'
