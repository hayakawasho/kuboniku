import type { SvelteComponent } from 'svelte'
import { createSceneManager } from './sceneManager'
import GLWorld from '@/components/GLWorld/index.svelte'
import Menu from '@/components/Menu.svelte'
// import Skewscroll from '@/components/Skewscroll.svelte'
import Sns from '@/components/Sns.svelte'
// import WorksPage from '@/components/WorksPage'
import { DefaultPage, WorksPage } from '@/components/page'
import { router } from '@/foundation'
import { withSvelte, register, q, mount } from '@/foundation'

export function initializeApp() {
  const { gotoScene } = createSceneManager()

  register('GLWorld', withSvelte(GLWorld as unknown as typeof SvelteComponent))
  register('Menu', withSvelte(Menu as any))
  register('Skewscroll', withSvelte(GLWorld as any))
  register('Sns', withSvelte(Sns as any))

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
    .run()
}
