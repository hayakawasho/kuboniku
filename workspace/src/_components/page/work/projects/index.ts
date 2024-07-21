import { defineComponent, useDomRef, useSlot, useIntersectionWatch } from "lake";
import { loadImage } from "~/_foundation/utils";
import { PlaneBufferGeometry, ShaderMaterial } from "~/_gl/three";
import { useMediaQueryState } from "~/_states/mq";
import fragment from "./fragment.frag";
import ProjectItem from "./project-item";
import vertex from "./vertex.vert";
import type { AppContext } from "~/_foundation/types";

type Props = AppContext;

type Refs = {
  projectItem: HTMLElement[];
  thumb: HTMLElement[];
};

export default defineComponent({
  name: "ProjectItems",
  setup(_el: HTMLElement, context: Props) {
    const { refs } = useDomRef<Refs>("projectItem", "thumb");
    const { addChild } = useSlot();
    const { anyHover } = useMediaQueryState();

    if (anyHover) {
      const geo = new PlaneBufferGeometry(1, 1, 30, 30);
      const mat = new ShaderMaterial({
        fragmentShader: fragment,
        vertexShader: vertex,
        depthTest: false,
        transparent: true,
        alphaTest: 0.5,
      });

      addChild(refs.projectItem, ProjectItem, {
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
