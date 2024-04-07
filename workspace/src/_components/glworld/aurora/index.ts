import { defineComponent, useMount, ref } from "lake";
import { useTick } from "@/_foundation/hooks";
import { lerp } from "@/_foundation/math";
import { Tween } from "@/_foundation/tween";
import { SITE_THEME_COLOR } from "@/_foundation/const";
import { PlaneBufferGeometry, ShaderMaterial, Mesh, Color, Vector2 } from "@/_gl/three";
import { useWindowSizeContext } from "@/_states/window-size";
import fragment from "./aurora.frag";
import vertex from "./vertex.vert";
import type { ParentScene } from "@/_foundation/type";

type Props = ParentScene;

export default defineComponent({
  name: "Aurora",
  setup(_canvas: HTMLCanvasElement, context: Props) {
    const [windowWidth, windowHeight] = useWindowSizeContext();

    const timeOffset = 100 * Math.random();
    const auroraPixelRatio = 0.5;
    const refColorCode = ref(SITE_THEME_COLOR);

    const uniforms = {
      uColor1: {
        value: new Color(refColorCode.value),
      },
      uColor2: {
        value: new Color(refColorCode.value),
      },
      uColor3: {
        value: new Color(0),
      },
      uColor4: {
        value: new Color(0),
      },
      uLightness: {
        value: new Vector2(0.5, 0),
      },
      uNoiseIntensity: {
        value: new Vector2(1, 0.5),
      },
      uNoiseScale: {
        value: new Vector2(1, 0.32),
      },
      uResolution: {
        value: new Vector2(windowWidth.value, windowHeight.value),
      },
      uTime: {
        value: timeOffset,
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

      uniforms.uLightness.value.x += (1 - uniforms.uLightness.value.x) * t;
      uniforms.uTime.value += t * 0.01 * lerp(0.6, 0.2, uniforms.uLightness.value.y);
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
          Tween.tween(uniforms.uColor1.value, 1, "opacity", {
            b: newColor.b,
            g: newColor.g,
            r: newColor.r,
          }),
          Tween.tween(uniforms.uColor2.value, 1, "opacity", {
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
