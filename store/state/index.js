const posts = require('./posts')

const state = {
  nameToShow: 'Adam Lynch',
  githubAccountUrl: 'https://github.com/adam-lynch',
  posts,
  siteUrl: 'https://adamlynch.com',
  siteTitle: 'Adam Lynch' // TODO
}

// TODO: is this OK?
state.repositoryUrl = state.githubAccountUrl + '/adam-lynch.github.io'

module.exports = state
