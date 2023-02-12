import { withSvelte, defineComponent, useSlot, useDOMRef, useMount, useUnmount } from 'lake'
import SkewScrollContainer from '../skew-scroll'
import type { Provides } from '@/const'
import Loadmore from './loadmore.svelte'
import { TWEEN, EASE, wait } from '@/libs'

type Props = Provides

export default defineComponent<Props>({
  setup(el, { reload }) {
    const { refs } = useDOMRef<{ projects: HTMLElement }>('projects')
    const { addChild } = useSlot()

    const total = Number(refs.projects.dataset.total)

    const PER_PAGE = 10
    const totalPage = Math.ceil(total / PER_PAGE)

    addChild(withSvelte(Loadmore), refs.projects, {
      totalPage,
    })

    addChild(SkewScrollContainer, el)

    useMount(async () => {
      if (reload) {
        TWEEN.prop(el).opacity(0).play()
        await wait(500)
        TWEEN.tween(el, 1, EASE.expoOut).opacity(1).play()
      }

      return () => {
        //
      }
    })

    useUnmount(() => {
      TWEEN.tween(el, 1, EASE.expoOut).opacity(0).play()
    })
  },
})
