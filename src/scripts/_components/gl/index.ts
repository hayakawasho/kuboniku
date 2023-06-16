import { defineComponent, useDomRef, useSlot } from 'lake'
import Grad from './grad'
import Noise from './noise'
import { useGl } from './use-gl'

export default defineComponent({
  setup(el) {
    const dpr = Math.min(window.devicePixelRatio, 1.5)
    const { width, height } = el.getBoundingClientRect()

    const { addChild } = useSlot()
    const { refs } = useDomRef<{
      canvas: HTMLCanvasElement
    }>('canvas')
    const webgl = useGl(refs.canvas, width, height, dpr)

    // addChild(el, Noise, {
    //   glContext: webgl,
    // })
    addChild(el, Grad, {
      glContext: webgl,
      height,
    })

    return {
      ...webgl,
    } as const
  },
  tagName: 'Gl',
})
