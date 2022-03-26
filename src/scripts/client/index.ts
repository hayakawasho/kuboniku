import { createSceneManager } from './sceneManager'
import { DefaultPage, WorksPage } from '@/components/page'
import { router } from '@/foundation'

export function initApp() {
  const sceneManager = createSceneManager()

  router
    .route('/works/:slug', _req => {
      sceneManager.goto(DefaultPage.exec())
    })
    .route('/works', _req => {
      sceneManager.goto(WorksPage.exec())
    })
    .route('*', _req => {
      sceneManager.goto(DefaultPage.exec())
    })
}
