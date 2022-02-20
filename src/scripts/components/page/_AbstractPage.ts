import { gsap } from 'gsap'
import type { IScene } from '@/features/initializeApp/sceneManager'

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

  protected init() {} // eslint-disable-line @typescript-eslint/no-empty-function
  protected destroy() {} // eslint-disable-line @typescript-eslint/no-empty-function
}
