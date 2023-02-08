import { withSvelte, defineComponent, useSlot, useDOMRef } from 'lake'
import SkewScrollContainer from '../skew-scroll'
import type { Provides } from '@/const'
import Loadmore from './loadmore.svelte'
import { TWEEN, EASE } from '@/libs'
import { useOnEnter, useOnLeave } from '@/libs/lake'

type Props = Provides

export default defineComponent<Props>({
  setup(el, { flush }) {
    const { refs } = useDOMRef<{ projects: HTMLElement }>('projects')
    const { addChild } = useSlot()

    const total = Number(refs.projects.dataset.total)

    const PER_PAGE = 10
    const totalPage = Math.ceil(total / PER_PAGE)

    addChild(withSvelte(Loadmore), refs.projects, {
      totalPage,
    })

    addChild(SkewScrollContainer, el)

    //------------------------------------------------------------------------------

    useOnEnter(({ to }) => {
      TWEEN.serial(
        TWEEN.prop(to.view).opacity(0),
        TWEEN.tween(to.view, 1, EASE.expoOut).opacity(1)
      ).play()
    })

    useOnLeave(() => {
      TWEEN.tween(el, 1, EASE.expoOut)
        .opacity(0)
        .onComplete(() => {
          flush()
        })
        .play()
    })
  },
})
