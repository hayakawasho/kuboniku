import { atom } from 'nanostores'

const colorCodeState = atom('#1793a9')

export const colorCodeMutators = (update: string) => colorCodeState.set(update)
