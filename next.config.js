const path = require('path')
const Fiber = require('fibers')

const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
  },

	sassOptions: {
		fiber: Fiber
  },

  webpack: (config, options) => {

    config.resolve.alias['~'] = path.join(__dirname, 'src'),
    config.resolve.alias['~css'] = path.join(__dirname, 'src/assets/css'),

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
