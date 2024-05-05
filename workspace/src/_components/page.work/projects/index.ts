import { defineComponent, useDomRef, useSlot } from "lake";
import { PlaneBufferGeometry, ShaderMaterial } from "@/_gl/three";
import fragment from "./fragment.frag";
import ProjectItem from "./item";
import vertex from "./vertex.vert";
import type { AppContext, ParentScene } from "@/_foundation/type";

type Props = AppContext & ParentScene;

type Refs = {
  projectItem: HTMLElement[];
};

export default defineComponent({
  name: "ProjectItems",
  setup(_el: HTMLElement, context: Props) {
    const { refs } = useDomRef<Refs>("projectItem");
    const { addChild } = useSlot();

    const geo = new PlaneBufferGeometry(1, 1, 4, 20);
    const mat = new ShaderMaterial({
      fragmentShader: fragment,
      vertexShader: vertex,
    });

    addChild(refs.projectItem, ProjectItem, {
      ...context,
      geo,
      mat,
    });
  },
});
