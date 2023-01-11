import type { RefElement as _ } from 'lake'
/*
import { defineComponent } from 'lake'


function getVars(el: RefElement) {
  const { height, top, bottom } = el.getBoundingClientRect()

  return {
    height,
    top,
    bottom,
  }
}

function setCache() {

}

export default defineComponent({
  components: {},

  props: {},

  setup(el, props) {

    const update = () => {

    }
  },
})
*/

/**

import Module from '../__abstract__/module'
import { EVENTS } from '../common/constants/const'
import E from '../common/utils/E'
const defaults = {
  val: 1,
}
export default class extends Module {
  private cache: any[] = []
  private state
  static get targets() {
    return ['item']
  }
  constructor(context) {
    super(context)
    this.options = {
      ...defaults,
      ...this.options,
    }
    this.state = {
      resizing: false,
      current: 0,
      ww: window.innerWidth,
      wh: window.innerHeight,
    }
    E.bindAll(this, ['_handleScroll', '_handleResize'])
  }
  initialize() {
    this._setCache()
  }
  private _handleScroll({ scrollPos, smoothScrollPos }) {
    this.state.current = smoothScrollPos
    this._transformElems(scrollPos, smoothScrollPos)
  }
  private _handleResize({ width, height }) {
    const state = this.state
    this.state.resizing = true
    state.wh = height
    state.ww = width
    this._updateCache()
    this.state.resizing = false
  }

  private _setCache() {
    this.cache = (this as any).itemTargets.reduce(
      (acc, cur: HTMLElement, index) => {
        const { top, bottom, height } = this._getVars(cur)
        acc.push({
          el: cur,
          top,
          bottom,
          height,
        })
        return acc
      },
      []
    )
  }
  private _updateCache() {
    this.cache.forEach((item, index) => {
      const { el } = item
      el.style.transform = 'translate3d(0, 0, 0)'
      const { top, bottom, height } = this._getVars(el)
      Object.assign(item, {
        top,
        bottom,
        height,
      })
    })
  }
}

*/
