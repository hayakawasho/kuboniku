import { defineComponent, useSlot, useDomRef, useMount, useIntersectionWatch } from "lake";
import { SITE_THEME_COLOR } from "@/_foundation/const";
import { useTick, useElementSize } from "@/_foundation/hooks";
import { Tween } from "@/_foundation/tween";
import { loadImage } from "@/_foundation/utils";
import { useMediaQueryContext } from "@/_states/mq";
import { useScrollStateContext } from "@/_states/scroll";
import { useScrollbarProgress } from "@/_states/scrollbar-progress";
import ProjectItems from "./projects";
import ScrollSkewContainer from "../scroll-skew";
import type { AppContext } from "@/_foundation/type";

type Refs = {
  index: HTMLElement;
  h1: HTMLElement;
  thumb: HTMLElement[];
};

export default defineComponent({
  name: "Work",
  setup(el, context: AppContext) {
    const { once, history, backCanvasContext } = context;

    const state = {
      offsetHeight: el.getBoundingClientRect().height,
      resizing: false,
    };

    const { addChild } = useSlot();
    const { refs } = useDomRef<Refs>("index", "h1", "thumb");
    const { anyHover } = useMediaQueryContext();
    const { onMutateScrollProgress } = useScrollbarProgress();
    const { scrolling } = useScrollStateContext();

    addChild([refs.h1, refs.index], ScrollSkewContainer, context);

    if (anyHover) {
      addChild(refs.index, ProjectItems, context);
    } else {
      const { unwatch } = useIntersectionWatch(refs.thumb, entries => {
        entries.forEach(async entry => {
          const target = entry.target as HTMLElement;
          const imgSrc = target.dataset.src as string;

          if (entry.isIntersecting) {
            unwatch(target);
            await loadImage(imgSrc);
            target.style.backgroundImage = `url(${imgSrc})`;
            target.dataset.visible = "true";
          }
        });
      });
    }

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

    //------------------------------------------------------------------------------

    useMount(() => {
      backCanvasContext.onChangeColorsPalette(SITE_THEME_COLOR, SITE_THEME_COLOR, "#000", "#000");
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
