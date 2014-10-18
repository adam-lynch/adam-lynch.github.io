es = require 'event-stream'
path = require 'path'

module.exports = ->
    cleanDependencies = if build.isDevMode then ['clean-dev'] else ['clean-prod']

    gulp.task 'clean', cleanDependencies

    gulp.task 'clean-dev', ->
        gulp.src paths.output.root()
            .pipe $.clean()

    gulp.task 'clean-prod', ['clean-styles'], ->
        gulp.src paths.source.sitemaps()
            .pipe $.sitemapFiles paths.output.baseUrl()
            .pipe $.clean()

    gulp.task 'clean-styles', ->
        gulp.src paths.output.styles()
            .pipe $.clean()