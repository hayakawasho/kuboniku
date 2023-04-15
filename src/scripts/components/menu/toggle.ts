import { defineComponent, useEvent } from 'lake'
import type { ReadonlyRef } from 'lake'

type Props = {
  isOpen: ReadonlyRef<boolean | undefined>
  onOpen: () => void
  onClose: () => void
}

export default defineComponent({
  tagName: 'MenuToggle',
  setup(el, props: Props) {
    const { isOpen, onClose, onOpen } = props

    useEvent(el as HTMLElement, 'click', e => {
      e.preventDefault()
      isOpen.value ? onClose() : onOpen()
    })
  },
})
