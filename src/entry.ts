import 'ress'
import './styles/global.css'
import './tailwind.dist.css'

import { register, withSvelte, mount, q } from 'lake'
import GLWorld from '@/components/GLWorld/index.svelte'
import Home from '@/components/Home'
import Menu from '@/components/Menu'
import Profile from '@/components/Profile'
import Skewscroll from '@/components/Skewscroll'
import Sns from '@/components/Sns.svelte'
import WorksDetail from '@/components/WorksDetail'
import WorksIndex from '@/components/WorksIndex'
import 'lazysizes'

document.addEventListener('DOMContentLoaded', () => {
  register('Menu', Menu)
  register('Sns', withSvelte(Sns))
  register('GLWorld', withSvelte(GLWorld))
  register('Skewscroll', Skewscroll)
  register('WorksIndex', WorksIndex)
  register('WorksDetail', WorksDetail)
  register('Profile', Profile)
  register('Home', Home)

  q('[data-component]').forEach(el => {
    const componentName = el.dataset.component as string
    mount(el, {}, componentName)
  })
})
