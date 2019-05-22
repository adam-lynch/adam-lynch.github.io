const chalk = require('chalk')
const path = require('path')
const blog = require('../../blog')
const helpers = require('../helpers')
const getRelatedArticles = require('../../helpers/getRelatedArticles')

const format = require('../../helpers/path').format

module.exports = function (router, context, options) {
  function request (url) {
    console.log(`  ${chalk.blue('blog:api')} ${chalk.green('GET')} /${options.api.prefix}${url}`)

    return url
  }

  function resolve (filename) {
    return path.resolve(options.distDir, `${options.api.prefix}/${filename}`.replace(/\/+/, '/').replace(/\/+$/, '') + '.json')
  }

  const templates = options.templates
  const dev = () => {
    if (context.nuxt.options.dev) {
      console.log(`  ${chalk.blue('blog:api')} ... running in dev mode`)
      return true
    }
  }
  router.get(templates.indexArticles, (req, res) => {
    const url = request(format(templates.indexArticles, req.params))

    if (dev()) {
      blog.create(options, true).then(() => helpers.sendJson(blog.articles.map(article => article.preview), res))
      return
    }

    helpers.sendFile(resolve(url), res)
  })
  router.get(templates.indexTags, (req, res) => {
    const url = request(format(templates.indexTags, req.params))

    if (dev()) {
      blog.create(options, true).then(() => helpers.sendJson(blog.tags, res))
      return
    }

    helpers.sendFile(resolve(url), res)
  })
  router.get(templates.tag, (req, res) => {
    const url = request(format(templates.tag, req.params))
    if (dev()) {
      blog.create(options, true).then(() => helpers.sendJson(blog.findTag(req.params).toPlainObject(), res))
      return
    }
    helpers.sendFile(resolve(url), res)
  })
  router.get(templates.indexCollections, (req, res) => {
    const url = request(format(templates.indexCollections, req.params))

    if (dev()) {
      blog.create(options, true).then(() => helpers.sendJson(blog.collections, res))
      return
    }

    helpers.sendFile(resolve(url), res)
  })
  router.get(templates.collection, (req, res) => {
    const url = request(format(templates.collection, req.params))
    if (dev()) {
      blog.create(options, true).then(() => helpers.sendJson(blog.findCollection(req.params).toPlainObject(), res))
      return
    }
    helpers.sendFile(resolve(url), res)
  })

  router.get(templates.article, (req, res) => {
    if (!/(\.html)?$/.test(req.params.id)) {
      console.error(`GET ${templates.article}: ${req.params.id} requested`)
    }
    req.params.id = req.params.id.replace(/\.html$/, '')

    const url = request(format(templates.article, req.params))

    if (dev()) {
      blog.create(options, true).then(() => {
        const article = blog.findArticle(req.params)
        const contents = blog.addPaginationLinks(article)
        contents.moreArticles = getRelatedArticles(article, blog.articles).map(article => article.preview)
        return helpers.sendJson(contents, res)
      })
      return
    }

    helpers.sendFile(resolve(url), res) // TODO: added res in here
  })

  console.log(`   ${chalk.blue('blog:api')} Listening on /${options.api.prefix}`)
  context.addServerMiddleware({
    path: `/${options.api.prefix}`,
    handler: router
  })
}
