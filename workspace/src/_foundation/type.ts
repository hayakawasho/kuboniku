import type GlContext from "../_components/glworld";
import type { ReadonlyRef } from "lake";

export type AppContext = {
  once: boolean;
  history: ReadonlyRef<"push" | "pop">;
  glContext: ReturnType<(typeof GlContext)["setup"]>;
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
