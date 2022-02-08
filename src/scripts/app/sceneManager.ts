import modular from 'modujs'
import './pjax'
import { manifest } from '../manifest'
import { loadingManager } from './loadingManager'
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
import { eventBus } from '@/lib'
import * as modules from '@/modules'

export interface IScene {
  enter(scope?: HTMLElement): Promise<unknown>
  leave(): Promise<unknown> | void
  scope: HTMLElement
}

const app = new modular({
  modules: modules,
})

class SceneManager {
  private static _instance = new SceneManager()

  private _pjaxIsStarted = false
  private _scope!: HTMLElement
  private _newScene!: IScene

  constructor() {
    const fin = () => {
      document.body.classList.replace('is-domLoading', 'is-domLoaded')
    }

    eventBus.on(LOADING_TIMEOUT, () => {
      fin()
    })

    eventBus.on(LOADING_DONE, () => {
      fin()
    })

    eventBus.on(PJAX_LEAVE, async ({ from }) => {
      const oldScene = this._newScene
      oldScene.leave()

      app.destroy(from)
    })

    eventBus.on(PJAX_ENTER, ({ to }) => {
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
    const now: number = g.bootstart
    loadingManager.loadStart(now, manifest)

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

    eventBus.emit(AFTER_PAGE_READY)
  }
}

const createSceneManager = () => {
  return SceneManager.create()
}

export { createSceneManager }
