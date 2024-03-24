import { ref, useMount, useEvent } from "lake";
import { clamp } from "remeda";
import VirtualScroll from "virtual-scroll";
import { useTick, useElementSize } from "@/_foundation/hooks";
import { lerp } from "@/_foundation/math";
import { Tween } from "@/_foundation/tween";
import { scrollPosYMutators } from "@/_states/scroll";
import { useWindowSizeContext } from "@/_states/window-size";

export const useScrollTween = (wrapper: HTMLElement) => {
  const vs = new VirtualScroll({
    firefoxMultiplier: 40,
    mouseMultiplier: 0.6,
    touchMultiplier: 2,
  });

  const state = ref({
    current: 0,
    currentRounded: 0,
    resizing: false,
    scrollLimit: 0,
    stopped: true,
    target: 0,
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
