import { assert } from './assert'
import { getNodeDataType } from './html'
import { q } from './selector'

class Lake {
  definitions = new Map<string, [any, any[]]>()

  static create() {
    return new Lake()
  }

  define = <T>(id: string, fn: T, deps = []) => {
    this.definitions.set(id, [fn, deps])
  }

  require = (id: string) => {
    return this.definitions.get(id)
  }
}

const __ = Lake.create()

export const lake = __.definitions
export const define = __.define
export const require = __.require

export function onInit() {
  //
}

export function onDestroy() {
  //
}
