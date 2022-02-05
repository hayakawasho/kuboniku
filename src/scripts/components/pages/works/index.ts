import type { SvelteComponent } from 'svelte'
import App from './index.svelte'
import Abstract from '@/_abstract/_page'
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
        repository: this.repository,
      },
    })
  }

  destroy() {
    this._app.$destroy()
  }
}
