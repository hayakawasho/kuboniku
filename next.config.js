const path = require('path')
const WindiCSSWebpackPlugin = require('windicss-webpack-plugin')

const nextConfig = {
  experimental: {
    esmExternals: true,
    documentMiddleware: true,
    optimizeFonts: true,
  },

  images: {
    domains: ['wp.kuboniku.com'],
    deviceSizes: [750, 1080, 1200, 1920, 2048],
  },

  env: {
    BASIC_AUTH_CREDENTIALS: process.env.BASIC_AUTH_CREDENTIALS,
  },

  webpack: (config, options) => {
    // config.externals.three = 'THREE'

    config.resolve.alias['@'] = path.join(__dirname, 'src');
    config.resolve.alias['~css'] = path.join(__dirname, 'src/assets/styles');

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

    config.plugins.push(new WindiCSSWebpackPlugin())

    return config
  },
}

module.exports = nextConfig;
