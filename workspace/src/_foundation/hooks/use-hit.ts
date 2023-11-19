import { ref } from "lake";
import { lerp } from "@/_foundation/math";
import { useTick } from "@/_foundation/hooks";
import { useScrollPosY } from "@/_states/scroll";
import { useMousePos } from "@/_states/mouse";
import { useWindowSize } from "@/_states/window-size";

export const useHit = <T extends Element>(target: T) => {
  const [offset] = useScrollPosY();
  const [mouseX, mouseY] = useMousePos();
  const [ww, wh] = useWindowSize();

  const state = {
    lastX: 0,
    lastY: 0,
    x: 0,
    y: 0,
  };

  const hit = () => {
    //
  };

  useTick(({ timeRatio }) => {
    const easeVal = 1 - (1 - 0.1) ** timeRatio;

    state.lastX = lerp(state.lastX, state.x, easeVal);
    state.lastY = lerp(state.lastY, state.y, easeVal);
  });
};
