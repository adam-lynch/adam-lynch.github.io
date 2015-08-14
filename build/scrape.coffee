request = require 'request'
cheerio = require 'cheerio'
merge = require 'merge'
moment = require 'moment'

module.exports = ->

    gulp.task 'scrape', ['scrape-engine-room'], ->
        currentYear = moment().format 'YYYY'
        site.posts.forEach (post) ->
            date = moment post.datetime
            post.prettyDateTime = date.format 'MMMM Do'
            year = date.format 'YYYY'
            post.prettyDateTime += ", #{year}" unless year is currentYear

    gulp.task 'scrape-engine-room', (done) ->
        engineRoomRoot = 'https://engineroom.teamwork.com'
        blogDetails =
            blogTitle: "Teamwork's Engine Room"
            blogLink: engineRoomRoot

        request "#{engineRoomRoot}/author/adam-lynch/", (error, response, body) ->
            return done error if error
            return done response.statusCode if response.statusCode isnt 200

            $ = cheerio.load body
            $('.post').each (index, post) ->
                $post = $ post
                $titleAnchor = $post.find '.post-title a'
                $excerpt = $post.find '.post-excerpt p'
                $excerpt.find('.read-more').remove()

                # Removes trailing punctuation and appends ellipsis unless summary ends with question or exclamation mark
                # or a single full stop
                ellipsis = '...'
                summaryMatches = $excerpt.html().trim().match /^(.+?)([.,;:]+)?$/
                summary = summaryMatches[1]
                puncatuationRemoved = summaryMatches[2]
                if puncatuationRemoved
                    summary += if puncatuationRemoved is '.' then puncatuationRemoved else ellipsis
                else if summary.substr(summary.length - 1, 1) not in ['?', '!']
                    summary += ellipsis

                site.posts.push merge true, blogDetails,
                    title: $titleAnchor.html().trim()
                    url: engineRoomRoot + $titleAnchor.attr 'href'
                    datetime: $post.find('.post-date').attr 'datetime'
                    summary: summary

            done()
        return