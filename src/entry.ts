import 'virtual:windi.css'

import { createApp, withSvelte, q } from 'lake'
import type { IComponent } from 'lake'
import Cursor from '@/components/cursor/index.svelte'
import Default from '@/components/default'
import Gl from '@/components/gl/index.svelte'
import Menu from '@/components/menu/index.svelte'
import Noop from '@/components/noop'
import Sns from '@/components/sns/sns.svelte'
import WorksIndex from '@/components/works'

document.addEventListener('DOMContentLoaded', () => {
  const { component } = createApp()

  const table: Record<string, IComponent> = {
    Noop,
    Sns: withSvelte(Sns),
    Gl: withSvelte(Gl),
    Cursor: withSvelte(Cursor),
    Menu: withSvelte(Menu),
    WorksIndex,
    Default,
  }

  q('[data-component]').forEach(el => {
    const name = el.dataset.component || 'Noop'

    try {
      const mount = component(table[`${name}`])
      mount(el, {})
    } catch (error) {
      console.error(error)
    }
  })
})
