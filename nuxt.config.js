const state = require('./store/state')

const blogOptions = {
  dir: 'writing',
  api: {
    prefix: 'api/writing'
  },
  disqus: null,
  modifyRoutes: function (routes) {
    return routes
    return routes.map((route) => {
      route.path = route.path.replace(/^\/blog/, '') || '/'
      if (/:index$/.test(route.name)) {
        route.component = '~/components/Footer/Footer.vue'
      }
      return route
    })
  }
}

module.exports = {
  cache: false,
  /*
  ** Headers of the page
  */
  head: {
    title: 'adamlynch',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Adam Lynch site' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }

      config.module.rules.push({
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules(?!(\/|\\)@nuxtjs)/,
        options: Object.assign({}, this.babelOptions)
      })

      config.module.rules.push({
        test: /\.md$/,
        use: 'raw-loader'
      })
    }
  },
  blog: {
    // shouldOverwriteRoutes: true,
    // urls: {
    //   article: '/writing/:slug',
    //   root: '/'
    // }
  },
  css: [
    '~/assets/styles/index.scss'
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/sitemap',
    ['modules/blog', blogOptions],
    'modules/rss.js'
  ],
  rss: {
    generate: true,
    url: '/writing/rss.xml'
  },
  sitemap: {
    generate: true,
    hostname: state.siteUrl
  }
}
