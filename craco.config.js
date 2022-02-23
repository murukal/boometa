const CracoLessPlugin = require('craco-less')

module.exports = {
  devServer: {
    proxy: {
      '/api': {
        // target: 'http://admin.r2boom.com',
        target: 'http://localhost:3200',
        secure: false,
        changeOrigin: true
      }
    }
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@font-family': '"Noto Sans JP", sans-serif' },
            javascriptEnabled: true
          }
        }
      }
    }
  ]
}
