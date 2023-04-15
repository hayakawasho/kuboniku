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

      Tween.serial(
        Tween.prop(el, {
          opacity: 0,
        }),
        Tween.wait(500),
        Tween.tween(el, 1, 'expo.out', {
          opacity: 1,
        })
      )
    })

    useUnmount(() => {
      Tween.tween(el, 1, 'expo.out', {
        opacity: 0,
      })
    })
  },
})
