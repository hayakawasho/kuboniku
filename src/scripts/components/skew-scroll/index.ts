import { defineComponent, useEvent, ref } from 'lake'
import { clamp } from 'remeda'
import { TWEEN } from '@/libs'
import { lerp } from '@/libs/math'
import { useTick } from '@/libs/useTick'

export default defineComponent({
  props: {
    ease: 0.2,
  },

  setup(el, { ease }) {
    const ww = ref(window.innerWidth)

    const isRunning = ref(false)
    const current = ref(0)
    const last = ref(0)

    let timer: NodeJS.Timeout

    useEvent(
      window as any,
      'scroll',
      () => {
        clearTimeout(timer)

        isRunning.value = true
        current.value = window.scrollY

        timer = setTimeout(() => {
          isRunning.value = false
        }, 300)
      },
      { passive: true }
    )

    useEvent(window as any, 'resize', () => {
      ww.value = window.innerWidth
    })

    useTick(_d => {
      if (!isRunning.value) {
        return
      }

      last.value = lerp(last.value, current.value, ease)

      if (last.value < 0.1) {
        last.value = 0
      }

      const skewY = 7.5 * +((current.value - last.value) / ww.value)
      const val = clamp(skewY, { min: -4, max: 4 })

      TWEEN.prop(el).style('transform', `skew(0, ${val}deg) translateZ(0)`).play()
    })
  },
})
