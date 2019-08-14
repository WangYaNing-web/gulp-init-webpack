const path   = require('path')
const server = require('./server')

function resolveDev(dir) {
    return path.join(__dirname, '../../src/', dir)
}

function resolveBuild(dir) {
    return path.join(__dirname, '../../dist/', dir)
}

module.exports = {
    dev: {
        html: [resolveDev("/**/*.html"), resolveDev("/pages/**/*.html"), "!../src/layout/**/*.html"],
        AllHtml:[resolveDev("/**/*.html"), resolveDev("/pages/**/*.html"), resolveDev("/layout/**/*.html"), resolveDev("/layout/*.html")],
        style:resolveDev("/style/**/*.less"),
        js:resolveDev("/js/**/*.js"),
        vendor:resolveDev("/vendor/**/*"),
        assets:resolveDev("/assets/**/*")
    },

    build: {
        html: resolveBuild(''),
        style: resolveBuild('static/style'),
        js: resolveBuild('static/js'),
        vendor: resolveBuild('static/vendor'),
        assets: resolveBuild('static/assets'),
    },

    server,

}