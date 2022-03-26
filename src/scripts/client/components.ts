import Test from '../components//Test.svelte'
import Sns from '../components/Sns/index.svelte'
import { WithSvelte } from './WithSvelte'

export const components: any = {
  Sns: WithSvelte.connect(Sns),
  Test: WithSvelte.connect(Test),
}
