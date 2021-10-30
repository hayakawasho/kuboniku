module.exports = {
  plugins: [
    "postcss-import",
    [
      "autoprefixer",
      {
        grid: "autoplace",
        flexbox: "no-2009",
      },
    ],
    "postcss-custom-properties",
    [
      "postcss-easings",
      {
        easings: {
          easeOpa: "cubic-bezier(.26, .06, 0, 1)",
          easeFade: "cubic-bezier(.18, .06, .23, 1)",
          easeTrans: "cubic-bezier(.43, .05, .17 ,1)",
          easeSmooth: "cubic-bezier(0.555, 0.205, 0.295, 0.975)",
          easeSnappy: "cubic-bezier(.580, .300, .005, 1.000)",
        },
      },
    ],
    "postcss-flexbugs-fixes",
  ]
}
