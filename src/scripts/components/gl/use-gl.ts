import { Transform } from 'ogl'
import { useTick, useWindowSize } from '@/libs/lake'
import { createCamera, createRenderer } from '@/libs/ogl'

export const useGl = (canvas: HTMLCanvasElement, ww: number, wh: number, dpr: number) => {
  const { renderer } = createRenderer(canvas, ww, wh, dpr)
  const { gl } = renderer

  const { camera, calcDistance } = createCamera(gl, ww, wh)
  const scene = new Transform()

  useTick(() => {
    renderer.render({ scene, camera })
  })

  useWindowSize(({ ww, wh, aspect }) => {
    renderer.setSize(ww, wh)

    const { dist } = calcDistance(wh)

    camera.perspective({ aspect })
    camera.position.z = dist
  })

  return {
    gl,
    addScene: (child: Transform) => {
      scene.addChild(child)
    },
    removeScene: (child: Transform) => {
      scene.removeChild(child)
    },
  }
}
