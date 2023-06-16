import { defineComponent, useSlot, useMount, useUnmount, useDomRef } from 'lake'
import { Tween } from '@/_libs'
import { themeColorMutators } from '@/_states/color'
import type { GlobalContext } from '@/_foundation/const'
import ProgressBar from './progressbar'
import SkewScrollContainer from '../skew-scroll'

export default defineComponent({
  setup(el, { initialLoad }: GlobalContext) {
    const { refs } = useDomRef<{
      progressBar: HTMLElement
    }>('progressBar')
    const { addChild } = useSlot()

    const colorCode = el.dataset.color!

    themeColorMutators({
      code: colorCode,
    })

    addChild(el, SkewScrollContainer)
    addChild(refs.progressBar, ProgressBar)

    useMount(() => {
      if (initialLoad) {
        return
      }

      console.log('[mount] /works/[slug]')

      Tween.serial(
        Tween.prop(el, {
          opacity: 0,
        }),
        Tween.wait(0.2),
        Tween.tween(el, 0.55, 'power3.out', {
          opacity: 1,
        })
      )
    })

    useUnmount(() => {
      console.log('[unmount] /work/[slug]')

      Tween.tween(el, 0.55, 'power3.out', {
        opacity: 0,
      })
    })
  },
  tagName: 'WorksDetail',
})
