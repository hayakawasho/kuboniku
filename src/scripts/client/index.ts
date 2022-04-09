import { createSceneManager } from './sceneManager'
import GLWorld from '@/components/GLWorld/index.svelte'
import Menu from '@/components/Menu.svelte'
import Skewscroll from '@/components/Skewscroll.svelte'
import Sns from '@/components/Sns.svelte'
import WorksLoadmore from '@/components/WorksLoadmore/index.svelte'
import { DefaultPage, WorksPage } from '@/components/page'
import { router } from '@/foundation'
import {
  withSvelte,
  defineComponent,
  resolveComponent,
  onSetup,
  Do,
} from '@/foundation'
import type { IComponent } from '@/foundation'

export function initApp() {
  const { gotoScene } = createSceneManager()

  defineComponent('Sns', withSvelte(Sns))
  defineComponent('GLWorld', withSvelte(GLWorld))
  defineComponent('Menu', withSvelte(Menu))
  defineComponent('Skewscroll', withSvelte(Skewscroll))
  defineComponent('WorksLoadmore', withSvelte(WorksLoadmore))

  defineComponent(
    'WorksPage',
    Do<IComponent, never>(() => {
      return {
        setup() {
          //
        },

        destroy() {
          //
        },
      }
    }),
    []
  )

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

  onSetup()
}
