import { defineConfig } from 'windicss/helpers'
import plugin from 'windicss/plugin'

export default defineConfig({
  extract: {
    include: ['index.html', './src/**/*.{tsx,svelte}'],
    exclude: ['node_modules/**/*', '.git/**/*'],
  },
  theme: {
    screens: {
      sp: { max: '639px' },
      pc: '640px',
    },
    extend: {
      fontFamily: {
        montserrat: ['Montserrat'],
        roboto: ['Roboto Condensed'],
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        '.fit2parent': {
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
        },
      })
    }),
  ],
})
