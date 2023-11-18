<script lang="ts">
  import { useScrollbarProgress } from "@/_states/scrollbar-progress";

  let progressY = 0;
  let valueNow = 0;

  useScrollbarProgress(({ pos, now }) => {
    progressY = pos;
    valueNow = now;
  });
</script>

<div class="scrollbar">
  <div
    class="scrollbar__progress"
    aria-controls="main"
    role="scrollbar"
    aria-orientation="vertical"
    aria-valuemax={100}
    aria-valuemin={0}
    aria-valuenow={Math.floor(valueNow)}
    style="transform: scaleY({progressY}) translateZ(0)"
  />
</div>

<style lang="postcss">
  .scrollbar {
    position: relative;
    display: inline-block;
    width: 1px;
    height: 3.5rem;
    vertical-align: middle;
    background: currentColor;
    transform: translateY(-50%);
    overflow: hidden;
    opacity: 1;
    transition: 0.55s opacity var(--ease-power3-inOut);

    @media (min-width: 640px) {
      height: 4rem;
      scale: 1.5 1;
    }

    :global([data-page="profile"]) & {
      opacity: 0;
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
