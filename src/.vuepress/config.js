const repoUrl = 'https://github.com/adam-lynch/adam-lynch.github.io'

module.exports = {
  /*
  * Stop external link SVG being output from markdown
  * Related: https://github.com/vuejs/vuepress/pull/614
  */
  chainMarkdown(config) {
    const { PLUGINS } = require('@vuepress/markdown')
    const originalLinkPlugin = require('@vuepress/markdown/lib/link.js');

    config
      .plugins
        .delete(PLUGINS.CONVERT_ROUTER_LINK)

    const linkPlugin = function (md) {
      const result = originalLinkPlugin.apply(this, arguments);
      const close = md.renderer.rules.link_close;
      md.renderer.rules.link_close = function() {
        return close.apply(this, arguments).replace('<OutboundLink/>', '');
      }
      return result;
    };

    config
      .plugin(PLUGINS.CONVERT_ROUTER_LINK)
        .use(linkPlugin, [{
          // The config.markdown.externalLinks options https://vuepress.vuejs.org/config/#markdown-externallinks
          rel: 'noopener noreferrer'
        }])
  },
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
    anchor: {
      permalinkSymbol: '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 8 8"><path d="M5.88.03c-.18.01-.36.03-.53.09-.27.1-.53.25-.75.47a.5.5 0 1 0 .69.69c.11-.11.24-.17.38-.22.35-.12.78-.07 1.06.22.39.39.39 1.04 0 1.44l-1.5 1.5c-.44.44-.8.48-1.06.47-.26-.01-.41-.13-.41-.13a.5.5 0 1 0-.5.88s.34.22.84.25c.5.03 1.2-.16 1.81-.78l1.5-1.5c.78-.78.78-2.04 0-2.81-.28-.28-.61-.45-.97-.53-.18-.04-.38-.04-.56-.03zm-2 2.31c-.5-.02-1.19.15-1.78.75l-1.5 1.5c-.78.78-.78 2.04 0 2.81.56.56 1.36.72 2.06.47.27-.1.53-.25.75-.47a.5.5 0 1 0-.69-.69c-.11.11-.24.17-.38.22-.35.12-.78.07-1.06-.22-.39-.39-.39-1.04 0-1.44l1.5-1.5c.4-.4.75-.45 1.03-.44.28.01.47.09.47.09a.5.5 0 1 0 .44-.88s-.34-.2-.84-.22z"></path></svg>',
    },
    // TODO: externalLinks
    // TODO: extendMarkdown?
    config: marked => {
      const containerPlugin = require('markdown-it-container');

      marked.use(containerPlugin, 'summary', {
        validate: function (params) {
          return params.trim().match(/^summary$/)
        },

        render: function (tokens, idx) {
          // opening tag
          if (tokens[idx].nesting === 1) {
            return '<article-summary>'
          }
          return '</article-summary>'
        }
      });

      const figureRegex = /^figure ([^ ]+\.[a-z]+)( .+|\s+)?$/i
      marked.use(containerPlugin, 'figure', {
        validate: function (params) {
          return !!params.trim().match(figureRegex)
        },

        render: function (tokens, idx) {
          const currentToken = tokens[idx]
          const isCurrentTokenOpeningTag = currentToken.type === 'container_figure_open'
          if (!isCurrentTokenOpeningTag) {
            return ''
          }

          const matches = tokens[idx].info.trim().match(figureRegex)
          const [fullMatch, relativePath, caption] = matches // eslint-disable-line no-unused-vars

          // const url = `/images/blog-content/${relativePath}`
          const url = `./images/${relativePath}`

          let figcaption
          if (caption) {
            const trimmedCaption = caption.trim()
            figcaption = trimmedCaption ? `<figcaption>${marked.render(trimmedCaption).html}</figcaption>` : ''
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
    githubAccountUrl: 'https://github.com/adam-lynch',
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
