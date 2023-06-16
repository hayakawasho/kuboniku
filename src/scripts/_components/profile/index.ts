import { defineComponent, useMount, useUnmount } from 'lake'
import { Tween } from '@/_libs'
import type { GlobalContext } from '@/_foundation/const'

export default defineComponent({
  setup(el, { initialLoad }: GlobalContext) {
    useMount(() => {
      if (initialLoad) {
        return
      }

      console.log('[mount] /profile')

      Tween.serial(
        Tween.prop(el, {
          opacity: 0,
        }),
        Tween.wait(0.2),
        Tween.tween(el, 0.55, 'power3.out', {
          opacity: 1,
        })
      )
    })

    useUnmount(() => {
      console.log('[unmount] /profile')

      Tween.tween(el, 0.55, 'power3.out', {
        opacity: 0,
      })
    })
  },
  tagName: 'Profile',
})
