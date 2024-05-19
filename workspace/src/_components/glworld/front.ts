import { defineComponent } from "lake";
import { useThree } from "@/_gl/use-three";

export default defineComponent({
  name: "FrontCanvas",
  setup(canvas: HTMLCanvasElement) {
    const dpr = Math.min(window.devicePixelRatio, 1.5);
    const glContext = useThree(canvas, dpr);

    return {
      ...glContext,
    };
  },
});
