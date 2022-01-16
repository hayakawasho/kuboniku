import modular from 'modujs'
import { loadingManager } from './loading-manager'
import { manifest } from './manifest'
import { H } from './pjax'
import { router } from './router'
import { EVENTS } from '@/const'
import { g } from '@/env'
import globals from '@/globals'
import { emit } from '@/lib'
import * as modules from '@/modules'
import { Utils } from '@/utils'

export const app = new modular({
  modules: modules,
})

export interface IScene {
  enter(rootContext?: HTMLElement): Promise<void>
  leave(): void | Promise<void>
}

class SceneManager {
  _pjaxIsStarted = false
  _scope!: HTMLElement
  _newScene!: IScene
  _oldScene!: IScene | undefined

  constructor() {
    this._pjaxEvents()
  }

  goto = async (scene: IScene, { isHome = false }: { isHome?: boolean }) => {
    if (!this._pjaxIsStarted) {
      await this._once(scene)
      this._newScene = scene
    } else {
      this._oldScene = this._newScene
      this._oldScene.leave()
      app.destroy(this._oldScene)

      await scene.enter(this._scope)

      this._newScene = scene
      emit(EVENTS.AFTER_PAGE_READY)
    }
  }

  _once = async (scene: IScene) => {
    const now = performance.now()
    loadingManager.loadStart(now, manifest)

    globals()
    app.init(app)

    await scene.enter()
    this._pjaxIsStarted = true
  }

  _pjaxEvents() {
    H.on('NAVIGATE_IN', ({ to }: any) => {
      const newEl = to.view
      const namespace = newEl.dataset.routerView

      this._scope = newEl
      document.body.dataset.page = namespace
      window.scrollTo(0, 0)

      router.processCurrentPath()
    })
  }
}

const sceneManager = new SceneManager()
export { sceneManager }
