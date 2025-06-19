<script lang="ts">
  import { useSlot, useDomRef } from "lake";
  import { getContext, onMount } from "svelte";
  import { useMediaQueryContext } from "@/_states/mq";
  import { useRouteContext } from "@/_states/route";
  import MenuLink from "./link";
  import type { AppContext, RouteName } from "@/_foundation/type";
  import type { Context$ } from "lake";

  type Props = AppContext & {
    current: RouteName;
    closeMenu: () => void;
  };

  const { closeMenu, ...context } = getContext<Context$<Props>>("$");

  let current = context.current;

  const { device } = useMediaQueryContext();

  useRouteContext(({ name }) => {
    current = name;
  });

  const linkProps = (to: string) => {
    return {
      ["hx-get"]: to,
      ["hx-push-url"]: true,
      ["hx-select"]: "[data-xhr]",
      ["hx-swap"]: "swap:520ms",
      ["hx-target"]: "#main",
    };
  };

  const { addChild } = useSlot();

  type Refs = {
    menuLink: HTMLAnchorElement[] | null;
  };

  onMount(() => {
    const { refs } = useDomRef<Refs>("menuLink");

    if (refs.menuLink) {
      addChild(refs.menuLink, MenuLink);
    }
  });
</script>

{#if device === "sp"}
  <dialog class="menuDialog | js-menuDialog">
    <nav>
      <ul>
        <li>
          <a
            {...linkProps("/")}
            aria-current={current === "home" && "page"}
            class="menuLink"
            data-astro-prefetch="tap"
            href="/"
            on:click={closeMenu}
          >
            <span class="inline-block overflow-hidden leading-[1]">
              <span class="menuLink__label | js-menuLabel">Top</span>
            </span>
          </a>
        </li>
        <li>
          <a
            {...linkProps("/profile/")}
            aria-current={current === "profile" && "page"}
            class="menuLink"
            data-astro-prefetch="tap"
            href="/profile/"
            on:click={closeMenu}
          >
            <span class="inline-block overflow-hidden leading-[1]">
              <span class="menuLink__label | js-menuLabel">Profile</span>
            </span>
          </a>
        </li>
        <li>
          <a
            {...linkProps("/work/")}
            aria-current={current === "work" && "page"}
            class="menuLink"
            data-astro-prefetch="tap"
            href="/work/"
            on:click={closeMenu}
          >
            <span class="inline-block overflow-hidden leading-[1]">
              <span class="menuLink__label | js-menuLabel">Work</span>
            </span>
          </a>
        </li>
        <li>
          <a href="mailto:k.bo.n10.05@gmail.com" class="menuLink">
            <span class="inline-block overflow-hidden leading-[1]">
              <span class="menuLink__label | js-menuLabel">Contact</span>
            </span>
          </a>
        </li>
      </ul>
    </nav>
  </dialog>
{:else}
  <nav>
    <ul>
      <li>
        <a
          {...linkProps("/")}
          aria-current={current === "home" && "page"}
          class="menuLink"
          data-astro-prefetch="hover"
          data-cursor="scale"
          data-ref="menuLink"
          href="/"
        >Top</a>
      </li>
      <li>
        <a
          {...linkProps("/profile/")}
          aria-current={current === "profile" && "page"}
          class="menuLink"
          data-astro-prefetch="hover"
          data-cursor="scale"
          data-ref="menuLink"
          href="/profile/"
        >Profile</a>
      </li>
      <li>
        <a
          {...linkProps("/work/")}
          aria-current={current === "work" && "page"}
          class="menuLink"
          data-astro-prefetch="hover"
          data-cursor="scale"
          data-ref="menuLink"
          href="/work/"
        >Work</a>
      </li>
      <li>
        <a
          href="mailto:k.bo.n10.05@gmail.com"
          class="menuLink"
          data-ref="menuLink"
          data-cursor="scale"
        >Contact</a>
      </li>
    </ul>
  </nav>
{/if}

<style lang="scss">
  .menuDialog {
    max-width: none;
    max-height: none;
    background: transparent;
    margin-left: auto;
    margin-right: 3rem;
  }

  .menuLink {
    display: inline-block;
    vertical-align: top;
    font-family: var(--font-en);
    font-style: italic;
    font-size: 1.6rem;
    line-height: calc(86 / 28);
    overflow: hidden;
    transition: 0.55s opacity var(--ease-opacity);
    color: var(--color-text);
    pointer-events: auto;

    @media (min-width: 640px) {
      font-size: 1.5rem;
      line-height: calc(62 / 30);
      opacity: 1;
    }

    @media (hover: hover) {
      &:hover {
        opacity: 0.5;
      }
    }

    &[aria-current="page"] {
      opacity: 0.5;
      pointer-events: none !important;
    }
  }

  .menuLink__label {
    display: inline-block;
    transform: translateY(100%);
    transform-origin: left;

    @media (min-width: 640px) {
      transform: none;
    }
  }
</style>
