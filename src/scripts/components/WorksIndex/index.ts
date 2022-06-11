import { withSvelte, defineComponent, q } from 'lake'
import WorksLoadmore from './WorksLoadmore.svelte'

export default defineComponent({
  components: {
    '.js-works': withSvelte(WorksLoadmore),
  },

  props: {
    repository: {},
  },

  setup(el, props) {
    const { total } = q('.js-works', el)[0].dataset

    return {
      total: Number(total),
      repository: props.repository,
    }
  },
})
