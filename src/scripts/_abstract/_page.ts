import type { IScene } from '@/app/scene-manager'
import { gsap } from '@/lib'

export default abstract class implements IScene {
  scope!: HTMLElement
  $!: gsap.utils.SelectorFunc

  constructor() {
    this.onAfterPageReady = this.onAfterPageReady.bind(this)
  }

  /**
   * @abstract
   */
  protected onAfterPageReady() {
    //
  }

  /**
   * @abstract
   */
  enter = async (scope = document.body) => {
    this.scope = scope
    this.$ = gsap.utils.selector(this.scope)
  }

  /**
   * @abstract
   */
  leave() {
    //
  }
}
