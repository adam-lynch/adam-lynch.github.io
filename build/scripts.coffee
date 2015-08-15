module.exports = ->
    gulp.task 'scripts', (done) ->
        sourceURL = "https:#{site.repositoryURL}tree/master/scripts/source"

        gulp.src paths.source.scripts()
            .pipe $.if build.isDevMode, $.sourcemaps.init()
            .pipe $.coffee()
            .pipe $.if !build.isDevMode, $.uglify
                mangle: true
            .pipe $.if !build.isDevMode, $.insert.prepend "/* See real source code at #{sourceURL} */"
            .pipe $.if build.isDevMode, $.sourcemaps.write paths.output.scriptsRoot()
            .pipe gulp.dest paths.output.scriptsRoot()
            .on 'end', done
        return