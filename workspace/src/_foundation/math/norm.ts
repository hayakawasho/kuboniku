import { mapRange } from "./map";

export const norm = (val: number, min: number, max: number) => {
  return mapRange(val, min, max, 0, 1);
};
