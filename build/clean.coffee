del = require 'del'
es = require 'event-stream'

module.exports = ->
    cleanDependencies = if build.isDevMode then ['clean-dev'] else ['clean-prod']

    gulp.task 'clean', cleanDependencies

    gulp.task 'clean-dev', (done) ->
        del paths.output.root(), (err) ->
            done()

    gulp.task 'clean-prod', ['clean-styles'], ->
        gulp.src paths.source.sitemaps()
            .pipe $.sitemapFiles paths.output.baseUrl()
            .pipe es.map (file) ->
                del file.path

    gulp.task 'clean-styles', (done) ->
        del paths.output.styles(), (err) ->
            done()