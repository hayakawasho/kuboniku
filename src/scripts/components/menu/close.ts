import { defineComponent, useEvent } from 'lake'

type Props = {
  onClose: () => void
}

export default defineComponent({
  tagName: 'MenuClose',
  setup(el: HTMLElement, props: Props) {
    const { onClose } = props

    useEvent(el, 'click', _e => {
      onClose()
    })
  },
})
