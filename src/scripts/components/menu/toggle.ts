import { defineComponent, useEvent } from 'lake'
import type { ReadonlyRef } from 'lake'

type Props = {
  isOpen: ReadonlyRef<boolean>
  onOpen: () => void
  onClose: () => void
}

export default defineComponent<Props>({
  setup(el, props) {
    const { isOpen, onClose, onOpen } = props

    useEvent(el as HTMLElement, 'click', e => {
      e.preventDefault()
      isOpen.value ? onClose() : onOpen()
    })
  },
})
