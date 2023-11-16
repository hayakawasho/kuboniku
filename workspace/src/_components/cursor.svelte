<script lang="ts">
  import { useTick } from "@/_foundation/hooks";
  import { lerp } from "@/_foundation/math";
  import { mousePosMutators } from "@/_states/mouse";

  let timer: number;

  const state = {
    isRunning: false,
    lastX: 0,
    lastY: 0,
    x: 0,
    y: 0,
  };

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
    }, 300);
  };

  useTick(({ timeRatio }) => {
    if (!state.isRunning) {
      return;
    }

    const easeVal = 1 - (1 - 0.24) ** timeRatio;

    state.lastX = lerp(state.lastX, state.x, easeVal);
    state.lastY = lerp(state.lastY, state.y, easeVal);
  });
</script>

<div
  class="cursor"
  style="transform: translate3d({state.lastX}px, {state.lastY}px, 0px)"
>
  <div class="w-full h-full relative">
    <div class="circle" />
  </div>
</div>

<svelte:body on:mousemove|passive={onMousemove} />

<style>
  .cursor {
    position: fixed;
    top: -1rem;
    left: -1rem;
    pointer-events: none;
    z-index: 1000;
    height: 2rem;
    width: 2rem;
    backface-visibility: hidden;
  }

  .circle {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    opacity: 1;
    transition: transform 0.35s ease, opacity 0.35s ease;
    transform: scale(0.45);
    background-color: var(--color-theme);
    position: relative;
    opacity: 0.5;
  }
</style>
