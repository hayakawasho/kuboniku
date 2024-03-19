import { defineComponent, ref, useMount } from "lake";
import { clamp } from "remeda";
import { useTick } from "@/_foundation/hooks";
import { lerp } from "@/_foundation/math";
import { useMediaQueryContext } from "@/_states/mq";
import { useScrollPosY } from "@/_states/scroll";
import { useWindowSizeContext } from "@/_states/window-size";
import type { AppContext } from "@/_foundation/type";

export default defineComponent({
  name: "SkewScrollContainer",
  setup(el: HTMLElement, _context: AppContext) {
    const state = {
      active: false,
    };

    const { device } = useMediaQueryContext();
    const [ww] = useWindowSizeContext();
    const [y, { isScrolling }] = useScrollPosY();

    const lastY = ref(0);

    const EASE = {
      pc: 0.1,
      sp: 0.16,
    } as const;

    useTick(({ timeRatio }) => {
      if (!state.active || !isScrolling.value) {
        return;
      }

      const currentY = y.value;
      const easeVal = 1 - (1 - EASE[device]) ** timeRatio;
      lastY.value = lerp(lastY.value, currentY, easeVal);

      if (lastY.value < 0.1) {
        lastY.value = 0;
      }

      const skewY = 8 * ((currentY - lastY.value) / ww.value);
      const ty = clamp(skewY, { max: 7, min: -7 });
      el.style.transform = `skew(0, ${ty}deg) translateZ(0)`;
    });

    useMount(() => {
      state.active = true;

      return () => {
        state.active = false;
        lastY.value = 0;
      };
    });
  },
});
