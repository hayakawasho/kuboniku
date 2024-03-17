import type BackCanvasContext from "../_components/glworld/back";
import type { ReadonlyRef } from "lake";

export type AppContext = {
  once: boolean;
  history: ReadonlyRef<"push" | "pop">;
  backCanvasContext: ReturnType<(typeof BackCanvasContext)["setup"]>;
};

export type RouteName = "home" | "works" | "works-single" | "profile";

export type Size = {
  width: number;
  height: number;
};

export type Point = {
  x: number;
  y: number;
};

export type valueOf<T> = T[keyof T];
