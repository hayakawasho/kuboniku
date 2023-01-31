import { withSvelte, defineComponent, useSlot, useDOMRef } from 'lake'
import SkewScrollContainer from '../skew-scroll'
import Loadmore from './loadmore.svelte'

export default defineComponent({
  setup(el) {
    const { refs } = useDOMRef<{ projects: HTMLElement }>('projects')

    const total = Number(refs.projects.dataset.total)

    const PER_PAGE = 10
    const totalPage = Math.ceil(total / PER_PAGE)

    const { addChild } = useSlot()

    addChild(refs.projects, withSvelte(Loadmore), {
      totalPage,
    })
    addChild(el, SkewScrollContainer)
  },
})
