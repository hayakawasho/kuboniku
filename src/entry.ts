import 'ress'
import './styles/global.css'
import 'virtual:windi.css'

import { router } from '@/app/router'
import { createSceneManager } from '@/app/sceneManager'
import { DefaultPage, WorksIndexPage } from '@/components/page'
import { repositoryFactory } from '@/repositoryFactory'

const isDev = process.env.NODE_ENV === 'development'

function init() {
  const sceneManager = createSceneManager()
  router
    .use('/works/:slug', _req => {
      sceneManager.goto(new DefaultPage())
    })
    .use('/works', _req => {
      sceneManager.goto(
        new WorksIndexPage({ worksRepo: repositoryFactory.works })
      )
    })
    .use('*', _req => {
      sceneManager.goto(new DefaultPage())
    })

  router.listen()
}

document.addEventListener('DOMContentLoaded', init)

if (isDev) {
  const showStats = async () => {
    const Stats = await (
      (await import('https://cdn.skypack.dev/stats.js')) as any
    ).default

    const stats = new Stats()
    stats.showPanel(0)

    document.body.appendChild(stats.dom)

    const loop = () => {
      stats.update()
      requestAnimationFrame(loop)
    }

    loop()
  }

  showStats()
}
