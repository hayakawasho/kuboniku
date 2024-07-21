<script lang="ts">
  import { useTick, useDelegate } from "~/_foundation/hooks";
  import { lerp } from "~/_foundation/math";
  // import { Tween } from "~/_foundation/tween";
  import { useCursorTypeState, cursorTypeMutators } from "~/_states/cusor";
  import { mousePosMutators } from "~/_states/mouse";
  import { useRouteState } from "~/_states/route";
  import type { CursorType } from "~/_states/cusor";

  let timer: number;

  // let refDragArrowTop: SVGElement;
  // let refDragArrowBottom: SVGElement;
  let refProgressCircle: SVGElement;
  let refProgressCirclePath: SVGElement;

  const state = {
    isRunning: false,
    lastX: -20,
    lastY: -20,
    x: 0,
    y: 0,
  };

  let cursorType: CursorType = "default";

  useCursorTypeState(payload => {
    cursorType = payload;
  });

  useRouteState(_payload => {
    cursorTypeMutators("default");
  });

  useDelegate("[data-cursor]", "mouseenter", e => {
    const target = e.target as HTMLAnchorElement;
    cursorTypeMutators(target.dataset.cursor as CursorType);
  });

  useDelegate("[data-cursor]", "mouseleave", _e => {
    cursorTypeMutators("default");
  });

  const calcAngle = (x: number, y: number) => {
    return (180 * Math.atan2(y, x)) / Math.PI;
  };

  const calcSqueeze = (x: number, y: number) => {
    const val = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    return Math.min(val / 200, 0.55);
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
    }, 500);
  };

  useTick(({ deltaRatio }) => {
    if (!state.isRunning) {
      return;
    }

    const p = 0.3 * deltaRatio;
    state.lastX = lerp(state.lastX, state.x, p);
    state.lastY = lerp(state.lastY, state.y, p);
  });

  $: switch (cursorType) {
    // case "drag":
    //   Tween.kill(refProgressCirclePath);
    //   Tween.prop(refProgressCirclePath, {
    //     strokeDashoffset: 188.5220947265625,
    //   });
    //   Tween.tween(refProgressCirclePath, 0.9, "expo.out", {
    //     strokeDashoffset: 0,
    //   });
    //   break;
    // case "drag.scale":
    //   Tween.kill(refProgressCirclePath);
    //   break;
    default:
      // Tween.kill(refProgressCirclePath);
      // Tween.prop(refProgressCirclePath, {
      //   strokeDashoffset: 189,
      // });
      break;
  }

  $: diffX = state.lastX - state.x;
  $: diffY = state.lastY - state.y;
</script>

<div class="cursor" style="transform: translate3d({state.lastX}px, {state.lastY}px, 0px)" data-cursor-type={cursorType}>
  <div
    class="w-full h-full relative"
    style="transform: rotate({calcAngle(diffX, diffY)}deg) scale({1 + calcSqueeze(diffX, diffY)}, {1 -
      calcSqueeze(diffX, diffY)}) translateZ(0)"
  >
    <div class="circle" />
    <!--svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 6 3"
      xml:space="preserve"
      class="dragArrow dragArrow--top"
      bind:this={refDragArrowTop}
    >
      <path d="M3,0l3,3H0L3,0z" />
    </svg-->
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 68 68" class="progressCircle" bind:this={refProgressCircle}>
      <path
        d="M34,4A30,30,0,1,0,64,34,30,30,0,0,0,34,4Z"
        stroke-dasharray="188.5220947265625"
        stroke-dashoffset="188.5220947265625"
        data-svg-origin="38 38"
        transform="matrix(1,0,0,1,0,0)"
        bind:this={refProgressCirclePath}
      />
    </svg>
    <!--svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 6 3"
      xml:space="preserve"
      class="dragArrow dragArrow--bottom"
      bind:this={refDragArrowBottom}
    >
      <path d="M3,3L0,0h6L3,3z" />
    </svg-->
  </div>
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

    &[data-cursor-type="scale"] {
      & .circle {
        transform: scale(1);
      }
    }

    &[data-cursor-type="drag"] {
      // & .dragArrow,
      // .progressCircle {
      //   opacity: 1;
      // }

      // & .progressCircle {
      //   scale: 1;
      // }

      // & .dragArrow--top {
      //   opacity: 1;
      //   transform: translateX(-50%);
      // }

      // & .dragArrow--bottom {
      //   opacity: 1;
      //   transform: translateX(-50%);
      // }

      // & .circle {
      //   transform: scale(0);
      //   opacity: 0;
      // }
    }

    // &[data-cursor-type="drag.scale"] {
    //   & .dragArrow,
    //   .progressCircle {
    //     opacity: 0.5;
    //   }
    //   & .circle {
    //     transform: scale(1);
    //     opacity: 0.5;
    //   }
    // }

    &[data-cursor-type="hide"] {
      & .circle {
        transform: scale(0);
        opacity: 0;
      }
    }

    &[data-cursor-type="loading"] {
      & .circle {
        transform: scale(0);
        opacity: 0;
      }

      & .progressCircle {
        opacity: 1;

        & > path {
          animation: cursorLoader 2s ease-out infinite;
          stroke-dasharray: 188;
          stroke-dashoffset: 188;
        }
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

  //.dragArrow {
  //  opacity: 0;
  //  position: absolute;
  //  width: 0.8rem;
  //  transition: transform 0.35s ease, opacity 0.35s ease;
  //  & > path {
  //    fill: currentColor;
  //  }
  //}
  // .dragArrow--top {
  //   left: 50%;
  //   top: -0.9rem;
  //   transform: translateX(-50%) translateY(1rem);
  // }

  // .dragArrow--bottom {
  //   bottom: -0.9rem;
  //   left: 50%;
  //   transform: translateX(-50%) translateY(-1rem);
  // }

  .progressCircle {
    height: 4rem;
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 4rem;

    & > path {
      fill: none;
      stroke: currentColor;
      stroke-miterlimit: 10;
      stroke-width: 2px;
      transform: rotate(0deg);
      transform-origin: center;
      stroke-dashoffset: 188;
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
