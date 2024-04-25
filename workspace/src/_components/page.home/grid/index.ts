import { defineComponent, useSlot, useDomRef, useEvent, ref, readonly, useMount } from "lake";
import NormalizeWheel from "normalize-wheel";
import { useTick } from "@/_foundation/hooks";
import { lerp } from "@/_foundation/math";
import { Tween } from "@/_foundation/tween";
import { PlaneBufferGeometry, ShaderMaterial } from "@/_gl/three";
import { useMousePos } from "@/_states/mouse";
import { useMediaQueryContext } from "@/_states/mq";
import { useWindowSizeContext } from "@/_states/window-size";
import fragment from "./fragment.frag";
import GridItem from "./item";
import vertex from "./vertex.vert";
import type { AppContext, ParentScene } from "@/_foundation/type";

type Props = AppContext & ParentScene;

type Refs = {
  gridItem: HTMLImageElement[];
};

export default defineComponent({
  name: "Grid",
  setup(el: HTMLElement, context: Props) {
    const { addChild } = useSlot();
    const { refs } = useDomRef<Refs>("gridItem");
    const { device } = useMediaQueryContext();

    const posX = ref(0);
    const posY = ref(0);
    const diffX = ref(0);
    const diffY = ref(0);
    const maxX = ref(0);
    const maxY = ref(0);

    const state = {
      dragging: false,
      position: 0,
      resizing: false,
      startPos: 0,
      tx: 0,
      ty: 0,
    };

    useEvent(
      window as any,
      "touchstart",
      e => {
        Tween.kill(state);

        state.dragging = true;
        state.position = posY.value;
        state.startPos = e.touches[0].clientY;
      },
      {
        passive: true,
      }
    );

    useEvent(el, "mousedown", e => {
      e.preventDefault();

      Tween.kill(state);

      state.dragging = true;
      state.position = posY.value;
      state.startPos = mouseY.value;
    });

    const onTouchEnd = () => {
      if (!state.dragging) {
        return;
      }
      state.dragging = false;
    };

    const _window = window as any;

    useEvent(_window, "touchend", onTouchEnd);
    useEvent(_window, "mouseup", onTouchEnd);

    useEvent(
      _window,
      "touchmove",
      e => {
        if (!state.dragging) {
          return;
        }

        Tween.kill(state);

        const y = e.touches[0].clientY;
        const distance = (state.startPos - y) * 2;
        state.ty = state.position + distance;
      },
      {
        passive: true,
      }
    );

    const [_, mouseY] = useMousePos(({ y }) => {
      if (!state.dragging) {
        return;
      }

      const distance = (state.startPos - y) * 2;
      state.ty = state.position + distance;
    });

    useEvent(
      _window,
      "wheel",
      e => {
        Tween.kill(state);

        const { pixelY } = NormalizeWheel(e);
        state.ty += pixelY;
      },
      {
        passive: true,
      }
    );

    const [__, windowHeight] = useWindowSizeContext(() => {
      state.resizing = true;

      const bounds = el.getBoundingClientRect();
      maxX.value = bounds.width / 2;
      maxY.value = bounds.height / 2;

      state.resizing = false;
    });

    const EASE = {
      pc: 0.12,
      sp: 0.08,
    };

    useTick(({ timeRatio }) => {
      if (state.resizing) {
        return;
      }

      const oldX = posX.value;
      const oldY = posY.value;
      const p = 1 - (1 - EASE[device]) ** timeRatio;

      const easeValue = {
        x: lerp(posX.value, state.tx, p),
        y: lerp(posY.value, state.ty, p),
      };

      posX.value = easeValue.x;
      posY.value = easeValue.y;

      diffX.value = oldX - posX.value;
      diffY.value = oldY - posY.value;
    });

    const geo = new PlaneBufferGeometry(1, 1);
    const mat = new ShaderMaterial({
      fragmentShader: fragment,
      vertexShader: vertex,
    });

    useMount(() => {
      const bounds = el.getBoundingClientRect();
      maxX.value = bounds.right;
      maxY.value = bounds.height / 2;

      addChild(refs.gridItem, GridItem, {
        ...context,
        diff: readonly(diffY),
        geo,
        mat,
        maxX: readonly(maxX),
        maxY: readonly(maxY),
        posX: readonly(posX),
        posY: readonly(posY),
      });
    });

    return {
      start: () => {
        const centerY = windowHeight.value / 2;
        const itemH = refs.gridItem[0].getBoundingClientRect().height;
        const gap = maxY.value - itemH * 4;
        const offset = maxY.value - (centerY + itemH / 2) - gap / 4;

        Tween.tween(state, 2.7, "power3.out", {
          onUpdate: () => {
            posY.value = state.ty;
          },
          ty: offset,
        });
      },
    };
  },
});

/**

methods: {
    bindEvents: function() {
        this.$nuxt.$on("vs", this.onVS),
        this.$nuxt.$on("tick", this.tick),
        this.$nuxt.$on("resize", this.resize),
        this.isMobile || (this.$nuxt.$on("mousedown", this.onMouseDown),
        this.$nuxt.$on("mouseup", this.onMouseUp),
        window.addEventListener("mousemove", this.onMouseMove))
    },
    unbindEvents: function() {
        this.$nuxt.$off("vs", this.onVS),
        this.$nuxt.$off("tick", this.tick),
        this.$nuxt.$on("resize", this.resize),
        this.isMobile || (this.$nuxt.$off("mousedown", this.onMouseDown),
        this.$nuxt.$off("mouseup", this.onMouseUp),
        window.removeEventListener(this.moveEvent, this.onMouseMove))
    },
    setBounds: function() {
        var t = Object(h.c)(this.$el)
          , e = t.bottom
          , n = t.right;
        this.max.y = e,
        this.max.x = n
    },
    resize: function() {
        this.setBounds(),
        this.$nuxt.$emit("resize-reset")
    },
    onVS: function(t) {
        var e = t.dY
          , n = t.dX;
        this.tY -= e,
        this.tX += n
    },
    onMouseMove: function(t) {
        var e = t.clientX
          , n = t.clientY;
        this.isDragging && (this.tX = this.on.x + 2.5 * e,
        this.tY = this.on.y - 2.5 * n)
    },
    onMouseDown: function(t) {
        var e = t.x
          , n = t.y;
        t.target.closest(".js-grid") && !this.isDragging && (this.isDragging = !0,
        this.on.x = this.tX - 2.5 * e,
        this.on.y = this.tY + 2.5 * n)
    },
    onMouseUp: function() {
        this.isDragging && (this.isDragging = !1)
    },
    tick: function(t) {
        var e = t.ratio;
        this.yCalc(e),
        this.xCalc(e),
        this.e1 = .075 * e,
        this.e2 = .0825 * e,
        this.$nuxt.$emit("gl-tick-grid", {
            y: this.cY,
            x: this.cX,
            max: this.max,
            iy: this.introY
        })
    },
    yCalc: function() {
        this.cY[0] = l()(this.cY[0], this.tY, .075),
        this.cY[0] = this.cY[0] + this.introY.a,
        this.cY[1] = l()(this.cY[1], this.tY, .0825),
        this.cY[1] = this.cY[1] + this.introY.b
    },
    xCalc: function() {
        this.cX[0] += (this.tX - this.cX[0]) * this.e1,
        this.cX[0] = Math.round(100 * this.cX[0]) / 100,
        this.cX[1] += (this.tX - this.cX[1]) * this.e2,
        this.cX[1] = Math.round(100 * this.cX[1]) / 100
    },
    enter: function() {
        this.bindEvents()
    },
    leave: function() {
        this.unbindEvents()
    }
}

 */
