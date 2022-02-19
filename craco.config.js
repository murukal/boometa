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
  }
}
