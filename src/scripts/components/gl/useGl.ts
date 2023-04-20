import Gl from './core'
import { useTick } from '@/libs/lake'

export const useGl = (canvas: HTMLCanvasElement, width: number, height: number) => {
  const gl = new Gl(canvas, width, height)

  useTick(({ timestamp: _ }) => {
    gl.render()
  })

  return {
    onResize(width: number, height: number) {
      gl.resize(width, height)
    },

    addScene() {
      console.log('addScene')
    },

    removeScene() {
      console.log('removeScene')
    },
  }
}
