marked = require 'marked'
nunjucks = require 'nunjucks'
templatesEnv = new nunjucks.Environment new nunjucks.FileSystemLoader('templates'),
    watch: false
templatesEnv.addFilter 'markdown', (input) ->
    marked input

class TemplateHelper

    ### Public ###

    # file - Vinyl {object}
    # cb - {Function}
    render: (file, cb) =>
        @get 'page', (err, template) ->
            throw err if err

            templateArgs =
                site: site
                page: file.meta
                content: String file.contents

            onRender = (err, output) ->
                if err?
                    cb err
                    return

                file.contents = new Buffer output
                cb null, file

            template.render templateArgs, onRender

    ### Private ###

    # templateName = {String}
    # cb - {Function}
    get: (templateName, cb) =>
        basename = templateName += '.swig.html'
        template = build.templates[templateName]

        if template?
            cb null, template
        else
            templatesEnv.getTemplate basename, true, (err, template) ->
                build.templates[templateName] = template unless err
                cb.apply this, arguments

module.exports = new TemplateHelper()