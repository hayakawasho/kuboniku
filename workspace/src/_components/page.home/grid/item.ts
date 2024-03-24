import { defineComponent, useMount, useDomRef } from "lake";
import { useTick } from "@/_foundation/hooks";
// import { Tween } from "@/_foundation/tween";
import { useMediaQueryContext } from "@/_states/mq";
import { useWindowSizeContext } from "@/_states/window-size";
import { Plane } from "./plane";
import type { useInfiniteScroll } from "../use-infinite-scroll";
import type { PlaneBufferGeometry, ShaderMaterial } from "@/_foundation/three";
import type { AppContext, ParentScene } from "@/_foundation/type";

type Props = AppContext &
  ParentScene & {
    geo: PlaneBufferGeometry;
    mat: ShaderMaterial;
    infiniteScrollContext: ReturnType<typeof useInfiniteScroll>;
  };

type Refs = {
  plane: HTMLImageElement;
};

export default defineComponent({
  name: "GridItem",
  setup(el: HTMLElement, context: Props) {
    const { geo, mat, addScene, removeScene, infiniteScrollContext } = context;
    const { posY, diff } = infiniteScrollContext;

    const state = {
      resizing: false,
    };

    const { refs } = useDomRef<Refs>("plane");
    const { device } = useMediaQueryContext();
    const [ww, wh] = useWindowSizeContext();

    const plane = new Plane(refs.plane, {
      currentY: 0,
      device,
      geo,
      mat,
      windowSize: {
        height: wh.value,
        width: ww.value,
      },
    });

    useWindowSizeContext(({ ww, wh }) => {
      state.resizing = true;
      plane.resize({
        height: wh,
        width: ww,
      });
      state.resizing = false;
    });

    const speed = Number(refs.plane.dataset.speed);
    const acc = { pc: 0.0035, sp: 0.005 }[device] * speed;

    useTick(() => {
      if (state.resizing) {
        return;
      }

      const y = infiniteScrollContext.wrap(posY.value * speed);

      plane.updateY(y);
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
