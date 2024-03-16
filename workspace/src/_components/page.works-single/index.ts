import { defineComponent, useSlot, useMount, useDomRef as _ } from "lake";
import { useTick, useElementSize } from "@/_foundation/hooks";
import { Tween } from "@/_foundation/tween";
import { useScrollPosY } from "@/_states/scroll";
import { useScrollbarProgress } from "@/_states/scrollbar-progress";
import SkewScrollContainer from "../skew-scroll";
import type { AppContext } from "@/_foundation/type";

// type Refs = {};

export default defineComponent({
  name: "WirksSingle",
  setup(el, context: AppContext) {
    const { once, history, glContext } = context;

    // const { refs } = useDomRef<Refs>();
    const { addChild } = useSlot();

    addChild(el, SkewScrollContainer, context);

    const colorPallete = el.dataset.color!;
    glContext.onChangeColorPalette(colorPallete);

    const state = {
      offsetHeight: el.getBoundingClientRect().height,
      resizing: false,
    };

    const { onScrollProgressMutate } = useScrollbarProgress();
    const [y, { isScrolling }] = useScrollPosY();

    onScrollProgressMutate(y.value, state.offsetHeight);

    useElementSize(el, ({ height }) => {
      state.resizing = true;
      state.offsetHeight = height;
      state.resizing = false;
    });

    useTick(() => {
      if (state.resizing || isScrolling.value === false) {
        return;
      }

      onScrollProgressMutate(y.value, state.offsetHeight);
    });

    useMount(() => {
      if (!once && history.value === "push") {
        Tween.serial(
          Tween.prop(el, {
            opacity: 0,
          }),
          Tween.wait(0.2),
          Tween.tween(el, 0.55, "power3.out", {
            opacity: 1,
          })
        );
      }

      return () => {
        if (history.value === "pop") {
          return;
        }

        Tween.tween(el, 0.55, "power3.out", {
          opacity: 0,
        });
      };
    });
  },
});
