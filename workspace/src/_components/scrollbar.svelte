<script lang="ts">
  import { useScrollbarProgress } from "@/_states/scrollbar-progress";

  let valuenow = 0;
  let progress = 0;

  useScrollbarProgress(({ percentage, track }) => {
    valuenow = percentage;
    progress = track;
  });
</script>

<div class="scrollbarLayout">
  <div class="relative w-full h-full">
    <div class="scrollbar">
      <div
        class="scrollbar__progress"
        aria-controls="main"
        role="scrollbar"
        aria-orientation="vertical"
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={valuenow}
        style="transform: scaleY({progress}) translateZ(0)"
      />
    </div>
  </div>
</div>

<style lang="postcss">
  .scrollbarLayout {
    position: fixed;
    top: 0;
    right: 3.2rem;
    z-index: 2;
    margin-top: calc(var(--vh) * 50);
    margin-top: 50svh;
    pointer-events: none;

    @media (min-width: 640px) {
      right: 4rem;
    }
  }

  .scrollbar {
    position: relative;
    display: inline-block;
    width: 1px;
    height: 3.5rem;
    vertical-align: middle;
    background: currentColor;
    transform: translateY(-50%);
    overflow: hidden;

    @media (min-width: 640px) {
      height: 4rem;
      scale: 1.5 1;
    }
  }

  .scrollbar__progress {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    transform-origin: top center;
    transform: scaleY(0);

    &:before {
      display: block;
      width: 100%;
      height: 100%;
      content: "";
      background-color: var(--color-theme);
    }
  }
</style>
