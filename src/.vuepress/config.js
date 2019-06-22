const repoUrl = 'https://github.com/adam-lynch/adam-lynch.github.io'

module.exports = {
  description: "I like to code, write, and dabble in design. I'm Teamwork CRM's technical lead.", // TODO
  evergreen: true,
  // TODO: head
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
  plugins: [
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
            itemPermalink: '/:slug',
            pagination: {
              // TODO
            }
          },
        ],
      },
    ],
  ],
  themeConfig: {
    repo: repoUrl,
    editLinks: true,
    editLinkText: 'Edit page',
    markdown: {
      // TODO: anchor
      // TODO: externalLinks
      // TODO: extendMarkdown?
      plugins: [
        // TODO
      ],
      // TODO: slugify
    },
    nav: [
      // TODO: links
      { text: 'Writing', link: '/' },
      { text: 'Code', link: repoUrl },
      { text: 'Edit page', link: 'https://google.com' },
      { text: 'Twitter', link: 'https://google.com' },
      { text: 'Email', link: 'https://google.com' },
      { text: 'LinkedIn', link: 'https://google.com' },
    ],
    search: false,
    sidebar: false,
  },
  title: 'Adam Lynch',
  cache: false, // TODO: remove
}
