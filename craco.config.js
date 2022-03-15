const CracoLessPlugin = require('craco-less')

module.exports = {
  devServer: {
    proxy: {
      '/graphql': {
        // target: 'http://admin.r2boom.com',
        target: 'http://localhost:9000',
        secure: false,
        changeOrigin: true
      },
      '/api': {
        // target: 'http://admin.r2boom.com',
        target: 'http://localhost:9000',
        secure: false,
        changeOrigin: true
      }
    },
    port: 8000
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
