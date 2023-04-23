import { defineComponent } from 'lake'
import { clamp, lerp } from '@/libs'
import { useTick } from '@/libs/lake'
import { useWindowSize } from '@/libs/lake'
import { scrollPosYGetters, scrollRunningGetters } from '@/states/scroll'

export default defineComponent({
  tagName: 'SkewScrollContainer',
  setup(el: HTMLElement) {
    const { windowWidth } = useWindowSize(() => {
      //
    })

    const state = {
      lastY: 0,
      val: 0,
    }

    useTick(({ timeRatio }) => {
      if (!scrollRunningGetters()) {
        return
      }

      const currentY = scrollPosYGetters()

      const easeVal = 1 - (1 - 0.2) ** timeRatio
      state.lastY = lerp(state.lastY, currentY, easeVal)

      if (state.lastY < 0.1) {
        state.lastY = 0
      }

      const skewY = 7.5 * ((currentY - state.lastY) / windowWidth.value)

      state.val = clamp(skewY, {
        min: -5,
        max: 5,
      })

      el.style.transform = `skew(0, ${state.val}deg) translateZ(0)`
    })
  },
})
