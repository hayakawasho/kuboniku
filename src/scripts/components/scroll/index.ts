import { defineComponent, ref as _, readonly as __, onUnmounted, onMounted } from 'lake'
import { Smooth } from './smooth'

export default defineComponent({
  components: {},

  setup(el) {
    const smooth = new Smooth()

    onMounted(() => {
      smooth.init(el as HTMLElement)
    })

    onUnmounted(() => {
      smooth.destroy()
    })

    return {
      currentPos: smooth.currentPos,
      targetPos: smooth.targetPos,
    }
  },
})
