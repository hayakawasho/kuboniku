<script lang="ts">
  import { refKeySet, getContext$, useEvent } from '@/foundation'

  type Refs = {
    menuTrigger: HTMLButtonElement
  }

  const { useDOMRef, rootRef: __ } = getContext$()
  const { refs } = useDOMRef<Refs>(refKeySet('menuTrigger'))

  useEvent(refs.menuTrigger, 'click', evt => {
    evt.preventDefault()
  })
</script>
