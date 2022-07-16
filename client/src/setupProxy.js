const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
  // app.use(
  //     createProxyMiddleware('/post', {
  //         target: 'http://localhost:3001/',
  //         changeOrigin: true
  //     })
  // ),
  // app.use(
  //   createProxyMiddleware('/auth', {
  //       target: 'http://localhost:3001/',
  //       changeOrigin: true
  //   })
  // ),
  // app.use(
  //   createProxyMiddleware('/comment', {
  //       target: 'http://localhost:3001/',
  //       changeOrigin: true
  //   })
  // )
};