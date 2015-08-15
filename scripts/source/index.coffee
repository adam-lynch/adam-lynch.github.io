document.addEventListener 'DOMContentLoaded', ->

    # point curious people to the source
    supportedLogger = if 'function' is typeof console?.info then 'info' else 'log'
    console?[supportedLogger] 'Hey! This site is open source. You can see the real source code at https://github.com/adam-lynch/adam-lynch.github.io'


    # track outbound link clicks
    return unless 'querySelectorAll' of document
    for anchor in document.querySelectorAll '.js_track-link-clicks'
        # e - {Event}
        anchor.addEventListener 'click', (e) ->
            debugger
            ga? 'send', 'event', 'outbound', 'click', @href