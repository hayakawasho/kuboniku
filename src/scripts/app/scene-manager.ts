import modular from 'modujs'
import { bootService } from './boot-machine'
import './pjax'
import { router } from './router'
import {
  AFTER_PAGE_READY,
  PJAX_LEAVE,
  PJAX_ENTER,
  LOADING_DONE,
  LOADING_TIMEOUT,
} from '@/const'
import globals from '@/globals'
import { emit, on } from '@/lib'
import * as modules from '@/modules'

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
    on(LOADING_TIMEOUT, () => {
      bootService.send({ type: 'TIMEOUT' })
    })

    on(LOADING_DONE, () => {
      bootService.send({ type: 'NEXT' })
    })

    on(PJAX_LEAVE, async ({ from }) => {
      this._oldScene = this._newScene
      await this._oldScene.leave()

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

  _once = async (scene: IScene) => {
    bootService.send({ type: 'NEXT' })

    globals()
    app.init(app)

    await scene.enter()
    this._newScene = scene
  }
}

const sceneManager = new SceneManager()
export { sceneManager }
