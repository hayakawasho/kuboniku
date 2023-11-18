<script lang="ts">
  import { useDomRef, useSlot, ref, withSvelte, useEvent } from "lake";
  import { getContext } from "svelte";
  import MenuView from "./view.svelte";
  import type { AppContext } from "@/_foundation/type";
  import type { Context$ } from "lake";

  type Refs = {
    menuTrigger: HTMLButtonElement;
    mask: HTMLElement;
    menuLink: HTMLAnchorElement[];
    menuLinks: HTMLElement;
    menu: HTMLElement;
  };

  const context = getContext<
    Context$<
      AppContext & {
        openAnime: () => void;
        closeAnime: () => void;
      }
    >
  >("$");

  const { openAnime, closeAnime } = context;

  const { refs } = useDomRef<Refs>(
    "menuTrigger",
    "mask",
    "menuLink",
    "menuLinks",
    "menu"
  );

  let isOpen = ref<boolean | undefined>(undefined);

  $: switch (isOpen.value) {
    case true:
      openAnime();
      break;
    case false:
      closeAnime();
      break;
    default:
      break;
  }

  const { addChild } = useSlot();

  const openMenu = () => {
    isOpen.value = true;
  };

  const closeMenu = () => {
    isOpen.value = false;
  };

  addChild(refs.menuLinks, withSvelte(MenuView), {
    ...context,
    closeMenu,
    current: refs.menuLinks.dataset.current!,
  });

  useEvent(refs.mask, "click", closeMenu);

  useEvent(refs.menuTrigger, "click", (e) => {
    e.preventDefault();
    isOpen.value ? closeMenu() : openMenu();
  });
</script>
