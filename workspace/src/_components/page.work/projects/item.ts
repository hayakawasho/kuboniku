import { defineComponent, useMount, useDomRef, useEvent } from "lake";
import { SITE_THEME_COLOR } from "@/_foundation/const";
import { useTick, useScrollSkew } from "@/_foundation/hooks";
import { norm } from "@/_foundation/math";
import { Tween } from "@/_foundation/tween";
import { useMousePos } from "@/_states/mouse";
import { useWindowSizeContext } from "@/_states/window-size";
import { Plane } from "./plane";
import type { AppContext } from "@/_foundation/type";
import type { PlaneBufferGeometry, ShaderMaterial } from "@/_gl/three";

type Props = AppContext & {
  geo: PlaneBufferGeometry;
  mat: ShaderMaterial;
};

type Refs = {
  thumb: HTMLImageElement;
};

export default defineComponent({
  name: "ProjectItem",
  setup(el: HTMLElement, context: Props) {
    const { once, history, geo, mat, scrollContext, backCanvasContext, frontCanvasContext } =
      context;

    const state = {
      resizing: false,
      hovering: false,
      mousePos: [0, 0],
    };

    const themeColor = el.dataset.color!;
    const { refs } = useDomRef<Refs>("thumb");

    const imgPlane = new Plane(refs.thumb, { geo, mat });

    const [ww, wh] = useWindowSizeContext(({ height, width }) => {
      state.resizing = true;

      imgPlane.resize({
        height,
        width,
        y: scrollContext.scrollTop(),
      });

      state.resizing = false;
    });

    useTick(() => {
      if (state.resizing) {
        return;
      }

      imgPlane.update({
        y: scrollContext.scrollTop(),
        mouseX: state.mousePos[0],
        mouseY: state.mousePos[1],
      });
    });

    useScrollSkew(
      ({ value }) => {
        imgPlane.uniforms.u_skewY.value = value * -0.015;
      },
      {
        initialPos: scrollContext.scrollTop(),
      }
    );

    useEvent(el, "mouseenter", _e => {
      state.hovering = true;
      backCanvasContext.onChangeColorsPalette(themeColor, themeColor, "#000", "#000", 1.2);

      Tween.parallel(
        Tween.tween(imgPlane.uniforms.u_lightStrength, 1, "power2.out", {
          value: 1,
        })
      );
    });

    useEvent(el, "mouseleave", _e => {
      state.hovering = false;

      backCanvasContext.onChangeColorsPalette(
        SITE_THEME_COLOR,
        SITE_THEME_COLOR,
        "#000",
        "#000",
        1.2
      );

      Tween.parallel(
        Tween.tween(imgPlane.uniforms.u_lightStrength, 1, "power1.out", {
          value: 0,
        })
      );
    });

    useMousePos(({ x, y }) => {
      if (!state.hovering) {
        return;
      }

      const { left, top, width, height } = imgPlane.cache;
      const offsetX = -left;
      const offsetY = -(top + scrollContext.scrollTop());
      const mouseX = norm(offsetX + x, 0, width);
      const mouseY = -norm(offsetY + y, 0, height) * 2 + 1;

      console.log({
        y,
        // top,
        // scrollTop: scrollContext.scrollTop(),
        offset: -(top + scrollContext.scrollTop()) + y,
      });

      state.mousePos = [mouseX, mouseY];
    });

    useMount(() => {
      imgPlane.resize({
        height: wh.value,
        width: ww.value,
        y: scrollContext.scrollTop(),
      });
      frontCanvasContext.addScene(imgPlane);

      if (!once && history.value === "push") {
        Tween.serial(
          Tween.prop(imgPlane.uniforms.u_alpha, {
            value: 0,
          }),
          Tween.wait(0.2),
          Tween.tween(imgPlane.uniforms.u_alpha, 0.55, "power3.out", {
            value: 1,
          })
        );
      }

      return () => {
        Tween.tween(imgPlane.uniforms.u_alpha, 0.55, "power3.out", {
          value: 0,
          onComplete: () => {
            frontCanvasContext.removeScene(imgPlane);
          },
        });
      };
    });
  },
});
