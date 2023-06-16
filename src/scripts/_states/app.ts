import { map } from 'nanostores'

export const app = map<any>({
  current: '',
})

export const appMutators = (update: any) => viewport.set(update)
