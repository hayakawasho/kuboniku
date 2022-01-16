import { createMachine, interpret } from '@xstate/fsm'

const bootMachine = createMachine({
  id: 'boot',
  initial: 'idle',
  states: {
    idle: {
      on: {
        NEXT: 'loading',
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
            //
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
