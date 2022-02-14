import type { SvelteComponent } from 'svelte'
import App from './index.svelte'
import type { IWorksRepo } from '@/components/model/works'
import { eventbus } from '@/lib'
import Abstract from 'abstract/abstractPage'
import { DOM_UPDATED } from 'const'

export default class extends Abstract {
  private _app!: SvelteComponent
  readonly worksRepo: IWorksRepo

  constructor(context: { worksRepo: IWorksRepo }) {
    super()
    this.worksRepo = context.worksRepo
  }

  init() {
    const $wrap = this.$$('.js-works')[0]

    this._app = new App({
      target: $wrap,
      props: {
        posts: [],
        total: Number($wrap.dataset.total),
        worksRepo: this.worksRepo,
        initialCount: 1,
      },
    })

    this._app.$on('worksindex:updated', () => eventbus.emit(DOM_UPDATED))
  }

  destroy() {
    // transitionの秒数、破棄するのを待つ
    setTimeout(() => {
      this._app.$destroy()
    }, 700)
  }
}
