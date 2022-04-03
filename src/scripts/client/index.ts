import { createSceneManager } from './sceneManager'
import Glworld from '@/components/Glworld/index.svelte'
// import Menu from '@/components/Menu/index.svelte'
import Sns from '@/components/Sns/index.svelte'
import { DefaultPage, WorksPage } from '@/components/page'
import { router, withSvelte, define, onInit } from '@/foundation'

export function initApp() {
  const { gotoScene } = createSceneManager()

  define('Sns', withSvelte(Sns))
  define('Glworld', withSvelte(Glworld))
  // define('Menu', withSvelte(Menu))

  onInit()

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
    .exec()
}
