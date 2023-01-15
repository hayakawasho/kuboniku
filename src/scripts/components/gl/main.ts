import { Renderer, Camera, Transform, Geometry, Program, Mesh } from 'ogl'

let renderer: Renderer

class Canvas {
  constructor(private readonly _canvas: HTMLCanvasElement) {
    const renderer = new Renderer({
      canvas: this._canvas,
      dpr: Math.min(window.devicePixelRatio, 1.5),
    })

    const ww = window.innerWidth
    const wh = window.innerHeight

    renderer.setSize(ww, wh)

    const { gl } = renderer
    gl.clearColor(0, 0, 0, 0)
  }

  createCamera() {
    //
  }

  createScene() {
    //
  }
}

export function createBgCanvas(canvas: HTMLCanvasElement) {
  return new Canvas(canvas)
}

export function resize() {
  renderer.setSize(window.innerWidth, window.innerHeight)

  // camera.perspective({
  //   aspect: gl.canvas.width / gl.canvas.height,
  // })
}
