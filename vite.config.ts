import { resolve } from 'path'
import { defineConfig } from 'vite'
import WindiCSS from 'vite-plugin-windicss'
import glsl from 'vite-plugin-glsl'
import glslifyCompiler from 'vite-plugin-glslify'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import preprocess from 'svelte-preprocess'
import viteCompression from 'vite-plugin-compression'

const isDev = process.env.NODE_ENV !== 'production'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src/scripts'),
    },
  },
  server: {
    host: '0.0.0.0',
  },
  plugins: [
    WindiCSS({
      scan: {
        dirs: ['./src'],
        fileExtensions: ['njk'],
      },
    }),
    glsl(),
    glslifyCompiler(),
    svelte({
      emitCss: false,
      preprocess: preprocess(),
    }),
    viteCompression(),
  ],
  build: {
    outDir: '_site',
    sourcemap: isDev,
    manifest: true,
    rollupOptions: {
      input: './src/entry.ts',
    },
  },
  css: {
    postcss: {
      plugins: [
        require('postcss-import'),
        require('postcss-nesting'),
        require('autoprefixer')({
          grid: 'autoplace',
          flexbox: 'no-2009',
        }),
        require('postcss-custom-properties'),
        require('postcss-custom-media'),
        require('postcss-easings')({
          easings: {
            'ease-trans': 'cubic-bezier(.43, .05, .17 ,1)',
            'ease-opa': 'cubic-bezier(.26, .06, 0, 1)',
          },
        }),
        require('postcss-flexbugs-fixes'),
      ],
    },
  },
})
