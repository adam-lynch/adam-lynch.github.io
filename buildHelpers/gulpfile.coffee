global.gulp = require 'gulp'
global.$ = require('gulp-load-plugins')()
path = require 'path'
es = require 'event-stream'
args = require('yargs').argv
marked = require 'marked'
nunjucks = require 'nunjucks'
templates = new nunjucks.Environment new nunjucks.FileSystemLoader('templates'),
    watch: false
templates.addFilter 'markdown', (input) ->
    marked input

site = {}

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

module.exports = gulp

require('./clean.coffee')()
require('./subTasks.coffee')()

getTemplate = (templateName, cb) ->
    basename = templateName += '.swig.html'
    template = build.templates[templateName]

    if template?
        cb null, template
    else
        templates.getTemplate basename, true, (err, template) ->
            build.templates[templateName] = template unless err
            cb.apply this, arguments

gulp.task 'default', ['generate']

gulp.task 'generate', ['styles'], (done) ->
    gulp.src paths.source.contentsFiles()
    .pipe $.markdown()
        .pipe $.ssg site
            .pipe es.map (file, cb) ->
                    getTemplate 'page', (err, template) ->
                        throw err if err

                        templateArgs =
                            site: site
                            content: String file.contents

                        onRender = (err, output) ->
                            if err?
                                cb err
                                return

                            file.contents = new Buffer output
                            cb null, file

                        template.render templateArgs, onRender

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