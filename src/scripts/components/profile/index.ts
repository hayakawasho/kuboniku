import { defineComponent } from 'lake'
import type { Provides } from '@/const'
import { TWEEN, EASE } from '@/libs'
import { useOnEnter, useOnLeave } from '@/libs/lake'

type Props = Provides

export default defineComponent<Props>({
  setup(el, { flush }) {
    //----------------------------------------------------------------

    useOnEnter(({ to }) => {
      TWEEN.serial(
        TWEEN.prop(to.view).opacity(0),
        TWEEN.tween(to.view, 1, EASE.expoOut).opacity(1)
      ).play()
    })

    useOnLeave(() => {
      TWEEN.tween(el, 1, EASE.expoOut)
        .opacity(0)
        .onComplete(() => {
          flush()
        })
        .play()
    })
  },
})
