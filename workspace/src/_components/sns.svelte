<script lang="ts">
  import { useEvent, useDomRef } from "lake";
  import { getContext } from "svelte";
  import { Tween } from "@/_foundation/tween";
  import { nextTick } from "@/_foundation/utils";
  import { useMediaQueryContext } from "@/_states/mq";
  import type { AppContext } from "@/_foundation/type";
  import type { Context$ } from "lake";

  type Refs = {
    plus: HTMLElement;
    frontPlusX: HTMLElement;
    frontPlusY: HTMLElement;
    backPlusX: HTMLElement;
    backPlusY: HTMLElement;
    snsLabel: HTMLAnchorElement[];
  };

  const { rootRef } = getContext<Context$<AppContext>>("$");
  const { refs } = useDomRef<Refs>(
    "plus",
    "frontPlusX",
    "frontPlusY",
    "backPlusX",
    "backPlusY",
    "snsLabel"
  );

  let isOpen: boolean | undefined;

  const { anyHover } = useMediaQueryContext();

  useEvent(refs.plus, "click", e => {
    e.preventDefault();
    isOpen = !isOpen;
  });

  useEvent(refs.plus, "mouseenter", async _e => {
    if (isOpen || !anyHover) {
      return;
    }

    Tween.prop([refs.frontPlusX, refs.frontPlusY], {
      scaleX: 1,
      willChange: "transform",
    });
    Tween.prop([refs.backPlusX, refs.backPlusY], {
      scaleX: 0,
      willChange: "transform",
    });

    await nextTick();

    Tween.serial(
      Tween.parallel(
        Tween.tween([refs.frontPlusX, refs.frontPlusY], 0.5, "power3.in", {
          scaleX: 0,
          stagger: 0.07,
        }),
        Tween.serial(
          Tween.wait(0.5),
          Tween.tween([refs.backPlusX, refs.backPlusY], 0.45, "power3.out", {
            scaleX: 1,
            stagger: 0.07,
          })
        )
      ),
      Tween.immediate(() => {
        Tween.prop([refs.frontPlusX, refs.frontPlusY, refs.backPlusX, refs.backPlusY], {
          clearProps: "will-change,transform",
        });
      })
    );
  });

  $: switch (isOpen) {
    case true:
      onOpen();
      break;
    case false:
      onClose();
      break;
    default:
      break;
  }

  const onOpen = async () => {
    rootRef.setAttribute("open", "true");
    rootRef.classList.add("is-animating");

    await nextTick();

    Tween.prop(refs.snsLabel, {
      opacity: 0,
      visibility: "visible",
      y: 20,
    });

    Tween.serial(
      Tween.parallel(
        Tween.tween(refs.plus, 0.6, "power2.inOut", {
          rotationZ: -90,
        }),
        Tween.tween(refs.snsLabel, 0.55, "power2.inOut", {
          opacity: 1,
          stagger: 0.07,
          y: 0,
        })
      ),
      Tween.immediate(() => {
        rootRef.classList.remove("is-animating");
      })
    );
  };

  const onClose = async () => {
    rootRef.classList.add("is-animating");

    await nextTick();

    Tween.serial(
      Tween.parallel(
        Tween.tween(refs.plus, 0.75, "power3.inOut", {
          rotationZ: 0,
        }),
        Tween.tween(refs.snsLabel, 0.55, "power2.in", {
          opacity: 0,
          stagger: {
            amount: 0.07,
            from: "end",
          },
          y: 20,
        })
      ),
      Tween.prop(refs.snsLabel, {
        opacity: 0,
        visibility: "hidden",
        y: 20,
      }),
      Tween.immediate(() => {
        rootRef.classList.remove("is-animating");
        rootRef.removeAttribute("open");
      })
    );
  };
</script>
