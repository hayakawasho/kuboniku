import { Core } from './core'
import Abstract from '@/_abstract/_module'
import { WINDOW_RESIZE } from '@/const'
import { eventbus } from '@/lib/eventbus'

export default class extends Abstract {
  readonly _core = Core.create()

  init() {
    const canvas = this.$$('canvas')[0] as HTMLCanvasElement
    const { width, height } = this.el.getBoundingClientRect()

    this._core.resize(width, height)
    this._core.init(canvas)

    eventbus.on(WINDOW_RESIZE, this.onResize)
  }

  onResize = ({ vh }: { vh: number }) => {
    this._core.resize(window.innerWidth, vh)
  }

  loop() {
    this.render()
  }

  render() {
    this._core.render()
  }
}
