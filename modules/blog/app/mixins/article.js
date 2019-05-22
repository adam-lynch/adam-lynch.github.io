const formatDate = require('./filters').formatDate
const api = require('./api').default.api
const isBefore = require('date-fns/is_before')
const differenceInCalendarMonths = require('date-fns/difference_in_calendar_months')

const getRelatedArticles = (article, articles) => {
  const getTags = (article) => article.keywords || article.attributes.tags

  const currentDate = new Date()
  const tagsSet = new Set(getTags(article))

  return articles
    .filter(({id, isBook}) => !isBook && id !== article.id)
    .map((otherArticle) => {
      const numberOfCommonTags = new Set(getTags(otherArticle).filter(tag => tagsSet.has(tag))).size

      // Use tags and age to determine what's relevant
      otherArticle.relevanceScore = Math.max(0, numberOfCommonTags - Math.max(0, differenceInCalendarMonths(currentDate, otherArticle.published_at) / 24))

      return otherArticle
    })
    .sort((articleA, articleB) => {
      const scoreComparison = articleB.relevanceScore - articleA.relevanceScore

      if (scoreComparison === 0) {
        if (articleA.published_at === articleB.published_at) {
          return 0
        }

        if (isBefore(articleA.published_at, articleB.published_at)) {
          return 1
        }

        return -1
      }

      if (scoreComparison > 0) {
        return 1
      }

      return -1
    })
    .slice(0, 3)
}

export default {
  name: 'Article',

  async asyncData (context) {
    const { params, payload, app } = context

    if (typeof (payload) === 'object' && payload) {
      return { article: payload }
    }

    const article = await api(process.env.__NUXT_BLOG__.templates.article, params, app)
    const articles = await api(process.env.__NUXT_BLOG__.templates.indexArticles, params, app)
    return {
      article: {
        ...article,
        moreArticles: getRelatedArticles(article, articles)
      }
    }
  },

  head () {
    if (!this.article) {
      return { title: '404. Not Found' }
    }

    const meta = [
      { hid: 'description', name: 'description', content: this.article.summary },
      { hid: 'keywords', name: 'keywords', content: (this.article.keywords || []).join(', ') }
    ]
    const link = []

    if (this.article.highlightedLanguages && this.article.highlightedLanguages.length) {
      const theme = `prism${this.article.attributes.highlight ? '-' + this.article.attributes.highlight : ''}`
      link.push({
        rel: 'stylesheet',
        href: `//unpkg.com/prismjs/themes/${theme}.css`
      })
    }

    const twitter = Object.assign({
      card: 'summary',
      title: this.article.title,
      description: this.article.summary,
      image: this.article.photo,
      url: this.$route.path
    }, this.article.attributes.twitter || {}, process.env.__NUXT_BLOG__.twitter || {})
    const twitterMeta = Object.keys(twitter).map(key => {
      if (key === 'image') {
        return { name: `twitter:${key}`, content: twitter[key] }
      }

      return { hid: `twitter:${key}`, name: `twitter:${key}`, content: twitter[key] }
    })

    const og = Object.assign({
      type: 'article',
      title: this.article.title,
      description: this.article.summary,
      image: this.article.photo,
      url: this.$route.path
    }, this.article.attributes.og || {}, process.env.__NUXT_BLOG__.og || {})
    const ogMeta = Object.keys(og).map(key => ({
      hid: `og:${key}`,
      name: `og:${key}`,
      content: og[key]
    }))

    const fb = Object.assign(this.article.attributes.fb || {}, process.env.__NUXT_BLOG__.fb || {})
    const fbMeta = Object.keys(fb).map(key => ({
      hid: `fb:${key}`,
      name: `fb:${key}`,
      content: fb[key]
    }))

    return {
      title: this.article.attributes.title,
      meta: [].concat(meta, twitterMeta, ogMeta, fbMeta),
      link
    }
  },

  filters: { formatDate }
}
