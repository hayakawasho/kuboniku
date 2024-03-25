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
    <div class="relative w-full h-full" data-ref="splashImages">
      {#each images as image}
        <img
          src={image}
          alt=""
          class="opacity-0 absolute w-full h-full top-0 left-0 object-cover grayscale"
          data-ref="splashImage"
          decoding="async"
          width="840"
          height="1050"
        />
      {/each}
    </div>
  </div>
</div>

<style>
  .g {
    width: calc((320% + -5.6rem) / 5);
    aspect-ratio: 4 / 3;
    position: relative;
    overflow: hidden;

    @media (min-width: 640px) {
      width: calc((115% + -3rem) / 5);
    }
  }
</style>
