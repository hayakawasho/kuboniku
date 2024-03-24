import { defineComponent, useSlot, useDomRef, useMount } from "lake";
import { useThree } from "@/_components/glworld/use-three";
import { useTick, useElementSize } from "@/_foundation/hooks";
import { Tween } from "@/_foundation/tween";
import { useMediaQueryContext } from "@/_states/mq";
import { useScrollPosY } from "@/_states/scroll";
import { useScrollbarProgress } from "@/_states/scrollbar-progress";
import Projects from "./projects";
import SkewScrollContainer from "../skew-scroll";
import type { AppContext } from "@/_foundation/type";

type Refs = {
  index: HTMLElement;
  h1: HTMLElement;
  canvas: HTMLCanvasElement;
};

export default defineComponent({
  name: "Works",
  setup(el, context: AppContext) {
    const { once, history } = context;

    const state = {
      offsetHeight: el.getBoundingClientRect().height,
      resizing: false,
    };

    const { addChild } = useSlot();
    const { refs } = useDomRef<Refs>("index", "projects", "h1", "canvas", "wrap");
    const { device } = useMediaQueryContext();

    addChild(refs.h1, SkewScrollContainer, context);
    addChild(refs.index, SkewScrollContainer, context);

    if (device === "pc") {
      const { addScene, removeScene } = useThree(refs.canvas, 1);

      addChild(refs.canvas, SkewScrollContainer, context);
      addChild(refs.index, Projects, {
        ...context,
        addScene,
        removeScene,
      });
    }

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
