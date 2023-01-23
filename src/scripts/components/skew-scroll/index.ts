import { defineComponent, ref, readonly, useEvent } from 'lake'
import { clamp, lerp, TWEEN, useTick, debounce } from '@/libs'

export default defineComponent({
  props: {
    ease: 0.2,
  },

  setup(el, { ease }) {
    let ww = window.innerWidth
    let timer: number

    const isRunning = ref(false)

    let current = 0
    let last = 0

    const val = ref(0)

    useEvent(
      window as any,
      'scroll',
      () => {
        clearTimeout(timer)

        isRunning.value = true
        current = window.scrollY

        timer = window.setTimeout(() => {
          isRunning.value = false
        }, 300)
      },
      { passive: true }
    )

    useEvent(
      window as any,
      'resize',
      debounce(() => {
        ww = window.innerWidth
      }, 250)
    )

    useTick(_timeRatio => {
      if (!isRunning) {
        return
      }

      last = lerp(last, current, ease)

      if (last < 0.1) {
        last = 0
      }

      const skewY = 7.5 * ((current - last) / ww)
      val.value = clamp(skewY, { min: -5, max: 5 })

      TWEEN.tween(el, 0).style('transform', `skew(0, ${val.value}deg) translateZ(0)`).play()
    })

    return {
      isRunning: readonly(isRunning),
      val: readonly(val),
    }
  },
})
