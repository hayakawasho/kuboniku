const path = require('path')
const Fiber = require('fibers')

const nextConfig = {
  images: {
    domains: ['dev-kuboniku.gq'],
  },

	sassOptions: {
		fiber: Fiber,
    includePaths: [path.join(__dirname, 'src/assets/css/base/_custom-media.scss')],
  },

  webpack: (config, options) => {

    config.resolve.alias['~'] = path.join(__dirname, 'src'),

    config.module.rules.push({
      test: /\.(glsl|frag|vert)$/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: 'raw-loader'
        },
        {
          loader: 'glslify-loader'
        },
      ],
      exclude: /node_modules/,
    })

    return config
  },
}

module.exports = nextConfig;
