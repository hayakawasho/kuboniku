import { defineComponent, useSlot, useDomRef, useEvent, ref, readonly, useMount } from "lake";
import NormalizeWheel from "normalize-wheel";
import { useTick } from "~/_foundation/hooks";
import { Tween } from "~/_foundation/libs/tween";
import { lerp } from "~/_foundation/math";
import { PlaneBufferGeometry, ShaderMaterial } from "~/_gl/three";
import { useMousePositionState } from "~/_states/mouse";
import { useMediaQueryState } from "~/_states/mq";
import { useWindowSizeState } from "~/_states/window-size";
// import fragment from "./fragment.frag";
// import GridItem from "./item";
// import vertex from "./vertex.vert";
import type { AppContext } from "~/_foundation/types";

type Props = AppContext;

type Refs = {
  gridItem: HTMLImageElement[];
};

export default defineComponent({
  name: "Grid",
  setup(el: HTMLElement, context: Props) {
    const { addChild } = useSlot();
    const { refs } = useDomRef<Refs>("gridItem");
    const { device } = useMediaQueryState();

    const posY = ref(0);
    const diffY = ref(0);
    const maxY = ref(0);

    const state = {
      dragging: false,
      position: 0,
      resizing: false,
      startPos: 0,
      ty: 0,
    };

    useEvent(
      window as any,
      "touchstart",
      e => {
        Tween.kill(state);

        state.dragging = true;
        state.position = posY.value;
        state.startPos = e.touches[0].clientY;
      },
      {
        passive: true,
      }
    );

    useEvent(el, "mousedown", e => {
      e.preventDefault();

      Tween.kill(state);

      state.dragging = true;
      state.position = posY.value;
      state.startPos = mouseY.value;
    });

    const onTouchEnd = () => {
      if (!state.dragging) {
        return;
      }
      state.dragging = false;
    };

    useEvent(window as any, "touchend", onTouchEnd);
    useEvent(window as any, "mouseup", onTouchEnd);

    useEvent(
      window as any,
      "touchmove",
      e => {
        if (!state.dragging) {
          return;
        }

        Tween.kill(state);

        const y = e.touches[0].clientY;
        const distance = (state.startPos - y) * 2;
        state.ty = state.position + distance;
      },
      {
        passive: true,
      }
    );

    const [_, mouseY] = useMousePositionState(({ y }) => {
      if (!state.dragging) {
        return;
      }

      const distance = (state.startPos - y) * 2;
      state.ty = state.position + distance;
    });

    useEvent(
      window as any,
      "wheel",
      e => {
        Tween.kill(state);

        const { pixelY } = NormalizeWheel(e);
        state.ty += pixelY;
      },
      {
        passive: true,
      }
    );

    const [__, wh] = useWindowSizeState(() => {
      state.resizing = true;

      const bounds = el.getBoundingClientRect();
      maxY.value = bounds.height / 2;

      state.resizing = false;
    });

    const ease = {
      pc: 0.12,
      sp: 0.08,
    }[device];

    useTick(({ deltaRatio }) => {
      if (state.resizing) {
        return;
      }

      const oldY = posY.value;
      const p = ease * deltaRatio;
      posY.value = lerp(posY.value, state.ty, p);
      diffY.value = oldY - posY.value;
    });

    const geo = new PlaneBufferGeometry(1, 1);
    const mat = new ShaderMaterial({
      fragmentShader: fragment,
      vertexShader: vertex,
      transparent: true,
      alphaTest: 0.5,
      depthTest: false,
    });

    useMount(() => {
      const bounds = el.getBoundingClientRect();
      maxY.value = bounds.height / 2;

      // addChild(refs.gridItem, GridItem, {
      //   ...context,
      //   diff: readonly(diffY),
      //   geo,
      //   mat,
      //   maxY: readonly(maxY),
      //   posY: readonly(posY),
      // });
    });

    const start = () => {
      const centerY = wh.value / 2;
      const itemH = refs.gridItem[0].getBoundingClientRect().height;
      const gap = maxY.value - itemH * 4;
      const offset = maxY.value - (centerY + itemH / 2) - gap / 4;

      Tween.tween(state, 2.7, "power4.out", {
        onUpdate: () => {
          posY.value = state.ty;
        },
        ty: offset,
      });
    };

    return {
      start,
    };
  },
});
