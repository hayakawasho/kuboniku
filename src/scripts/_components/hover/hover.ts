import { defineComponent, useEvent } from 'lake'

export default defineComponent({
  setup(el: HTMLElement) {
    useEvent(el, 'mouseenter', _e => el.classList.add('isHover'))

    useEvent(el, 'mouseleave', _e => el.classList.remove('isHover'))

    useEvent(el, 'touchstart', _e => el.classList.add('isHover'), {
      passive: true,
    })

    useEvent(el, 'touchend', _e => el.classList.remove('isHover'))
  },
  tagName: 'Hover',
})
