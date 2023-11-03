<script lang="ts">
  import { useEvent, useDomRef } from "lake";
  import { getContext } from "svelte";
  import { Tween } from "@/_foundation/tween";
  import { nextTick } from "@/_foundation/utils";
  import type { Context$ } from "lake";

  type Refs = {
    toggleTrigger: HTMLButtonElement;
    icon: HTMLAnchorElement[];
  };

  const { rootRef } = getContext<Context$>("$");
  const { refs } = useDomRef<Refs>("toggleTrigger", "icon");

  let isOpen: boolean | undefined;

  useEvent(refs.toggleTrigger, "click", (e) => {
    e.preventDefault();
    isOpen = !isOpen;
  });

  $: isOpen === true && _open();
  $: isOpen === false && _close();

  const _open = async () => {
    rootRef.classList.add("is-animating");

    await nextTick();

    Tween.serial(
      Tween.prop(refs.icon, {
        opacity: 0,
        visibility: "visible",
        y: 20,
      }),
      Tween.parallel(
        Tween.tween(refs.toggleTrigger, 0.55, "power2.inOut", {
          rotation: 90,
        }),
        Tween.tween(refs.icon, 0.5, "power2.inOut", {
          opacity: 1,
          stagger: 0.07,
          y: 0,
        })
      ),
      Tween.immediate(() => rootRef.classList.remove("is-animating"))
    );
  };

  const _close = async () => {
    rootRef.classList.add("is-animating");

    await nextTick();

    Tween.serial(
      Tween.parallel(
        Tween.tween(refs.toggleTrigger, 0.55, "power2.inOut", {
          rotation: 0,
        }),
        Tween.tween(refs.icon, 0.5, "power2.in", {
          opacity: 0,
          stagger: {
            amount: 0.07,
            from: "end",
          },
          y: 20,
        })
      ),
      Tween.prop(refs.icon, {
        opacity: 0,
        visibility: "hidden",
        y: 20,
      }),
      Tween.immediate(() => rootRef.classList.remove("is-animating"))
    );
  };
</script>
