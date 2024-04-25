import { ref, useMount, useEvent, defineComponent } from "lake";
import VirtualScroll from "virtual-scroll";
import { useTick, useElementSize } from "@/_foundation/hooks";
import { lerp } from "@/_foundation/math";
import { Tween } from "@/_foundation/tween";
import { useWindowSizeContext } from "@/_states/window-size";

export default defineComponent({
  name: "PageScroll",
  setup(el: HTMLElement) {
    const vs = new VirtualScroll({
      firefoxMultiplier: 40,
      mouseMultiplier: 0.6,
      touchMultiplier: 2,
    });

    const onVScroll = ({ deltaY, originalEvent, ...vs }: VirtualScroll.VirtualScrollEvent) => {
      //
    };

    useEvent(
      window as any,
      "scroll",
      _e => {
        //
      },
      {
        passive: true,
      }
    );

    useTick(({ timestamp, deltaTime }) => {
      //
    });

    useWindowSizeContext(({ wh }) => {
      //
    });

    useElementSize(el, () => {
      //
    });

    useMount(() => {
      vs.on(onVScroll);

      return () => {
        vs.destroy();
      };
    });
  },
});
