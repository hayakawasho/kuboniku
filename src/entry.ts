import 'ress'
import './styles/global.css'
import 'virtual:windi.css'

import modular from 'modujs'
import { router } from '@/app/router'
import { sceneManager } from '@/app/scene-manager'
import { DefaultPage, WorksIndexPage } from '@/components/pages'
import globals from '@/globals'
import * as modules from '@/modules'

const isDev = process.env.NODE_ENV === 'development'

export const app = new modular({
  modules: modules,
})

function init() {
  globals()

  router
    .use('/works', _req => {
      sceneManager.goto(new WorksIndexPage(), {})
    })
    .use('*', _req => {
      sceneManager.goto(new DefaultPage(), {})
    })

  // start listening for navigation events
  router.listen()
}

document.addEventListener('DOMContentLoaded', () => {
  init()
})

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
