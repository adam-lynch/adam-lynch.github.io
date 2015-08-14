module.exports = ->
    gulp.task 'styles', ->
        gulp.src paths.source.stylesEntryFile()
            .pipe $.if build.isDevMode, $.sourcemaps.init()
            .pipe $.less()
            .pipe $.autoprefixer
                browsers: 'last 2 versions'
            .pipe $.if !build.isDevMode, $.minifyCss()
            .pipe $.if build.isDevMode, $.sourcemaps.write paths.output.stylesRoot()
            .pipe gulp.dest paths.output.stylesRoot()