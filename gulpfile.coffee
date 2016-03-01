global.gulp = require 'gulp'
global.$ = require('gulp-load-plugins')()
path = require 'path'
es = require 'event-stream'
args = require('yargs').argv
critical = require('critical').stream

site =
    posts: []
    title: 'Adam Lynch'
    url: 'https://www.adamlynch.com'
    nameToShow: 'Adam Lynch'
    githubAccountURL: '//github.com/adam-lynch'
    repositoryName: 'adam-lynch.github.io'

site.repositoryURL = "#{site.githubAccountURL}/#{site.repositoryName}"
site.mainTemplateURL = "#{site.repositoryURL}/blob/master/templates/page.nunjucks.html"
global.site = site

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
            paths.source.templateRoot() + '**/*.nunjucks.html'
        sitemaps: ->
            paths.output.root() + 'sitemap.xml'
        imagesRoot: -> paths.source.root() + 'images/source/'
        images: -> paths.source.imagesRoot() + '**/*'
        scriptsRoot: -> paths.source.root() + 'scripts/source/'
        scripts: -> paths.source.scriptsRoot() + '*.coffee'
    output:
        baseUrl: ->
            'http://www.adamlynch.com'
        root: ->  if build.isDevMode then paths.output.devRoot() else paths.output.prodRoot()
        devRoot: ->
            './dev-mode-output/'
        prodRoot: ->
            './'
        stylesRoot: ->
            paths.output.root() + 'styles/'
        styles: ->
            paths.output.stylesRoot() + '/*.css'
        imagesRoot: -> paths.output.root() + 'images/'
        scriptsRoot: -> paths.output.root() + 'scripts/'
        writingRoot: -> paths.output.root() + 'writing/'

require('./build/subTasks.coffee')()

gulp.task 'default', ['generate']

gulp.task 'generate', ['rss', 'scrape', 'scripts', 'styles', 'images'], (done) ->
    filesBeforeSitemapGeneration = $.filter '**'

    stream = gulp.src paths.source.contentsFiles()
        .pipe $.frontMatter
            property: 'meta'
        .pipe $.markdown()
        .pipe $.ssg site,
            property: 'meta'
            baseUrl: 'http://www.adamlynch.com'
        .pipe es.map helpers.templates.render
        .pipe $.if !build.isDevMode, $.htmlmin
            collapseWhitespace: true
        .pipe $.if !build.isDevMode, $.insert.prepend "<!-- See real source code at #{site.repositoryURL} -->"
        .pipe $.w3cjs()
        .pipe es.map (file, cb) ->
            throw new Error '[Generate] HTML validation error(s) found' unless file.w3cjs.success
            cb null, file

        .pipe $.save 'before-sitemap-generation'
        # filter out the drafts
        .pipe $.filter (file) -> !file.meta.draft

        # Generate XML sitemap
        .pipe $.sitemap
            siteUrl: paths.output.baseUrl()
        .pipe gulp.dest paths.output.root()

        # Go back to dealing with the HTML files
        .pipe $.save.restore 'before-sitemap-generation'

    # Inlining of critical CSS temporarily disabled
    if build.isDevMode or true
        stream.pipe gulp.dest paths.output.root()
            .on 'end', done
    else
        preInlinedStylesSuffix = '--with-styles'
        indexFilter = $.filter 'index.html'

        # Rename index HTML file before inlining styles with critical
        stream.pipe indexFilter
            .pipe $.rename
                suffix: preInlinedStylesSuffix
            .pipe indexFilter.restore()

            # Save all HTML files (with index file renamed)
            .pipe gulp.dest paths.output.root()

            # If it isn't a dev build, let's take only the index HTML file and run it through critical
            .pipe $.filter "index#{preInlinedStylesSuffix}.html"

            # Inline above the fold styles
            .pipe critical
                base: paths.output.root()
                inline: true
                minify: true
                extract: true

            # Save the new HTML file
            .pipe $.filter "index#{preInlinedStylesSuffix}.html"
            .pipe $.rename 'index.html'
            .pipe gulp.dest paths.output.root()
            .on 'end', done
    return

gulp.task 'images', (done) ->
    gulp.src paths.source.images()
        .pipe gulp.dest paths.output.imagesRoot()
        .on 'end', done
    return