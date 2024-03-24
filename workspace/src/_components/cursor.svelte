<script lang="ts">
  import { useTick, useDelegate } from "@/_foundation/hooks";
  import { lerp } from "@/_foundation/math";
  import { mousePosMutators } from "@/_states/mouse";
  import { useRouteContext } from "@/_states/route";

  type CursorType = "default" | "hide" | "loading" | "scale";

  let timer: number;
  let cursorType: CursorType = "default";

  const state = {
    isRunning: false,
    lastX: -20,
    lastY: -20,
    x: 0,
    y: 0,
  };

  useDelegate("[data-cursor]", "mouseenter", e => {
    const target = e.target as HTMLAnchorElement;
    cursorType = target.dataset.cursor as CursorType;
  });

  useDelegate("[data-cursor]", "mouseleave", e => {
    cursorType = "default";
  });

  useRouteContext(() => {
    cursorType = "default";
  });

  const onMousemove = (e: MouseEvent) => {
    clearTimeout(timer);

    state.isRunning = true;

    state.x = e.clientX;
    state.y = e.clientY;

    mousePosMutators({
      x: state.x,
      y: state.y,
    });

    timer = window.setTimeout(() => {
      state.isRunning = false;
    }, 500);
  };

  useTick(({ timeRatio }) => {
    if (!state.isRunning) {
      return;
    }

    const easeVal = 1 - (1 - 0.24) ** timeRatio;

    state.lastX = lerp(state.lastX, state.x, easeVal);
    state.lastY = lerp(state.lastY, state.y, easeVal);
  });

  $: switch (cursorType) {
    case "default":
      break;
    case "hide":
      break;
    case "loading":
      break;
    case "scale":
      break;
    default:
      break;
  }
</script>

<div
  class="cursor -{cursorType}"
  style="transform: translate3d({state.lastX}px, {state.lastY}px, 0px)"
>
  <div class="w-full h-full relative">
    <div class="circle" />
    <div class="drag" />
    <div class="loading" />
  </div>
</div>

<svelte:body on:mousemove|passive={onMousemove} />

<style lang="scss">
  .cursor {
    position: fixed;
    top: -1.85rem;
    left: -1.85rem;
    pointer-events: none;
    z-index: 1000;
    height: 3.7rem;
    width: 3.7rem;
    backface-visibility: hidden;

    &.-scale {
      & .circle {
        transform: scale(1);
      }
    }

    &.-hide {
      & .circle {
        transform: scale(0);
        opacity: 0;
      }
    }
  }

  .circle {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    opacity: 1;
    transition: transform 0.35s ease, opacity 0.35s ease;
    transform: scale(calc(16 / 74));
    background-color: var(--color-theme);
    position: relative;
    opacity: 0.5;
  }
</style>
