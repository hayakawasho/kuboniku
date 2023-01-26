import { defineComponent, useEvent } from 'lake'
import { colorCodeMutators } from '@/states/color'

export default defineComponent({
  setup(el: HTMLElement) {
    const colorCode = el.dataset.color!

    useEvent(el, 'mouseenter', e => {
      e.preventDefault()
      colorCodeMutators(colorCode)
    })
  },
})
