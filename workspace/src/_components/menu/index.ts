import { gsap } from "gsap";
import { defineComponent, useDomRef, useSlot, withSvelte } from "lake";
import { Tween } from "@/_foundation/tween";
import { nextTick } from "@/_foundation/utils";
import MenuCtrl from "./control.svelte";
import type { AppContext } from "@/_foundation/type";

type Refs = {
  menuTrigger: HTMLButtonElement;
  burgerTL: HTMLElement;
  burgerBL: HTMLElement;
  menu: HTMLElement;
  mask: HTMLElement;
  menuBg: HTMLElement;
  menuLinks: HTMLElement;
  menuLabel: HTMLElement[];
};

export default defineComponent({
  name: "NavMenu",
  setup(el, context: AppContext) {
    const { addChild } = useSlot();
    const { refs } = useDomRef<Refs>(
      "menuTrigger",
      "burgerTL",
      "burgerBL",
      "menu",
      "mask",
      "menuBg",
      "menuLink",
      "menuLinks"
    );

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

    const q = gsap.utils.selector(refs.menuLinks);

    const openAnime = async () => {
      Tween.kill([q(".js-menuLabel"), refs.menuTrigger]);
      el.classList.add("is-menu-animating");

      await nextTick();

      el.classList.add("is-menu-open");

      Tween.serial(
        Tween.prop(refs.menuTrigger, {
          pointerEvents: "none",
          rotation: 0,
        }),
        Tween.parallel(
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
            Tween.prop(q(".js-menuLabel"), {
              opacity: 1,
              rotation: -7,
              y: "200%",
            }),
            Tween.tween(q(".js-menuLabel"), 0.75, "power2.inOut", {
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
          el.classList.remove("is-menu-animating");
        })
      );
    };

    const closeAnime = async () => {
      Tween.kill([q(".js-menuLabel"), refs.menuTrigger]);
      el.classList.add("is-menu-animating");

      await nextTick();

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
            Tween.prop(q(".js-menuLabel"), {
              rotation: 0,
              y: "0%",
            }),
            Tween.tween(q(".js-menuLabel"), 0.65, "power2.inOut", {
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
        Tween.immediate(() => {
          el.classList.remove("is-menu-open", "is-menu-animating");
        })
      );
    };

    addChild(el, withSvelte(MenuCtrl), {
      ...context,
      closeAnime,
      openAnime,
    });
  },
});
