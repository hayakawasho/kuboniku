import { SIZES } from './const';

export const html = document.documentElement;
export const body = document.body;

export const hasTouch = 'ontouchstart' in window;

export const mq = {
  mobile: window.matchMedia(`(max-width: ${SIZES.DEFAULT - 1}px)`),
  pc: window.matchMedia(`(min-width: ${SIZES.DEFAULT}px)`),
};

export const isPortrait = window.matchMedia('(orientation:portrait)').matches;
export const isLandscape = window.matchMedia('(orientation:portrait)').matches;

export const hasHover = window.matchMedia("(hover: hover)").matches;

export const dpr = window.devicePixelRatio >= 2 ? 1.5 : 1;