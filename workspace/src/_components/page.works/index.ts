import { defineComponent, useSlot, useDomRef, useMount } from "lake";
import { useTick, useElementSize } from "@/_foundation/hooks";
import { Tween } from "@/_foundation/tween";
import { useMediaQueryContext } from "@/_states/mq";
import { useScrollPosY } from "@/_states/scroll";
import { useScrollbarProgress } from "@/_states/scrollbar-progress";
import ProjectItem from "./project";
import SkewScrollContainer from "../skew-scroll";
import type { AppContext } from "@/_foundation/type";

type Refs = {
  index: HTMLElement;
  projectItem: HTMLElement[];
  h1: HTMLElement;
};

export default defineComponent({
  name: "Works",
  setup(el, context: AppContext) {
    const { once, history } = context;

    const { addChild } = useSlot();
    const { refs } = useDomRef<Refs>("index", "projectItem", "h1");
    const { device } = useMediaQueryContext();

    addChild(el, SkewScrollContainer, context);

    if (device === "pc") {
      addChild(refs.projectItem, ProjectItem, context);
    }

    const state = {
      offsetHeight: el.getBoundingClientRect().height,
      resizing: false,
    };

    const { onMutateScrollProgress } = useScrollbarProgress();
    const [y, { isScrolling }] = useScrollPosY();

    onMutateScrollProgress(y.value, state.offsetHeight);

    useElementSize(el, ({ height }) => {
      state.resizing = true;
      state.offsetHeight = height;
      state.resizing = false;
    });

    useTick(() => {
      if (state.resizing || isScrolling.value === false) {
        return;
      }
      onMutateScrollProgress(y.value, state.offsetHeight);
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
        if (history.value === "push") {
          Tween.tween(el, 0.55, "power3.out", {
            opacity: 0,
          });
        }
      };
    });
  },
});
