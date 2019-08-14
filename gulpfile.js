const gulp = require('gulp')
const pump = require('pump')
$ = require('gulp-load-plugins')()

gulp.task("default", ( cb ) => {

    pump([
        gulp.src('./dist'),
        $.clean(),
    ],cb)

})