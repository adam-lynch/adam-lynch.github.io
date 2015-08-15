module.exports = ->
    gulp.task 'styles', ->
        sourceURL = "https:#{site.repositoryURL}/tree/master/styles/source"

        gulp.src paths.source.stylesEntryFile()
            .pipe $.if build.isDevMode, $.sourcemaps.init()
            .pipe $.less()
            .pipe $.autoprefixer
                browsers: 'last 2 versions'
            .pipe $.if !build.isDevMode, $.minifyCss()
            .pipe $.if !build.isDevMode, $.insert.prepend "/* See real source code at #{sourceURL} */"
            .pipe $.if build.isDevMode, $.sourcemaps.write paths.output.stylesRoot()
            .pipe gulp.dest paths.output.stylesRoot()