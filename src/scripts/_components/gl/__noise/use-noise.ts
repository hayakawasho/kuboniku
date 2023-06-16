import { useMount, useUnmount } from 'lake'
import { Mesh, Plane, Program, Vec2, Vec3, Texture } from 'ogl'
import { useTick, useWindowSize } from '@/_libs/lake'
import fragment from './frag.glsl'
import type { GlobalContext } from '@/_foundation/const'
import vertex from './vert.glsl'

export const useNoise = (glContext: GlobalContext['glContext']) => {
  const state = {
    canvasHeight: glContext.gl.canvas.height,
    canvasWidth: glContext.gl.canvas.width,
  }

  const uniforms = {
    uResolution: {
      value: new Vec2(state.canvasWidth, state.canvasHeight),
    },
    // uCol: {
    //   value: new Vec3(1, 1, 100),
    // },
    // uActiveClouds: {
    //   value: 1,
    // },
    // uActiveNoise: {
    //   value: 1,
    // },
    // uSamplerOut: {
    //   value: new Texture(glContext.gl),
    // },
    // uSamplerIn: {
    //   value: new Texture(glContext.gl),
    // },
    // uAmount: {
    //   value: 0.07,
    // },
    // uAlpha: {
    //   value: 0.16,
    // },
    uTime: {
      value: 0.2,
    },
    // uBlur: {
    //   value: 0.2,
    // },
    // uRad: {
    //   value: 0.9,
    // },
  }

  const program = new Program(glContext.gl, {
    fragment,
    uniforms,
    vertex,
  })

  const geo = new Plane(glContext.gl, {
    height: window.innerHeight,
    width: window.innerWidth,
  })

  const mesh = new Mesh(glContext.gl, {
    geometry: geo,
    program,
  })

  useTick(({ timeRatio, timestamp }) => {
    uniforms.uTime.value += 0.1 * timeRatio
  })

  useWindowSize(_payload => {
    //
  })

  useMount(() => {
    glContext.addScene(mesh)
  })

  useUnmount(() => {
    glContext.removeScene(mesh)
  })
}
