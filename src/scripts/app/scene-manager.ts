import { manifest } from '../manifest'
import { loadingManager } from './loading-manager'
import { H } from './pjax'
import { router } from './router'
import { Utils } from '../utils'
import { g } from '../env'
import { app } from '../../entry'

export interface IScene {
  enter(rootContext?: HTMLElement): Promise<void>
  leave(): void | Promise<void>
}

class SceneManager {
  _pjaxIsStarted = false
  _rootContext!: HTMLElement
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
      await this._oldScene.leave()
      app.destroy(this._oldScene)

      await scene.enter(this._rootContext)

      this._newScene = scene
      // E.emit(EVENTS.AFTER_PAGE_READY)
    }
  }

  _once = async (scene: IScene) => {
    const now = performance.now()
    loadingManager.loadStart(now, manifest)

    await scene.enter()
    this._pjaxIsStarted = true
  }

  _pjaxEvents() {
    H.on('NAVIGATE_IN', ({ to }: any) => {
      const newEl = to.view
      const namespace = newEl.dataset.routerView

      this._rootContext = newEl

      document.body.dataset.page = namespace
      window.scrollTo(0, 0)

      router.processCurrentPath()
    })
  }
}

const sceneManager = new SceneManager()
export { sceneManager }
