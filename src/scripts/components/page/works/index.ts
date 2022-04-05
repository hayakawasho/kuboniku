import type { SvelteComponent } from 'svelte'
import LoadmoreApp from './loadmore.svelte'
import { repositoryFactory } from '@/components/model/repositoryFactory'
import Abstract from '@/components/page/_AbstractPage'
// import type { Scene } from '@/featureModules/initializeApp/sceneManager'
// import { Do } from '@/lib'

// export const Work: Scene = Do(() => {
//   let scope = document.body
//
//   const enter = async (el: HTMLElement) => {
//     scope = el
//   }
//
//   const leave = () => {}
//
//   return {
//     enter,
//     leave,
//   }
// })

export class WorksPage extends Abstract {
  #app!: SvelteComponent
  readonly #worksRepo = repositoryFactory.works

  static exec() {
    return new WorksPage()
  }

  init() {
    const $wrap = this.q('.js-works')[0]

    this.#app = new LoadmoreApp({
      target: $wrap,
      props: {
        posts: [],
        total: Number($wrap.dataset.total),
        worksRepo: this.#worksRepo,
        initialCount: 1,
      },
    })

    this.#app.$on('worksindex:updated', () => {
      //
    })
  }

  destroy() {
    // transitionの秒数、破棄するのを待つ
    setTimeout(() => {
      this.#app.$destroy()
    }, 700)
  }
}
