const path = require('path')

const nextConfig = {
  experimental: {
    documentMiddleware: true,
    optimizeFonts: true,
  },

  images: {
    domains: ['wp.kuboniku.com'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
  },

  env: {
    BASIC_AUTH_CREDENTIALS: process.env.BASIC_AUTH_CREDENTIALS,
  },

  webpack: (config, options) => {
    config.resolve.alias['~'] = path.join(__dirname, 'src');
    config.resolve.alias['@'] = path.join(__dirname, 'src');
    config.resolve.alias['~css'] = path.join(__dirname, 'src/assets/styles');
    config.resolve.alias['~ui'] = path.join(__dirname, 'src/foundation/components/ui');
    config.resolve.alias['~utils'] = path.join(__dirname, 'src/foundation/utils');

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
