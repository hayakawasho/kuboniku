import { useUnmount } from "lake";

const FPS_60_SEC = 1000 / 60;

export const useTick = (
  callback: (payload: { deltaTime: number; deltaRatio: number; timestamp: number }) => void
) => {
  let then = 0;

  const loop = (timestamp: number) => {
    rafId = requestAnimationFrame(loop);

    const now = timestamp;

    if (then === 0) {
      then = now;
      return;
    }

    const dTime = now - then;
    const deltaRatio = dTime / FPS_60_SEC;

    callback({
      deltaTime: dTime,
      deltaRatio,
      timestamp,
    });

    then = now;
  };

  let rafId = requestAnimationFrame(loop);

  useUnmount(() => {
    cancelAnimationFrame(rafId);
  });
};
