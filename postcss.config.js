module.exports = {
  plugins: {
    // 'tailwindcss': {},
    'postcss-preset-env': {
      autoprefixer: {
        grid: 'autoplace'
      },
      features: {
        'color-mod-function': true,
        'nesting-rules': true,
        'custom-media-queries': true,
      },
      stage: 2,
    },
    'postcss-easings': {
      easings: {}
    }
  },
}
