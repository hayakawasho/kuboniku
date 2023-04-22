import { defineComponent, useEvent, useDomRef, ref } from 'lake'
import { nextTick, Tween } from '@/libs'
import { useWindowSize } from '@/libs/lake'

const INSET_VAL = 0.05

export default defineComponent({
  tagName: 'ClipImage',
  setup(el: HTMLElement) {
    const { refs } = useDomRef<{ clipTarget: HTMLElement }>('clipTarget')

    const $img = el.querySelector('img')
    const { width, height } = refs.clipTarget.getBoundingClientRect()

    const cache = ref({
      width,
      height,
    })

    const aspect = height / width
    const isPortrait = aspect > 1

    const state = {
      x: 0,
      y: 0,
      rate: {
        x: isPortrait ? 1 : 0.5,
        y: isPortrait ? 0.5 : 1,
      },
    }

    useWindowSize(() => {
      const { width, height } = refs.clipTarget.getBoundingClientRect()

      cache.value = {
        width,
        height,
      }
    })

    const onEnter = async (_e: MouseEvent | TouchEvent) => {
      el.classList.add('isHover', 'isAnimating')
      refs.clipTarget.style.willChange = 'clip-path'

      await nextTick()

      Tween.parallel(
        Tween.tween($img, 0.55, 'power2.out', {
          scale: 1.04,
        }),
        Tween.tween(state, 0.55, 'power2.out', {
          x: cache.value.width * (INSET_VAL * state.rate.x),
          y: cache.value.height * (INSET_VAL * state.rate.y),
          onUpdate: () => {
            refs.clipTarget.style.clipPath = `inset(${state.y}px ${state.x}px)`
          },
          onComplete: () => {
            refs.clipTarget.style.willChange = ''
            el.classList.remove('isAnimating')
          },
        })
      )
    }

    const onLeave = async (_e: MouseEvent | TouchEvent) => {
      el.classList.add('isAnimating')
      refs.clipTarget.style.willChange = 'clip-path'

      await nextTick()

      el.classList.remove('isHover')

      Tween.parallel(
        Tween.tween($img, 0.55, 'power2.out', {
          scale: 1,
          clearProps: 'scale',
        }),
        Tween.tween(state, 0.55, 'power2.out', {
          x: 0,
          y: 0,
          onUpdate: () => {
            refs.clipTarget.style.clipPath = `inset(${state.y}px ${state.x}px)`
          },
          onComplete: () => {
            refs.clipTarget.style.willChange = ''
            el.classList.remove('isAnimating')
          },
        })
      )
    }

    useEvent(el, 'mouseenter', onEnter)
    useEvent(el, 'mouseleave', onLeave)
    useEvent(el, 'touchstart', onEnter, {
      passive: true,
    })
    useEvent(el, 'touchend', onLeave)
  },
})
