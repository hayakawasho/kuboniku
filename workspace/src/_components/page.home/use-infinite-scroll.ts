import { gsap } from "gsap";
import { ref, readonly, useEvent, useMount } from "lake";
import NormalizeWheel from "normalize-wheel";
import { useTick } from "@/_foundation/hooks";
import { lerp } from "@/_foundation/math";
import { useMediaQueryContext } from "@/_states/mq";
import { useMousePos } from "@/_states/mouse";
import { useWindowSizeContext } from "@/_states/window-size";

const EASE = {
  pc: 0.12,
  sp: 0.08,
} as const;

export const useInfiniteScroll = (container: HTMLElement) => {
  const { device } = useMediaQueryContext();

  const posY = ref(0);
  const diff = ref(0);

  const state = {
    dragging: false,
    maxY: 0,
    position: 0,
    resizing: false,
    startPos: 0,
    targetPos: 0,
  };

  useEvent(
    window as any,
    "touchstart",
    e => {
      state.dragging = true;
      state.position = posY.value;
      state.startPos = e.touches[0].clientY;
    },
    {
      passive: true,
    }
  );

  useEvent(window as any, "touchend", () => {
    if (state.dragging) {
      state.dragging = false;
    }
  });

  useEvent(
    window as any,
    "touchmove",
    e => {
      if (!state.dragging) {
        return;
      }

      const y = e.touches[0].clientY;
      const distance = (state.startPos - y) * 2;
      state.targetPos = state.position + distance;

      return state.targetPos;
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

  useEvent(container, "mousedown", e => {
    e.preventDefault();

    state.dragging = true;
    state.position = posY.value;
    state.startPos = mouseY.value;
  });

  useEvent(window as any, "mouseup", _e => {
    if (state.dragging) {
      state.dragging = false;
    }
  });

  useEvent(
    window as any,
    "wheel",
    e => {
      const { pixelY } = NormalizeWheel(e);
      state.targetPos += pixelY;

      return state.targetPos;
    },
    {
      passive: true,
    }
  );

  useWindowSizeContext(() => {
    state.resizing = true;

    const maxY = container.getBoundingClientRect().height / 2;
    state.maxY = maxY;

    state.resizing = false;
  });

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

  useMount(() => {
    const maxY = container.getBoundingClientRect().height / 2;
    state.maxY = maxY;
  });

  return {
    diff: readonly(diff),
    posY: readonly(posY),
    wrap: (cy: number) => gsap.utils.wrap(0, state.maxY, cy),
  };
};
