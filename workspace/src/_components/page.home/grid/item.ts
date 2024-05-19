import { gsap } from "gsap";
import { defineComponent, useMount, useDomRef } from "lake";
import { useTick } from "@/_foundation/hooks";
import { Tween } from "@/_foundation/tween";
import { useMediaQueryContext } from "@/_states/mq";
import { useWindowSizeContext } from "@/_states/window-size";
import { Plane } from "./plane";
import type { AppContext } from "@/_foundation/type";
import type { PlaneBufferGeometry, ShaderMaterial } from "@/_gl/three";
import type { ReadonlyRef } from "lake";

type Props = AppContext & {
  geo: PlaneBufferGeometry;
  mat: ShaderMaterial;
  diff: ReadonlyRef<number>;
  posY: ReadonlyRef<number>;
  maxY: ReadonlyRef<number>;
};

type Refs = {
  plane: HTMLImageElement;
};

export default defineComponent({
  name: "GridItem",
  setup(el: HTMLElement, context: Props) {
    const { once, history, geo, mat, posY, diff, maxY, frontCanvasContext } = context;

    const { refs } = useDomRef<Refs>("plane");
    const { device } = useMediaQueryContext();

    const imgPlane = new Plane(refs.plane, {
      device,
      geo,
      mat,
    });

    const [ww, wh] = useWindowSizeContext(({ windowHeight, windowWidth }) => {
      imgPlane.resize({
        height: windowHeight,
        width: windowWidth,
      });
    });

    const speed = Number(refs.plane.dataset.speed);
    const acc = {
      pc: 0.0035,
      sp: 0.005,
    }[device];

    useTick(() => {
      const y = gsap.utils.wrap(0, maxY.value, posY.value * speed);

      imgPlane.update({ y });
      imgPlane.uniforms.u_velo.value = diff.value * acc;

      el.style.transform = `translateY(${-y}px) translateZ(0)`;
    });

    useMount(() => {
      imgPlane.resize({
        height: wh.value,
        width: ww.value,
      });
      frontCanvasContext.addScene(imgPlane);

      if (!once && history.value === "push") {
        Tween.serial(
          Tween.prop(imgPlane.uniforms.u_alpha, {
            value: 0,
          }),
          Tween.wait(0.2),
          Tween.tween(imgPlane.uniforms.u_alpha, 0.55, "power3.out", {
            value: 0.9,
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
