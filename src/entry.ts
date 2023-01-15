import 'virtual:windi.css'

import { register, withSvelte, mount, q } from 'lake'
import Cursor from '@/components/cursor/index.svelte'
import Gl from '@/components/gl/index.svelte'
import Menu from '@/components/menu'
import Noop from '@/components/noop'
// import Scroll from '@/components/scroll'
import Sns from '@/components/sns/sns.svelte'
import WorksIndex from '@/components/works'

document.addEventListener('DOMContentLoaded', () => {
  register('Noop', Noop)
  register('Menu', Menu)
  register('Sns', withSvelte(Sns))
  register('Gl', withSvelte(Gl))
  register('Cursor', withSvelte(Cursor))
  register('WorksIndex', WorksIndex)

  q('[data-component]').forEach(el => {
    const name = el.dataset.component || 'Noop'
    mount(el, {}, name)
  })
})
