import { defineComponent, type RefElement } from 'lake'
import modularLoad from 'modularload'
import type { Provides } from '@/const'

type Props = Provides & {
  bind: (scope: RefElement) => void
  unbind: (scope: RefElement) => void
}

export default defineComponent<Props>({
  setup(_el, { bind, unbind }) {
    const load = new modularLoad({
      enterDelay: 300,
    })

    load.on('loading', (_transition: string, oldContainer: HTMLElement) => {
      unbind(oldContainer)
    })

    load.on(
      'loaded',
      (_transition: string, _oldContainer: HTMLElement, newContainer: HTMLElement) => {
        window.scrollTo(0, 0)
        bind(newContainer)
      }
    )
  },
})
