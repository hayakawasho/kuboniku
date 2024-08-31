import { defineComponent, useDomRef, useSlot, useIntersectionWatch } from "lake";
import { PlaneBufferGeometry, ShaderMaterial } from "~/_foundation/libs/three";
import { loadAsset } from "~/_foundation/load-asset";
import { useMediaQuery } from "~/_states/mq";
import fragmentShader from "./fragment.frag";
import vertexShader from "./vertex.vert";
import WorkItem from "./work-item";
import type { AppContext } from "~/_foundation/types";

type Props = AppContext;

type Refs = {
  workItem: HTMLElement[];
  plane: HTMLElement[];
};

export default defineComponent({
  name: "WorkItems",
  setup(_el: HTMLElement, context: Props) {
    const { refs } = useDomRef<Refs>("workItem", "plane");
    const { addChild } = useSlot();
    const { anyHover } = useMediaQuery();

    if (anyHover) {
      const geo = new PlaneBufferGeometry(1, 1, 30, 30);
      const mat = new ShaderMaterial({
        fragmentShader,
        vertexShader,
        depthTest: false,
        transparent: true,
        alphaTest: 0.5,
      });

      addChild(refs.workItem, WorkItem, {
        ...context,
        geo,
        mat,
      });
    } else {
      const { unwatch } = useIntersectionWatch(refs.plane, entries => {
        entries.forEach(async entry => {
          const target = entry.target as HTMLElement;
          const imgSrc = target.dataset.src as string;

          if (entry.isIntersecting) {
            unwatch(target);
            const result = await loadAsset<HTMLImageElement>(imgSrc);
            target.appendChild(result);
            target.dataset.visible = "true";
          }
        });
      });
    }
  },
});
