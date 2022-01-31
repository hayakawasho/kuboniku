// import { createMachine, interpret } from '@xstate/fsm'
import { createMachine, interpret } from 'xstate'
import { loadingManager } from './loadingManager'
import { manifest } from './manifest'
import { g } from '@/env'

const bootMachine = createMachine(
  {
    id: 'boot',
    initial: 'idle',
    states: {
      idle: {
        on: {
          ADD_TO_QUEUE: {
            target: 'loading',
            actions: () => {
              const { bootup } = g
              loadingManager.loadStart(bootup as number, manifest)
            },
          },
        },
      },

      loading: {
        after: {
          TIMEOUT: 'rejected',
        },

        on: {
          ADD_TO_QUEUE: {
            target: 'done',
            actions: () => {
              document.body.classList.replace('is-domLoading', 'is-domLoaded')
            },
          },

          TIMEOUT: {
            target: 'done',
            actions: () => {
              document.body.classList.replace('is-domLoading', 'is-domLoaded')
            },
          },
        },
      },

      rejected: {},

      done: {
        exit: 'final',
      },
    },
  },
  {
    guards: {},

    delays: {
      TIMEOUT: 4000,
    },
  }
)

const bootService = interpret(bootMachine)
bootService.start()

export { bootService }
