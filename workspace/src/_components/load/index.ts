import htmx from "htmx.org";
import {
  defineComponent,
  useDomRef,
  useSlot,
  useMount,
  useEvent,
  ref,
  readonly,
} from "lake";
import { wideQuery } from "@/_foundation/env";
import { useElementSize } from "@/_foundation/hooks";
import { scrollPosMutators, isScrollingMutators } from "@/_states/scroll";
import { windowSizeMutators } from "@/_states/window-size";
import Gl from "../glworld";
import type { AppContext } from "@/_foundation/type";

type Props = {
  onCreated: (props?: Omit<AppContext, "once">) => void;
  onUpdated: (scope: HTMLElement, props?: Omit<AppContext, "once">) => void;
  onCleanup: (scope: HTMLElement) => void;
};

type Refs = {
  main: HTMLElement;
  glWorld: HTMLElement;
  windowSizeWatcher: HTMLElement;
};

export default defineComponent({
  name: "Load",
  setup(_el, { onCreated, onUpdated, onCleanup }: Props) {
    const { addChild } = useSlot();
    const { refs } = useDomRef<Refs>("glWorld", "main", "windowSizeWatcher");

    const history = ref<"push" | "pop">("push");
    const mq = readonly(ref<"pc" | "sp">(wideQuery.matches ? "pc" : "sp"));

    const [glContext] = addChild(refs.glWorld, Gl, { mq });

    const provides = {
      glContext: glContext.current,
      history: readonly(history),
      mq,
    } as AppContext;

    useMount(() => {
      onCreated(provides);
    });

    //----------------------------------------------------------------

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

    //----------------------------------------------------------------

    const onLeave = (from: HTMLElement) => {
      onCleanup(from);
    };

    const onEnter = (to: HTMLElement) => {
      const namespace = to.dataset.xhr;
      document.body.dataset.page = namespace;

      window.scrollTo(0, 0);
      onUpdated(to, provides);
    };

    const fromContainer = ref<HTMLElement>(
      htmx.find(refs.main, "[data-xhr]") as HTMLElement
    );

    // htmx.config.historyCacheSize = 1;

    htmx.on("htmx:historyRestore", (e) => {
      history.value = "pop";

      onLeave(fromContainer.value);

      const { detail } = e as CustomEvent;
      const newContainer = htmx.find(detail.elt, "[data-xhr]") as HTMLElement;
      onEnter(newContainer);
    });

    htmx.on("htmx:beforeHistorySave", (e) => {
      const { detail } = e as CustomEvent;
      const oldContainer = htmx.find(
        detail.historyElt,
        "[data-xhr]"
      ) as HTMLElement;

      onLeave(oldContainer);
      fromContainer.value = oldContainer;
    });

    htmx.on("htmx:beforeSwap", () => {
      history.value = "push";
    });

    htmx.on("htmx:afterSwap", (e) => {
      const { detail } = e as CustomEvent;
      const newContainer = htmx.find(
        detail.target,
        "[data-xhr]"
      ) as HTMLElement;

      onEnter(newContainer);
    });

    htmx.on("htmx:xhr:progress", (e) => {
      const { detail } = e as CustomEvent;
      const loadProgress =
        Math.floor((detail.loaded / detail.total) * 1000) / 1000;

      console.log(loadProgress);
    });
  },
});
