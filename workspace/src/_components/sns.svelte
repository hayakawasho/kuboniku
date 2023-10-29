<script lang="ts">
  import type { Context$ } from "lake";
  import { Tween } from "@/_foundation/tween";
  import { nextTick } from "@/_foundation/utils";
  import { useEvent, useDomRef } from "lake";
  import { getContext } from "svelte";

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
        y: 20,
        opacity: 0,
        visibility: "visible",
      }),
      Tween.parallel(
        Tween.tween(refs.toggleTrigger, 0.55, "power2.inOut", {
          rotation: 90,
        }),
        Tween.tween(refs.icon, 0.5, "power2.inOut", {
          y: 0,
          opacity: 1,
          stagger: 0.07,
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
          y: 20,
          opacity: 0,
          stagger: {
            amount: 0.07,
            from: "end",
          },
        })
      ),
      Tween.prop(refs.icon, {
        y: 20,
        opacity: 0,
        visibility: "hidden",
      }),
      Tween.immediate(() => rootRef.classList.remove("is-animating"))
    );
  };
</script>
