module.exports = {
  devServer: {
    proxy: {
      '/api': {
        // target: 'http://r2boom.com',
        target: 'http://localhost:3100',
        secure: false
      }
    }
  }
}
