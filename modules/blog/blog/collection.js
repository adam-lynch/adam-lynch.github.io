
const slug = require('slug')
const Container = require('./container')

module.exports = class Collection {
  constructor (name) {
    this.id = slug(name, { lower: true })
    this.name = name
    Object.defineProperties(this, {
      _articles: { value: new Container() }
    })
  }

  addArticle (article) {
    this._articles.addItem(article)
  }

  get articles () {
    return this._articles.items
  }

  toPlainObject () {
    return { id: this.id, name: this.name, articles: this.articles.map(article => article.preview) }
  }
}
