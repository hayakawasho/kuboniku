import { defineComponent, useSlot } from 'lake'
import SkewScrollContainer from '../skew-scroll'
import { colorCodeMutators } from '@/states/color'

export default defineComponent({
  setup(el) {
    const colorCode = el.dataset.color!
    colorCodeMutators(colorCode)

    const { addChild } = useSlot()

    addChild(el, SkewScrollContainer)
  },
})
