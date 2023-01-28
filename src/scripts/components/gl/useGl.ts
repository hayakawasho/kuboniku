import Gl from './main'
import { useTick } from '@/libs'

export const useGl = (canvas: HTMLCanvasElement, width: number, height: number) => {
  const gl = new Gl(canvas, width, height)

  useTick(() => {
    gl.render()
  })

  return {
    resize(w: number, h: number) {
      gl.resize(w, h)
    },
  }
}
