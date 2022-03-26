import 'ress'
import './styles/global.css'
import './tailwind.dist.css'

import { initApp } from './scripts/client'
import { ConnectWithSvelte } from '@/components/ConnectWithSvelte'
import Test from '@/components/Test/Test.svelte'
// import type { SvelteComponent } from 'svelte'

const FCBook = {
  Test,
} as any

const isDev = process.env.NODE_ENV === 'development'

document.addEventListener('DOMContentLoaded', () => {
  const matches = Array.from(
    document.querySelectorAll('[data-component]')
  ) as HTMLElement[]

  matches
    .filter(match => FCBook[match.dataset.component as string])
    .forEach(el => {
      return new ConnectWithSvelte(
        el,
        FCBook[el.dataset.component as string],
        JSON.parse(el.dataset.props as '{}')
      )
    })

  initApp()
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
