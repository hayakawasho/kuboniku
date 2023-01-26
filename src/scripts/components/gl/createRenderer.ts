import { Renderer } from 'ogl'

export const createRenderer = (
  canvas: HTMLCanvasElement,
  size: { width: number; height: number }
) => {
  const renderer = new Renderer({
    canvas,
    dpr: Math.min(window.devicePixelRatio, 1.5),
  })

  renderer.setSize(size.width, size.height)

  return { renderer }
}
