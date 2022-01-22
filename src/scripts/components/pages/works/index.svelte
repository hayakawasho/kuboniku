<script lang="ts">
  import type { Work } from '@/domain/works'
  export let posts: Work[]
</script>

{#each posts as i}
  <li class="o-grid__item">
    {i}
  </li>
{/each}
