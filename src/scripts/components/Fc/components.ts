import Sns from '../Sns/index.svelte'
import Test from '../Test/Test.svelte'
import { WithSvelte } from './WithSvelte'

export const components: any = {
  Sns: WithSvelte.connect(Sns),
  Test: WithSvelte.connect(Test),
}
