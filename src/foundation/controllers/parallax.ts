import Module from '../__abstract__/module'
import { EVENTS } from '~/foundation/constants/const'
import E from '~/foundation/utils/E'
import Utils from '~/foundation/utils/Utils'

export default class extends Module {
  private cache
  private state
  static targets = ['item']
  private _observer

  constructor(context) {
    super(context)

    this.state = {
      target: 0,
      resizing: false,
      current: 0,
      ww: window.innerWidth,
      wh: window.innerHeight,
    }

    E.bindAll(this, ['_handleScroll', '_handleResize'])
  }

  initialize() {
    this._setCache()
    this._addListener()

    this._createObserver()
    this._runObserve()
  }

  disconnect() {
    this._removeListener()
    this._observer.disconnect()
    this._observer = null
  }

  private _addListener() {
    E.on(EVENTS.SCROLL, this._handleScroll)
    E.on(EVENTS.RESIZE, this._handleResize)
  }

  private _removeListener() {
    E.off(EVENTS.SCROLL, this._handleScroll)
    E.off(EVENTS.RESIZE, this._handleResize)
  }

  private _runObserve() {
    this.cache.forEach(cache => {
      this._observer.observe(cache.el)
    })
  }

  private _createObserver() {
    this._observer = new IntersectionObserver(this._handleObserver.bind(this))
  }

  private _handleObserver(entries) {
    entries.forEach(async entry => {
      const i = (this as any).itemTargets.indexOf(entry.target)
      const cache = this.cache[i]

      if (entry.isIntersecting) {
        cache.el.classList.add('is-visible')
        await Utils.nextTick()
        cache.out = false
      } else {
        cache.el.classList.remove('is-visible')
        await Utils.nextTick()
        cache.out = true
      }
    })
  }

  private _handleScroll({ smoothScrollPos }) {
    this.state.current = smoothScrollPos
    this._animate()
  }

  private _handleResize({ width, height }) {
    const state = this.state

    this.state.resizing = true

    state.wh = height
    state.ww = width

    this._updateCache()
    this._animate()

    this.state.resizing = false
  }

  private _setCache() {
    this.cache = []

    this.cache = (this as any).itemTargets.reduce((acc, cur: HTMLElement) => {
      const { top, height } = cur.getBoundingClientRect()

      acc.push({
        el: cur,
        top,
        height,
        out: true,
        threshold: -(height - cur.parentElement.offsetHeight),
        scale: cur.dataset.parallax === 'scale',
      })

      cur.style.transform = 'translate3d(0, 0, 0)'

      return acc
    }, [])
  }

  private _updateCache() {
    const { current } = this.state

    this.cache.forEach(item => {
      const { el } = item
      const { top, height } = el.getBoundingClientRect()

      Object.assign(item, {
        threshold: -(height - el.parentElement.offsetHeight),
        top: top - current,
        height,
      })
    })
  }

  private _animate() {
    const { current, wh } = this.state
    const scrollBottom = -current + wh

    this.cache.forEach((item, index) => {
      if (!item.out) {
        const { top, height, el, threshold } = item
        const val = (scrollBottom - top) / (wh + height)
        let trans = `translate3d(0, ${-threshold * val}px, 0)`

        if (item.scale) {
          const scaleVal = 1.1 - 0.1 * val
          trans += ` scale3d(${scaleVal}, ${scaleVal}, ${scaleVal})`
        }

        el.style.transform = trans
      }
    })
  }
}
