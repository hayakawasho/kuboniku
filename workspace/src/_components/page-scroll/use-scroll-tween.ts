import { ref, useMount, useEvent } from "lake";
import VirtualScroll from "virtual-scroll";
import { useWindowSizeContext } from "@/_states/window-size";
import { scrollPosYMutators } from "@/_states/scroll";
import { useTick, useElementSize } from "@/_foundation/hooks";
import { lerp } from "@/_foundation/math";
import { Tween } from "@/_foundation/tween";
import { clamp } from "remeda";

export const useScrollTween = (wrapper: HTMLElement) => {
  const vs = new VirtualScroll({
    mouseMultiplier: 0.6,
    touchMultiplier: 2,
    firefoxMultiplier: 40,
  });

  const state = ref({
    target: 0,
    current: 0,
    currentRounded: 0,
    scrollLimit: 0,
    resizing: false,
    stopped: true,
  });

  const set = (val: number) => {
    window.scrollTo(0, val);
  };

  const scrollTo = () => {
    //
  };

  const onVScroll = ({ deltaY, originalEvent }: VirtualScroll.VirtualScrollEvent) => {
    //
  };

  useEvent(
    window as any,
    "scroll",
    _e => {
      //
    },
    {
      passive: true,
    }
  );

  useTick(({ timestamp, deltaTime }) => {
    //
  });

  useWindowSizeContext(({ wh }) => {
    //
  });

  useElementSize(wrapper, () => {
    //
  });

  useMount(() => {
    vs.on(onVScroll);

    return () => {
      vs.destroy();
    };
  });

  return {
    //
  };
};
