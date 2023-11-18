<script lang="ts">
  import { getContext } from "svelte";
  import { useRoute } from "@/_states/route";
  import type { RouteName } from "@/_foundation/type";
  import type { Context$ } from "lake";

  const context = getContext<Context$<{ current: RouteName }>>("$");
  let current = context.current;

  useRoute(({ name }) => {
    current = name;
  });
</script>

<li>
  <a
    href="/profile/"
    class="menuLink"
    aria-current={current === "profile" && "page"}
  >
    <span class="inline-block overflow-hidden leading-[1]">
      <span class="menuLink__label | js-menuLabel">Profile</span>
    </span>
  </a>
</li>
<li>
  <a href="/" class="menuLink" aria-current={current === "works" && "page"}>
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

<style lang="postcss">
  .menuLink {
    display: inline-block;
    vertical-align: top;
    font-family: var(--font-en);
    font-weight: 500;
    font-size: 1.4rem;
    line-height: calc(86 / 28);
    letter-spacing: 0.41em;
    color: #fff;
    overflow: hidden;

    @media (min-width: 640px) {
      font-size: 1.3rem;
      line-height: calc(52 / 26);
      opacity: 1;
      pointer-events: auto;
    }

    &[aria-current="page"] {
      color: #858585;
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
