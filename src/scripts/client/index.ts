// import { createSceneManager } from './createSceneManager'
// import { router } from '@/foundation'
import GLWorld from '@/components/GLWorld/index.svelte'
import Menu from '@/components/Menu.svelte'
import Sns from '@/components/Sns.svelte'
import { registerComponent, withSvelte, parseValue, mountComponent, q } from '@/foundation'
// import Skewscroll from '@/components/Skewscroll.svelte'
// import WorksPage from '@/components/WorksPage'

export function initializeApp() {
  registerComponent('Menu', withSvelte(Menu))
  registerComponent('Sns', withSvelte(Sns))
  registerComponent('GLWorld', withSvelte(GLWorld))

  q('[data-component]').forEach(el => {
    const { props, component } = el.dataset
    const newProps = parseValue(props) || {}
    mountComponent(el, newProps, component as string)
  })

  // router
  //   .route('/works/:slug', _req => {
  //     gotoScene()
  //   })
  //   .route('/works', _req => {
  //     gotoScene()
  //   })
  //   .route('*', _req => {
  //     gotoScene()
  //   })
  //   .run()
}
