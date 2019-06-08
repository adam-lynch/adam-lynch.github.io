module.exports = {
  title: 'Hello VuePress2',
  chainWebpack:  (config, isServer) => {
    // config is an instance of ChainableConfig
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@theme': '@vuepress/theme-default',
      }
    },
  },
  description: "I like to code, write, and dabble in design. I'm Teamwork CRM's technical lead.", // TODO
  evergreen: true,
  extraWatchFiles: [],
  head: [
    ['meta', { 'theme-color': 'theme-color', content: '#ffffff' }],
    ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '76x76' }],
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon-32x32.png', sizes: '32x32' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon-16x16.png', sizes: '16x16' }],
    ['link', { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#53687a' }],
    // ['link', { rel: 'stylesheet', href: '/index.scss' }],
    // ['link', { rel: 'stylesheet', href: './index.scss' }],
    // ['link', { rel: 'stylesheet', href: './styles/index.scss' }],
    // ['link', { rel: 'stylesheet', href: './.vuepress/styles/index.scss' }],
    ['script', { src: 'https://unpkg.com/scrollto-with-animation/dist/scrollto-with-animation.min.js' }],

    // TODO: move to body
    ['script', { src: 'https://use.typekit.net/tci5xbk.js' }],
    ['script', null, 'try{Typekit.load({ async: true });}catch(e){}'],
  ],
  // permalink: '/:slug',
  plugins: {
    // TODO: ga
    // ga: 'UA-31546953-1',

  },
  shouldPrefetch: () => true,
  themeConfig: {
    repo: 'adam-lynch/adam-lynch.github.io',
    editLinks: true,
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'External', link: 'https://google.com' },
    ],
    search: false
  },
  cache: false,
}
