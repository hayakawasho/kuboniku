import 'ress'
import './styles/global.css'
import './tailwind.dist.css'

import { register, withSvelte, mount, q } from 'lake'
import GLWorld from '@/components/GLWorld/index.svelte'
import Menu from '@/components/Menu.svelte'
import Sns from '@/components/Sns.svelte'
import WorksIndex from '@/components/WorksIndex'

document.addEventListener('DOMContentLoaded', () => {
  register('Menu', withSvelte(Menu))
  register('Sns', withSvelte(Sns))
  register('GLWorld', withSvelte(GLWorld))
  register('WorksIndex', WorksIndex)

  q('[data-component]').forEach(el => {
    const componentName = el.dataset.component + ''
    mount(el, {}, componentName)
  })
})
