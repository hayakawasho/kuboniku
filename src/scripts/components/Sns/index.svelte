<script lang="ts">
  import { onMount, onDestroy } from 'svelte'

  onMount(() => {
    console.log('mount')
  })

  onDestroy(() => {
    console.log('destroy')
  })
</script>
