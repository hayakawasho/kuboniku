<script lang="ts">
  import { useDomRef, useSlot, withSvelte, useEvent } from "lake";
  import scrollLock from "scroll-lock";
  import { getContext } from "svelte";
  import MenuView from "./view.svelte";
  import type { AppContext } from "@/_foundation/type";
  import type { Context$ } from "lake";

  type Refs = {
    menuTrigger: HTMLButtonElement;
    mask: HTMLElement;
    menu: HTMLElement;
    menuContent: HTMLElement;
  };

  const context = getContext<
    Context$<
      AppContext & {
        openAnime: () => void;
        closeAnime: () => void;
      }
    >
  >("$");

  const { openAnime, closeAnime, scrollContext } = context;

  const { addChild } = useSlot();
  const { refs } = useDomRef<Refs>("menuTrigger", "mask", "menu", "menuContent");

  let isOpen: boolean | undefined = undefined;

  $: switch (isOpen) {
    case true:
      scrollContext.pause()
      scrollLock.disablePageScroll();
      openAnime();
      break;
    case false:
      scrollContext.resume()
      scrollLock.enablePageScroll();
      closeAnime();
      break;
    default:
      break;
  }

  const closeMenu = () => {
    isOpen = false;
  };

  addChild(refs.menuContent, withSvelte(MenuView), {
    ...context,
    closeMenu,
    current: refs.menuContent.dataset.current!,
  });

  useEvent(refs.mask, "click", closeMenu);

  useEvent(refs.menuTrigger, "click", e => {
    e.preventDefault();
    isOpen = !isOpen;
  });
</script>
