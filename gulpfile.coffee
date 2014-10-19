global.gulp = require 'gulp'
global.$ = require('gulp-load-plugins')()
path = require 'path'
es = require 'event-stream'
args = require('yargs').argv

global.site = {}
helpers = require './build/helpers'

global.build =
    templates: {}
    isDevMode: args.mode is 'dev'

global.paths =
    source:
        root: ->
            './'
        stylesRoot: ->
            paths.source.root() + 'styles/'
        contentsRoot: ->
            paths.source.root() + 'content/'
        contentsFiles: ->
            paths.source.contentsRoot() + '**/*.md'
        stylesRoot: ->
            paths.source.root() + 'styles/source/'
        stylesEntryFile: ->
            paths.source.stylesRoot() + 'index.less'
        templateRoot: ->
            paths.source.root() + 'templates/'
        templates: ->
            paths.source.templateRoot() + '**/*.swig.html'
        sitemaps: ->
            paths.output.root() + 'sitemap.xml'
    output:
        baseUrl: ->
            'http://www.adamlynch.com'
        root: ->            if build.isDevMode then paths.output.devRoot() else paths.output.prodRoot()
        devRoot: ->
            './dev-mode-output/'
        prodRoot: ->
            './'
        stylesRoot: ->
            paths.output.root() + 'styles/'
        styles: ->
            paths.output.stylesRoot() + '/*.css'

require('./build/subTasks.coffee')()

gulp.task 'default', ['generate']

gulp.task 'generate', ['styles'], (done) ->
    gulp.src paths.source.contentsFiles()
        .pipe $.frontMatter
            property: 'meta'
        .pipe $.markdown()
        .pipe $.ssg site,
            property: 'meta'
            baseUrl: 'http://www.adamlynch.com'
        .pipe es.map helpers.templates.render
        .pipe $.htmlmin
            collapseWhitespace: true
        .pipe $.w3cjs()
        .pipe es.map (file, cb) ->
            throw new Error '[Generate] HTML validation error(s) found' unless file.w3cjs.success
            cb null, file
        .pipe gulp.dest paths.output.root()
        .pipe $.sitemap
            siteUrl: paths.output.baseUrl()
        .pipe gulp.dest paths.output.root()
            .on 'end', done
    return