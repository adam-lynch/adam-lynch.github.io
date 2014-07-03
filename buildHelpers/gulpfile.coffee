global.gulp =  require 'gulp'
global.$ =     require('gulp-load-plugins')()
swig =  require 'swig'
path =  require 'path'
es =    require 'event-stream'
args =  require('yargs').argv

site = {}
templates = {}

global.build =
    templates: null
    isDevMode: args.mode is 'dev'

global.paths =
    source:
        root: ->            './'
        stylesRoot: ->      paths.source.root() + 'styles/'
        contentsRoot: ->    paths.source.root() + 'content/'
        contentsFiles: ->   paths.source.contentsRoot() + '**/*.md'
        stylesRoot: ->      paths.source.root() + 'styles/source/'
        stylesEntryFile: -> paths.source.stylesRoot() + 'index.less'
        templateRoot: ->    paths.source.root() + 'templates/'
        templates: ->       paths.source.templateRoot() + '**/*'
        sitemaps: ->        paths.output.root() + 'sitemap.xml'
    output:
        baseUrl: ->         'http://www.adamlynch.com'
        root: ->            if build.isDevMode then paths.output.devRoot() else paths.output.prodRoot()
        devRoot: ->         './dev-mode-output/'
        prodRoot: ->        './'
        stylesRoot: ->      paths.output.root() + 'styles/'
        styles: ->          paths.output.stylesRoot() + '/*.css'


module.exports = gulp

require('./clean.coffee')()
require('./subTasks.coffee')()

gulp.task 'default', ['generate']

gulp.task 'generate', ['get-templates', 'styles'], ->

    throw new Error '[Generate] No templates found. Something is not right.' unless Object.keys(build.templates).length

    return gulp.src paths.source.contentsFiles()
        .pipe $.markdown()
        .pipe $.ssg site
        .pipe es.map (file, cb) ->
            output = swig.render build.templates['index'],
                locals:
                    site: site
                    content: String file.contents

            file.contents = new Buffer output
            cb null, file
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