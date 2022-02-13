import { round } from 'lodash-es'
import Abstract from 'abstract/abstractModule'
import { lerp } from 'utils'

const EASE = 0.14
const THRESHOLD = 100

export default class extends Abstract {
  init() {
    //
  }

  destroy() {
    //
  }

  _run = ({ frame }) => {
    if (!this._isReady && frame % 2 === 0) return

    const { val } = this.$scroll

    this._last = lerp(this._last, val, EASE)
    this._last < 0.1 && (this._last = 0)

    const diff = val - this._last
    const acc = round(diff / this.$store.state.windowWidth, 2)
    const velo = +acc
    const skewY = velo * 5.5 * -1

    this._cache.forEach(item => {
      const { top, bottom, el } = item
      const isVisible = this._isVisible(top, bottom)

      if (isVisible || this._isResizing) {
        item.out = false
        gsap.set(el, {
          skewY,
        })
      } else if (!item.out) {
        item.out = true
      }
    })
  }

  _setCache() {
    this._cache = this._targetDoms.reduce((acc, cur) => {
      const { top, bottom } = cur.getBoundingClientRect()
      acc.push({
        el: cur,
        top,
        bottom,
        out: true,
      })
      return acc
    }, [])
  }

  _updateCache() {
    this._cache.forEach(item => {
      const { el } = item

      gsap.set(el, {
        clearProps: 'transform',
      })

      const { top, bottom } = el.getBoundingClientRect()

      Object.assign(item, {
        top,
        bottom,
      })
    })
  }

  _isVisible(top: number, bottom: number) {
    const { val } = this.$scroll

    const start = top - val
    const end = bottom - val
    const isVisible =
      start < THRESHOLD + this.$store.state.windowHeight && end > -THRESHOLD

    return isVisible
  }

  _onResize = () => {
    this._isResizing = true
    this._updateCache()
    this._isResizing = false
  }
}
