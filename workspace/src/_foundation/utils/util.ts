import type { RefElement } from "lake";

export const zeroPadding = (num: number, p = 2) => {
  return num.toString().padStart(p, "0");
};

export const searchParamsToString = (q: Record<string, any>) => {
  const params = new URLSearchParams(q);
  return params.toString();
};

export const noop = () => {
  //
};

export const loadImage = (src: string) => {
  return new Promise<HTMLImageElement>(resolve => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;

    img.decode().then(() => {
      return resolve(img);
    });
  });
};

export const qsa = <T extends RefElement>(q: string, scope?: RefElement): T[] =>
  Array.from((scope ?? document).querySelectorAll(q));
