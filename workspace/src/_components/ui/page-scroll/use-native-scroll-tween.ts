import { gsap } from "gsap";
import { useMount } from "lake";
import { useTick, useElementSize, useWindowEvent } from "~/_foundation/hooks";
import { createSmoother } from "~/_foundation/smoother";
import { windowScrollMutators } from "~/_states/window-scroll";
import { useWindowSize } from "~/_states/window-size";

export const useNativeScrollTween = (el: HTMLElement) => {
  const smoother = createSmoother();

  const [_, windowH] = useWindowSize();

  useElementSize(el, ({ height }) => {
    smoother.resize(height, windowH.value);
  });

  useWindowEvent("scroll", smoother.onNativeScroll, {
    passive: true,
  });

  useWindowEvent("wheel", smoother.onWheel, {
    passive: false,
  });

  useTick(({ deltaRatio }) => {
    smoother.raf({ deltaRatio });
  });

  const scrollTo = (val: number) => {
    gsap.to(window, {
      duration: 0,
      scrollTo: {
        y: val,
        autoKill: true,
      },
    });
  };

  useMount(() => {
    const onSmooth = ({ currentY = 0 }) => {
      scrollTo(currentY);
      windowScrollMutators(currentY);
    };

    smoother.on(onSmooth);
    smoother.set(window.scrollY);
    smoother.resume();

    return () => {
      smoother.pause();
      smoother.off(onSmooth);
    };
  });

  const set = (val: number) => {
    smoother.set(val);
    scrollTo(val);
  };

  const reset = () => {
    set(0);
  };

  return {
    ...smoother,
    reset,
    set,
  };
};
