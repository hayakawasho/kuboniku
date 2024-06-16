import { useMount } from "lake";
import { clamp } from "remeda";
import { useTick } from "@/_foundation/hooks";
import { lerp } from "@/_foundation/math";
import { useMediaQueryContext } from "@/_states/mq";
import { useScrollStateContext } from "@/_states/scroll";
import { useScrollPositionContext } from "@/_states/scroll-position";
import { useWindowSizeContext } from "@/_states/window-size";

export const useScrollSkew = (
  callback: (payload: { value: number }) => void,
  { initialPos = 0 }: { initialPos: number }
) => {
  const { device } = useMediaQueryContext();
  const [ww] = useWindowSizeContext();
  const [posY] = useScrollPositionContext();
  const { scrolling } = useScrollStateContext();

  const state = {
    active: false,
    lastY: initialPos,
  };

  const ease = {
    pc: 0.1,
    sp: 0.15,
  }[device];

  const f = {
    pc: 14,
    sp: 8,
  }[device];

  useTick(({ deltaRatio }) => {
    if (!state.active || !scrolling.value) {
      return;
    }

    const currentY = posY.value;
    state.lastY = lerp(state.lastY, currentY, ease * deltaRatio);

    if (state.lastY < 0.1) {
      state.lastY = 0;
    }

    const diff = currentY - state.lastY;
    const skewY = f * (diff / ww.value);
    const ty = clamp(skewY, {
      max: 7,
      min: -7,
    });

    callback({
      value: ty,
    });
  });

  useMount(() => {
    state.active = true;

    return () => {
      state.active = false;
    };
  });
};
