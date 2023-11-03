import "virtual:windi.css";
import "ress";
import { create, withSvelte } from "lake";
import Cursor from "./_components/cursor/index.svelte";
import Load from "./_components/load";
import Menu from "./_components/menu/index.svelte";
import Noop from "./_components/noop.svelte";
import Profile from "./_components/profile";
import Sns from "./_components/sns.svelte";
import Work from "./_components/work";
import Works from "./_components/works";
import { qsa } from "./_foundation/utils";
import type { IComponent, ComponentContext } from "lake";

const init = () => {
  const { component, unmount } = create();

  const table: Record<string, IComponent> = {
    Cursor: withSvelte(Cursor, "Cursor"),
    Menu: withSvelte(Menu, "Menu"),
    Noop: withSvelte(Noop),
    Profile,
    Sns: withSvelte(Sns, "Sns"),
    Work,
    Works,
  } as const;

  const mountComponents = (
    scope: HTMLElement,
    props: Record<string, unknown>
  ) => {
    return qsa<HTMLElement>("[data-component]", scope).reduce<
      ComponentContext[]
    >((acc, el) => {
      const name = el.dataset.component || "Noop";
      try {
        const mount = component(table[`${name}`]);
        acc.push(mount(el, props));
      } catch (e) {
        console.error(e);
      }
      return acc;
    }, []);
  };

  const html = document.documentElement;

  component(Load)(html, {
    onCleanup: (scope: HTMLElement) => {
      unmount(qsa<HTMLElement>("[data-component]", scope));
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
};

if (document.readyState !== "loading") {
  init();
} else {
  document.addEventListener("DOMContentLoaded", init);
}

if (process.env.NODE_ENV === "development") {
  const Stats = await (
    (await import("https://cdn.skypack.dev/stats.js.fps?dts")) as any
  ).default;
  const stats = new Stats();
  stats.showPanel(0);

  document.body.appendChild(stats.dom);

  const loop = () => {
    stats.update();
    requestAnimationFrame(loop);
  };

  loop();
}
