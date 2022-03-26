<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  // import { TWEEN } from '@/foundation'

  onMount(() => {
    console.log('mount')
  })

  onDestroy(() => {
    console.log('destroy')
  })
</script>
