import { defineComponent, useMount, useUnmount } from 'lake'
import { Mesh, Plane, Program, Vec2, Vec3, Texture, Color } from 'ogl'
import { useTick, useWindowSize } from '@/_libs/lake'
import { themeColorGetters } from '@/_states/color'
import type { GlobalContext } from '@/_foundation/const'
import fragment from './frag.glsl'
import vertex from './vert.glsl'

type Props = Pick<GlobalContext, 'glContext'> & {
  height: number
}

export default defineComponent({
  setup(_, { glContext, height }: Props) {
    const { gl, addScene, removeScene } = glContext

    const state = {
      canvasHeight: gl.canvas.height,
      canvasWidth: gl.canvas.width,
    }

    // alert(`${window.innerHeight} / ${height} / ${state.canvasHeight}`)

    const uniforms = {
      uColor: {
        value: new Vec3(0.09019607843137255, 0.5764705882352941, 0.6627450980392157),
      },
      uResolution: {
        value: new Vec2(window.innerWidth, height),
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
      height: height,
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
