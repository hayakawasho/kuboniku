import { defineComponent, useSlots } from 'lake'
import SkewScrollContainer from './skew-scroll'

export default defineComponent({
  setup(el) {
    const { addChild } = useSlots()
    addChild(el, SkewScrollContainer, {})
  },
})
