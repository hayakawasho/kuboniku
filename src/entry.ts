import 'virtual:windi.css'
import Cursor from '@/components/cursor/index.svelte'
import Gl from '@/components/gl'
import Load from '@/components/load'
import { createApp as factory, withSvelte, q, type IComponent, type ComponentContext } from 'lake'
import Menu from '@/components/menu/index.svelte'
import Noop from '@/components/noop'
import Observer from '@/components/observer/index.svelte'
import Profile from '@/components/profile'
import Sns from '@/components/sns/sns.svelte'
import Works from '@/components/works'
import WorksDetail from '@/components/works/[slug]'
import type { Provides } from '@/const'

function init() {
  const { component, unmount } = factory()

  const table: Record<string, IComponent> = {
    Noop,
    Sns: withSvelte(Sns),
    Cursor: withSvelte(Cursor),
    Menu: withSvelte(Menu),
    Observer: withSvelte(Observer),
    Works,
    WorksDetail,
    Profile,
  }

  const glWorld = component(Gl)(document.getElementById('js-gl')!)

  const bootstrap = (scope: HTMLElement, reload = false) => {
    return q(`[data-component]`, scope).reduce<ComponentContext[]>((acc, el) => {
      const name = el.dataset.component || 'Noop'
      try {
        const mount = component(table[`${name}`])
        acc.push(
          mount(el, {
            reload,
            glWorld: glWorld.current as Provides['glWorld'],
          })
        )
      } catch (error) {
        console.error(error)
      }
      return acc
    }, [])
  }

  component(Load)(document.documentElement, {
    bind: (scope: HTMLElement) => bootstrap(scope, true),
    unbind: (scope: HTMLElement) => unmount(q(`[data-component]`, scope)),
  })

  bootstrap(document.documentElement)
}

if (document.readyState !== 'loading') {
  init()
} else {
  document.addEventListener('DOMContentLoaded', init, false)
}
