import { defineComponent, useEvent } from 'lake'
import { themeColorMutators } from '@/_states/color'

export default defineComponent({
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
  tagName: 'ChangeColor',
})
