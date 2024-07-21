import type BackCanvasContext from "../../_components/ui/glworld/back";
import type FrontCanvasContext from "../../_components/ui/glworld/front";
import type PageScrollContext from "../../_components/ui/page-scroll";
import type { ReadonlyRef } from "lake";
import type { Object3D, Scene } from "~/_gl/three";

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
