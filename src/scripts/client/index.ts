import { createSceneManager } from './sceneManager'
import { DefaultPage, WorksPage } from '@/components/page'
import { router } from '@/foundation'

export function initApp() {
  const { gotoScene } = createSceneManager()

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
