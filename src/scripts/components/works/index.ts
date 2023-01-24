import { withSvelte, defineComponent, useSlots, useDOMRef } from 'lake'
import SkewScrollContainer from '../skew-scroll'
import WorksLoadmore from './loadmore.svelte'

export default defineComponent({
  setup(el) {
    const { refs } = useDOMRef<{ works: HTMLElement }>('works')
    const { total } = refs.works.dataset

    const { addChild } = useSlots()

    addChild(refs.works, withSvelte(WorksLoadmore), {
      total: Number(total),
    })
    addChild(el, SkewScrollContainer, {})
  },
})
