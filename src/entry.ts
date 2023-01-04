import 'ress'
import './styles/global.css'
import './tailwind.dist.css'

import { register, withSvelte, mount, q } from 'lake'
import Gl from '@/components/gl/index.svelte'
import Menu from '@/components/menu'
import Noop from '@/components/noop'
import Scroll from '@/components/scroll'
import Sns from '@/components/sns/sns.svelte'
import WorksIndex from '@/components/works'

document.addEventListener('DOMContentLoaded', () => {
  register('Menu', Menu)
  register('Sns', withSvelte(Sns))
  register('Gl', withSvelte(Gl))
  register('Scroll', Scroll)
  register('WorksIndex', WorksIndex)
  register('WorksDetail', Noop)
  register('Profile', Noop)
  register('Home', Noop)

  q('[data-component]').forEach(el => {
    const name = el.dataset.component ?? ''
    mount(el, {}, name)
  })
})
