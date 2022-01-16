import type { IScene } from '@/app/scene-manager'
// import { EVENTS } from '@/const'
import { gsap } from '@/lib'

export default abstract class implements IScene {
  root!: HTMLElement
  $!: gsap.utils.SelectorFunc

  constructor() {
    this.onAfterPageReady = this.onAfterPageReady.bind(this)
  }

  protected onAfterPageReady() {
    //
  }

  async enter(rootContext = document.body) {
    this.root = rootContext
    this.$ = gsap.utils.selector(this.root)
  }

  leave() {
    //
  }
}
