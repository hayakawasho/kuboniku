import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import critters from "astro-critters";
import prefetch from "@astrojs/prefetch";
import cloudflare from "@astrojs/cloudflare";
// import nodejs from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind(), critters(), prefetch()],
  devToolbar: {
    enabled: false,
  },
  outDir: "./out/",
  compressHTML: true,
  build: {
    // inlineStylesheets: "never",
  },
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
  prefetch: true,
  vite: {
    build: {
      // cssCodeSplit: false,
    },
    plugins: [],
  },
  output: "hybrid",
  adapter: cloudflare(),
  // adapter: nodejs({
  //   mode: "standalone",
  // }),
});
