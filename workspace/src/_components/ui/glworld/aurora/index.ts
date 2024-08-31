import { defineComponent, useMount } from "lake";
import { SITE_THEME_COLOR, SITE_THEME_SECONDARY_COLOR } from "~/_foundation/const";
import { useTick } from "~/_foundation/hooks";
import { PlaneBufferGeometry, ShaderMaterial, Mesh, Color, Vector2 } from "~/_foundation/libs/three";
import { lerp } from "~/_foundation/math";
import { useMediaQuery } from "~/_states/mq";
import { useWindowSize } from "~/_states/window-size";
import fragment from "./aurora.frag";
import vertex from "./vertex.vert";
import type { ParentScene } from "~/_foundation/types";

type Props = ParentScene;

export default defineComponent({
  name: "Aurora",
  setup(_canvas: HTMLCanvasElement, context: Props) {
    const { addScene, removeScene } = context;

    const { device } = useMediaQuery();

    const auroraPixelRatio = 0.5;

    const [windowW, windowH] = useWindowSize(({ windowSize }) => {
      auroraPlane.scale.x = windowSize.width * auroraPixelRatio;
      auroraPlane.scale.y = windowSize.height * auroraPixelRatio;
      uniforms.uResolution.value.x = windowSize.width;
      uniforms.uResolution.value.y = windowSize.height;
    });

    const uniforms = {
      uBrightness: {
        value: {
          pc: 0.6,
          sp: 0.1,
        }[device],
      },
      uColor1: {
        value: new Color(SITE_THEME_COLOR),
      },
      uColor2: {
        value: new Color(0),
      },
      uColor3: {
        value: new Color(SITE_THEME_SECONDARY_COLOR),
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
        value: {
          pc: new Vector2(1, 0.56),
          sp: new Vector2(1, 0.24),
        }[device],
      },
      uResolution: {
        value: new Vector2(windowW.value, windowH.value),
      },
      uTime: {
        value: 100 * Math.random(),
      },
    };

    const geo = new PlaneBufferGeometry(2, 2);
    const mat = new ShaderMaterial({
      fragmentShader: fragment,
      uniforms,
      vertexShader: vertex,
    });

    const auroraPlane = new Mesh(geo, mat);
    auroraPlane.scale.set(windowW.value * auroraPixelRatio, windowH.value * auroraPixelRatio, 1);

    useTick(({ deltaTime, deltaRatio }) => {
      const t = Math.min(1, 2 * deltaTime);

      uniforms.uLightness.value.x += (0 - uniforms.uLightness.value.x) * t * deltaRatio;

      const alpha = {
        pc: uniforms.uLightness.value.x,
        sp: uniforms.uLightness.value.y,
      };
      uniforms.uTime.value -= t * 0.005 * lerp(0.7, 0.2, alpha[device]) * deltaRatio;
    });

    useMount(() => {
      addScene(auroraPlane);

      return () => {
        removeScene(auroraPlane);
      };
    });

    return {
      uniforms,
    };
  },
});
