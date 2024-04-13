import { defineComponent } from "lake";
import { useThree } from "@/_gl/use-three";

export default defineComponent({
  name: "FrontCanvas",
  setup(canvas: HTMLCanvasElement) {
    const { addScene, removeScene } = useThree(canvas, 1);

    const glContext = {
      addScene,
      removeScene,
    };

    return {
      ...glContext,
    };
  },
});
