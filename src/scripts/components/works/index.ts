import { withSvelte, defineComponent, useSlot, useDomRef, useMount, useUnmount } from 'lake'
import SkewScrollContainer from '../skew-scroll'
import type { GlobalContext } from '@/const'
import Loadmore from './loadmore.svelte'
import { Tween } from '@/libs'

const PER_PAGE = 10

export default defineComponent({
  tagName: 'Works',
  setup(el, { initialLoad }: GlobalContext) {
    const { refs } = useDomRef<{
      index: HTMLElement
    }>('index')
    const { addChild } = useSlot()

    const total = Number(refs.index.dataset.total)
    const totalPage = Math.ceil(total / PER_PAGE)

    addChild(refs.index, withSvelte(Loadmore, 'Loadmore'), {
      totalPage,
    })

    addChild(el, SkewScrollContainer)

    useMount(() => {
      console.log('mount:/work')

      if (initialLoad) {
        return
      }

      Tween.serial(
        Tween.prop(el, {
          opacity: 0,
        }),
        Tween.wait(0.5),
        Tween.tween(el, 1, 'expo.out', {
          opacity: 1,
        })
      )
    })

    useUnmount(() => {
      console.log('unmount:/work')

      Tween.tween(el, 1, 'expo.out', {
        opacity: 0,
      })
    })
  },
})
