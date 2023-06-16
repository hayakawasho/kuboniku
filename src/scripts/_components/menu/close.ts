import { defineComponent, useEvent } from 'lake'

type Props = {
  onClose: () => void
}

export default defineComponent({
  setup(el: HTMLElement, props: Props) {
    const { onClose } = props

    useEvent(el, 'click', _e => {
      onClose()
    })
  },
  tagName: 'MenuClose',
})
