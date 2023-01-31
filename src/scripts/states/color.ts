import { atom } from 'nanostores'

const colorCode = atom('#1793a9')

export const colorCodeGetters = () => colorCode.get()
export const colorCodeMutators = (update: string) => colorCode.set(update)
export const colorCodeWatch = (callback: (code: string) => void) => {
  colorCode.subscribe(value => {
    callback(value)
  })
}
