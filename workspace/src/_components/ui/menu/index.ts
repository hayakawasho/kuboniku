import { gsap } from "gsap";
import { defineComponent, useDomRef, useSlot, withSvelte, useMount, ref } from "lake";
import { Tween } from "~/_foundation/libs/tween";
import { waitFrame } from "~/_foundation/utils";
import MenuCtrl from "./control.svelte";
import type { AppContext } from "~/_foundation/types";

type Refs = {
  burgerTL: HTMLElement;
  burgerBL: HTMLElement;
  menu: HTMLElement;
  menuTrigger: HTMLButtonElement;
  mask: HTMLElement;
  menuBg: HTMLElement;
  menuContent: HTMLElement;
};

type Props = AppContext;

export default defineComponent({
  name: "NavMenu",
  setup(el, context: Props) {
    const { addChild } = useSlot();
    const { refs } = useDomRef<Refs>("burgerTL", "burgerBL", "menu", "menuTrigger", "mask", "menuBg", "menuContent");

    const q = gsap.utils.selector(refs.menuContent);

    const CLIP_PATH = {
      x1: 100,
      x2: 100,
    };

    const drawMenuBg = () => {
      refs.menuBg.style.clipPath = `polygon(
        ${CLIP_PATH.x1}% 0px,
        100% 0px,
        100% 100vh,
        ${CLIP_PATH.x2}% 100vh
      )`;
    };

    useMount(() => {
      const labelDom = q(".js-menuLabel");
      const dialogDom = q(".js-menuDialog")[0] as HTMLDialogElement;

      addChild(el, withSvelte(MenuCtrl), {
        ...context,
        closeMenu: async () => {
          Tween.kill([labelDom, refs.menuTrigger]);

          Tween.prop(refs.menuBg, {
            willChange: "clip-path",
          });
          Tween.prop([refs.menuTrigger, refs.burgerTL, refs.burgerBL], {
            willChange: "transform",
          });
          Tween.prop(labelDom, {
            willChange: "transform,opacity",
          });

          await waitFrame();

          Tween.serial(
            Tween.prop(refs.menuTrigger, {
              pointerEvents: "none",
              rotation: 180,
            }),
            Tween.parallel(
              Tween.tween(refs.mask, 0.75, undefined, {
                opacity: 0,
              }),
              Tween.tween(refs.menuTrigger, 0.75, "power2.inOut", {
                rotation: 360,
              }),
              Tween.tween(refs.burgerTL, 0.75, "power2.inOut", {
                y: 0,
              }),
              Tween.tween(refs.burgerBL, 0.75, "power2.inOut", {
                scaleX: 32 / 40,
              }),
              Tween.serial(
                Tween.prop(labelDom, {
                  rotation: 0,
                  y: "0%",
                }),
                Tween.tween(labelDom, 0.65, "power2.inOut", {
                  rotation: 7,
                  stagger: 0.06,
                  y: "-200%",
                })
              ),
              Tween.parallel(
                Tween.tween(CLIP_PATH, 0.85, "power2.inOut", {
                  onUpdate: drawMenuBg,
                  x1: 100,
                }),
                Tween.tween(CLIP_PATH, 0.75, "power2.inOut", {
                  x2: 100,
                }).delay(0.1)
              )
            ),
            Tween.prop(refs.menuTrigger, {
              pointerEvents: "auto",
            }),
            Tween.prop(refs.mask, {
              pointerEvents: "none",
            }),
            Tween.immediate(() => {
              Tween.prop([refs.menuBg, refs.menuTrigger, refs.burgerTL, refs.burgerBL, labelDom], {
                clearProps: "will-change",
              });
              refs.menu.classList.remove("is-menu-open");
              dialogDom.close();
            })
          );
        },
        openMenu: async () => {
          Tween.kill([labelDom, refs.menuTrigger]);

          Tween.prop(refs.menuBg, {
            willChange: "clip-path",
          });
          Tween.prop([refs.menuTrigger, refs.burgerTL, refs.burgerBL], {
            willChange: "transform",
          });
          Tween.prop(labelDom, {
            willChange: "transform, opacity",
          });

          await waitFrame();

          dialogDom.show();
          refs.menu.classList.add("is-menu-open");

          Tween.serial(
            Tween.prop(refs.menuTrigger, {
              pointerEvents: "none",
              rotation: 0,
            }),
            Tween.parallel(
              Tween.prop(refs.mask, {
                pointerEvents: "auto",
              }),
              Tween.tween(refs.mask, 0.75, undefined, {
                opacity: 0.5,
              }),
              Tween.tween(refs.menuTrigger, 0.75, "power2.inOut", {
                rotation: 180,
              }),
              Tween.tween(refs.burgerTL, 0.75, "power2.inOut", {
                y: 2.5,
              }),
              Tween.tween(refs.burgerBL, 0.75, "power2.inOut", {
                scaleX: 0,
              }),
              Tween.serial(
                Tween.prop(labelDom, {
                  opacity: 1,
                  rotation: -7,
                  y: "200%",
                }),
                Tween.tween(labelDom, 0.75, "power2.inOut", {
                  rotation: 0,
                  stagger: 0.065,
                  y: "0%",
                })
              ),
              Tween.parallel(
                Tween.tween(CLIP_PATH, 0.85, "power2.inOut", {
                  onUpdate: drawMenuBg,
                  x1: 0,
                }),
                Tween.tween(CLIP_PATH, 0.75, "power2.inOut", {
                  x2: 0,
                }).delay(0.1)
              )
            ),
            Tween.prop(refs.menuTrigger, {
              pointerEvents: "auto",
            }),
            Tween.immediate(() => {
              Tween.prop([refs.menuBg, refs.menuTrigger, refs.burgerTL, refs.burgerBL, labelDom], {
                clearProps: "will-change",
              });
            })
          );
        },
      });
    });
  },
});
