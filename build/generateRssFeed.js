const cheerio = require('cheerio')
const fs = require('fs')
const getFrontMatter = require('front-matter')
const Markdown = require('markdown-it')
const path = require('path')
var RSS = require('rss')

const getFirstTagContents = function (cherrioQuery, tagName) {
  const matches = cherrioQuery(tagName)
  if (!matches.length) {
    return
  }
  return matches.first().text()
}

const siteUrl = 'https://adamlynch.com'

var feed = new RSS({
  description: 'I like to code, I like to write. Developer, author. Currently at Readwise.',
  feed_url: siteUrl + '/rss.xml',
  image_url: 'TODO',
  language: 'en',
  pubDate: 'Sat, 17 Dec 2022 22:18:11 GMT',
  site_url: siteUrl,
  title: "Adam Lynch's blog",
  webMaster: 'Adam Lynch'
})
const postsDirectory = path.join(__dirname, '../writing')

for (const filename of fs.readdirSync(postsDirectory)) {
  const contents = fs.readFileSync(path.join(postsDirectory, filename)).toString()
  const { attributes, body } = getFrontMatter(contents)

  const marked = new Markdown()
  const html = marked.render(body)
  const queryHtml = cheerio.load(html)
  const title = getFirstTagContents(queryHtml, 'h1') || getFirstTagContents(queryHtml, 'h2') || getFirstTagContents(queryHtml, 'h3')

  feed.item({
    author: 'Adam Lynch',
    categories: attributes.tags,
    date: attributes.date,
    description: attributes.summary,
    title,
    url: siteUrl + '/' + filename.replace('.md', '')
  })
}

const xml = feed.xml({ indent: true })

fs.writeFileSync(path.join(__dirname, '../static/rss.xml'), xml)
