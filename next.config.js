const path = require('path')
const Fiber = require('fibers')

const nextConfig = {
  experimental: {
    documentMiddleware: true,
    optimizeFonts: true,
  },

  env: {
    BASIC_AUTH_CREDENTIALS: process.env.BASIC_AUTH_CREDENTIALS,
  },

	sassOptions: {
		fiber: Fiber
  },

  webpack: (config, options) => {
    config.resolve.alias['~'] = path.join(__dirname, 'src')
    config.resolve.alias['~css'] = path.join(__dirname, 'src/assets/styles')

    // config.externals.three = 'THREE'

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
