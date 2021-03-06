const routes = require('../app/routes').routes
const format = require('../helpers/path').format
const blog = require('../blog')
const getRelatedEntities = require('../helpers/getRelatedArticles')

function toPlainObject (any) {
  if (Array.isArray(any)) {
    return any.map(item => JSON.parse(JSON.stringify(item)))
  }

  return JSON.parse(JSON.stringify(any))
}

module.exports = async function () {
  await blog.create()
  const paths = []
  routes.forEach(route => {
    switch (route.name) {
      case '@nuxtjs/blog:index':
        paths.push({
          route: route.path,
          payload: toPlainObject(blog.articles.map(article => article.preview))
        })
        break
      case '@nuxtjs/blog:article':
        paths.push(...blog.articles.map(article => {
          const result = toPlainObject(article)
          result.moreArticles = getRelatedEntities(article, blog.articles)
          return {
            route: format(route.path, article),
            payload: result
          }
        }))
        break
      case '@nuxtjs/blog:tag':
        paths.push(...blog.tags.map(tag => ({
          route: format(route.path, tag),
          payload: toPlainObject(tag.toPlainObject())
        })))
        break
      case '@nuxtjs/blog:collection':
        paths.push(...blog.collections.map(collection => ({
          route: format(route.path, collection),
          payload: toPlainObject(collection.toPlainObject())
        })))
        break
      default:
        // -- Ignore!
    }
  })

  return paths
}
