import { Tween } from "@/_foundation/tween";

export class Smooth {
  #state;
  #scroll;

  constructor() {
    this.#state = {
      stopped: true,
      scrollLimit: 0,
      scrolling: false,
    };

    this.#scroll = {
      target: 0,
      current: 0,
      last: 0,
    };
  }

  destroy() {
    this.stop();

    (this as any).#state = null;
    (this as any).#scroll = null;
  }

  stop = () => {
    this.#state.stopped = true;
  };

  resume = () => {
    this.#state.stopped = false;
  };

  #setPosY = (value: number) => {
    window.scrollTo(0, value);
  };

  #roundEx = (value: number, digit: number) => {
    return Math.round((value * digit) / digit);
  };

  #clamp = (value: number, min: number, max: number) => {
    return Math.min(Math.max(value, min), max);
  };

  tick = () => {
    if (this.#state.stopped) {
      return;
    }

    if (this.#scroll.current === this.#scroll.target) {
      this.#scroll.last = this.#scroll.current;
    }

    if (this.#state.scrolling) {
      this.#scroll.current = this.#roundEx(this.#scroll.current, 1000);
      this.#setPosY(this.#scroll.current);
    }

    this.#state.scrolling = this.#scroll.current !== this.#roundEx(this.#scroll.target, 1000);
  };

  updateHeight = (contentHeight: number, windowHeight: number) => {
    this.#state.scrollLimit = contentHeight - windowHeight;
  };

  sync = (value: number) => {
    this.#scroll.target = this.#scroll.current = this.#scroll.last = value;
  };

  onNativeScroll = () => {
    if (!this.#state.scrolling) {
      this.sync(window.scrollY);
    }
  };

  onVScroll = (evt: KeyboardEvent, { deltaY }: { deltaY: number }) => {
    if (evt.ctrlKey || evt.code === "ArrowUp" || evt.code === "ArrowDown") {
      return;
    }

    const scrollVal = this.#clamp(deltaY, -200, 200);
    this.#scroll.target -= scrollVal;

    this.tween(this.#scroll.target);
  };

  tween = (value: number) => {
    if (this.#state.stopped) {
      return;
    }

    this.#scroll.target = this.#clamp(value, -0, this.#state.scrollLimit);

    Tween.tween(this.#scroll, 0.45, "expo.out", {
      current: this.#scroll.target,
      onComplete: () => {
        this.sync(this.#scroll.target);
      },
    });
  };
}
