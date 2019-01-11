const path = require('path');

module.exports = {
  chainWebpack: config => {
    // for custom async loading control
    config.plugins.delete('prefetch')
    config.plugins.delete('preload')
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, 'src/styles/_*.less'),
      ]
    }
  }
}
