import modular from 'modujs'
import { loadingManager } from './loading-manager'
import { manifest } from './manifest'
import './pjax'
import { router } from './router'
import {
  AFTER_PAGE_READY,
  PJAX_LEAVE,
  PJAX_ENTER,
  LOADING_DONE,
  LOADING_TIMEOUT,
} from '@/const'
import { g } from '@/env'
import globals from '@/globals'
import { emit, on } from '@/lib'
import * as modules from '@/modules'
// import { Utils } from '@/utils'

export interface IScene {
  enter(scope?: HTMLElement): Promise<void>
  leave(): Promise<void>
}

const app = new modular({
  modules: modules,
})

class SceneManager {
  _pjaxIsStarted = false
  _scope!: HTMLElement
  _newScene!: IScene
  _oldScene!: IScene | undefined

  constructor() {
    on(PJAX_LEAVE, ({ from }) => {
      app.destroy(from)
    })

    on(PJAX_ENTER, ({ to }) => {
      const newEl = to
      const namespace = newEl.dataset.routerView

      this._scope = newEl
      document.body.dataset.page = namespace
      window.scrollTo(0, 0)

      router.processCurrentPath()
    })

    on(LOADING_TIMEOUT, () => {
      //
    })

    on(LOADING_DONE, () => {
      document.body.classList.replace('is-domLoading', 'is-domLoaded')
    })
  }

  goto = async (scene: IScene) => {
    if (!this._pjaxIsStarted) {
      await this._once(scene)
      this._newScene = scene
    } else {
      this._oldScene = this._newScene
      await this._oldScene.leave()

      this._newScene = scene
      await this._newScene.enter(this._scope)

      emit(AFTER_PAGE_READY)
    }
  }

  _once = async (scene: IScene) => {
    const { bootup } = g
    loadingManager.loadStart(bootup as number, manifest)

    globals()
    app.init(app)

    await scene.enter()
    this._pjaxIsStarted = true
  }
}

const sceneManager = new SceneManager()
export { sceneManager }
