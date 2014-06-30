gulp =  require 'gulp'
$ =     require('gulp-load-plugins')()
swig =  require 'swig'
path =  require 'path'
es =    require 'event-stream'
args =  require('yargs').argv

site = {}
templates = {}
isDevMode = args.mode is 'dev'

paths =
    output: {}
paths.output.devRoot = './dev-mode-output/'
paths.output.prodRoot = './'
paths.output.root = if isDevMode then paths.output.devRoot else paths.output.prodRoot

module.exports = gulp

gulp.task 'default', ['generate']

gulp.task 'clean', ->
   return gulp.src paths.output.root + 'sitemap.xml'
        .pipe $.sitemapFiles 'http://www.adamlynch.com'
        .pipe $.clean()

gulp.task 'generate', ['get-templates'], ->

    return gulp.src './content/**/*.md'
        .pipe $.markdown()
        .pipe $.ssg site
        .pipe es.map (file, cb) ->
            output = swig.render templates['index'],
                locals:
                    site: site
                    content: String file.contents

            file.contents = new Buffer output
            cb null, file
        .pipe $.htmlmin
            collapseWhitespace: true
        .pipe $.w3cjs()
        .pipe es.map (file, cb) ->
            throw new Error 'HTML validation error(s) found' unless file.w3cjs.success
            cb null, file
        .pipe gulp.dest paths.output.root
        .pipe $.sitemap
            siteUrl: 'http://www.adamlynch.com'
        .pipe gulp.dest paths.output.root

gulp.task 'get-templates', ->
    templates = {}

    return gulp.src './templates/**/*'
        .pipe es.map (file, cb) ->
            name = path.basename(file.path).split('.')[0]
            templates[name] = String file.contents

            cb null, file