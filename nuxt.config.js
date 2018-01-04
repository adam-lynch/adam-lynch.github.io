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
    title: 'Adam Lynch',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Adam Lynch site' },
      { 'theme-color': 'theme-color', content: '#ffffff' },
    ],
    link: [
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '76x76' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon-32x32.png', sizes: '32x32' },
      { rel: 'icon', type: 'image/png', href: '/favicon-16x16.png', sizes: '16x16' },
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#53687a' },
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
    ],
    routes: [{
      name: '@nuxtjs/blog:index',
      path: '/',
      component: '~/components/Blog/Blog.vue'
    }]
  },
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/sitemap',
    ['modules/blog', blogOptions],
  ],
  sitemap: {
    generate: true,
    hostname: state.siteUrl
  }
}
