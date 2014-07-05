es = require 'event-stream'
path = require 'path'

module.exports = ->

    gulp.task 'get-templates', ->
        build.templates = {}

        return gulp.src paths.source.templates()
            .pipe es.map (file, cb) ->
                name = path.basename(file.path).split('.')[0]
                build.templates[name] = file

                cb null, file


    gulp.task 'styles', ->
        return gulp.src paths.source.stylesEntryFile()
            .pipe $.less()
            .pipe gulp.dest paths.output.stylesRoot()