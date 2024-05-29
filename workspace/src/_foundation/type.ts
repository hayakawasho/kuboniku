import type BackCanvasContext from "../_components/glworld/back";
import type FrontCanvasContext from "../_components/glworld/front";
import type PageScrollContext from "../_components/page-scroll";
import type { Object3D, Scene } from "@/_gl/three";
import type { ReadonlyRef } from "lake";

export type AppContext = {
  once: boolean;
  history: ReadonlyRef<"push" | "pop">;
  backCanvasContext: ReturnType<(typeof BackCanvasContext)["setup"]>;
  frontCanvasContext: ReturnType<(typeof FrontCanvasContext)["setup"]>;
  scrollContext: ReturnType<(typeof PageScrollContext)["setup"]>;
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

export type ValueOf<T> = T[keyof T];

export type UnwrapPromise<T> = T extends Promise<infer R> ? R : never;
