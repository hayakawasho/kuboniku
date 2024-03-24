<script lang="ts">
  import { getContext } from "svelte";
  import type { AppContext } from "@/_foundation/type";
  import type { Context$ } from "lake";

  const { images } = getContext<
    Context$<
      AppContext & {
        images: string[];
      }
    >
  >("$");
</script>

<div class="w-full h-full flex items-center justify-center">
  <div class="g">
    {#each images as image}
      <img
        src={image}
        alt=""
        class="absolute w-full h-full top-0 left-0 opacity-100 object-cover grayscale"
        width="840"
        height="1050"
        decoding="async"
      />
    {/each}
  </div>
</div>

<style>
  .g {
    width: calc((320% + -5.6rem) / 5);
    aspect-ratio: 4 / 3;
    position: relative;

    @media (min-width: 640px) {
      width: calc((115% + -3rem) / 5);
    }
  }
</style>
