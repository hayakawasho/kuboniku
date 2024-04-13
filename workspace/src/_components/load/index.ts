import htmx from "htmx.org";
import {
  defineComponent,
  useDomRef,
  useSlot,
  useMount,
  useEvent,
  ref,
  readonly,
  withSvelte,
} from "lake";
import { useElementSize } from "@/_foundation/hooks";
import { mq } from "@/_foundation/mq";
import { cursorTypeMutators } from "@/_states/cusor";
import { mediaQueryMutators } from "@/_states/mq";
import { routeMutators } from "@/_states/route";
import { scrollStateYMutators } from "@/_states/scroll";
import { scrollPositionMutators } from "@/_states/scroll-position";
import { windowSizeMutators } from "@/_states/window-size";
import Cursor from "../cursor.svelte";
import BackCanvas from "../glworld";
import FrontCanvas from "../glworld/front";
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
  cursor: HTMLElement;
};

export default defineComponent({
  name: "Load",
  setup(_el, { onCreated, onUpdated, onCleanup }: Props) {
    const { addChild } = useSlot();
    const { refs } = useDomRef<Refs>(
      "backCanvas",
      "frontCanvas",
      "main",
      "windowSizeWatcher",
      "cursor"
    );

    const history = ref<"push" | "pop">("push");

    const wideQuery = window.matchMedia(mq.pc);
    const mediaQuery = {
      anyHover: window.matchMedia("(any-hover:hover)").matches,
      device: wideQuery.matches ? "pc" : "sp",
    } as const;

    const [backCanvasContext] = addChild(refs.backCanvas, BackCanvas);
    const [frontCanvasContext] = addChild(refs.frontCanvas, FrontCanvas);

    const provides = {
      backCanvasContext: backCanvasContext.current,
      frontCanvasContext: frontCanvasContext.current,
      history: readonly(history),
    } as AppContext;

    //----------------------------------------------------------------

    const onLeave = (from: HTMLElement) => {
      onCleanup(from);
    };

    const onEnter = (to: HTMLElement) => {
      const namespace = to.dataset.xhr as RouteName;
      document.body.dataset.page = namespace;

      window.scrollTo(0, 0);
      scrollPositionMutators(0);

      onUpdated(to, provides);
      cursorTypeMutators("default");
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

    htmx.on("htmx:xhr:loadstart", _e => {
      cursorTypeMutators("loading");
    });

    // htmx.on("htmx:xhr:loadend", _e => {
    // });

    // htmx.on("htmx:xhr:progress", e => {
    //   const { detail } = e as CustomEvent;
    //   const loadProgress = Math.floor((detail.loaded / detail.total) * 1000) / 1000;
    // });

    //----------------------------------------------------------------

    useMount(() => {
      mediaQueryMutators(mediaQuery);

      if (mediaQuery.device === "pc") {
        addChild(refs.cursor, withSvelte(Cursor, "Cursor"));
      }

      onCreated(provides);
    });

    wideQuery.addEventListener("change", () => location.reload(), {
      once: true,
    });

    useElementSize(refs.windowSizeWatcher, ({ width, height }) => {
      windowSizeMutators({
        height,
        width,
      });
    });

    let timer: number;

    useEvent(
      window as any,
      "scroll",
      () => {
        clearTimeout(timer);

        scrollPositionMutators(window.scrollY);
        scrollStateYMutators({
          scrolling: true,
        });

        timer = window.setTimeout(() => {
          scrollStateYMutators({
            scrolling: false,
          });
        }, 500);
      },
      {
        passive: true,
      }
    );
  },
});
