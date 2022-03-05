import type { IScene } from '@/featureModules/initializeApp/sceneManagerr'

export default abstract class implements IScene {
  scope!: HTMLElement

  /**
   * DO NOT OVERWRITE
   */
  enter = async (scope = document.body) => {
    this.scope = scope

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
