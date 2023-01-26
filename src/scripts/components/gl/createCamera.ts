import { Camera } from 'ogl'
import type { OGLRenderingContext } from 'ogl'

export const createCamera = (gl: OGLRenderingContext, size: { width: number; height: number }) => {
  const camera = new Camera(gl, {
    fov: 45,
    aspect: size.width / size.height,
    near: 0.1,
    far: 100,
  })

  camera.position.z = 50

  return {
    camera,
  }
}
