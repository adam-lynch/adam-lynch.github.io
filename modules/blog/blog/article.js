const fs = require('fs')
const fm = require('front-matter')
const pify = require('pify')
const Markdown = require('markdown-it')
const Token = require('markdown-it/lib/token.js')
const Prism = require('prismjs')
const path = require('path')
const removeMarkdown = require('remove-markdown')
const slug = require('slug')
const cheer = require('cheerio')
const Blog = require('./blog')
const Tag = require('./tag')
const Collection = require('./collection')

const ucword = any => any.replace(/[-_]+/g, ' ').replace(/(?:^|\s)([a-z])/g, m => m.toUpperCase())

module.exports = class Article {
  constructor (filename) {
    Object.defineProperties(this, {
      filename: { value: filename },
      _tags: { value: [], writable: true },
      _collection: { value: null, writable: true }
    })
    this.id = slug(path.basename(filename.replace(/\.md$/, '')), { lower: true })
    this.slug = this.id.replace(/^[\d]{4}-[\d]{2}-[\d]{2}-/, '')
    this.highlightedLanguages = []
  }

  static async create (filename, options, blog) {
    const article = new Article(filename)

    await article.create(options, blog)

    return article
  }

  /**
   * Create article from markdown.
   * @param options
   * @param blog
   * @returns {Promise.<Article>}
   */
  async create (options, blog) {
    const marked = this._createMarkdownRenderer(options, blog)

    this.source = await pify(fs.readFile)(this.filename, { encoding: 'utf-8' })

    const { attributes, body } = fm(this.source)
    this.unfilteredRenderedBody = marked.render(body)
    this.attributes = this._prepareAttributes(attributes, options)

    if (this.attributes.collection) {
      this._collection = blog.getCollection(this.attributes.collection)
      this.attributes.collection = this._collection
    } else if (path.dirname(this.filename) !== options.path) {
      this._collection = blog.getCollection(ucword(path.basename(path.dirname(this.filename))))
      this.attributes.collection = this._collection
    }
    this._tags = this.attributes.tags.map(tag => blog.getTag(tag))
    this.attributes.tags = this._tags

    this.title = attributes.title

    if (attributes.description) {
      this.renderedSummary = marked.render(attributes.description)
    } else {
      const summaryMatches = this.unfilteredRenderedBody.match(/^(.+?)<end-of-summary\/>/)
      if (summaryMatches) {
        this.renderedSummary = summaryMatches[1]
      } else {
        throw new Error(`Post has no summary ("${this.title}")`)
      }
    }
    this.rendered = this.unfilteredRenderedBody.replace('<end-of-summary/>', '')
    this.summary = removeMarkdown(this.renderedSummary)

    this.isBook = attributes.isBook
    this.original = attributes.original
    this.photo = attributes.photo
    this.keywords = this.attributes.tags.map(tag => tag.name)
    /* eslint-disable camelcase */
    this.published_at = this.attributes.date
    this.updated_at = this.attributes.updated_at
    this.year = this.published_at.getFullYear()
    this.month = this.published_at.getUTCMonth() + 1
    this.day = this.published_at.getDate() + 1
    /* eslint-enable camelcase */

    return this
  }

  /**
   * Tags/Categories, the article belongs to
   * @returns {Tag[]}
   */
  get tags () {
    return this._tags
  }

  /**
   * Collection/Series, the article is part of.
   * @returns {Collection|null}
   */
  get collection () {
    return this._collection
  }

  /**
   * Minimal article info.
   * @returns {{id: string, title: string, description: string, photo: string, published_at: Date}}
   */
  get preview () {
    return {
      id: this.id,
      slug: this.slug,
      collection: this.collection && this.collection.id,
      isBook: this.isBook,
      keywords: this.keywords,
      original: this.original,
      title: this.title,
      summary: this.summary,
      photo: this.photo,
      published_at: this.published_at, // eslint-disable-line camelcase
      renderedSummary: this.renderedSummary
    }
  }

  /**
   * Create instance of MarkdownIt.
   * @param options
   * @param blog
   * @returns {MarkdownIt}
   * @private
   */
  _createMarkdownRenderer (options, blog) {
    const marked = new Markdown({
      html: true,
      linkify: true,
      breaks: true,
      highlight: (code, lang) => {
        if (!this.highlightedLanguages.includes(lang)) {
          this.highlightedLanguages.push(lang)
        }

        if ('highlight' in options) {
          return options.highlight(code, lang)
        }

        return Prism.highlight(code, Prism.languages[lang] || Prism.languages.markup)
      }
    })

    marked.use(require('markdown-it-emoji'))

    const containerPlugin = require('markdown-it-container')
    marked.use(containerPlugin, 'summary', {

      validate: function (params) {
        return params.trim().match(/^summary$/)
      },

      render: function (tokens, idx) {
        if (tokens[idx].nesting === 1) {
          // opening tag
          return '<end-of-summary/>'
        }
        return ''
      }
    })

    const figureRegex = /^figure ([^ ]+\.[a-z]+)( .+|\s+)?$/i
    marked.use(containerPlugin, 'figure', {
      validate: function (params) {
        return params.trim().match(figureRegex)
      },

      render: function (tokens, idx) {
        const matches = tokens[idx].info.trim().match(figureRegex)
        // it has to exist but it doesn't sometimes, maybe a bug in plugin when used twice
        if (!matches) {
          return ''
        }

        const [fullMatch, relativePath, caption] = matches

        // opening tag
        if (tokens[idx].nesting === 1) {
          const url = `/images/blog-content/${relativePath}`

          let figcaption
          if (caption) {
            const trimmedCaption = caption.trim()
            figcaption = trimmedCaption ? `<figcaption>${trimmedCaption}</figcaption>` : ''
          } else {
            figcaption = ''
          }

          return `<figure>
            <a href="${url}"><img src="${url}" alt=""/></a>
            ${figcaption}
          </figure>`
        }
        return ''
      }
    })

    marked.use(require('markdown-it-implicit-figures'), {
      figcaption: true
    })
    marked.use(require('markdown-it-link-attributes'), {
      pattern: /^https?:/,
      attrs: {
        rel: 'noopener'
      }
    })

    const githubHeadings = require('markdown-it-github-headings')
    githubHeadings.svgLinkIconText = '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 8 8"><path d="M5.88.03c-.18.01-.36.03-.53.09-.27.1-.53.25-.75.47a.5.5 0 1 0 .69.69c.11-.11.24-.17.38-.22.35-.12.78-.07 1.06.22.39.39.39 1.04 0 1.44l-1.5 1.5c-.44.44-.8.48-1.06.47-.26-.01-.41-.13-.41-.13a.5.5 0 1 0-.5.88s.34.22.84.25c.5.03 1.2-.16 1.81-.78l1.5-1.5c.78-.78.78-2.04 0-2.81-.28-.28-.61-.45-.97-.53-.18-.04-.38-.04-.56-.03zm-2 2.31c-.5-.02-1.19.15-1.78.75l-1.5 1.5c-.78.78-.78 2.04 0 2.81.56.56 1.36.72 2.06.47.27-.1.53-.25.75-.47a.5.5 0 1 0-.69-.69c-.11.11-.24.17-.38.22-.35.12-.78.07-1.06-.22-.39-.39-.39-1.04 0-1.44l1.5-1.5c.4-.4.75-.45 1.03-.44.28.01.47.09.47.09a.5.5 0 1 0 .44-.88s-.34-.2-.84-.22z"></path></svg>'

    marked.use(githubHeadings, {
      className: 'post-header-anchor'
    })

    return marked
  }

  _renderMarkdown (markdown) {
    return this.marked.render(markdown)
      .replace('<end-of-summary/>', '')
  }

  /**
   * Fix missing article attributes.
   * @param attributes
   * @returns {Object}
   * @private
   */
  _prepareAttributes (attributes) {
    const s = cheer.load(this.unfilteredRenderedBody)
    const stats = fs.statSync(this.filename)
    const text = query => {
      const matches = s(query)

      if (matches.length) return matches.first().text()
    }

    if (!('title' in attributes) || !attributes.title) {
      attributes.title = text('h1') || text('h2') || text('h3')
    }

    if (!('date' in attributes)) {
      attributes.date = new Date(stats.ctime)
    }

    attributes.date = new Date(attributes.date)

    if (!('updated_at' in attributes)) {
      attributes.updated_at = new Date(stats.mtime) // eslint-disable-line camelcase
    }

    attributes.updated_at = new Date(attributes.updated_at)

    attributes.updated_at = new Date(attributes.updated_at) // eslint-disable-line camelcase

    if (!('description' in attributes) || !attributes.description) {
      attributes.description = text('p')
    }

    if (!('tags' in attributes)) {
      attributes.tags = []
    } else if (!Array.isArray(attributes.tags)) {
      attributes.tags = [attributes.tags]
    }

    if (!('photo' in attributes)) {
      attributes.photo = s('img.cover').attr('src') || s('img').attr('src')
    }

    return attributes
  }
}
