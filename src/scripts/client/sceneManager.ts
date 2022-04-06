import globals from './globals'
import { loader } from './loader'
import { assetsManifest } from './manifest'
import GLWorld from '@/components/GLWorld/index.svelte'
import Menu from '@/components/Menu.svelte'
import Sns from '@/components/Sns.svelte'
import {
  AFTER_PAGE_READY,
  PJAX_ENTER,
  LOADING_DONE,
  LOADING_TIMEOUT,
  PJAX_LEAVE,
} from '@/const'
import { g } from '@/env'
import {
  eventbus,
  router,
  withSvelte,
  defineComponent,
  onSetup,
} from '@/foundation'

export interface IScene {
  enter(scope?: HTMLElement): Promise<unknown>
  leave(): Promise<unknown> | void
  scope: HTMLElement
}

class SceneManager {
  static #instance = new SceneManager()

  #pjaxIsStarted = false
  #scope!: HTMLElement
  #newScene!: IScene

  private constructor() {
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
    })

    eventbus.on(PJAX_ENTER, ({ to }) => {
      const namespace = to.dataset.routerView

      document.body.dataset.page = namespace
      window.scrollTo(0, 0)

      this.#scope = to

      router.rerun()
    })
  }

  static create() {
    return SceneManager.#instance
  }

  #once = async (scene: IScene) => {
    const now = g.bootstart
    loader.loadStart(now, assetsManifest)

    globals()

    defineComponent('Sns', withSvelte(Sns))
    defineComponent('GLWorld', withSvelte(GLWorld))
    defineComponent('Menu', withSvelte(Menu))

    onSetup()

    await Promise.all([
      import('lazysizes'),
      await scene.enter(),
      import('../components/Pjax'),
    ])
  }

  gotoScene = async (scene: IScene) => {
    if (this.#pjaxIsStarted) {
      await scene.enter(this.#scope)
    } else {
      await this.#once(scene)
      this.#pjaxIsStarted = true
    }

    this.#newScene = scene

    eventbus.emit(AFTER_PAGE_READY)
  }
}

const createSceneManager = () => {
  return SceneManager.create()
}

export { createSceneManager }
