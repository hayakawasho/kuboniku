import { getGPUTier } from 'detect-gpu'
import { defineComponent, useDomRef, useSlot, withSvelte, useMount } from 'lake'
import modularLoad from 'modularload'
import GlWorld from '../gl'
import Observer from '../observer/index.svelte'
import { wideQuery } from '@/const'
import type { GlobalContext, LoaderProps } from '@/const'

type Refs = {
  main: HTMLElement
  observer: HTMLElement
  glWorld: HTMLElement
}

export default defineComponent({
  tagName: 'Loader',
  setup(_el, { onCreated, onUpdated, onCleanup }: LoaderProps) {
    const { addChild } = useSlot()
    const { refs } = useDomRef<Refs>('glWorld', 'main', 'observer')

    const env: GlobalContext['env'] = {
      mq: wideQuery.matches ? 'pc' : 'sp',
      gpuTier: undefined,
    }

    getGPUTier().then(res => (env.gpuTier = res))

    addChild(refs.observer, withSvelte(Observer, 'Observer'))

    const [gl] = addChild(refs.glWorld, GlWorld)

    const provides = {
      env,
      glContext: gl.current,
    }

    const load = new modularLoad({
      enterDelay: 300,
      transitions: {
        //
      },
    })

    //----------------------------------------------------------------

    load.on('loading', (_transition: string, oldContainer: HTMLElement) => {
      onCleanup(oldContainer)
    })

    //----------------------------------------------------------------

    load.on(
      'loaded',
      (_transition: string, _oldContainer: HTMLElement, newContainer: HTMLElement) => {
        window.scrollTo(0, 0)

        onUpdated(newContainer, provides)
      }
    )

    //----------------------------------------------------------------

    useMount(() => {
      onCreated(provides)
    })
  },
})
