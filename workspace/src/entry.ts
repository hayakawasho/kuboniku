import "./global.scss";
import { create, withSvelte } from "lake";
import Load from "./_components/load";
import NavMenu from "./_components/menu";
import Noop from "./_components/noop";
import Home from "./_components/page.home";
import Profile from "./_components/page.profile";
import Works from "./_components/page.work";
import WorkSingle from "./_components/page.work-single";
import Scrollbar from "./_components/scrollbar.svelte";
import Sns from "./_components/sns.svelte";
import type { IComponent, ComponentContext } from "lake";

(() => {
  const { component, unmount } = create();

  const table: Record<string, IComponent> = {
    Home,
    NavMenu,
    Noop,
    Profile,
    Scrollbar: withSvelte(Scrollbar, "Scrollbar"),
    Sns: withSvelte(Sns, "Sns"),
    WorkSingle,
    Works,
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

  const loadContext = {
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
  };

  component(Load)(html, loadContext);
})();

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
