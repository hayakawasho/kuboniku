<script lang="ts">
  import { useDomRef, useSlot, withSvelte, useEvent } from "lake";
  import scrollLock from "scroll-lock";
  import { getContext, onMount } from "svelte";
  import Menu from "./index.svelte";
  import type { Context$ } from "lake";
  import type { AppContext } from "~/_foundation/types";

  type Refs = {
    menuTrigger: HTMLButtonElement;
    mask: HTMLElement;
    menu: HTMLElement;
    menuContent: HTMLElement;
  };

  type Props = AppContext & {
    openMenu: () => void;
    closeMenu: () => void;
  };

  const context = getContext<Context$<Props>>("$");
  const { openMenu, closeMenu, scrollContext, ...restContext } = context;

  let isOpen: boolean | undefined = undefined;

  $: switch (isOpen) {
    case true:
      scrollContext.pause();
      scrollLock.disablePageScroll();
      openMenu();
      break;
    case false:
      scrollContext.resume();
      scrollLock.enablePageScroll();
      closeMenu();
      break;
    default:
      break;
  }

  const onClose = () => {
    isOpen = false;
  };

  onMount(() => {
    const { addChild } = useSlot();
    const { refs } = useDomRef<Refs>("menuTrigger", "mask", "menu", "menuContent");

    useEvent(refs.mask, "click", onClose);

    useEvent(refs.menuTrigger, "click", e => {
      e.preventDefault();
      isOpen = !isOpen;
    });

    addChild(refs.menuContent, withSvelte(Menu), {
      ...restContext,
      onClose,
      currentRoute: refs.menuContent.dataset.current!,
    });
  });
</script>
