import { createSceneManager } from './sceneManager'
import GLWorld from '@/components/GLWorld/index.svelte'
import Menu from '@/components/Menu.svelte'
import Sns from '@/components/Sns.svelte'
import { DefaultPage, WorksPage } from '@/components/page'
import { router } from '@/foundation'
import {
  withSvelte,
  defineComponent,
  requireComponent,
  onSetup,
  Do,
} from '@/foundation'
import type { IComponent } from '@/foundation'

export function initApp() {
  const { gotoScene } = createSceneManager()

  defineComponent('Sns', withSvelte(Sns))
  defineComponent('GLWorld', withSvelte(GLWorld))
  defineComponent('Menu', withSvelte(Menu))

  defineComponent(
    'DefaultPage',
    Do<IComponent, any>(() => {
      const setup = () => {
        //
      }
      const destroy = () => {
        //
      }

      return {
        setup,
        destroy,
      }
    }),
    []
  )

  defineComponent(
    'WorksPage',
    Do<IComponent, any>(() => {
      const setup = () => {
        //
      }
      const destroy = () => {
        //
      }

      return {
        setup,
        destroy,
      }
    }),
    []
  )

  router
    .route('/works/:slug', _req => {
      requireComponent('DefaultPage')
      gotoScene(DefaultPage.exec())
    })
    .route('/works', _req => {
      requireComponent('WorksPage')
      gotoScene(WorksPage.exec())
    })
    .route('*', _req => {
      requireComponent('DefaultPage')
      gotoScene(DefaultPage.exec())
    })
    .run()

  onSetup()
}
