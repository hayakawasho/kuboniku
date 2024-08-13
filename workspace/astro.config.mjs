import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  prefetch: true,
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    // (await import("astro-critters")).default(),
  ],
  devToolbar: {
    enabled: false,
  },
  outDir: "./dist/",
  compressHTML: true,
  build: {
    inlineStylesheets: "never",
  },
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
  prefetch: true,
  vite: {
    build: {
      cssCodeSplit: false,
    },
    plugins: [],
  },
  image: {
    service: {},
  },
  output: "hybrid",
  adapter: cloudflare(),
});
