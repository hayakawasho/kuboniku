import { defineComponent, useMount } from "lake";
import { SITE_THEME_COLOR, SITE_THEME_SECONDARY_COLOR } from "~/_foundation/const";
import { useTick } from "~/_foundation/hooks";
import { lerp } from "~/_foundation/math";
import { PlaneBufferGeometry, ShaderMaterial, Mesh, Color, Vector2 } from "~/_gl/three";
import { useMediaQueryState } from "~/_states/mq";
import { useWindowSizeState } from "~/_states/window-size";
import fragment from "./aurora.frag";
import vertex from "./vertex.vert";
import type { ParentScene } from "~/_foundation/types";

type Props = ParentScene;

export default defineComponent({
  name: "Aurora",
  setup(_canvas: HTMLCanvasElement, context: Props) {
    const { addScene, removeScene } = context;

    const [ww, wh] = useWindowSizeState();
    const { device } = useMediaQueryState();

    const auroraPixelRatio = 0.5;

    const brightnessValue = {
      pc: 0.6,
      sp: 0.1,
    };
    const noiseScaleValue = {
      pc: new Vector2(1, 0.56),
      sp: new Vector2(1, 0.24),
    };

    const uniforms = {
      u_brightness: {
        value: brightnessValue[device],
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
        value: noiseScaleValue[device],
      },
      u_resolution: {
        value: new Vector2(ww.value, wh.value),
      },
      u_time: {
        value: 100 * Math.random(),
      },
    };

    const auroraPlane = new Mesh(
      new PlaneBufferGeometry(2, 2),
      new ShaderMaterial({
        fragmentShader: fragment,
        uniforms,
        vertexShader: vertex,
      })
    );

    useWindowSizeState(({ windowHeight, windowWidth }) => {
      auroraPlane.scale.set(windowWidth * auroraPixelRatio, windowHeight * auroraPixelRatio, 1);
    });

    useTick(({ deltaTime, deltaRatio }) => {
      const t = Math.min(1, 2 * deltaTime);

      uniforms.u_lightness.value.x += (0 - uniforms.u_lightness.value.x) * t * deltaRatio;

      const alpha = {
        pc: uniforms.u_lightness.value.x,
        sp: uniforms.u_lightness.value.y,
      };
      uniforms.u_time.value -= t * 0.005 * lerp(0.7, 0.2, alpha[device]) * deltaRatio;
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
