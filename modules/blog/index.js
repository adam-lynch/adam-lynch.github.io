const path = require('path')
const merge = require('merge-options')
const blog = require('./blog')
const routes = require('./app/routes')
const serve = require('./serve')
const build = require('./build')

module.exports = function NuxtModule (options) {
  const defaults = {
    base: 'http://localhost:3000',
    comments: false,
    static: true,
    dir: 'blog',
    api: {
      prefix: 'api/blog'
    },
    templates: {
      article: '/posts/:id',
      tag: '/tags/:id',
      collection: '/collections/:id',
      indexArticles: '/',
      indexTags: '/tags',
      indexCollections: '/collections'
    },
    routes: routes.routes,
    disqus: {
      url: options.base || 'http://localhost:3000',
      shortname: undefined,
      api_key: undefined, // eslint-disable-line camelcase
      sso_config: undefined // eslint-disable-line camelcase
    },
    twitter: null,
    og: null,
    fb: null,
    markdown: {
      plugins: [
        require('markdown-it-decorate'),
        require('markdown-it-emoji')
      ]
    }
  }
  const nuxtOptions = this.nuxt.options

  options = merge(defaults, options, {
    static: nuxtOptions.dev ? false : options.static,
    base: nuxtOptions.dev ? options.devBase || defaults.base : options.base || ''
  })
  options.rootDir = nuxtOptions.rootDir
  options.path = path.resolve(nuxtOptions.rootDir, options.dir)

  blog.context = this
  blog.addSource(`${options.path}/**/*.md`)

  // Register blog routes.
  this.extendRoutes((...any) => routes.registerRoutes(options, ...any))
  // Register api server.
  serve(this, options)
  // Register build process.
  build(this, options)
  // Register layout.
  // this.
}
