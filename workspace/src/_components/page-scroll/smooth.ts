import { lerp } from "@/_foundation/math";

// const log2 = 6.931471805599453;
const ease = 0.625;

export class Smooth {
  #state;
  #scroll;

  constructor() {
    this.#state = {
      scrollLimit: 0,
      scrolling: false,
      stopped: true,
    };

    const y = window.scrollY;

    this.#scroll = {
      current: y,
      diff: 0,
      target: y,
    };
  }

  updateHeight = (contentHeight: number, windowHeight: number) => {
    this.#state.scrollLimit = contentHeight - windowHeight;
  };

  pause = () => {
    this.#state.stopped = true;
  };

  resume = () => {
    this.#state.stopped = false;
  };

  #setPosY = (value: number) => {
    window.scrollTo(0, value);
  };

  #clamp = (value: number, min: number, max: number) => {
    return Math.min(Math.max(value, min), max);
  };

  tick = ({ deltaTime }: { deltaTime: number; timestamp: number; timeRatio: number }) => {
    if (this.#state.stopped) {
      return;
    }

    this.#scroll.diff = this.#scroll.target - this.#scroll.current;
    this.#state.scrolling = Math.abs(this.#scroll.diff) >= 0.05;

    if (this.#state.scrolling) {
      const d = deltaTime * 0.001;
      const p = Math.exp(-ease * 85 * d);
      this.#scroll.current = lerp(this.#scroll.current, this.#scroll.target, p);
      this.#setPosY(this.#scroll.current);
    }
  };

  onVScroll = ({ deltaY, originalEvent: evt }: { deltaY: number; originalEvent: Event }) => {
    if (this.#state.stopped) {
      return;
    }

    evt.preventDefault();

    this.#scroll.target += deltaY * -1;
    this.#scroll.target = this.#clamp(this.#scroll.target, -0, this.#state.scrollLimit);
  };

  onNativeScroll = () => {
    if (!this.#state.scrolling) {
      this.#scroll.target = this.#scroll.current = window.scrollY;
    }
  };

  reset = () => {
    this.#scroll.target = this.#scroll.current = 0;
    this.#setPosY(0);
  };

  destroy = () => {
    (this.#state as any) = null;
    (this.#scroll as any) = null;
  };

  scrollTop = () => {
    return this.#scroll.current;
  };

  diff = () => {
    return this.#scroll.diff;
  };
}
