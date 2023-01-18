import 'virtual:windi.css'

import { createApp, withSvelte, q } from 'lake'
import Cursor from '@/components/cursor/index.svelte'
import Gl from '@/components/gl/index.svelte'
import Menu from '@/components/menu'
import Noop from '@/components/noop'
import SkewScrollContainer from '@/components/skew-scroll'
import Sns from '@/components/sns/sns.svelte'
import WorksIndex from '@/components/works'

document.addEventListener('DOMContentLoaded', () => {
  const { register, mount } = createApp()

  register('Noop', Noop)
  register('Menu', Menu)
  register('Sns', withSvelte(Sns))
  register('Gl', withSvelte(Gl))
  register('Cursor', withSvelte(Cursor))
  register('SkewScrollContainer', SkewScrollContainer)
  register('WorksIndex', WorksIndex)

  q('[data-component]').forEach(el => {
    const name = el.dataset.component || 'Noop'
    mount(el, {}, name)
  })
})
