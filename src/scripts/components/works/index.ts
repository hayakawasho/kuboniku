import { withSvelte, defineComponent, useSlot, useDomRef, useMount, useUnmount } from 'lake'
import SkewScrollContainer from '../skew-scroll'
import type { GlobalContext } from '@/const'
import Loadmore from './loadmore.svelte'
import { Tween, wait } from '@/libs'

export default defineComponent({
  tagName: 'Works',
  setup(el, { initialLoad }: GlobalContext) {
    const { refs } = useDomRef<{ projects: HTMLElement }>('projects')
    const { addChild } = useSlot()

    const total = Number(refs.projects.dataset.total)

    const PER_PAGE = 10
    const totalPage = Math.ceil(total / PER_PAGE)

    addChild(refs.projects, withSvelte(Loadmore, 'loadmore'), {
      totalPage,
    })
    addChild(el, SkewScrollContainer)

    useMount(() => {
      if (initialLoad) {
        return
      }

      Tween.serial(
        Tween.prop(el, {
          opacity: 0,
        }),
        Tween.wait(500),
        Tween.tween(el, 1, 'expo.out', {
          opacity: 1,
        })
      )
    })

    useUnmount(() => {
      Tween.tween(el, 1, 'expo.out', {
        opacity: 0,
      })
    })
  },
})
