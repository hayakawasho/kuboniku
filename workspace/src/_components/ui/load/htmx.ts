import htmx from "htmx.org";
import { ref } from "lake";
import { cursorTypeMutators } from "~/_states/cusor";
import type { Ref } from "lake";

type Props = {
  from: HTMLElement;
  history: Ref<"push" | "pop">;
  onEnter: (el: HTMLElement) => void;
  onLeave: (el: HTMLElement) => void;
};

export const useHtmx = ({ from, history, onEnter, onLeave }: Props) => {
  const xhr = "[data-xhr]";
  const fromContainer = ref(htmx.find(from, xhr) as HTMLElement);

  htmx.config.historyCacheSize = 1;

  htmx.on("htmx:historyRestore", e => {
    history.value = "pop";
    onLeave(fromContainer.value);

    const newContainer = htmx.find((e as CustomEvent).detail.elt, xhr) as HTMLElement;
    onEnter(newContainer);
  });

  htmx.on("htmx:beforeHistorySave", e => {
    const oldContainer = htmx.find((e as CustomEvent).detail.historyElt, xhr) as HTMLElement;
    onLeave(oldContainer);
    fromContainer.value = oldContainer;
  });

  htmx.on("htmx:beforeSwap", () => {
    history.value = "push";
  });

  htmx.on("htmx:afterSwap", e => {
    const newContainer = htmx.find((e as CustomEvent).detail.target, xhr) as HTMLElement;
    onEnter(newContainer);
  });

  htmx.on("htmx:xhr:loadstart", _e => {
    cursorTypeMutators("loading");
  });
};
