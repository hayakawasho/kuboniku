import { resolve } from 'path'
import { defineConfig } from 'vite'
import type { Plugin } from 'vite'
import glsl from 'vite-plugin-glsl'
import glslify from 'rollup-plugin-glslify'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import preprocess from 'svelte-preprocess'
import viteCompression from 'vite-plugin-compression'
import WindiCSS from 'vite-plugin-windicss'

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
    port: 3000,
    strictPort: true,
  },
  plugins: [
    glsl(),
    glslify() as Plugin,
    svelte({
      emitCss: false,
      preprocess: preprocess(),
    }),
    viteCompression(),
    WindiCSS(),
  ],
  build: {
    outDir: '_site',
    sourcemap: isDev,
    manifest: true,
    rollupOptions: {
      input: './src/entry.ts',
      output: {
        assetFileNames: `assets/[name].[ext]`,
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
      },
    },
  },
})
