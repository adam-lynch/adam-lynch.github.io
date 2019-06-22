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
  markdown: {
    // TODO: anchor
    // TODO: externalLinks
    // TODO: extendMarkdown?
    config: marked => {
      const containerPlugin = require('markdown-it-container');
      const figureRegex = /^figure ([^ ]+\.[a-z]+)( .+|\s+)?$/i
      marked.use(containerPlugin, 'figure', {
        validate: function (params) {
          console.log('!!! marked validate')
          return params.trim().match(figureRegex)
        },

        render: function (tokens, idx) {
          const currentToken = tokens[idx]
          const isCurrentTokenOpeningTag = currentToken.type === 'container_figure_open'
          if (!isCurrentTokenOpeningTag) {
            return ''
          }

          const matches = tokens[idx].info.trim().match(figureRegex)
          const [fullMatch, relativePath, caption] = matches // eslint-disable-line no-unused-vars

          const url = `/blog-content/${relativePath}`

          let figcaption
          if (caption) {
            const trimmedCaption = caption.trim()
            figcaption = trimmedCaption ? `<figcaption>${marked.render(trimmedCaption)}</figcaption>` : ''
          } else {
            figcaption = ''
          }

          return `<figure>
            <a href="${url}"><img src="${url}" alt=""/></a>
            ${figcaption}
          </figure>`
        }
      })
    },
    plugins: [
      // TODO

    ],
    // TODO: slugify
  },
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
            itemLayout: 'ArticleLayout',
            itemPermalink: '/:slug',
            pagination: {
              // TODO
            }
          },
        ],
      },
    ],
  ],
  repoLink: false,
  themeConfig: {
    docsRepo: repoUrl,
    editLinks: true,
    editLinkText: 'Edit page',
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
