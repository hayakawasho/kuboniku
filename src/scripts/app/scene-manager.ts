import modular from 'modujs'
import './pjax'
import { loadingManager } from './loading-manager'
import { manifest } from './manifest'
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

export interface IScene {
  enter(scope?: HTMLElement): Promise<unknown>
  leave(): Promise<unknown>
}

const app = new modular({
  modules: modules,
})

const state = {
  pjaxIsStarted: false,
  scope: document.body,
}

class SceneManager {
  private static _instance = new SceneManager()

  private _newScene!: IScene
  private _oldScene!: IScene

  private constructor() {
    on(LOADING_TIMEOUT, () => {
      document.body.classList.replace('is-domLoading', 'is-domLoaded')
    })

    on(LOADING_DONE, () => {
      document.body.classList.replace('is-domLoading', 'is-domLoaded')
    })

    on(PJAX_LEAVE, async ({ from }) => {
      this._oldScene = this._newScene
      await this._oldScene.leave()

      app.destroy(from)
    })

    on(PJAX_ENTER, ({ to }) => {
      const namespace = to.dataset.routerView

      document.body.dataset.page = namespace
      window.scrollTo(0, 0)

      app.update(to)

      state.scope = to
      router.processCurrentPath()
    })
  }

  static create() {
    return SceneManager._instance
  }

  private _once = async (scene: IScene) => {
    loadingManager.loadStart(g.boot as number, manifest)

    globals()
    app.init(app)

    await scene.enter()
    this._newScene = scene
  }

  goto = async (scene: IScene) => {
    if (!state.pjaxIsStarted) {
      await this._once(scene)
      state.pjaxIsStarted = true
    } else {
      await scene.enter(state.scope)
      this._newScene = scene
    }

    emit(AFTER_PAGE_READY)
  }
}

export { SceneManager }
