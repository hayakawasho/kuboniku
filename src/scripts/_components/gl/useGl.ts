import { useTick } from '@/_libs/lake'
import Gl from './core'

export const useGl = (canvas: HTMLCanvasElement, width: number, height: number) => {
  const gl = new Gl(canvas, width, height)

  useTick(({ timestamp: _ }) => {
    gl.render()
  })

  return {
    addScene() {
      console.log('addScene')
    },

    onResize(width: number, height: number) {
      gl.resize(width, height)
    },

    removeScene() {
      console.log('removeScene')
    },
  }
}
