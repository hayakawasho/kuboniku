import Module from '../__abstract__/module'
import { EVENTS } from '../foundation/constants/const'
import E from '../foundation/utils/E';

const defaults = {
  val: 1
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
			...this.options
		}

    this.state = {
      resizing: false,
      current: 0,
      ww: window.innerWidth,
      wh: window.innerHeight
    }

    E.bindAll(this, ['_handleScroll', '_handleResize']);

  }

  initialize() {
    this._setCache();
  }

  connect() {
    this._addListener();
  }

  disconnect() {
    this._removeListener();
  }

  private _addListener() {
    E.on(EVENTS.SCROLL, this._handleScroll);
    E.on(EVENTS.RESIZE, this._handleResize);
  }

  private _removeListener() {
    E.off(EVENTS.SCROLL, this._handleScroll);
    E.off(EVENTS.RESIZE, this._handleResize);
  }

  private _handleScroll({ scrollPos, smoothScrollPos }) {
    this.state.current = smoothScrollPos;
    this._transformElems(scrollPos, smoothScrollPos)
  }

  private _handleResize({ width, height }) {
    const state = this.state;

    this.state.resizing = true;

    state.wh = height
    state.ww = width

    this._updateCache();

    this.state.resizing = false;
  }

  private _setCache() {
    this.cache = this.itemTargets.reduce((acc, cur: HTMLElement, index) => {
      const { top, bottom, height } = this._getVars(cur);

      acc.push({
        el: cur,
        top,
        bottom,
        height,
      })
      return acc
    }, []);

  }

  private _updateCache() {
    this.cache.forEach((item, index) => {
      const { el } = item

      el.style.transform = 'translate3d(0, 0, 0)'

      const { top, bottom, height } = this._getVars(el);

      Object.assign(item, {
        top,
        bottom,
        height,
      })
    })
  }

  private _getVars(el) {
    const { height, top, bottom } = el.getBoundingClientRect();

    return {
      height,
      top,
      bottom,
    }
  }

  private _transformElems(scrollPos: number, smoothScrollPos: number) {
    const { ww } = this.state;

    const diff = (scrollPos - smoothScrollPos);
    const acc = diff / ww;
    const velo = + acc;
    const skew = velo * -7.5 * this.options.val;

    this.cache.forEach((item) => {
      item.el.style.transform = `
        translate3d(0, 0, 0) skewY(${skew}deg)
      `;
    })
  }
}
