import modular from 'modujs'
import * as modules from '../../modules'
import globals from './global'
import { loadingManager } from './loadingManager'
import { manifest } from './manifest'
import { eventbus, router } from '@/lib'
import {
  AFTER_PAGE_READY,
  PJAX_LEAVE,
  PJAX_ENTER,
  LOADING_DONE,
  LOADING_TIMEOUT,
} from 'const'
import { g } from 'env'

export interface IScene {
  enter(scope?: HTMLElement): Promise<unknown>
  leave(): Promise<unknown> | void
  scope: HTMLElement
}

const app = new modular({
  modules,
})

class SceneManager {
  private static _instance = new SceneManager()

  #pjaxIsStarted = false
  #scope!: HTMLElement
  #newScene!: IScene

  constructor() {
    const doneLoading = () => {
      document.body.classList.replace('is-domLoading', 'is-domLoaded')
    }

    eventbus.on(LOADING_TIMEOUT, () => {
      doneLoading()
    })

    eventbus.on(LOADING_DONE, () => {
      doneLoading()
    })

    eventbus.on(PJAX_LEAVE, async ({ from }) => {
      const oldScene = this.#newScene
      oldScene.leave()

      app.destroy(from)
    })

    eventbus.on(PJAX_ENTER, ({ to }) => {
      const namespace = to.dataset.routerView
      document.body.dataset.page = namespace
      window.scrollTo(0, 0)

      app.update(to)

      this.#scope = to
      router.processCurrentPath()
    })
  }

  static create() {
    return SceneManager._instance
  }

  #once = async (scene: IScene) => {
    const now: number = g.bootstart
    loadingManager.loadStart(now, manifest)

    globals()
    app.init(app)

    await Promise.all([
      import('current-device'),
      import('lazysizes'),
      import('@/features/pjax'),
      scene.enter(),
    ])

    this.#newScene = scene
  }

  goto = async (scene: IScene) => {
    if (!this.#pjaxIsStarted) {
      await this.#once(scene)
      this.#pjaxIsStarted = true
    } else {
      await scene.enter(this.#scope)
      this.#newScene = scene
    }

    eventbus.emit(AFTER_PAGE_READY)
  }
}

const createSceneManager = () => {
  return SceneManager.create()
}

export { createSceneManager }
