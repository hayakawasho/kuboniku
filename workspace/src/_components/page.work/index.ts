import { defineComponent, useSlot, useDomRef, useMount } from "lake";
import { useTick, useElementSize } from "@/_foundation/hooks";
import { Tween } from "@/_foundation/tween";
import { useMediaQueryContext } from "@/_states/mq";
import { useScrollStateContext } from "@/_states/scroll";
import { useScrollbarProgress } from "@/_states/scrollbar-progress";
import ProjectItem from "./project";
import SkewScrollContainer from "../skew-scroll";
import type { AppContext } from "@/_foundation/type";

type Refs = {
  index: HTMLElement;
  h1: HTMLElement;
  canvas: HTMLCanvasElement;
  projectItem: HTMLElement[];
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
    const { refs } = useDomRef<Refs>("index", "projectItem", "h1", "canvas", "wrap");
    const { device } = useMediaQueryContext();

    addChild(refs.h1, SkewScrollContainer, context);
    addChild(refs.index, SkewScrollContainer, context);

    if (device === "pc") {
      addChild(refs.projectItem, ProjectItem, context);

      // const { addScene, removeScene } = useThree(refs.canvas, 1);
      // addChild(refs.index, Projects, {
      //   ...context,
      //   addScene,
      //   removeScene,
      // });
    }

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

    //------------------------------------------------------------------------------

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
