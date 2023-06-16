import { defineComponent } from 'lake'
import { clamp, lerp } from '@/_libs'
import { useTick, useWindowSize } from '@/_libs/lake'
import { scrollPosYGetters, scrollRunningGetters } from '@/_states/scroll'

export default defineComponent({
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
        max: 5,
        min: -5,
      })

      el.style.transform = `skew(0, ${state.val}deg) translateZ(0)`
    })
  },
  tagName: 'SkewScrollContainer',
})
