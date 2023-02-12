import { defineComponent, useMount, useUnmount } from 'lake'
import type { Provides } from '@/const'
import { TWEEN, EASE, wait } from '@/libs'

type Props = Provides

export default defineComponent<Props>({
  setup(el, { reload }) {
    useMount(async () => {
      if (reload) {
        TWEEN.prop(el).opacity(0).play()
        await wait(500)
        TWEEN.tween(el, 1, EASE.expoOut).opacity(1).play()
      }

      return () => {
        //
      }
    })

    useUnmount(() => {
      TWEEN.tween(el, 1, EASE.expoOut).opacity(0).play()
    })
  },
})
