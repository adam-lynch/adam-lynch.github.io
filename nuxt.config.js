const state = require('./store/state')

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
  css: [
    '~/assets/styles/index.scss'
  ],
  generate: {
    // TODO
  },
  modules: [
    '@nuxtjs/sitemap',
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
