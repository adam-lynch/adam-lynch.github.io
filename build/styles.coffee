module.exports = ->
    gulp.task 'styles', ->
        gulp.src paths.source.stylesEntryFile()
            .pipe $.less()
            .pipe $.autoprefixer
                browsers: 'last 2 versions'
            .pipe gulp.dest paths.output.stylesRoot()