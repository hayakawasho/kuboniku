import { defineComponent, ref } from 'lake'
import { clamp, lerp } from '@/libs'
import { useTick } from '@/libs/lake'
import { scrollPosYGetters, scrollRunningGetters } from '@/states/scroll'
import { viewportGetters } from '@/states/viewport'

export default defineComponent({
  tagName: 'SkewScrollContainer',
  setup(el: HTMLElement) {
    const lastY = ref(0)
    const val = ref(0)

    useTick(({ timeRatio }) => {
      if (!scrollRunningGetters()) {
        return
      }

      const currentY = scrollPosYGetters()

      const easeVal = 1 - (1 - 0.2) ** timeRatio
      lastY.value = lerp(lastY.value, currentY, easeVal)

      if (lastY.value < 0.1) {
        lastY.value = 0
      }

      const { width } = viewportGetters()
      const skewY = 7.5 * ((currentY - lastY.value) / width)

      val.value = clamp(skewY, {
        min: -5,
        max: 5,
      })

      el.style.transform = `skew(0, ${val.value}deg) translateZ(0)`
    })
  },
})
