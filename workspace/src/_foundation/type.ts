import type BackCanvasContext from "../_components/glworld";
import type FrontCanvasContext from "../_components/glworld/front";
import type { Object3D, Scene } from "@/_gl/three";
import type { ReadonlyRef } from "lake";

export type AppContext = {
  once: boolean;
  history: ReadonlyRef<"push" | "pop">;
  backCanvasContext: ReturnType<(typeof BackCanvasContext)["setup"]>;
  frontCanvasContext: ReturnType<(typeof FrontCanvasContext)["setup"]>;
};

export type RouteName = "error" | "home" | "work" | "work-single" | "profile";

export type ParentScene = {
  addScene: (child: Object3D) => Scene;
  removeScene: (child: Object3D) => Scene;
};

export type Size = {
  width: number;
  height: number;
};

export type Point = {
  x: number;
  y: number;
};

export type valueOf<T> = T[keyof T];
