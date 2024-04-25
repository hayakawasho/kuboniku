import { defineComponent } from "lake";
import { useThree } from "@/_gl/use-three";

export default defineComponent({
  name: "FrontCanvas",
  setup(canvas: HTMLCanvasElement) {
    const glContext = useThree(canvas, 1);

    return {
      ...glContext,
    };
  },
});
