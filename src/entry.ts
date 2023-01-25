import 'virtual:windi.css'

import barba from '@barba/core'
import { createApp, withSvelte, q } from 'lake'
import Cursor from '@/components/cursor/index.svelte'
import type { IComponent } from 'lake'
import Default from '@/components/default'
import Gl from '@/components/gl/index.svelte'
import Menu from '@/components/menu/index.svelte'
import Noop from '@/components/noop'
import Sns from '@/components/sns/sns.svelte'
import WorksIndex from '@/components/works'

document.addEventListener('DOMContentLoaded', () => {
  const { component, unmount } = createApp()

  const table: Record<string, IComponent> = {
    Noop,
    Sns: withSvelte(Sns),
    Gl: withSvelte(Gl),
    Cursor: withSvelte(Cursor),
    Menu: withSvelte(Menu),
    WorksIndex,
    Default,
  }

  const boot = (scope = document.documentElement, reboot = false) => {
    q('[data-component]', scope).forEach(el => {
      const name = el.dataset.component || 'Noop'

      try {
        const mount = component(table[`${name}`])
        mount(el, {
          reboot,
        })
      } catch (error) {
        console.error(error)
      }
    })
  }

  boot()

  barba.init({
    schema: {
      prefix: 'data-router',
      wrapper: 'wrap',
      container: 'view',
    },
    transitions: [
      {
        name: 'default',
        sync: true,
        leave(data) {
          const current = data.current.container
          unmount('[data-component]', current)
        },
        enter(data) {
          const next = data.next.container
          boot(next, true)
        },
      },
    ],
  })
})
