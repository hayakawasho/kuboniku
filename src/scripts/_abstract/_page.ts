import type { IScene } from '@/app/scene-manager'
import { gsap } from '@/lib'

export default abstract class implements IScene {
  scope!: HTMLElement
  $$!: gsap.utils.SelectorFunc

  /**
   * DO NOT OVERWRITE
   */
  enter = async (scope = document.body) => {
    this.scope = scope
    this.$$ = gsap.utils.selector(this.scope)

    this.init()
  }

  /**
   * DO NOT OVERWRITE
   */
  leave = async () => {
    this.destroy()
  }

  /**
   * @abstract
   */
  init() {} // eslint-disable-line @typescript-eslint/no-empty-function

  /**
   * @abstract
   */
  destroy() {} // eslint-disable-line @typescript-eslint/no-empty-function
}
