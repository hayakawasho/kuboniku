import { useTick } from "~/_foundation/hooks";
import { noop } from "~/_foundation/utils";
import { scrollPositionMutators } from "~/_states/scroll-position";

export const useNativeScroll = () => {
  const scrollTop = () => window.scrollY;

  useTick(() => {
    scrollPositionMutators(scrollTop());
  });

  return {
    pause: noop,
    reset: () => window.scrollTo(0, 0),
    resume: noop,
    scrollTop,
  };
};
