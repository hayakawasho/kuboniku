import type { SvelteComponent } from 'svelte'
import App from './index.svelte'
import Abstract from '@/_abstract/_page'
import { H } from '@/app/pjax'
import type { IWorksRepo } from '@/components/works'

export default class extends Abstract {
  private _app!: SvelteComponent
  readonly repository: IWorksRepo

  constructor(context: { repository: IWorksRepo }) {
    super()
    this.repository = context.repository
  }

  init() {
    const $wrap = this.$$('.js-works')[0]

    this._app = new App({
      target: $wrap,
      props: {
        loadmore: [],
        total: Number($wrap.dataset.total),
        repository: this.repository,
      },
    })

    this._app.$on('worksindex:updated', () => {
      const a = document.querySelectorAll('a:not([target])')
      H.attach(a)
    })
  }

  destroy() {
    this._app.$destroy()
  }
}
