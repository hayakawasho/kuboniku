import { createSceneManager } from './sceneManager'
import { DefaultPage, WorksPage } from '@/components/page'
import { router } from '@/lib'

export function init() {
  const sceneManager = createSceneManager()

  router
    .use('/works/:slug', _req => {
      sceneManager.goto(new DefaultPage())
    })
    .use('/works', _req => {
      sceneManager.goto(new WorksPage())
    })
    .use('*', _req => {
      sceneManager.goto(new DefaultPage())
    })

  router.listen()
}
