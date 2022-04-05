import type { IScene } from '@/client/sceneManager'
import { q } from '@/foundation'

export default abstract class implements IScene {
  scope!: HTMLElement
  q!: typeof q
  // #children!: any[]

  static exec: () => IScene

  /**
   * DO NOT OVERWRITE
   */
  enter = async (scope = document.body) => {
    this.scope = scope
    this.q = q
    // this.#children = children

    this.init()
  }

  /**
   * DO NOT OVERWRITE
   */
  leave = async () => {
    // this.#children.forEach(c => c.destroy())

    this.destroy()
  }

  protected init() {} // eslint-disable-line @typescript-eslint/no-empty-function
  protected destroy() {} // eslint-disable-line @typescript-eslint/no-empty-function
}
