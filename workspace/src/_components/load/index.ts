import htmx from "htmx.org";
import { defineComponent, useDomRef, useSlot, useMount, useEvent, ref, readonly } from "lake";
import { useElementSize } from "@/_foundation/hooks";
import { mq } from "@/_foundation/mq";
import { mediaQueryMutators } from "@/_states/mq";
import { routeMutators } from "@/_states/route";
import { scrollPosMutators, isScrollingMutators } from "@/_states/scroll";
import { windowSizeMutators } from "@/_states/window-size";
import BackCanvas from "../glworld/back";
import type { AppContext, RouteName } from "@/_foundation/type";

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
};

export default defineComponent({
  name: "Load",
  setup(_el, { onCreated, onUpdated, onCleanup }: Props) {
    const { addChild } = useSlot();
    const { refs } = useDomRef<Refs>("backCanvas", "frontCanvas", "main", "windowSizeWatcher");

    const history = ref<"push" | "pop">("push");

    const wideQuery = window.matchMedia(mq.pc);
    const mediaQuery = {
      anyHover: window.matchMedia("(any-hover:hover)").matches,
      device: wideQuery.matches ? "pc" : "sp",
    } as const;

    const [backCanvasContext] = addChild(refs.backCanvas, BackCanvas);

    const provides = {
      backCanvasContext: backCanvasContext.current,
      history: readonly(history),
    } as AppContext;

    useMount(() => {
      mediaQueryMutators(mediaQuery);
      onCreated(provides);
    });

    wideQuery.addEventListener("change", () => location.reload(), {
      once: true,
    });

    //----------------------------------------------------------------

    const onLeave = (from: HTMLElement) => {
      onCleanup(from);
    };

    const onEnter = (to: HTMLElement) => {
      const namespace = to.dataset.xhr as RouteName;
      document.body.dataset.page = namespace;

      window.scrollTo(0, 0);
      scrollPosMutators(0);

      onUpdated(to, provides);
      routeMutators({ name: namespace });
    };

    const xhr = "[data-xhr]";
    const fromContainer = ref(htmx.find(refs.main, xhr) as HTMLElement);

    htmx.config.historyCacheSize = 1;

    htmx.on("htmx:historyRestore", e => {
      history.value = "pop";
      onLeave(fromContainer.value);

      const { detail } = e as CustomEvent;
      const newContainer = htmx.find(detail.elt, xhr) as HTMLElement;
      onEnter(newContainer);
    });

    htmx.on("htmx:beforeHistorySave", e => {
      const { detail } = e as CustomEvent;
      const oldContainer = htmx.find(detail.historyElt, xhr) as HTMLElement;
      onLeave(oldContainer);
      fromContainer.value = oldContainer;
    });

    htmx.on("htmx:beforeSwap", () => {
      history.value = "push";
    });

    htmx.on("htmx:afterSwap", e => {
      const { detail } = e as CustomEvent;
      const newContainer = htmx.find(detail.target, xhr) as HTMLElement;
      onEnter(newContainer);
    });

    htmx.on("htmx:xhr:progress", e => {
      // const { detail } = e as CustomEvent;
      // const loadProgress = Math.floor((detail.loaded / detail.total) * 1000) / 1000;
      // console.log(loadProgress);
    });

    //----------------------------------------------------------------

    useElementSize(refs.windowSizeWatcher, ({ width, height }) => {
      windowSizeMutators({
        height,
        width,
      });
    });

    //----------------------------------------------------------------

    let timer: number;

    useEvent(
      window as any,
      "scroll",
      () => {
        clearTimeout(timer);

        isScrollingMutators(true);
        scrollPosMutators(window.scrollY);

        timer = window.setTimeout(() => {
          isScrollingMutators(false);
        }, 500);
      },
      {
        passive: true,
      }
    );
  },
});
