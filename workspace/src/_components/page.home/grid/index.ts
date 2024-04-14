import { defineComponent, useSlot, useDomRef, useEvent, ref, readonly, useMount } from "lake";
import NormalizeWheel from "normalize-wheel";
import { useTick } from "@/_foundation/hooks";
import { lerp } from "@/_foundation/math";
import { Tween } from "@/_foundation/tween";
import { PlaneBufferGeometry, ShaderMaterial } from "@/_gl/three";
import { useMousePos } from "@/_states/mouse";
import { useMediaQueryContext } from "@/_states/mq";
import { useWindowSizeContext } from "@/_states/window-size";
import fragment from "./fragment.frag";
import GridItem from "./item";
import vertex from "./vertex.vert";
import type { AppContext, ParentScene } from "@/_foundation/type";

type Props = AppContext & ParentScene;

type Refs = {
  gridItem: HTMLImageElement[];
};

export default defineComponent({
  name: "Grid",
  setup(el: HTMLElement, context: Props) {
    const { addChild } = useSlot();
    const { refs } = useDomRef<Refs>("gridItem");
    const { device } = useMediaQueryContext();

    const posY = ref(0);
    const diff = ref(0);
    const maxY = ref(0);

    const state = {
      dragging: false,
      position: 0,
      resizing: false,
      startPos: 0,
      targetPos: 0,
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

    const _window = window as any;

    useEvent(_window, "touchend", onTouchEnd);
    useEvent(_window, "mouseup", onTouchEnd);

    useEvent(
      _window,
      "touchmove",
      e => {
        if (!state.dragging) {
          return;
        }

        Tween.kill(state);

        const y = e.touches[0].clientY;
        const distance = (state.startPos - y) * 2;
        state.targetPos = state.position + distance;
      },
      {
        passive: true,
      }
    );

    const [_, mouseY] = useMousePos(({ y }) => {
      if (!state.dragging) {
        return;
      }
      const distance = (state.startPos - y) * 2;
      state.targetPos = state.position + distance;
    });

    useEvent(
      _window,
      "wheel",
      e => {
        Tween.kill(state);

        const { pixelY } = NormalizeWheel(e);
        state.targetPos += pixelY;
      },
      {
        passive: true,
      }
    );

    const [__, windowHeight] = useWindowSizeContext(() => {
      state.resizing = true;
      maxY.value = el.getBoundingClientRect().height / 2;
      state.resizing = false;
    });

    const EASE = {
      pc: 0.12,
      sp: 0.08,
    };

    useTick(({ timeRatio }) => {
      if (state.resizing) {
        return;
      }

      const oldY = posY.value;
      const p = 1 - (1 - EASE[device]) ** timeRatio;
      const easeVal = lerp(posY.value, state.targetPos, p);

      posY.value = easeVal;
      diff.value = oldY - posY.value;
    });

    const geo = new PlaneBufferGeometry(1, 1);
    const mat = new ShaderMaterial({
      fragmentShader: fragment,
      vertexShader: vertex,
    });

    useMount(() => {
      maxY.value = el.getBoundingClientRect().height / 2;

      addChild(refs.gridItem, GridItem, {
        ...context,
        diff: readonly(diff),
        geo,
        mat,
        maxY: readonly(maxY),
        posY: readonly(posY),
      });
    });

    return {
      start: () => {
        const itemH = refs.gridItem[0].getBoundingClientRect().height;
        const centerY = windowHeight.value / 2;
        const gap = maxY.value - itemH * 4;
        const offset = maxY.value - (centerY + itemH / 2) - gap / 4;

        Tween.tween(state, 3, "power3.out", {
          targetPos: offset,
          onUpdate: () => {
            posY.value = state.targetPos;
          },
        });
      },
    };
  },
});
