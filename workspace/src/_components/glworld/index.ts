import { defineComponent, useDomRef } from "lake";
import Gl from "./bg-noise/core";
import { useTick } from "@/_foundation/hooks";

export default defineComponent({
  name: "GlWorld",
  setup() {
    const { refs } = useDomRef<{ canvas: HTMLCanvasElement }>("canvas");
    const ww = window.innerWidth;
    const wh = window.innerHeight;

    const gl = new Gl(refs.canvas, ww, wh);

    const onResize = (width: number, height: number) => {
      gl.resize(width, height);
    };

    const addScene = () => {
      console.log("addScene");
    };

    const removeScene = () => {
      console.log("removeScene");
    };

    useTick(({ timestamp: _ }) => {
      gl.render();
    });

    return {
      addScene,
      onResize,
      removeScene,
    };
  },
});
