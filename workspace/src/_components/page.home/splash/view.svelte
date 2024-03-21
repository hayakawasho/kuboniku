<script lang="ts">
  import { onMount } from "svelte";
  import { cloudinaryAPIConverter } from "@/_foundation/converter";
</script>

<div class="w-full h-full flex items-center justify-center">
  <div class="imgs">
    <img
      src="https://res.cloudinary.com/dxydwpqwv/images/f_auto,q_auto,w_840/v1710857940/kuboniku_assets/top_jma/top_jma.png?_i=AA"
      alt=""
      class="absolute w-full h-full top-0 left-0 opacity-100 object-cover grayscale"
    />
  </div>
</div>

<style>
  .imgs {
    width: 16rem;
    height: 20rem;
    position: relative;

    @media (min-width: 640px) {
      width: 30rem;
      height: 20rem;
    }
  }
</style>
