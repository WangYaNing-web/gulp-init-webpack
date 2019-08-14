const config = require('./config/'),
    fs = require('fs');

$ = require('gulp-load-plugins')()

const path = require('path')
const gulp = require('gulp')
const pngquant = require('imagemin-pngquant')

// server
const browserSync = require('browser-sync').create()
const reload = browserSync.reload

// webpack
const webpack = require('webpack')
const webpackStream = require('webpack-stream')
const webpackConfig = require('./webpack.config.js')

const cssnano = require('cssnano')
const autoprefixer = require('autoprefixer')

const env = process.env.NODE_ENV === 'production'

const pump   = require('pump');

const colors = require('colors');

colors.setTheme({
    silly: 'rainbow',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'grey',
    info: 'green',
    data: 'grey',
    cyan: 'cyan',
    warn: 'yellow',
    debug: 'blue',
    error: 'red'
});



gulp.task("html", () => {

    return gulp
        .src( config.dev.html )
        .pipe($.changed( config.build.html ))
        .pipe($.plumber())
        .pipe(
            $.nunjucksRender({
                path: ["../src/layout"],
                data:{
                    path:process.env.NODE_ENV == 'development' ?  '.' : ''
                }
            })
        )
        .pipe(gulp.dest( config.build.html ))
})

gulp.task("style", () => {

    var plugins = [
        autoprefixer({
            overrideBrowserslist: [
                "Android 4.1",
                "iOS 7.1",
                "Chrome > 31",
                "ff > 31",
                "ie >= 8"
            ],
            grid: true   
        }),
        cssnano()
    ];

    return gulp
        .src( config.dev.style )
        .pipe($.changed( config.build.style ))
        .pipe($.plumber())
        .pipe($.less())
        .pipe($.postcss(plugins))
        .pipe($.if(env, $.csso()))
        .pipe(gulp.dest( config.build.style ))
})  

gulp.task("js", () => {
    return gulp
        .src( config.dev.js )
        .pipe($.changed( config.build.js ))
        .pipe($.plumber())
        .pipe(webpackStream(webpackConfig))
        .pipe(gulp.dest( config.build.js ))
});

gulp.task("vendor", () => {
    return gulp
        .src( config.dev.vendor )
        .pipe($.changed( config.build.vendor ))
        .pipe(gulp.dest( config.build.vendor ));
});

gulp.task("assets", () => {
    return gulp
        .src( config.dev.assets )
        .pipe($.changed( config.build.assets ))
        .pipe($.if(env,$.cache($.imagemin({
            progressive: true,
            use: [pngquant()]
        }))))
        .pipe(gulp.dest( config.build.assets ));
});


``
gulp.task('watch', () => {

    $.watch(config.dev.AllHtml, () => {
        gulp.start(['html'])
    }).on('change', reload)

    $.watch(config.dev.style, () => {
        gulp.start(['style'])
    }).on('change', reload)

    $.watch(config.dev.js, () => {
        gulp.start(['js'])
    }).on('change', reload)

    $.watch(config.dev.vendor, () => {
        gulp.start(['vendor'])
    }).on('change', reload)

    $.watch(config.dev.assets, () => {
        gulp.start(['assets'])
    }).on('change', reload)
    
})


gulp.task('server', ( cb ) => {
    const task = ['html', 'style', 'js', 'vendor', 'assets' ]
    cbTask(task, cb).then(() => {

        browserSync.init(config.server)
        
            console.log(colors.info(`
            -----------------------------
            Open browser port 8080
            -----------------------------`))

        gulp.start('watch')

    })
})

gulp.task('build', () => {
    const task = ['html', 'style', 'js', 'vendor', 'assets' ]
    cbTask(task).then(() => {
        
            console.log(colors.info(`
            -----------------------------
            have already accomplished
            -----------------------------`))
        
    })
})



function cbTask(task, cb) {

    return  new Promise((resolve, reject) => {
        
        console.log(colors.info(`
        -----------------------------
        The dist directory has been deleted
        -----------------------------`))

        $.sequence(task, () => {

        console.log(colors.info(`
        -----------------------------
        We're done packing
        -----------------------------`))
        resolve('completed')

        })

    })   
    
}

function respath(dir) {
    return path.join(__dirname, dir)
}
