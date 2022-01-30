import modular from 'modujs'
import './pjax'
import { loadingManager } from './loadingManager'
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
  leave(): Promise<unknown> | void
}

const app = new modular({
  modules: modules,
})

const state: {
  pjaxIsStarted: boolean
  scope: HTMLElement
  newScene: IScene | undefined
  oldScene: IScene | undefined
} = {
  pjaxIsStarted: false,
  scope: document.body,
  newScene: undefined,
  oldScene: undefined,
}

const once = async (scene: IScene) => {
  loadingManager.loadStart(g.boot as number, manifest)

  globals()
  app.init(app)

  await scene.enter()
  state.newScene = scene
}

on(LOADING_TIMEOUT, () => {
  document.body.classList.replace('is-domLoading', 'is-domLoaded')
})

on(LOADING_DONE, () => {
  document.body.classList.replace('is-domLoading', 'is-domLoaded')
})

on(PJAX_LEAVE, async ({ from }) => {
  state.oldScene = state.newScene as IScene
  state.oldScene.leave()

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

const sceneManager = {
  goto: async (scene: IScene) => {
    if (!state.pjaxIsStarted) {
      await once(scene)
      state.pjaxIsStarted = true
    } else {
      await scene.enter(state.scope)
      state.newScene = scene
    }

    emit(AFTER_PAGE_READY)
  },
}

Object.freeze(sceneManager)

class SceneManager {
  private static _instance = new SceneManager()

  private _pjaxIsStarted = false
  private _scope!: HTMLElement
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
      this._oldScene.leave()

      app.destroy(from)
    })

    on(PJAX_ENTER, ({ to }) => {
      const namespace = to.dataset.routerView

      document.body.dataset.page = namespace
      window.scrollTo(0, 0)

      app.update(to)

      this._scope = to
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
    if (!this._pjaxIsStarted) {
      await this._once(scene)
      this._pjaxIsStarted = true
    } else {
      await scene.enter(this._scope)
      this._newScene = scene
    }

    emit(AFTER_PAGE_READY)
  }
}

export { SceneManager, sceneManager }
