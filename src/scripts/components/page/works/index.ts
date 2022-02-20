import type { SvelteComponent } from 'svelte'
import LoadmoreApp from './loadmore.svelte'
import { repositoryFactory } from '@/components/model/repositoryFactory'
import Abstract from '@/components/page/_AbstractPage'

export default class extends Abstract {
  private _app!: SvelteComponent
  readonly worksRepo = repositoryFactory.works

  init() {
    const $wrap = this.$$('.js-works')[0]

    this._app = new LoadmoreApp({
      target: $wrap,
      props: {
        posts: [],
        total: Number($wrap.dataset.total),
        worksRepo: this.worksRepo,
        initialCount: 1,
      },
    })

    this._app.$on('worksindex:updated', () => {
      //
    })
  }

  destroy() {
    // transitionの秒数、破棄するのを待つ
    setTimeout(() => {
      this._app.$destroy()
    }, 700)
  }
}
