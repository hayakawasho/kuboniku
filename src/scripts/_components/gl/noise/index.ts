import { defineComponent, useMount, useUnmount } from 'lake'
import { Mesh, Plane, Program, Vec2 } from 'ogl'
import { useTick, useWindowSize } from '@/_libs/lake'
import type { GlobalContext } from '@/_foundation/const'
import fragment from './frag.glsl'
import vertex from './vert.glsl'

export default defineComponent({
  setup(_, { glContext }: Pick<GlobalContext, 'glContext'>) {
    const { gl, addScene, removeScene } = glContext

    const state = {
      canvasHeight: gl.canvas.height,
      canvasWidth: gl.canvas.width,
    }

    const uniforms = {
      uResolution: {
        value: new Vec2(state.canvasWidth, state.canvasHeight),
      },
      uTime: {
        value: 0.2,
      },
    }

    const program = new Program(gl, {
      fragment,
      uniforms,
      vertex,
      // transparent: true,
    })

    const geo = new Plane(gl, {
      height: window.innerHeight,
      width: window.innerWidth,
    })

    const mesh = new Mesh(gl, {
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
      addScene(mesh)
    })

    useUnmount(() => {
      removeScene(mesh)
    })
  },
  tagName: 'Grad',
})
