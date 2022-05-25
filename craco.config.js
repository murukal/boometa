const CracoLessPlugin = require('craco-less')
const path = require('path')

// const server_location = 'http://localhost:9000'
const server_location = 'https://admin.fantufantu.com'

module.exports = {
  devServer: {
    proxy: {
      '/graphql': {
        target: server_location,
        secure: false,
        changeOrigin: true
      },
      '/api': {
        target: server_location,
        secure: false,
        changeOrigin: true
      }
    },
    port: 8000
  },

  webpack: {
    alias: {
      '~': path.resolve(__dirname, 'src')
    }
  },

  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              'font-family': '"Noto Sans Mono"'
            },
            javascriptEnabled: true
          }
        }
      }
    }
  ]
}
