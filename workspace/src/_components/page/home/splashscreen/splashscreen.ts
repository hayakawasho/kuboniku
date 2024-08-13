import { defineComponent, useDomRef, useMount } from "lake";
import { createTexture } from "~/_foundation/gl/texture";
import { useTick } from "~/_foundation/hooks";
import { Tween } from "~/_foundation/libs/tween";
import { lerp, mapRange } from "~/_foundation/math";
import Pool from "~/_foundation/pool";
import { useMousePositionState } from "~/_states/mouse";
import { useMediaQueryState } from "~/_states/mq";
import { useWindowSizeState } from "~/_states/window-size";
import { ImgPlane } from "./plane";
import type { Texture } from "~/_foundation/libs/three";
import type { AppContext } from "~/_foundation/types";

type Props = AppContext & {
  manifest: {
    src: string;
    id: string;
  }[];
};

type Refs = {
  splash: HTMLElement;
};

export default defineComponent({
  name: "Splashscreen",
  setup(el, context: Props) {
    const { backCanvasContext, manifest } = context;

    const { refs } = useDomRef<Refs>("splash");
    const { anyHover } = useMediaQueryState();
    const [ww, wh] = useWindowSizeState();

    const state = {
      count: 0,
      cx: ww.value / 2,
      cy: wh.value / 2,
      tx: ww.value / 2,
      ty: wh.value / 2,
      stopped: true,
    };

    const textures: Texture[] = [];
    const plane = new ImgPlane(refs.splash);
    const maskPlane = new ImgPlane(refs.splash);

    useWindowSizeState(({ windowWidth, windowHeight }) => {
      plane.setSize({ width: windowWidth, height: windowHeight });
      maskPlane.setSize({ width: windowWidth, height: windowHeight });
    });

    useMousePositionState(({ x, y }) => {
      if (!anyHover || state.stopped) {
        return;
      }
      state.tx = x;
      state.ty = y;
    });

    useTick(({ deltaRatio }) => {
      if (!anyHover) {
        return;
      }

      const alpha1 = 0.2 * deltaRatio;
      state.cx = lerp(state.cx, state.tx, alpha1);
      state.cy = lerp(state.cy, state.ty, alpha1);

      const diffX = state.cx - state.tx;
      const diffY = state.cy - state.ty;
      const clampX = mapRange(diffX, -300, 300, -0.75, 0.75);
      const clampY = mapRange(diffY, -300, 300, -1, 1);

      const alpha2 = 0.16 * deltaRatio;
      plane.uniforms.u_bend.value.x = lerp(plane.uniforms.u_bend.value.x, clampX, alpha2);
      plane.uniforms.u_bend.value.y = lerp(plane.uniforms.u_bend.value.y, clampY, alpha2);

      maskPlane.uniforms.u_bend.value.x = lerp(maskPlane.uniforms.u_bend.value.x, clampX, alpha2);
      maskPlane.uniforms.u_bend.value.y = lerp(maskPlane.uniforms.u_bend.value.y, clampY, alpha2);

      const centerX = state.cx - ww.value * 0.5;
      const centerY = -(state.cy - wh.value * 0.5);

      plane.update({ x: centerX, y: centerY });
      maskPlane.update({ x: centerX, y: centerY });
      refs.splash.style.transform = `translate(-50%, -50%) translate(${centerX}px, ${-centerY}px) translateZ(0)`;
    });

    useMount(() => {
      el.classList.add("pointer-events-none");

      manifest.forEach(item => {
        const tex = createTexture();
        tex.image = Pool.pop<HTMLImageElement>(item.id);
        textures.push(tex);
      });

      plane.uniforms.u_texture.value = textures[0];
      plane.setSize({ width: ww.value, height: wh.value });

      maskPlane.uniforms.u_alpha.value = 0.4;
      maskPlane.setSize({ width: ww.value, height: wh.value });

      backCanvasContext.addScene(plane);
      backCanvasContext.addScene(maskPlane);
    });

    const start = () => {
      return new Promise<void>(resolve => {
        state.stopped = false;

        Tween.tween(state, 1.85, "power1.out", {
          count: manifest.length - 1,
          onUpdate: () => {
            const index = Math.floor(state.count);
            refs.splash.dataset.index = index + "";
            plane.uniforms.u_texture.value = textures[index];
          },
          onComplete: () => {
            resolve();
          },
        });
      });
    };

    const hideStart = () => {
      return new Promise<void>(resolve => {
        state.stopped = true;

        Tween.serial(
          Tween.parallel(
            Tween.tween(plane.uniforms.u_alpha, 1.1, "power3.inOut", {
              value: 0,
              delay: 0.01,
            }),
            Tween.tween(plane.position, 1.1, "power3.inOut", {
              y: plane.position.y + wh.value * 0.17,
              delay: 0.01,
            }),
            Tween.tween(maskPlane.uniforms.u_alpha, 1.1, "power3.inOut", {
              value: 0,
              delay: 0.01,
            }),
            Tween.tween(maskPlane.position, 1.1, "power3.inOut", {
              y: maskPlane.position.y + wh.value * 0.17,
              delay: 0.01,
            }),
            Tween.tween(refs.splash, 1.1, "power3.inOut", {
              opacity: 0,
              marginTop: -wh.value * 0.17,
            })
          ),
          Tween.immediate(() => {
            resolve();
          })
        );
      });
    };

    const hideEnd = () => {
      return new Promise<void>(resolve => {
        el.classList.remove("pointer-events-none");
        backCanvasContext.removeScene(plane);
        resolve();
      });
    };

    return {
      hideEnd,
      hideStart,
      start,
    };
  },
});
