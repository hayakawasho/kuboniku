import { defineComponent, useMount, ref } from "lake";
import { SITE_THEME_COLOR, SITE_THEME_SECONDARY_COLOR } from "@/_foundation/const";
import { useTick } from "@/_foundation/hooks";
import { lerp } from "@/_foundation/math";
import { PlaneBufferGeometry, ShaderMaterial, Mesh, Color, Vector2 } from "@/_gl/three";
import { useMediaQueryContext } from "@/_states/mq";
import { useWindowSizeContext } from "@/_states/window-size";
import fragment from "./aurora.frag";
import vertex from "./vertex.vert";
import type { ParentScene } from "@/_foundation/type";

type Props = ParentScene;

export default defineComponent({
  name: "Aurora",
  setup(_canvas: HTMLCanvasElement, context: Props) {
    const [windowWidth, windowHeight] = useWindowSizeContext();
    const { device } = useMediaQueryContext();

    const auroraPixelRatio = 0.5;

    const uniforms = {
      u_brightness: {
        value: {
          pc: 0.6,
          sp: 0.1,
        }[device],
      },
      u_color1: {
        value: new Color(SITE_THEME_COLOR),
      },
      u_color2: {
        value: new Color(0),
      },
      u_color3: {
        value: new Color(SITE_THEME_SECONDARY_COLOR),
      },
      u_color4: {
        value: new Color(0),
      },
      u_lightness: {
        value: new Vector2(0.5, 0),
      },
      u_noiseIntensity: {
        value: new Vector2(1, 0.5),
      },
      u_noiseScale: {
        value: {
          pc: new Vector2(1, 0.56),
          sp: new Vector2(1, 0.24),
        }[device],
      },
      u_resolution: {
        value: new Vector2(windowWidth.value, windowHeight.value),
      },
      u_time: {
        value: 0,
      },
    };

    const plane_aurora = new Mesh(
      new PlaneBufferGeometry(2, 2),
      new ShaderMaterial({
        fragmentShader: fragment,
        uniforms,
        vertexShader: vertex,
      })
    );

    useWindowSizeContext(({ ww, wh }) => {
      plane_aurora.scale.set(ww * auroraPixelRatio, wh * auroraPixelRatio, 1);
    });

    useTick(({ deltaTime, timeRatio }) => {
      const t = Math.min(1, 2 * deltaTime);

      uniforms.u_lightness.value.x += (0 - uniforms.u_lightness.value.x) * t * timeRatio;
      uniforms.u_time.value -=
        t *
        timeRatio *
        0.005 *
        lerp(
          0.7,
          0.2,
          {
            pc: uniforms.u_lightness.value.x,
            sp: uniforms.u_lightness.value.y,
          }[device]
        );
    });

    useMount(() => {
      context.addScene(plane_aurora);

      return () => {
        context.removeScene(plane_aurora);
      };
    });

    return {
      uniforms,
    };
  },
});
