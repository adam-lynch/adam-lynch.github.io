const fs = require('fs-extra')
const path = require('path')
const state = require('../store/state')
const RSS = require('rss')

let rssCache

const defaults = {
  url: 'rss.xml'
}

/**
 * @param {array} routes
 * @param {string} relativeFileUrl
 * @returns {string}
 */
const generateRss = (routes, relativeFileUrl) => {
  const feed = new RSS({
    title: state.siteTitle,
    description: `${state.nameToShow}'s writing`,
    feed_url: `${state.siteUrl}${relativeFileUrl}`,
    site_url: state.siteUrl,
    language: 'en',
    webMaster: state.nameToShow
  })

  state.posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.summary,
      url: post.url,
      date: post.datetime,
      author: state.nameToShow
    })
  })

  return feed.xml()
}

/**
 * @param {object} moduleOptions
 */
module.exports = function nuxtSitemap (moduleOptions) {
  const options = Object.assign({}, defaults, this.options.rss, moduleOptions)

  // sitemap.xml is written to static dir on generate mode
  const outputPath = path.resolve(this.options.srcDir, path.join('static', options.url))

  // Ensure no generated file exists
  fs.removeSync(outputPath)

  // Extend routes
  this.extendRoutes(routes => {
    // cache the RSS for server middleware
    rssCache = generateRss(routes, options.url)

    if (!this.options.dev && options.generate) {
      fs.ensureDirSync(path.resolve(this.options.buildDir, 'dist'))
      fs.ensureDirSync(path.dirname(outputPath))
      fs.writeFileSync(outputPath, rssCache)
    }
  })

  // Add server middleware
  this.addServerMiddleware({
    path: options.url,
    handler (req, res, next) {
      res.setHeader('Content-Type', 'application/xml')
      res.end(rssCache) // Note: this means it doesn't update during dev
    }
  })
}
