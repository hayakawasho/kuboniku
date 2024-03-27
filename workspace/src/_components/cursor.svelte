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
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 6 3"
      xml:space="preserve"
      class="dragArrow dragArrow--top"
    >
      <path d="M3,0l3,3H0L3,0z" />
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 68 68" class="progressCircleSvg">
      <path
        d="M34,4A30,30,0,1,0,64,34,30,30,0,0,0,34,4Z"
        stroke-dasharray="188.5220947265625"
        stroke-dashoffset="188.5220947265625"
        data-svg-origin="38 38"
        transform="matrix(1,0,0,1,0,0)"
      />
    </svg>
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 6 3"
      xml:space="preserve"
      class="dragArrow dragArrow--bottom"
    >
      <path d="M3,3L0,0h6L3,3z" />
    </svg>
  </div>
  <div class="clickAndHoldCursor | hidden">Click & Drag</div>
</div>

<svelte:body on:mousemove|passive={onMousemove} />

<style lang="scss">
  .cursor {
    position: fixed;
    top: -1.75rem;
    left: -1.75rem;
    pointer-events: none;
    z-index: 1000;
    height: 3.5rem;
    width: 3.5rem;
    backface-visibility: hidden;
    color: var(--color-theme);

    &.-scale {
      & .circle {
        transform: scale(1);
      }
    }

    &.-drag {
      & .dragArrow, .progressCircleSvg {
        opacity: 1;
      }

      & .circle {
        transform: scale(0);
        opacity: 0;
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
    background-color: currentColor;
    position: relative;
    opacity: 0.5;
  }

  .dragArrow {
    opacity: 0;
    position: absolute;
    width: .8rem;
    transition: transform 0.35s ease, opacity 0.35s ease;

    & > path {
      fill: currentColor;
    }
  }

  .dragArrow--top {
    left: 50%;
    top: -.9rem;
    transform: translateX(-50%);
  }

  .dragArrow--bottom {
    bottom: -.9rem;
    left: 50%;
    transform: translateX(-50%);
  }

  .progressCircleSvg {
    opacity: 0;
    height: 4rem;
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 4rem;
    opacity: .5;

    & > path {
      fill: none;
      stroke: currentColor;
      stroke-miterlimit: 10;
      stroke-width: 2px;
      transform: rotate(0deg);
      transform-origin: center;
      stroke-dashoffset: 0;
    }
  }

  .loaderSvg {
    height: 3.7rem;
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 3.7rem;

    & > path {
      fill: none;
      stroke: currentColor;
      stroke-miterlimit: 10;
      stroke-width: 2px;
      transform: rotate(0deg);
      transform-origin: center;
      // animation: cursorLoader 2.5s ease-out infinite;
      // stroke-dasharray: 188;
      // stroke-dashoffset: 188;
      // stroke-width: 3px;
    }
  }

  @keyframes cursorLoader {
    0% {
      stroke-dashoffset: 188;
      transform: rotate(0deg);
    }

    50% {
      stroke-dashoffset: 0;
      transform: rotate(-1turn);
    }

    to {
      transform: rotate(-2turn);
    }
  }
</style>
