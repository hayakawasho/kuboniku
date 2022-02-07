// @ts-check - enable TS check for js file
import { defineConfig } from 'windicss/helpers';

export default defineConfig({
  preflight: false,
  theme: {
    extend: {
      fontFamily: {
        en: ['Montserrat'],
        roboto: ['Roboto Condensed'],
      },
    },
  },
});
