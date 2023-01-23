import { defineComponent, useEvent } from 'lake'

type Props = {
  onClose: () => void
}

export default defineComponent<Props>({
  setup(el, props) {
    const { onClose } = props

    useEvent(el as HTMLElement, 'click', e => {
      e.preventDefault()
      onClose()
    })
  },
})
