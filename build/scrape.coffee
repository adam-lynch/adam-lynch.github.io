request = require 'request'
cheerio = require 'cheerio'
merge = require 'merge'
moment = require 'moment'
months = require 'months'

module.exports = ->

    gulp.task 'scrape', ['scrape-engine-room', 'scrape-packtpub', 'scrape-smashing-magazine', 'add-books'], ->
        currentYear = moment().format 'YYYY'
        site.posts.sort (postA, postB) ->
            dateA = new Date postA.datetime
            dateB = new Date postB.datetime
            if dateA < dateB
                return 1
            else if dateB < dateA
                return -1
            else
                return 0
        .forEach (post) ->
            date = moment post.datetime
            post.prettyDateTime = date.format 'MMMM Do'
            year = date.format 'YYYY'
            post.prettyDateTime += ", #{year}" unless year is currentYear

    gulp.task 'scrape-engine-room', (done) ->
        engineRoomRoot = 'https://engineroom.teamwork.com'
        blogDetails =
            blogTitle: "Teamwork's Engine Room"
            blogLink: engineRoomRoot

        convertDate = (date) ->
            matches = date.match /^([0-9]{1,2})[a-z]{2} ([a-z]+) ([0-9]{4})$/i
            month = months.indexOf(matches[2]) + 1
            month = '0' + month if month < 10
            day = matches[1]
            day = '0' + day if day.length is 1
            return "#{matches[3]}-#{month}-#{day}"

        request "#{engineRoomRoot}/author/adam/", (error, response, body) ->
            return done error if error
            return done response.statusCode if response.statusCode isnt 200

            $ = cheerio.load body
            $('.article-box').each (index, post) ->
                $post = $ post
                $titleAnchor = $post.find '.title-label a'
                $excerpt = $post.find '.excerpt-hold p'
                $excerpt.find('.excerpt-read-more').remove()

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


                $meta = $post.find '.post-meta'
                $meta.find('.excerpt-hold').remove()
                datetime = moment(convertDate $meta.text().trim()).format 'YYYY-MM-DD'

                site.posts.push merge true, blogDetails, {
                    title: $titleAnchor.html().trim()
                    url: engineRoomRoot + $titleAnchor.attr 'href'
                    datetime
                    summary
                }

            done()
        return


    gulp.task 'scrape-smashing-magazine', ->
        blogDetails =
            blogTitle: "Smashing Magazine"
            blogLink: 'https://www.smashingmagazine.com'

        addPost = ({title, relativeUrl, datetime, summary}) ->
            site.posts.push merge true, blogDetails, {
                title
                url: "#{blogDetails.blogLink}/#{relativeUrl}"
                datetime
                summary
            }

        addPost
            title: 'Beyond The Browser: From Web Apps To Desktop Apps'
            relativeUrl: '2017/03/beyond-browser-web-desktop-apps/'
            datetime: '2017-03-21'
            summary: "I started out as a web developer, and that’s now one part of what I do as a full-stack developer, but never had I imagined I’d create things for the desktop. I love the web. I love how altruistic our community is, how it embraces open-source, testing and pushing the envelope. I love discovering beautiful websites and powerful apps. When I was first tasked with creating a desktop app, I was apprehensive and intimidated. It seemed like it would be difficult, or at least… different."


    gulp.task 'scrape-packtpub', ->
        blogDetails =
            blogTitle: "Packt Books"
            blogLink: 'https://www.packtpub.com/books/content'

        addPost = ({title, relativeUrl, datetime, summary}) ->
            site.posts.push merge true, blogDetails, {
                title
                url: "#{blogDetails.blogLink}/#{relativeUrl}"
                datetime
                summary
            }

        addPost
            title: 'Building your app: creating executables for NW.js'
            relativeUrl: 'building-your-app-creating-executables-nwjs'
            datetime: '2015-11-17'
            summary: "You might have been unfortunate enough to learn that Windows has a 256 character limit on file paths. You could've ran into this problem locally or on end users' machines. There's no real workaround but there are preventive measures you can take. Even if you haven't, feel free to take pleasure from reading my horror story."

        addPost
            title: 'npm and distribution path length problems'
            relativeUrl: 'npm-and-distribution-path-length-problems'
            datetime: '2015-12-07'
            summary: "You might have been unfortunate enough to learn that Windows has a 256 character limit on file paths. You could've ran into this problem locally or on end users' machines. There's no real workaround but there are preventive measures you can take. Even if you haven't, feel free to take pleasure from reading my horror story."

        addPost
            title: 'Installing your NW.js app on Windows'
            relativeUrl: 'installing-your-nwjs-app-windows'
            datetime: '2015-12-09'
            summary: "NW.js is great for creating desktop applications using Web app technologies. If you're not familiar with NW.js, I'd advise you to read an introductory article like Creating Your First Desktop App With HTML, JS and Node-WebKit to get a good base first. This is a slightly more advanced article intended for anyone interested into distributing their NW.js app to Windows users."

        addPost
            title: 'Platform detection in your NW.js app'
            relativeUrl: 'platform-detection-your-nwjs-app'
            datetime: '2015-12-11'
            summary: "There are various reasons why you might want to detect which platform or operating system your NW.js app is currently being ran on. Your keyboard shortcuts or UI may differ per platform, you might want to store files in platform-specific directories on disk, etc. Thanks to node's (or io.js') os module, it isn't too difficult."

        addPost
            title: 'NW.js: the app and shortcut APIs'
            relativeUrl: 'nwjs-app-and-shortcut-apis'
            datetime: '2015-12-18'
            summary: 'The NW.js GUI library provides an "App" API, which contains a variety of methods and properties, some of which are essential to pretty much any app, and some have more obscure use cases. You can access the API as follows...'

        addPost
            title: 'Transparency and NW.js'
            relativeUrl: 'transparency-and-nwjs'
            datetime: '2016-01-07'
            summary: "Yes, NW.js does support transparency, albeit it is disabled by default. One way to enable transparency is to use the transparency property to your application's manifest like this..."


    gulp.task 'add-books', ->
        site.posts.push
            isBook: true
            blogTitle: "Bleeding Edge Press"
            title: 'Developing an Electron Edge'
            url: 'http://bleedingedgepress.com/developing-an-electron-edge/'
            datetime: '2016-05-26'
            summary: "Electron combines Chromium and Node.js, empowering you to create real desktop apps with HTML, CSS, and JavaScript, which integrate tightly into the desktop environment. In Developing an Electron Edge, we cover all things Electron. We breakdown what Electron is and what you can achieve with it over a typical desktop or Web app. Not only will we cover the complete development process from beginning to end, but the packaging and delivery of your app as well. You’ll discover some platform specific issues, learn how to deploy automatic updates, and even take a look at using one codebase for the desktop and the Web."

