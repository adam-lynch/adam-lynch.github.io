document.addEventListener 'DOMContentLoaded', ->

    # track outbound link clicks
    return unless 'querySelectorAll' of document
    for anchor in document.querySelectorAll '.js_track-link-clicks'
        # e - {Event}
        anchor.addEventListener 'click', (e) ->
            debugger
            ga? 'send', 'event', 'outbound', 'click', @href