subModules = []
for name in [
    'clean'
    'styles'
]
    subModules.push require "./#{name}.coffee"


module.exports = ->
    module() for module in subModules