import { createSceneManager } from './sceneManager'
import GLWorld from '@/components/GLWorld/index.svelte'
import Menu from '@/components/Menu/index.svelte'
import Sns from '@/components/Sns/index.svelte'
import { DefaultPage, WorksPage } from '@/components/page'
import { router, q, withSvelte, defineComponent } from '@/foundation'

export function initApp() {
  const { gotoScene } = createSceneManager()

  defineComponent('Sns', withSvelte(Sns))
  defineComponent('GLWorld', withSvelte(GLWorld))
  defineComponent('Menu', withSvelte(Menu))

  const modujs = withSvelte(Sns)
  modujs.init(q('[data-component="Sns"]')[0], {})

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
