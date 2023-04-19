import { defineComponent, useMount, useUnmount } from 'lake'
import type { GlobalContext } from '@/const'
import { Tween } from '@/libs'

export default defineComponent({
  tagName: 'Profile',
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
})
