<script lang="ts">
  import { useSlot, useDomRef } from "lake";
  import { getContext, onMount } from "svelte";
  import { useMediaQueryContext } from "@/_states/mq";
  import { useRouteContext } from "@/_states/route";
  import MenuLink from "./link";
  import type { AppContext, RouteName } from "@/_foundation/type";
  import type { Context$ } from "lake";

  const { closeMenu, ...context } = getContext<
    Context$<
      AppContext & {
        current: RouteName;
        closeMenu: () => void;
      }
    >
  >("$");

  let current = context.current;

  const mq = useMediaQueryContext();

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

{#if mq.value.device === "sp"}
  <dialog class="menuDialog | js-menuDialog">
    <nav>
      <ul>
        <li>
          <a
            {...linkProps("/profile/")}
            aria-current={current === "profile" && "page"}
            class="menuLink"
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
            {...linkProps("/works/")}
            aria-current={current === "works" && "page"}
            class="menuLink"
            href="/"
            on:click={closeMenu}
          >
            <span class="inline-block overflow-hidden leading-[1]">
              <span class="menuLink__label | js-menuLabel">Works</span>
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
          {...linkProps("/profile/")}
          aria-current={current === "profile" && "page"}
          class="menuLink"
          data-ref="menuLink"
          href="/profile/"
        >
          Profile
        </a>
      </li>
      <li>
        <a
          {...linkProps("/works/")}
          aria-current={current === "works" && "page"}
          class="menuLink"
          data-ref="menuLink"
          href="/works/"
        >
          Works
        </a>
      </li>
      <li>
        <a href="mailto:k.bo.n10.05@gmail.com" class="menuLink" data-ref="menuLink"> Contact </a>
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
    font-weight: 500;
    font-size: 1.4rem;
    line-height: calc(86 / 28);
    letter-spacing: 0.41em;
    overflow: hidden;
    transition: 0.55s opacity var(--ease-opacity);
    color: var(--color-text);

    @media (min-width: 640px) {
      font-size: 1.3rem;
      line-height: calc(52 / 26);
      opacity: 1;
      pointer-events: auto;
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
