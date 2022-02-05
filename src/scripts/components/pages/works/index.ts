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
    const $works = this.$$('.js-works')[0]

    this._app = new App({
      target: $works,
      props: {
        loadmore: [],
        total: Number($works.dataset.total),
        repository: this.repository,
      },
    })

    this._app.$on('works:updated', () => {
      H.attach(document.querySelectorAll('a'))
    })
  }

  destroy() {
    this._app.$destroy()
  }
}
