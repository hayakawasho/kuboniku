import { defineComponent, ref, readonly } from 'lake'
import type { ReadonlyRef } from 'lake'

export default defineComponent({
  components: {
    '[data-skew]': defineComponent<{
      x: ReadonlyRef<number>
    }>({
      setup(_, props) {
        const { x } = props
        console.log(x)
      },
    }),
  },

  setup() {
    const x = ref(0)

    return {
      x: readonly(x),
    }
  },
})
