import { defineComponent, ref, useMount } from "lake";
import { clamp } from "remeda";
import { useTick } from "@/_foundation/hooks";
import { lerp } from "@/_foundation/math";
import { useScrollPosY } from "@/_states/scroll";
import { useWindowSize } from "@/_states/window-size";
import type { AppContext } from "@/_foundation/type";

export default defineComponent({
  name: "SkewScrollContainer",
  setup(el: HTMLElement, context: AppContext) {
    const { mq } = context;

    const state = {
      active: false,
    };

    const [ww] = useWindowSize();
    const [y] = useScrollPosY();

    const lastY = ref(0);

    const EASE = {
      pc: 0.12,
      sp: 0.16,
    } as const;

    const onReset = () => {
      lastY.value = 0;
      state.active = false;
    };

    useTick(({ timeRatio }) => {
      if (!state.active) {
        return;
      }

      const currentY = y.value;

      const easeVal = 1 - (1 - EASE[mq.value]) ** timeRatio;
      lastY.value = lerp(lastY.value, currentY, easeVal);

      if (lastY.value < 0.1) {
        lastY.value = 0;
      }

      const skewY = 7.5 * ((currentY - lastY.value) / ww.value);
      const ty = clamp(skewY, { max: 6, min: -6 });

      el.style.transform = `skew(0, ${ty}deg) translateZ(0)`;
    });

    useMount(() => {
      state.active = true;

      return () => {
        onReset();
      };
    });
  },
});
