import { defineComponent, useDomRef, useSlot, useMount, ref, readonly, withSvelte } from "lake";
import { BREAK_POINTS } from "~/_foundation/const";
import { useElementSize } from "~/_foundation/hooks";
import { cursorTypeMutators } from "~/_states/cusor";
import { mediaQueryMutators } from "~/_states/mq";
import { routeMutators } from "~/_states/route";
import { windowSizeMutators } from "~/_states/window-size";
import { useHtmx } from "./htmx";
import Cursor from "../cursor.svelte";
import BackCanvas from "../glworld/back";
import FrontCanvas from "../glworld/front";
import PageScroll from "../page-scroll";
import type { AppContext, RouteName } from "~/_foundation/types";

type Props = {
  onCreated: (props?: Omit<AppContext, "once">) => void;
  onUpdated: (scope: HTMLElement, props?: Omit<AppContext, "once">) => void;
  onCleanup: (scope: HTMLElement) => void;
};

type Refs = {
  main: HTMLElement;
  backCanvas: HTMLCanvasElement;
  frontCanvas: HTMLCanvasElement;
  windowSizeWatcher: HTMLElement;
  cursor: HTMLElement;
};

export default defineComponent({
  name: "Load",
  setup(_el, { onCreated, onUpdated, onCleanup }: Props) {
    const { addChild } = useSlot();
    const { refs } = useDomRef<Refs>("backCanvas", "frontCanvas", "main", "windowSizeWatcher", "cursor");

    const history = ref<"push" | "pop">("push");

    const wideQuery = window.matchMedia(BREAK_POINTS["pc"]);
    const mediaQuery = {
      anyHover: window.matchMedia("(any-hover:hover)").matches,
      device: wideQuery.matches ? "pc" : "sp",
    } as const;

    const [scrollContext] = addChild(refs.main, PageScroll, {
      anyHover: mediaQuery.anyHover,
    });

    const dpr = Math.min(window.devicePixelRatio, 1.5);
    const [backCanvasContext] = addChild(refs.backCanvas, BackCanvas, { dpr });
    const [frontCanvasContext] = addChild(refs.frontCanvas, FrontCanvas, { dpr });

    const provides = {
      backCanvasContext: backCanvasContext.current,
      frontCanvasContext: frontCanvasContext.current,
      history: readonly(history),
      scrollContext: scrollContext.current,
    } as AppContext;

    //----------------------------------------------------------------

    useHtmx({
      from: refs.main,
      history,
      onEnter(to: HTMLElement) {
        const namespace = to.dataset.xhr as RouteName;
        document.body.dataset.page = namespace;

        scrollContext.current.reset();

        routeMutators({ name: namespace });
        onUpdated(to, provides);
        cursorTypeMutators("default");
      },
      onLeave(from: HTMLElement) {
        onCleanup(from);
      },
    });

    //----------------------------------------------------------------

    useMount(() => {
      mediaQueryMutators(mediaQuery);

      if (mediaQuery.anyHover) {
        addChild(refs.cursor, withSvelte(Cursor, "Cursor"));
      }

      onCreated(provides);
    });

    //----------------------------------------------------------------

    wideQuery.addEventListener("change", () => location.reload(), {
      once: true,
    });

    //----------------------------------------------------------------

    useElementSize(refs.windowSizeWatcher, ({ width, height }) => {
      windowSizeMutators({
        height,
        width,
      });
    });
  },
});
