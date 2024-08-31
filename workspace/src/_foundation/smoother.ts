import NormalizeWheel from "normalize-wheel";
import { createEmitter } from "./emitter";
import { createSpring } from "./spring";

const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
};

export const createSmoother = () => {
  const spring = createSpring(0, {
    stiffness: 0.35,
    damping: 1.2,
    mass: 1,
  });

  const state = {
    active: false,
    scrollLimit: 0,
    scrolling: false,
    pointerDown: false,
  };

  const scroll = {
    current: 0,
    target: 0,
    diff: 0,
    downPos: 0,
    prevPos: 0,
  };

  const { on, off, ...emitter } = createEmitter<{ currentY: number }>();

  const resize = (contentH: number, windowH: number) => {
    state.scrollLimit = contentH - windowH;
    scroll.current = scroll.target;
  };

  const onContextMenu = () => {
    state.pointerDown = false;
  };

  const onKeyDown = (e: KeyboardEvent) => {
    switch (e.code) {
      case "ArrowUp":
        set(-500);
        break;
      case "ArrowDown":
        set(500);
        break;
      default:
        break;
    }
  };

  const pause = () => {
    state.active = false;
  };

  const resume = () => {
    state.active = true;
  };

  const raf = ({ deltaRatio }: { deltaRatio: number }) => {
    if (!state.active) {
      return;
    }

    const diff = scroll.target - scroll.current;
    state.scrolling = Math.abs(diff) >= 0.05;
    scroll.diff = diff;

    if (state.scrolling) {
      scroll.current = spring.tween(deltaRatio);

      emitter.emit({
        currentY: scroll.current,
      });
    }
  };

  const onTouchstart = (e: TouchEvent) => {
    if (!state.active) {
      return;
    }

    state.pointerDown = true;
    scroll.downPos = scroll.prevPos = e.changedTouches[0].pageY;
  };

  const onTouchend = (_e: TouchEvent) => {
    if (!state.pointerDown) {
      state.pointerDown = false;
      scroll.downPos = scroll.prevPos = 0;
    }
  };

  const onTouchmove = (e: TouchEvent) => {
    if (!state.pointerDown || !state.active) {
      return;
    }

    scroll.prevPos = scroll.downPos;
    scroll.downPos = e.changedTouches[0].pageY;
    const dist = (scroll.prevPos - scroll.downPos) * 1;

    scroll.target += dist;
    scroll.target = clamp(scroll.target, -0, state.scrollLimit);
    spring.set(scroll.target);
  };

  const onWheel = (e: WheelEvent) => {
    if (!state.active) {
      return;
    }

    e.preventDefault();
    const { pixelY } = NormalizeWheel(e);

    scroll.target += pixelY;
    scroll.target = clamp(scroll.target, -0, state.scrollLimit);
    spring.set(scroll.target);
  };

  const onNativeScroll = () => {
    if (!state.scrolling) {
      scroll.target = scroll.current = window.scrollY;
      spring.sync(scroll.target);
    }
  };

  const set = (val: number) => {
    scroll.target = scroll.current = val;
    spring.sync(val);
  };

  const reset = () => set(0);

  const scrollOffset = () => scroll.current;

  return {
    resize,
    onContextMenu,
    onTouchstart,
    onTouchend,
    onTouchmove,
    onWheel,
    onNativeScroll,
    onKeyDown,
    raf,
    resume,
    pause,
    set,
    reset,
    scrollOffset,
    on,
    off,
  };
};
