import { gsap } from "gsap";
import { defineComponent, useMount, useDomRef } from "lake";
import { useTick } from "@/_foundation/hooks";
import { useMediaQueryContext } from "@/_states/mq";
import { useWindowSizeContext } from "@/_states/window-size";
import { Plane } from "./plane";
import type { AppContext, ParentScene } from "@/_foundation/type";
import type { PlaneBufferGeometry, ShaderMaterial } from "@/_gl/three";
import type { ReadonlyRef } from "lake";

type Props = AppContext &
  ParentScene & {
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
    const { geo, mat, addScene, removeScene, posY, diff, maxY } = context;

    const { refs } = useDomRef<Refs>("plane");
    const { device } = useMediaQueryContext();
    const [windowWidth, windowHeight] = useWindowSizeContext();

    const plane = new Plane(refs.plane, {
      currentY: 0,
      device,
      geo,
      mat,
      windowHeight: windowHeight.value,
      windowWidth: windowWidth.value,
    });

    useWindowSizeContext(({ ww, wh }) => {
      plane.resize({
        height: wh,
        width: ww,
      });
    });

    const speed = Number(refs.plane.dataset.speed);
    const acc = {
      pc: 0.0035,
      sp: 0.005,
    }[device];

    useTick(() => {
      const y = gsap.utils.wrap(0, maxY.value, posY.value * speed);

      plane.update({ y });
      plane.uniforms.u_velo.value = diff.value * acc;

      el.style.transform = `translateY(${-y}px) translateZ(0)`;
    });

    useMount(() => {
      addScene(plane);

      return () => {
        removeScene(plane);
      };
    });
  },
});
