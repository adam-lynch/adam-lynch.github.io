es = require 'event-stream'
path = require 'path'

module.exports = ->
    gulp.task 'styles', ->
        return gulp.src paths.source.stylesEntryFile()
        .pipe $.less()
            .pipe gulp.dest paths.output.stylesRoot()