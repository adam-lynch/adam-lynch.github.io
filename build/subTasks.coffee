subModules = []
for name in [
    'clean'
    'rss'
    'scripts'
    'scrape'
    'styles'
]
    subModules.push require "./#{name}.coffee"


module.exports = ->
    module() for module in subModules