import Module from '../__abstract__/module'
import { qsa } from '../foundation/utils/dom'

const defaults = {
  delay: 0,
  stagger: 0.08,
  selector: '.js-stagger__target',
}

export default class extends Module {
  public itemTarget

  static get targets() {
    return ['item']
  }

  constructor(context) {
    super(context)

    this.options = {
      ...defaults,
      ...this.options,
    }
  }

  connect() {
    console.log(this.itemTarget)

    const targetEls = <HTMLElement[]>qsa(this.options.selector, this.element)

    let i = 0
    const len = targetEls.length

    for (i = 0; i < len; i++) {
      const el = targetEls[i]

      el.style.transitionDelay =
        Number(this.options.delay) + this._setStagger(i) + 's'
    }
  }

  private _setStagger(time: number) {
    return Number(this.options.stagger) * time
  }
}
