import { useEvent, useMount, ref } from "lake";
import { useScrollPosY } from "@/_states/scroll";
import { useWindowSize } from "@/_states/window-size";

export const useHit = <T extends HTMLElement>(
  target: T,
  callback: (payload: { tx: number; ty: number }) => void
) => {
  const state = ref({
    height: 0,
    offsetX: 0,
    offsetY: 0,
    width: 0,
  });

  const getBounds = (rect: DOMRect, currentY: number) => {
    return {
      height: rect.height,
      offsetX: rect.left,
      offsetY: currentY + rect.top,
      width: rect.width,
    };
  };

  const [offset] = useScrollPosY();

  useWindowSize(() => {
    const bounds = target.getBoundingClientRect();
    state.value = getBounds(bounds, offset.value);
  });

  useEvent(target, "mousemove", (e) => {
    const { offsetX, offsetY, width, height } = state.value;

    const dx = e.pageX - offsetX;
    const dy = e.pageY - offsetY;
    const tx = dx - width * 0.5;
    const ty = dy - height * 0.5;

    callback({
      tx,
      ty,
    });
  });

  useMount(() => {
    const bounds = target.getBoundingClientRect();
    state.value = getBounds(bounds, offset.value);
  });
};
