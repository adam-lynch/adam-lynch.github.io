module.exports = ->
    gulp.task 'styles', ->
        gulp.src paths.source.stylesEntryFile()
            .pipe $.less()
            .pipe gulp.dest paths.output.stylesRoot()