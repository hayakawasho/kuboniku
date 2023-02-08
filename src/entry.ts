import 'virtual:windi.css'
import Cursor from '@/components/cursor/index.svelte'
import Gl from '@/components/gl'
import { createApp, withSvelte, q } from 'lake'
import Menu from '@/components/menu/index.svelte'
import type { IComponent, ComponentContext } from 'lake'
import Noop from '@/components/noop'
import Observer from '@/components/observer/index.svelte'
import Sns from '@/components/sns/sns.svelte'
import Works from '@/components/works'
import WorksDetail from '@/components/works/[slug]'
import type { Provides } from '@/const'
import { beforeEnter } from '@/libs/highway'

const table: Record<string, IComponent> = {
  Noop,
  Sns: withSvelte(Sns),
  Cursor: withSvelte(Cursor),
  Menu: withSvelte(Menu),
  Works,
  WorksDetail,
  Observer: withSvelte(Observer),
}

document.addEventListener('DOMContentLoaded', () => {
  const { component, unmount } = createApp()

  const glWorld = component(Gl)(document.getElementById('js-gl')!)

  const bootstrap = (scope: HTMLElement, reload: Provides['reload'] = false) => {
    return q(`[data-component]`, scope).reduce<ComponentContext[]>((acc, el) => {
      const name = el.dataset.component || 'Noop'
      try {
        const mount = component(table[`${name}`])
        acc.push(
          mount(el, {
            reload,
            glWorld: glWorld.current,
            flush: () => unmount(q(`[data-component]:not([data-ignore])`)),
          })
        )
      } catch (error) {
        console.error(error)
      }
      return acc
    }, [])
  }

  bootstrap(document.documentElement)

  beforeEnter(({ to }) => {
    const container = to.view
    const { routerView } = container.dataset

    bootstrap(container, {
      namespace: routerView!,
    })
  })
})
