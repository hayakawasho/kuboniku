import type { SvelteComponent } from 'svelte'
import App from './index.svelte'
import Abstract from '@/_abstract/_page'
import type { IWorksRepo } from '@/components/works'
import { DOM_UPDATED } from '@/const'
import { eventbus } from '@/lib'

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
        loadmore: [],
        total: Number($wrap.dataset.total),
        worksRepo: this.worksRepo,
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
