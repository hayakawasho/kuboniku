import { defineComponent, ref } from 'lake'
import { clamp, lerp, TWEEN, useTick } from '@/libs'
import { scrollPosYGetters, scrollRunningGetters } from '@/states/scroll'
import { viewportGetters } from '@/states/viewport'

export default defineComponent({
  props: {
    ease: 0.2,
  },

  setup(el, { ease }) {
    let last = 0
    const val = ref(0)

    useTick(() => {
      if (!scrollRunningGetters()) {
        return
      }

      const current = scrollPosYGetters()
      last = lerp(last, current, ease)

      if (last < 0.1) {
        last = 0
      }

      const { width } = viewportGetters()
      const skewY = 7.5 * ((current - last) / width)
      val.value = clamp(skewY, { min: -5, max: 5 })

      TWEEN.tween(el, 0).style('transform', `skew(0, ${val.value}deg) translateZ(0)`).play()
    })
  },
})
