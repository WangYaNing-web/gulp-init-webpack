/**
 * Module dependencies.
 */
var proxy = require('http-proxy-middleware') // require('http-proxy-middleware');

/**
 * Configure proxy middleware
 */
var jsonPlaceholderProxy  = proxy('/api', {
    target: 'http://test.weifenghr.com',
    changeOrigin: true, // for vhosted sites, changes host header to match to target's host
    pathRewrite: {
        '^/api': ''
    },
    logLevel: 'debug'
})

module.exports =  jsonPlaceholderProxy  