import WorksLoadmore from './WorksLoadmore/index.svelte'
import { withSvelte, defineComponent } from '@/foundation'

export default defineComponent({
  components: {
    WorksLoadmore: withSvelte(WorksLoadmore),
  },

  setup(_, _props) {
    //
  },

  cleanup() {
    //
  },
})
