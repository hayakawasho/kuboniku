import { ref } from 'lake'
import { atom } from 'nanostores'

const colorCode = atom('#1793a9')

export const colorCodeGetters = () => colorCode.get()
export const colorCodeMutators = (update: string) => colorCode.set(update)

export const colorCodeRef = ref(colorCode)

export const colorCodeWatch = (callback: (code: string) => void) => {
  colorCode.subscribe(value => {
    callback(value)
  })
}
