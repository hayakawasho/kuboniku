import Abstract from '../_AbstractModule'
import { Core } from './core'
import { WINDOW_RESIZE } from '@/const'
import { bus } from '@/lib'

export default class extends Abstract {
  readonly _core = Core.create()

  init() {
    const canvas = this.$$('canvas')[0] as HTMLCanvasElement
    const { width, height } = this.el.getBoundingClientRect()

    this._core.resize(width, height)
    this._core.init(canvas)

    // bus.on(WINDOW_RESIZE, this.onResize)
  }

  onResize = () => {
    // this._core.resize(window.innerWidth, vh)
  }

  loop() {
    this.render()
  }

  render() {
    this._core.render()
  }
}
