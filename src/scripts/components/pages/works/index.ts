import type { SvelteComponent } from 'svelte'
import { findWorks } from './findWorks'
import App from './index.svelte'
import Abstract from '@/_abstract/_page'
import { useIO } from '@/utils'

const state = {
  isFetching: false,
}

export default class extends Abstract {
  private _app!: SvelteComponent
  private _io!: IntersectionObserver

  constructor() {
    super()
  }

  init() {
    const $works = this.$$('.js-works')[0]
    const $trigger = this.$$('.js-works__trigger')[0]

    this._app = new App({
      target: $works,
      props: {
        metadata: [],
        loading: 'idel',
        error: null,
      },
    })

    const { observer } = useIO(([entry]) => {
      if (entry.isIntersecting) {
        !state.isFetching && this._onFindWorks()
      }
    })

    this._io = observer
    this._io.observe($trigger)
  }

  destroy() {
    this._app.$destroy()
    this._io.disconnect()
  }

  _onFindWorks = async () => {
    state.isFetching = true

    const result = await findWorks({
      offset: 0,
    })

    state.isFetching = false

    result
      .map(value => {
        this._app.$set({ metadata: value })
      })
      .mapErr(err => {
        this._app.$set({ error: err })
      })
  }
}
