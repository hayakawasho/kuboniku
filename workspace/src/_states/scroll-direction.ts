import { useUnmount } from "lake";
import { atom } from "nanostores";
import { noop } from "@/_foundation/utils";

const directionState = atom<0 | 1 | -1>(0);

export const useScrollDirectionContext = (
  callback: (payload: { direction: 0 | 1 | -1 }) => void = noop
) => {
  const unbind = directionState.listen(direction => {
    callback({
      direction,
    });
  });

  useUnmount(() => {
    unbind();
  });
};

export const scrollDirectionMutators = directionState.set;
