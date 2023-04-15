import { defineComponent, useEvent } from 'lake'
import { themeColorMutators } from '@/states/color'

export default defineComponent({
  tagName: 'ChangeColor',
  setup(el: HTMLElement) {
    const colorCode = el.dataset.color!

    useEvent(
      el,
      'mouseenter',
      _e => {
        themeColorMutators({
          code: colorCode,
        })
      },
      {
        passive: true,
      }
    )
  },
})
