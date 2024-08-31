import { defineComponent, useSlot, useMount, useDomRef } from "lake";
import ScrollSkewContainer from "~/_components/ui/scroll-skew";
import { useElementSize } from "~/_foundation/hooks";
import { Tween } from "~/_foundation/libs/tween";
import { useWindowScroll } from "~/_states/scroll-position";
import { useScrollbarProgress } from "~/_states/scrollbar-progress";
import type { AppContext } from "~/_foundation/types";

type Refs = {
  kv: HTMLElement;
  content: HTMLElement;
};

export default defineComponent({
  name: "WorkSingle",
  setup(el, context: AppContext) {
    const { once, history, backCanvasContext } = context;

    const { refs } = useDomRef<Refs>("kv", "content");
    const { addChild } = useSlot();
    const { onMutateScrollProgress } = useScrollbarProgress();

    const cache = {
      offset: el.getBoundingClientRect().height,
    };

    addChild([refs.kv, refs.content], ScrollSkewContainer, context);

    useElementSize(el, ({ height }) => {
      cache.offset = height;
    });

    useWindowScroll(() => {
      onMutateScrollProgress(cache.offset);
    });

    //----------------------------------------------------------------

    useMount(() => {
      const themeColor = el.dataset.color!;
      backCanvasContext.onChangeColorsPalette(themeColor, themeColor, "#000", "#000");
      onMutateScrollProgress(cache.offset);

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
        if (history.value !== "push") {
          return;
        }

        Tween.tween(el, 0.55, "power3.out", {
          opacity: 0,
        });
      };
    });
  },
});
