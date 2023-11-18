<script lang="ts">
  import {
    useDomRef,
    useSlot,
    ref,
    readonly,
    withSvelte,
    defineComponent,
    useEvent,
  } from "lake";
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

  const { mq, openAnime, closeAnime } = getContext<
    Context$<
      AppContext & {
        openAnime: () => void;
        closeAnime: () => void;
      }
    >
  >("$");

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
    current: refs.menuLinks.dataset.current!,
  });

  const readonlyIsOpen = readonly(isOpen);

  if (mq.value === "sp") {
    addChild(
      refs.menuTrigger,
      defineComponent({
        name: "MenuToggle",
        setup() {
          useEvent(refs.menuTrigger, "click", (e) => {
            e.preventDefault();
            isOpen.value ? closeMenu() : openMenu();
          });
        },
      }),
      {
        closeMenu,
        isOpen: readonlyIsOpen,
        openMenu,
      }
    );

    addChild(
      refs.mask,
      defineComponent({
        name: "MenuMask",
        setup() {
          useEvent(refs.mask, "click", closeMenu);
        },
      })
    );

    addChild(
      refs.menuLink,
      defineComponent({
        name: "MenuLink",
        setup() {
          useEvent(refs.mask, "click", closeMenu);
        },
      })
    );
  }
</script>
