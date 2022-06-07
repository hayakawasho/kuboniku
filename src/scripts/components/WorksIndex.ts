import { withSvelte, defineComponent } from 'lake'
import WorksLoadmore from './WorksLoadmore.svelte'

export default defineComponent({
  props: {},

  components: {
    '.js-works': withSvelte(WorksLoadmore),
  },

  setup() {
    return {
      //
    }
  },
})
