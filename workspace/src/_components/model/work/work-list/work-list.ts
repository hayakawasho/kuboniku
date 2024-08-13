import { defineComponent, useDomRef, useSlot, useIntersectionWatch } from "lake";
import { PlaneBufferGeometry, ShaderMaterial } from "~/_foundation/libs/three";
import { loadImage } from "~/_foundation/utils";
import { useMediaQueryContext } from "~/_states/mq";
import fragment from "./fragment.frag";
import vertex from "./vertex.vert";
import WorkItem from "./work-item";
import type { AppContext } from "~/_foundation/types";

type Props = AppContext;

type Refs = {
  workItem: HTMLElement[];
  thumb: HTMLElement[];
};

export default defineComponent({
  name: "WorkList",
  setup(_el: HTMLElement, context: Props) {
    const { refs } = useDomRef<Refs>("workItem", "thumb");
    const { addChild } = useSlot();
    const { anyHover } = useMediaQueryContext();

    if (anyHover) {
      const geo = new PlaneBufferGeometry(1, 1, 30, 30);
      const mat = new ShaderMaterial({
        fragmentShader: fragment,
        vertexShader: vertex,
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
      const { unwatch } = useIntersectionWatch(refs.thumb, entries => {
        entries.forEach(async entry => {
          const target = entry.target as HTMLElement;
          const imgSrc = target.dataset.src as string;

          if (entry.isIntersecting) {
            unwatch(target);
            await loadImage(imgSrc);
            target.style.backgroundImage = `url(${imgSrc})`;
            target.dataset.visible = "true";
          }
        });
      });
    }
  },
});
