import { useMount } from "lake";
import { clamp } from "remeda";
import { useTick } from "~/_foundation/hooks";
import { lerp } from "~/_foundation/math";
import { useMediaQuery } from "~/_states/mq";
import { useScrollState } from "~/_states/scroll";
import { useWindowScroll } from "~/_states/window-scroll";
import { useWindowSize } from "~/_states/window-size";

export const useScrollSkew = (from: number, callback: (payload: number) => void) => {
  const { device } = useMediaQuery();
  const [windowW] = useWindowSize();
  const [currentY] = useWindowScroll();
  const { scrolling } = useScrollState();

  const state = {
    lastY: from,
    active: false,
  };

  const ease = {
    pc: 0.12,
    sp: 0.14,
  }[device];

  const f = {
    pc: 14,
    sp: 8,
  }[device];

  useTick(({ deltaRatio }) => {
    if (!state.active || !scrolling.value) {
      return;
    }

    const y = currentY.value;
    state.lastY = lerp(state.lastY, y, ease * deltaRatio);

    if (state.lastY < 0.1) {
      state.lastY = 0;
    }

    const diff = y - state.lastY;
    const skewY = f * (diff / windowW.value);
    const ty = clamp(skewY, { max: 7, min: -7 });

    callback(ty);
  });

  useMount(() => {
    state.active = true;

    return () => {
      state.active = false;
    };
  });
};
