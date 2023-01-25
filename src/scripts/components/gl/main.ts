import { defineComponent } from 'lake'
import { useGl } from './useGl'
import { useTick } from '@/libs'

type Props = {
  w: number
  h: number
}

export default defineComponent<Props>({
  setup(canvas: HTMLCanvasElement, props) {
    const { render, resize } = useGl(canvas, props.w, props.h)

    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      resize(width, height)
    })

    ro.observe(canvas.parentElement!)

    useTick(({ timestamp }) => {
      render(timestamp)
    })
  },
})
