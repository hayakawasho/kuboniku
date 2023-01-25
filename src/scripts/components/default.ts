import { defineComponent, useSlot } from 'lake'
import SkewScrollContainer from './skew-scroll'

export default defineComponent({
  setup(el) {
    const { addChild } = useSlot()
    addChild(el, SkewScrollContainer)
  },
})
