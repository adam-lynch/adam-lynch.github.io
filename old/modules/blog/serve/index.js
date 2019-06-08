const createRouter = require('express').Router
const path = require('path')
const registerRotues = require('./routes')

module.exports = function (context, options) {
  const router = createRouter()
  const generateDir = (
    context.nuxt.options.generate &&
          context.nuxt.options.generate.dir &&
          path.resolve(options.rootDir, context.nuxt.options.generate.dir)
  ) || path.resolve(options.rootDir, 'dist')
  options.distDir = path.resolve(generateDir, '_nuxt')

  registerRotues(router, context, options)
}
