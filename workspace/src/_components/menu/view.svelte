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

  let currentRouteName = context.current;
  const { device } = useMediaQueryContext();

  useRouteContext(({ name }) => {
    currentRouteName = name;
  });

  const { addChild } = useSlot();

  type Refs = {
    menuLink: HTMLAnchorElement[] | null;
  };

  onMount(() => {
    const { refs } = useDomRef<Refs>("menuLink");

    if (refs.menuLink) {
      addChild(refs.menuLink, MenuLink, context);
    }
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

  const menuItems = [
    ['/', 'home', 'Top'],
    ['/profile/', 'profile', 'Profile'],
    ['/work/', 'work', 'Work'],
  ]
</script>

{#if device === "sp"}
  <dialog class="menuDialog | js-menuDialog">
    <nav>
      <ul>
        {#each menuItems as item}
          <li>
            <a
              {...linkProps(item[0])}
              aria-current={currentRouteName === item[1] && "page"}
              class="menuLink"
              data-astro-prefetch="tap"
              href={item[0]}
              tabindex={currentRouteName === item[1] ? -1 : undefined}
              on:click={closeMenu}
            >
              <span class="inline-block overflow-hidden leading-[1]">
                <span class="menuLink__label | js-menuLabel">{item[2]}</span>
              </span>
            </a>
          </li>
        {/each}
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
      {#each menuItems as item}
        <li>
          <a
            {...linkProps(item[0])}
            aria-current={currentRouteName === item[1] && "page"}
            class="menuLink"
            data-astro-prefetch="hover"
            data-cursor="scale"
            data-ref="menuLink"
            tabindex={currentRouteName === item[1] ? -1 : undefined}
            href={item[0]}
          >
            <span aria-hidden="true" class="glUnderline" data-ref="uline"></span>
            {item[2]}
          </a>
        </li>
      {/each}
      <li>
        <a
          href="mailto:k.bo.n10.05@gmail.com"
          class="menuLink"
          data-ref="menuLink"
          data-cursor="scale"
        >
          <span aria-hidden="true" class="glUnderline" data-ref="uline"></span>
          Contact
        </a>
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
    position: relative;

    @media (min-width: 640px) {
      font-size: 1.5rem;
      line-height: calc(62 / 30);
      opacity: 1;
    }

    @media (hover: hover) {
      &:hover {
        // opacity: 0.5;
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

  .glUnderline {
    position: absolute;
    left: 0;
    width: 100%;
    height: .075em;
    bottom: .2em;
  }
</style>
