import { defineComponent, useSlot } from "lake";
import { useThree } from "@/_gl/use-three";
import Aurora from "./aurora";

export default defineComponent({
  name: "BackCanvas",
  setup(canvas: HTMLCanvasElement, context) {
    const { addChild } = useSlot();
    const glContext = useThree(canvas, 1);

    const [auroraContext] = addChild(canvas, Aurora, {
      ...context,
      ...glContext,
    });

    return {
      ...glContext,
      canvas,
      onChangeColorPalette: (colorCode: string) => {
        auroraContext.current.onChangeColorPalette(colorCode);
      },
    };
  },
});
