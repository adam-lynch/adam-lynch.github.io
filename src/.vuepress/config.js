module.exports = {
  // title: 'Hello VuePress2',
  // chainWebpack:  (config, isServer) => {
  //   // config is an instance of ChainableConfig
  // },
  // configureWebpack: {
  //   resolve: {
  //     alias: {
  //       // '@theme': '@vuepress/theme-default',
  //     }
  //   },
  // },
  // description: "I like to code, write, and dabble in design. I'm Teamwork CRM's technical lead.", // TODO
  // evergreen: true,
  // extraWatchFiles: [],
  // head: [
  //   ['meta', { 'theme-color': 'theme-color', content: '#ffffff' }],
  //   ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '76x76' }],
  //   ['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon-32x32.png', sizes: '32x32' }],
  //   ['link', { rel: 'icon', type: 'image/png', href: '/favicon-16x16.png', sizes: '16x16' }],
  //   ['link', { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#53687a' }],
  //   // ['link', { rel: 'stylesheet', href: '/index.scss' }],
  //   // ['link', { rel: 'stylesheet', href: './index.scss' }],
  //   // ['link', { rel: 'stylesheet', href: './styles/index.scss' }],
  //   // ['link', { rel: 'stylesheet', href: './.vuepress/styles/index.scss' }],
  //   ['script', { src: 'https://unpkg.com/scrollto-with-animation/dist/scrollto-with-animation.min.js' }],

  //   // TODO: move to body
  //   ['script', { src: 'https://use.typekit.net/tci5xbk.js' }],
  //   ['script', null, 'try{Typekit.load({ async: true });}catch(e){}'],
  // ],
  // permalink: '/:slug',
  plugins: [
    // TODO: ga
    // ga: 'UA-31546953-1',
    [
      '@vuepress/blog',
      {
        directories: [
          {
            // Unique ID of current classification
            id: 'article',
            // Target directory
            dirname: 'writing',
            // Path of the `entry page` (or `list page`)
            path: '/',
            layout: 'ArticlesIndex',
            itemLayout: 'Article',
          },
        ],
      },
    ],
  ],
  // shouldPrefetch: () => true,
  // // theme: '@vuepress/theme-blog',
  // themeConfig: {
  //   repo: 'adam-lynch/adam-lynch.github.io',
  //   editLinks: true,
  //   nav: [
  //     { text: 'Writing', link: '/' },
  //     { text: 'Code', link: 'https://google.com' },
  //     { text: 'Edit page', link: 'https://google.com' },
  //     { text: 'Twitter', link: 'https://google.com' },
  //     { text: 'Email', link: 'https://google.com' },
  //     { text: 'LinkedIn', link: 'https://google.com' },
  //   ],
  //   directories: [
  //     {
  //       // Unique ID of current classification
  //       id: 'post',
  //       // Target directory
  //       dirname: '_posts',
  //       // Path of the `entry page` (or `list page`)
  //       path: '/',
  //       pagination: {
  //         lengthPerPage: 2,
  //       },
  //     },
  //   ],
  //   // modifyBlogPluginOptions(blogPlugnOptions) {
  //   //   const writingDirectoryClassifier = {
  //   //     id: 'writing',
  //   //     dirname: 'writing',
  //   //     path: '/',
  //   //     layout: 'IndexWriting',
  //   //     itemLayout: 'Writing',
  //   //     itemPermalink: '/:slug',
  //   //     pagination: {
  //   //       perPagePosts: 5,
  //   //     },
  //   //   }

  //   //   blogPlugnOptions.directories.push(writingDirectoryClassifier)
  //   //   return blogPlugnOptions
  //   // },
  //   search: false
  // },
  cache: false,
}
