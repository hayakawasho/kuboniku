import { defineComponent, useSlot, useMount, useDomRef } from "lake";
import { useTick, useElementSize } from "@/_foundation/hooks";
import { Tween } from "@/_foundation/tween";
import { useScrollStateContext } from "@/_states/scroll";
import { useScrollbarProgress } from "@/_states/scrollbar-progress";
import ScrollSkewContainer from "../scroll-skew";
import type { AppContext } from "@/_foundation/type";

type Refs = {
  kv: HTMLElement;
  content: HTMLElement;
};

export default defineComponent({
  name: "WorkSingle",
  setup(el, context: AppContext) {
    const { once, history, backCanvasContext } = context;

    const state = {
      offsetHeight: el.getBoundingClientRect().height,
      resizing: false,
    };

    const { refs } = useDomRef<Refs>("kv", "content");
    const { addChild } = useSlot();
    const { onMutateScrollProgress } = useScrollbarProgress();
    const { scrolling } = useScrollStateContext();

    addChild(refs.content, ScrollSkewContainer, context);

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

    useMount(() => {
      const themeColor = el.dataset.color!;
      backCanvasContext.onChangeColorsPalette(themeColor, themeColor, "#000", "#000");
      onMutateScrollProgress(state.offsetHeight);

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
        if (history.value === "push") {
          Tween.tween(el, 0.55, "power3.out", {
            opacity: 0,
          });
        }
      };
    });
  },
});
