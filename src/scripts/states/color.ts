import { atom } from 'nanostores'

const colorCodeState = atom('#1793a9')

export const colorCodeMutators = (update: string) => colorCodeState.set(update)
export const colorCodeAccessors = () => colorCodeState.get()

export const colorCodeWatch = (callback: (colorCode: string) => void) => {
  colorCodeState.listen(value => {
    callback(value)
  })
}
