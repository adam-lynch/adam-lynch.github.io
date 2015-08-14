RSS = require 'rss'

module.exports = ->
    gulp.task 'rss', ['scrape-engine-room'], (done) ->
        fileName = 'rss.xml'

        feed = new RSS
            title: site.title
            description: "#{site.nameToShow}'s writing"
            feed_url: "#{site.url}/writing/#{fileName}"
            site_url: site.url
            language: 'en'
            webMaster: site.nameToShow

        site.posts.forEach (post) ->
            feed.item
                title: post.title
                description: post.summary
                url: post.url
                date: post.datetime
                author: site.nameToShow

        $.file(fileName, feed.xml(),
            src: true
        )
            .pipe gulp.dest paths.output.writingRoot()
            .on 'end', done
        return