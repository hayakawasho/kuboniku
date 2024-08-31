/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  extract: {
    include: ["index.html", "./src/**/*.{tsx,svelte}"],
    exclude: ["node_modules/**/*", ".git/**/*"],
  },
  theme: {
    screens: {
      sp: { max: "639px" },
      pc: "640px",
    },
    extend: {
      fontFamily: {
        montserrat: ["Montserrat"],
        roboto: ["Roboto Condensed"],
        en: ["Playfair Display"],
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
};
