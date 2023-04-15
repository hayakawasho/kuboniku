import { defineComponent, useEvent } from 'lake'

type Props = {
  onClose: () => void
}

export default defineComponent({
  tagName: 'MenuClose',
  setup(el, props: Props) {
    const { onClose } = props

    useEvent(el as HTMLElement, 'click', e => {
      e.preventDefault()
      onClose()
    })
  },
})
