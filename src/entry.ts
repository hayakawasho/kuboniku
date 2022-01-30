import 'ress'
import './styles/global.css'
import 'virtual:windi.css'

import { router } from '@/app/router'
import { SceneManager } from '@/app/sceneManager'
import { DefaultPage, WorksIndexPage } from '@/components/pages'
// import { repositoryFactory } from '@/infra/repositoryFactory'

const isDev = process.env.NODE_ENV === 'development'

function init() {
  const sceneManager = SceneManager.create()

  router
    .use('/works', _req => {
      sceneManager.goto(
        new WorksIndexPage({
          // repository: repositoryFactory.get('works'),
        })
      )
    })
    .use('*', _req => {
      sceneManager.goto(new DefaultPage())
    })

  router.listen()
}

if (document.readyState !== 'loading') {
  init()
} else {
  document.addEventListener('DOMContentLoaded', init)
}

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
