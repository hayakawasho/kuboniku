import type { IScene } from '@/app/scene-manager'
import { gsap } from '@/lib'

export default abstract class implements IScene {
  scope!: HTMLElement
  $$!: gsap.utils.SelectorFunc

  /**
   * @abstract
   */
  enter = async (scope = document.body) => {
    this.scope = scope
    this.$$ = gsap.utils.selector(this.scope)
  }

  /**
   * @abstract
   */
  leave = async () => {
    //
  }
}
