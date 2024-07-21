import { useMount, ref } from "lake";
import { clamp } from "remeda";
import { useTick } from "~/_foundation/hooks";
import { lerp } from "~/_foundation/math";
import { useMediaQueryState } from "~/_states/mq";
import { useScrollState } from "~/_states/scroll";
import { useScrollPositionState } from "~/_states/scroll-position";
import { useWindowSizeState } from "~/_states/window-size";

export const useScrollSkew = (initialPos: number, callback: (payload: { value: number }) => void) => {
  const { device } = useMediaQueryState();
  const [ww] = useWindowSizeState();
  const [posY] = useScrollPositionState();
  const { scrolling } = useScrollState();
  const isActive = ref(false);
  const lastY = ref(initialPos);

  const ease = {
    pc: 0.1,
    sp: 0.15,
  }[device];

  const f = {
    pc: 14,
    sp: 8,
  }[device];

  useTick(({ deltaRatio }) => {
    if (!isActive.value || !scrolling.value) {
      return;
    }

    const currentY = posY.value;
    lastY.value = lerp(lastY.value, currentY, ease * deltaRatio);

    if (lastY.value < 0.1) {
      lastY.value = 0;
    }

    const diff = currentY - lastY.value;
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
    isActive.value = true;

    return () => {
      isActive.value = false;
    };
  });
};
