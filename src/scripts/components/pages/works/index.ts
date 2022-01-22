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

    const { io } = useIO(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this._onFetch()
        }
      })
    })

    this._io = io
    this._io.observe($trigger)
  }

  destroy() {
    this._app.$destroy()
    this._io.disconnect()
  }

  _getWorks = async () => {
    const res = await this._repo.findSome({
      where: {
        size: 10,
        offset: 10,
      },
    })

    if (res.isErr()) {
      return Promise.reject(res.error)
    }

    return res.value
  }

  _onFetch = async () => {
    try {
      const posts = await this._getWorks()
      this._app.$set({ posts: this._viewWorks(posts) })
    } catch (error) {
      //
    }
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
