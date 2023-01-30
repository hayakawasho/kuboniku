import { defineComponent, ref, useEvent } from 'lake'
import { clamp, lerp, TWEEN, useTick, debounce } from '@/libs'
import { scrollPosYGetters, scrollRunningGetters } from '@/states/scroll'

export default defineComponent({
  props: {
    ease: 0.2,
  },

  setup(el, { ease }) {
    let ww = window.innerWidth
    let last = 0

    const val = ref(0)

    useEvent(
      window as any,
      'resize',
      debounce(() => {
        ww = window.innerWidth
      }, 250)
    )

    useTick(() => {
      if (!scrollRunningGetters()) {
        return
      }

      const current = scrollPosYGetters()
      last = lerp(last, current, ease)

      if (last < 0.1) {
        last = 0
      }

      const skewY = 7.5 * ((current - last) / ww)
      val.value = clamp(skewY, { min: -5, max: 5 })

      TWEEN.tween(el, 0).style('transform', `skew(0, ${val.value}deg) translateZ(0)`).play()
    })
  },
})
