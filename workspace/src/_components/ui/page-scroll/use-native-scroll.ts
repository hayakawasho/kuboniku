import { useTick } from "~/_foundation/hooks";
import { noop } from "~/_foundation/utils";
import { windowScrollMutators } from "~/_states/scroll-position";

export const useNativeScroll = () => {
  const scrollOffset = () => window.scrollY;

  useTick(() => {
    windowScrollMutators(window.scrollY);
  });

  return {
    pause: noop,
    reset: () => window.scrollTo(0, 0),
    resume: noop,
    scrollOffset,
  };
};
