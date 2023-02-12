import { defineComponent, useSlot, useMount, useUnmount } from 'lake'
import SkewScrollContainer from '../skew-scroll'
import type { Provides } from '@/const'
import { TWEEN, EASE, wait } from '@/libs'
import { colorCodeMutators } from '@/states/color'

type Props = Provides

export default defineComponent<Props>({
  setup(el, { reload }) {
    const colorCode = el.dataset.color!
    colorCodeMutators(colorCode)

    const { addChild } = useSlot()

    addChild(SkewScrollContainer, el)

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
