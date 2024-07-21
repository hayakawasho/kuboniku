import { gsap } from "gsap";
import { useMount, useEvent } from "lake";
import { useTick, useElementSize } from "~/_foundation/hooks";
import { Smooth } from "~/_foundation/utils";
import { scrollPositionMutators } from "~/_states/scroll-position";
import { useWindowSizeState } from "~/_states/window-size";

export const useNativeScrollTween = (el: HTMLElement) => {
  const smooth = new Smooth({
    stiffness: 0.35,
    damping: 1.2,
    mass: 1,
  });

  const [_, wh] = useWindowSizeState();

  useElementSize(el, ({ height: contentH }) => {
    smooth.onResize(contentH, wh.value);
  });

  useEvent(window as any, "scroll", smooth.onNativeScroll, {
    passive: true,
  });

  useEvent(window as any, "wheel", smooth.onWheel, {
    passive: false,
  });

  useTick(({ deltaRatio, deltaTime }) => {
    smooth.raf({ deltaRatio, deltaTime });
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
      scrollPositionMutators(currentY);
    };
    smooth.on(onSmooth);
    smooth.set(window.scrollY);
    smooth.resume();

    return () => {
      smooth.pause();
      smooth.off(onSmooth);
    };
  });

  return {
    ...smooth,
    reset: () => {
      smooth.reset();
      scrollTo(0);
    },
    set: (val: number) => {
      smooth.set(val);
      scrollTo(val);
    },
  };
};
