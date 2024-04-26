import { defineComponent, useSlot, useMount, useDomRef as _ } from "lake";
import { useTick, useElementSize } from "@/_foundation/hooks";
import { Tween } from "@/_foundation/tween";
import { useScrollStateContext } from "@/_states/scroll";
import { useScrollbarProgress } from "@/_states/scrollbar-progress";
import SkewScrollContainer from "../skew-scroll";
import type { AppContext } from "@/_foundation/type";

// type Refs = {};

export default defineComponent({
  name: "WorkSingle",
  setup(el, context: AppContext) {
    const { once, history, backCanvasContext } = context;

    // const { refs } = useDomRef<Refs>();
    const { addChild } = useSlot();

    addChild(el, SkewScrollContainer, context);

    const state = {
      offsetHeight: el.getBoundingClientRect().height,
      resizing: false,
    };

    const { onMutateScrollProgress } = useScrollbarProgress();
    const { scrolling } = useScrollStateContext();

    useElementSize(el, ({ height }) => {
      state.resizing = true;
      state.offsetHeight = height;
      state.resizing = false;
    });

    useTick(() => {
      if (state.resizing || !scrolling.value) {
        return;
      }
      onMutateScrollProgress(state.offsetHeight);
    });

    //----------------------------------------------------------------

    const onEnter = () => {
      Tween.serial(
        Tween.prop(el, {
          opacity: 0,
        }),
        Tween.wait(0.2),
        Tween.tween(el, 0.55, "power3.out", {
          opacity: 1,
        })
      );
    };

    const onLeave = () => {
      Tween.tween(el, 0.55, "power3.out", {
        opacity: 0,
      });
    };

    useMount(() => {
      const themeColor = el.dataset.color!;
      backCanvasContext.onChangeColorPalettes(themeColor, themeColor, "#000", "#000");

      onMutateScrollProgress(state.offsetHeight);

      if (!once && history.value === "push") {
        onEnter();
      }

      return () => {
        if (history.value === "push") {
          onLeave();
        }
      };
    });
  },
});
