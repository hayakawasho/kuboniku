import { defineComponent, ref } from 'lake'
import type { Ref } from 'lake'

export default defineComponent({
  setup() {
    const x = ref(0)

    return {
      x,
    }
  },

  components: {
    '[data-skew]': defineComponent<{
      x: Ref<number>
    }>({
      setup(_, props) {
        const { x } = props
        console.log(x.value)
      },
    }),
  },
})
