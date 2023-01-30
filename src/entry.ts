import 'virtual:windi.css'
import Cursor from '@/components/cursor/index.svelte'
import barba from '@barba/core'
import Gl from '@/components/gl'
import { createApp, withSvelte, q } from 'lake'
import Menu from '@/components/menu/index.svelte'
import type { IComponent } from 'lake'
import Noop from '@/components/noop'
import Observer from '@/components/observer/index.svelte'
import Sns from '@/components/sns/sns.svelte'
import Works from '@/components/works'
import WorksDetail from '@/components/works/[slug]'
import { TWEEN, EASE } from '@/libs'

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

  const gl = component(Gl)(document.getElementById('js-gl')!)

  const bootstrap = (scope: HTMLElement, { reboot = false }) => {
    q('[data-component]', scope).forEach(el => {
      const name = el.dataset.component || 'Noop'

      try {
        const mount = component(table[`${name}`])
        mount(el, {
          REBOOT: reboot,
          GL: gl.current,
        })
      } catch (error) {
        console.error(error)
      }
    })
  }

  bootstrap(document.documentElement, {
    reboot: false,
  })

  barba.init({
    schema: {
      prefix: 'data-pjax',
      wrapper: 'wrap',
      container: 'view',
    },
    transitions: [
      {
        name: 'default',
        sync: false,
        leave(data) {
          return new Promise(resolve => {
            const current = data.current.container

            TWEEN.tween(current, 1, EASE.expoOut)
              .opacity(0)
              .onComplete(() => {
                unmount(q('[data-component]', current))
              })
              .play()

            setTimeout(() => {
              resolve(true)
            }, 500)
          })
        },

        enter(data) {
          const next = data.next.container

          TWEEN.serial(
            TWEEN.prop(next).opacity(0),
            TWEEN.tween(next, 1, EASE.expoOut).opacity(1)
          ).play()

          bootstrap(next, {
            reboot: true,
          })
        },
      },
    ],
  })
})
