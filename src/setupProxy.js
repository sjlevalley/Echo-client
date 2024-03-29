const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://us-central1-echo-726ac.cloudfunctions.net',
      changeOrigin: true
    })
  )
}
