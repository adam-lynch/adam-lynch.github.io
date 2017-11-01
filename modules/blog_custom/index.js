const defaults = {
  root: 'blog',
  shouldOverwriteRoutes: false,
  templates: {
    article: '~/components/PostPreview/PostPreview.vue',
    root: '~/components/Blog/Blog.vue'
  },
  urls: {
    article: '/blog/:slug',
    root: '/blog'
  }
}

/**
 * @param {object} moduleOptions
 */
module.exports = function nuxtSitemap (moduleOptions) {
  const options = Object.assign({}, defaults, this.options.blog, moduleOptions)
  const glob = `${options.root}/**/*.md`
  const addRoute = (routes, route) => {
    const existingIndex = routes.findIndex(({path}) => { return path === route.path })
    if (existingIndex === -1) {
      routes.push(route)
    } else {
      if (options.shouldOverwriteRoutes) {
        console.warn(`Blog module: ${route.path} already registered, overwriting`)
        Object.assign(routes[existingIndex], route)
      } else {
        console.warn(`Blog module: ${route.path} already registered, skipping`)
      }
    }
  }

  this.extendRoutes((routes) => {
    addRoute(routes, {
      name: 'blog-module root',
      component: options.templates.root,
      path: `${options.urls.root}`
    })
    addRoute(routes, {
      name: 'blog-module article',
      component: options.templates.article,
      path: `${options.urls.article}`
    })
  })
  // // Register api server.
  // serve(this, options)
  // // Register build process.
  // build(this, options)
}
