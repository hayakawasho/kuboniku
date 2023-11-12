import { defineComponent, useSlot, useDomRef, useMount } from "lake";
import { useTick, useElementSize } from "@/_foundation/hooks";
import { Tween } from "@/_foundation/tween";
import { useScrollPos } from "@/_states/scroll";
import { useScrollbarProgress } from "@/_states/scrollbar-progress";
import { useWindowSize } from "@/_states/window-size";
import ProjectItem from "./project";
import SkewScrollContainer from "../../skew-scroll";
import type { AppContext } from "@/_foundation/type";

type Refs = {
  index: HTMLElement;
  projectItem: HTMLElement[];
  h1: HTMLElement;
};

export default defineComponent({
  name: "Works",
  setup(el, context: AppContext) {
    const { once, history, mq } = context;

    const { addChild } = useSlot();
    const { refs } = useDomRef<Refs>("index", "projectItem", "h1");

    addChild(el, SkewScrollContainer, context);

    if (mq.value === "pc") {
      addChild(refs.projectItem, ProjectItem, context);
    }

    const state = {
      offsetHeight: el.getBoundingClientRect().height,
      resizing: false,
    };

    const { onProgressMutate } = useScrollbarProgress();
    const [y] = useScrollPos();
    const [_ww, wh] = useWindowSize();

    useElementSize(el, ({ height }) => {
      state.resizing = true;
      state.offsetHeight = height;
      state.resizing = false;
    });

    useTick(() => {
      if (state.resizing) {
        return;
      }
      onProgressMutate(y.value, wh.value, state.offsetHeight);
    });

    useMount(() => {
      if (!once && history.value === "push") {
        Tween.serial(
          Tween.wait(0.2),
          Tween.tween([refs.projectItem, refs.h1], 0.55, "power3.out", {
            opacity: 1,
          })
        );
      }

      return () => {
        if (history.value === "pop") {
          return;
        }

        Tween.tween([refs.projectItem, refs.h1], 0.55, "power3.out", {
          opacity: 0,
        });
      };
    });
  },
});
