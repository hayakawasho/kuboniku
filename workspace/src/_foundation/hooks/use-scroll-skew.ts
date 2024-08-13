import { useMount, ref } from "lake";
import { clamp } from "remeda";
import { useTick } from "~/_foundation/hooks";
import { lerp } from "~/_foundation/math";
import { useMediaQuery } from "~/_states/mq";
import { useScrollState } from "~/_states/scroll";
import { useWindowScroll } from "~/_states/scroll-position";
import { useWindowSize } from "~/_states/window-size";

export const useScrollSkew = (from: number, callback: (payload: { value: number }) => void) => {
  const { device } = useMediaQuery();
  const [ww] = useWindowSize();
  const [posY] = useWindowScroll();
  const { scrolling } = useScrollState();

  const suspend = ref(true);
  const lastY = ref(from);

  const ease = {
    pc: 0.1,
    sp: 0.15,
  };

  const f = {
    pc: 12,
    sp: 8,
  };

  useTick(({ deltaRatio }) => {
    if (suspend.value || !scrolling.value) {
      return;
    }

    const currentY = posY.value;
    lastY.value = lerp(lastY.value, currentY, ease[device] * deltaRatio);

    if (lastY.value < 0.1) {
      lastY.value = 0;
    }

    const diff = currentY - lastY.value;
    const skewY = f[device] * (diff / ww.value);
    const ty = clamp(skewY, {
      max: 7,
      min: -7,
    });

    callback({
      value: ty,
    });
  });

  useMount(() => {
    setTimeout(() => {
      suspend.value = false;
    }, ease[device] * 1000);

    return () => {
      suspend.value = true;
    };
  });
};
