import { createMachine, interpret } from '@xstate/fsm'
import { loadingManager } from './loading-manager'
import { manifest } from './manifest'
import { g } from '@/env'

const bootMachine = createMachine({
  id: 'boot',
  initial: 'idle',
  states: {
    idle: {
      on: {
        NEXT: {
          target: 'loading',
          actions: () => {
            const { bootup } = g
            loadingManager.loadStart(bootup as number, manifest)
          },
        },
      },
    },

    loading: {
      on: {
        NEXT: {
          target: 'loaded',
          actions: () => {
            //
          },
        },

        TIMEOUT: {
          target: 'loaded',
          actions: () => {
            //
          },
        },
      },
    },

    loaded: {
      on: {
        NEXT: {
          target: 'done',
          actions: () => {
            document.body.classList.replace('is-domLoading', 'is-domLoaded')
          },
        },
      },
    },

    done: {
      exit: 'final',
    },
  },
})

const bootService = interpret(bootMachine)
bootService.start()

export { bootService }
