import { defineComponent, useMount, ref } from "lake";
import { useTick } from "@/_foundation/hooks";
import { lerp } from "@/_foundation/math";
import { Tween } from "@/_foundation/tween";
import { SITE_THEME_COLOR } from "@/_foundation/const";
import { PlaneBufferGeometry, ShaderMaterial, Mesh, Color, Vector2 } from "@/_gl/three";
import { useWindowSizeContext } from "@/_states/window-size";
import { useMediaQueryContext } from "@/_states/mq";
import fragment from "./aurora.frag";
import vertex from "./vertex.vert";
import type { ParentScene } from "@/_foundation/type";

type Props = ParentScene;

export default defineComponent({
  name: "Aurora",
  setup(_canvas: HTMLCanvasElement, context: Props) {
    const [windowWidth, windowHeight] = useWindowSizeContext();
    const { device } = useMediaQueryContext()

    const auroraPixelRatio = 0.5;
    const refColorCode = ref(SITE_THEME_COLOR);

    const uniforms = {
      u_color1: {
        value: new Color(refColorCode.value),
      },
      u_color2: {
        value: new Color(refColorCode.value),
      },
      u_color3: {
        value: new Color(0),
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
          sp: new Vector2(1, 0.48),
        }[device]
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
      const t = Math.min(1, 2 * deltaTime * timeRatio);

      uniforms.u_lightness.value.x += (1 - uniforms.u_lightness.value.x) * t;
      // uniforms.u_lightness.value.x += (0 - uniforms.u_lightness.value.x) * t;
      // uniforms.u_lightness.value.y += (1 - uniforms.u_lightness.value.y) * t;
      uniforms.u_time.value -= t * 0.005 * lerp(0.7, 0.2, uniforms.u_lightness.value.y);
    });

    useMount(() => {
      context.addScene(plane_aurora);

      return () => {
        context.removeScene(plane_aurora);
      };
    });

    const onChangeColorPalette = (colorCode: string) => {
      const newColor = new Color(colorCode);

      Tween.serial(
        Tween.parallel(
          Tween.tween(uniforms.u_color1.value, 1, "opacity", {
            b: newColor.b,
            g: newColor.g,
            r: newColor.r,
          }),
          Tween.tween(uniforms.u_color2.value, 1, "opacity", {
            b: newColor.b,
            g: newColor.g,
            r: newColor.r,
          })
        ),
        Tween.immediate(() => {
          refColorCode.value = colorCode;
        })
      );
    };

    return {
      onChangeColorPalette,
    };
  },
});
