import type { SvelteComponent } from 'svelte'
import App from './index.svelte'
import Abstract from '@/_abstract/_page'
import { repositoryFactory } from '@/components/repositoryFactory'

export default class extends Abstract {
  private _app!: SvelteComponent

  init() {
    const $works = this.$$('.js-works')[0]

    this._app = new App({
      target: $works,
      props: {
        loadmore: [],
        repository: repositoryFactory.works,
      },
    })
  }

  destroy() {
    this._app.$destroy()
  }
}
