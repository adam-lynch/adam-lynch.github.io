const state = require('./store/state')

const blogOptions = {
  base: process.env.NODE_ENV === 'production' ? 'https://adamlynch.com' : 'http://localhost:3000',
  dir: 'writing',
  api: {
    prefix: 'api/writing'
  },
  disqus: {
    shortname: 'adamlynch-1',
    url: 'https://adamlynch.com'
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
  // loading: { color: '#3B8070' },
  loading: { color: '#869bad' },
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
    },
    watch: [
      './modules/**/*.js',
      './writing/**/*'
    ]
  },
  css: [
    '~/assets/styles/index.scss'
  ],
  router: {
    middleware: [
      'analytics'
    ]
  },
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
