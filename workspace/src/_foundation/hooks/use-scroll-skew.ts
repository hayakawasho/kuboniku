import { clamp } from "remeda";
import { useTick } from "~/_foundation/hooks";
import { lerp } from "~/_foundation/math";
import { useMediaQuery } from "~/_states/mq";
import { useScrollState } from "~/_states/scroll";
import { useWindowScroll } from "~/_states/scroll-position";
import { useWindowSize } from "~/_states/window-size";

export const useScrollSkew = (from: number, callback: (payload: number) => void) => {
  let lastY = from;

  const { device } = useMediaQuery();
  const [windowW] = useWindowSize();
  const [currentY] = useWindowScroll();
  const { scrolling } = useScrollState();

  const ease = {
    pc: 0.1,
    sp: 0.15,
  }[device];

  const f = {
    pc: 14,
    sp: 8,
  }[device];

  useTick(({ deltaRatio }) => {
    if (!scrolling.value) {
      return;
    }

    const y = currentY.value;
    lastY = lerp(lastY, y, ease * deltaRatio);

    if (lastY < 0.1) {
      lastY = 0;
    }

    const diff = y - lastY;
    const skewY = f * (diff / windowW.value);
    const ty = clamp(skewY, { max: 7, min: -7 });

    callback(ty);
  });
};
