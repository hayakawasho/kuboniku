import { defineComponent, children } from 'lake'
import SkewScrollContainer from './skew-scroll'

export default defineComponent({
  setup(el) {
    const { addChild } = children()
    addChild(el, SkewScrollContainer, {})
  },
})
