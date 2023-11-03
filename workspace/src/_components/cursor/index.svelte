<script lang="ts">
  import { useTick } from "@/_foundation/hooks";
  import { lerp } from "@/_foundation/math";

  let cursor: HTMLElement;

  let isRunning = false;
  let timer: number;

  const now = {
    x: 0,
    y: 0,
  };
  const last = {
    x: 0,
    y: 0,
  };

  const onMousemove = (e: MouseEvent) => {
    clearTimeout(timer);

    isRunning = true;

    now.x = e.clientX;
    now.y = e.clientY;

    timer = window.setTimeout(() => {
      isRunning = false;
    }, 300);
  };

  useTick(({ timeRatio }) => {
    if (!isRunning) {
      return;
    }

    const easeVal = 1 - (1 - 0.2) ** timeRatio;

    last.x = lerp(last.x, now.x, easeVal);
    last.y = lerp(last.y, now.y, easeVal);

    cursor.style.transform = `transition3d(last.x, last.y, 0)`;
  });
</script>

<div class="cursor" bind:this={cursor}>
  <div class="w-full h-full relative">
    <div class="circle" />
  </div>
</div>

<svelte:body on:mousemove|passive={onMousemove} />

<style>
  .cursor {
    position: fixed;
    top: -2rem;
    left: -2rem;
    pointer-events: none;
    z-index: 1000;
    height: 4rem;
    width: 4rem;
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
