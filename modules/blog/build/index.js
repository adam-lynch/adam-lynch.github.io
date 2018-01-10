const DefinePlugin = require('webpack').DefinePlugin
const flat = require('flat')
const blog = require('../blog')
const generate = require('./generate')

const makeResource = function (object) {
  const content = JSON.stringify(object, null, process.env.NODE_ENV === 'production' ? 0 : 2)

  return { source: () => content, size: () => content.length }
}

const defineOptions = function (options, context) {
  const flattened = flat(Object.assign({}, options))
  const define = {}
  Object.keys(flattened).forEach(key => {
    define[`process.env.__NUXT_BLOG__.${key}`] = JSON.stringify(flattened[key])
  })
  context.options.build.plugins.push(new DefinePlugin(define))
}

const compileBlog = function (options, context) {
  context.options.build.plugins.push({
    apply (compiler) {
      compiler.plugin('emit', (compilation, cb) => {
        blog.generate(options).then(files => {
          Object.keys(files).forEach(filename => {
            compilation.assets[filename] = makeResource(files[filename])
          })
          cb()
        }).catch(exception => {
          console.log(' |> Compilation failed.', exception)
        })
      })
    }
  })
}

function override (options, cb) {
  if (options.generate === undefined) options.generate = {}
  if (Array.isArray(options.generate.routes)) {
    const routes = options.generate.routes
    options.generate.routes = async () => routes.concat(await cb())
  } else if (typeof (options.generate.routes) === 'function') {
    const original = options.generate.routes
    options.generate.routes = async (...any) => [].concat(await original(...any), await cb())
  } else {
    options.generate.routes = cb
  }
}

module.exports = function (context, options) {
  compileBlog(options, context)
  defineOptions(options, context)
  override(context.options, () => generate(options, context))
}
module.exports.compileBlog = compileBlog
module.exports.defineOptions = defineOptions
module.exports.makeResource = makeResource
