import "ress";
import { create, withSvelte } from "lake";
import Cursor from "./_components/cursor.svelte";
import Load from "./_components/load";
import NavMenu from "./_components/menu";
import Noop from "./_components/noop";
import Profile from "./_components/page.profile";
import Works from "./_components/page.works";
import WorksSingle from "./_components/page.works-single";
import Scrollbar from "./_components/scrollbar.svelte";
import Sns from "./_components/sns.svelte";
import { bootstrap } from "./bootstrap";
import type { IComponent, ComponentContext } from "lake";

bootstrap(() => {
  const { component, unmount } = create();

  const table: Record<string, IComponent> = {
    Cursor: withSvelte(Cursor, "Cursor"),
    NavMenu,
    Noop,
    Profile,
    Scrollbar: withSvelte(Scrollbar, "Scrollbar"),
    Sns: withSvelte(Sns, "Sns"),
    Works,
    WorksSingle,
  } as const;

  const mountComponents = (scope: HTMLElement, props: Record<string, unknown>) => {
    return [...scope.querySelectorAll<HTMLElement>("[data-component]")].reduce<ComponentContext[]>(
      (acc, el) => {
        const name = el.dataset.component || "Noop";
        try {
          const mount = component(table[`${name}`]);
          acc.push(mount(el, props));
        } catch (e) {
          console.error(e);
        }
        return acc;
      },
      []
    );
  };

  const html = document.documentElement;

  component(Load)(html, {
    onCleanup: (scope: HTMLElement) => {
      unmount([...scope.querySelectorAll<HTMLElement>("[data-component]")]);
    },
    onCreated: (context?: Record<string, unknown>) => {
      mountComponents(html, {
        ...context,
        once: true,
      });
    },
    onUpdated: (scope: HTMLElement, context: Record<string, unknown>) => {
      mountComponents(scope, {
        ...context,
        once: false,
      });
    },
  });
});

if (process.env.NODE_ENV === "development") {
  const Stats = await ((await import("https://cdn.skypack.dev/stats.js.fps?dts")) as any).default;
  const stats = new Stats();
  stats.showPanel(0);

  document.body.appendChild(stats.dom);

  const loop = () => {
    stats.update();
    requestAnimationFrame(loop);
  };

  loop();
}
