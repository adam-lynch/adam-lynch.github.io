const isBefore = require('date-fns/is_before')
const differenceInCalendarMonths = require('date-fns/difference_in_calendar_months')

const getTags = (article) => article.keywords || article.attributes.tags

module.exports = (article, articles) => {
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
