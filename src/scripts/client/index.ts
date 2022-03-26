import { createSceneManager } from './sceneManager'
import { DefaultPage, WorksPage } from '@/components/page'
import { router } from '@/foundation'

export function initApp() {
  const { goto } = createSceneManager()

  router
    .route('/works/:slug', _req => {
      goto(DefaultPage.exec())
    })
    .route('/works', _req => {
      goto(WorksPage.exec())
    })
    .route('*', _req => {
      goto(DefaultPage.exec())
    })
    .exec()
}
