import { createSceneManager } from './sceneManager'
import GLWorld from '@/components/GLWorld/index.svelte'
import Menu from '@/components/Menu.svelte'
// import Skewscroll from '@/components/Skewscroll.svelte'
import Sns from '@/components/Sns.svelte'
// import WorksPage from '@/components/WorksPage'
import { DefaultPage, WorksPage } from '@/components/page'
import { router } from '@/foundation'
import { withSvelte, register } from '@/foundation'

export function initializeApp() {
  const { gotoScene } = createSceneManager()

  register('GLWorld', withSvelte(GLWorld))
  register('Menu', withSvelte(Menu))
  register('Skewscroll', withSvelte(GLWorld))
  register('Sns', withSvelte(Sns))

  router
    .route('/works/:slug', _req => {
      gotoScene(DefaultPage.exec())
    })
    .route('/works', _req => {
      gotoScene(WorksPage.exec())
    })
    .route('*', _req => {
      gotoScene(DefaultPage.exec())
    })
    .run()
}
