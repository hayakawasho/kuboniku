import type { SvelteComponent } from 'svelte'
import App from './index.svelte'
import Abstract from '@/_abstract/_page'
import type { IWorksRepo } from '@/domain/works'
import { useIO } from '@/utils'

interface IProps {
  repository: IWorksRepo
}
export default class extends Abstract {
  private _app!: SvelteComponent
  private readonly _repo
  private _io!: IntersectionObserver

  private _state = {
    fetching: false,
  }

  constructor({ repository }: IProps) {
    super()
    this._repo = repository
  }

  init() {
    const $works = this.$$('.js-works')[0]
    const $trigger = this.$$('.js-works__trigger')[0]

    this._app = new App({
      target: $works,
      props: {
        posts: [],
      },
    })

    const { io } = useIO(([entry]) => {
      if (entry.isIntersecting) {
        !this._state.fetching && this._onFetch()
      }
    })

    this._io = io
    this._io.observe($trigger)
  }

  destroy() {
    this._app.$destroy()
    this._io.disconnect()
  }

  _onFetch() {
    this._state.fetching = true
    this._getWorks()
  }

  _getWorks = async () => {
    const result = await this._repo.findSome({
      size: 10,
      offset: 10,
    })

    result
      .map(value => {
        const posts = this._viewWorks(value)
        this._app.$set({ posts })

        this._state.fetching = false
      })
      .mapErr(err => {
        this._app.$set({ error: err })

        this._state.fetching = false
      })
  }

  _viewWorks(data: any[]) {
    return data.map(i => {
      return {
        title: i.title,
        slug: i.slug,
        eyecatch: {
          src: '',
          w: '',
          h: '',
        },
      }
    })
  }
}
