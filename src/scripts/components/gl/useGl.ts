import { createCamera } from './createCamera'
import { createRenderer } from './createRenderer'
import { createScene } from './createScene'
import { useTick } from '@/libs'

export const useGl = (canvas: HTMLCanvasElement, width: number, height: number) => {
  const size = { width, height }

  const { renderer } = createRenderer(canvas, size)

  const { gl } = renderer
  gl.clearColor(0, 0, 0, 0)

  const { camera } = createCamera(gl, size)
  const { scene, program } = createScene(gl)

  useTick(({ timestamp }) => {
    renderer.render({ scene })
    program.uniforms.uTime.value = timestamp * 0.001
  })

  return {
    resize(w: number, h: number) {
      renderer.setSize(w, h)

      camera.perspective({
        aspect: gl.canvas.width / gl.canvas.height,
      })
    },
  }
}
