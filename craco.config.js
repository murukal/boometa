module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://www.r2boom.com',
        secure: false,
        changeOrigin: true
      }
    }
  }
}
