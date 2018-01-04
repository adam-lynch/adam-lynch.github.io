---
date: 2015-04-28
summary: The idea was to build a chat application of our own. A whole new standalone product to raise the bar for team communication and collaboration. From the beginning, Teamwork Chat was intended to tie our whole suite of…
original:
  blogLink: https://engineroom.teamwork.com
  blogName: Teamwork's Engine Room
  url: https://engineroom.teamwork.com/dealing-with-long-paths-fcf412649a01
tags:
  - teamwork
  - chat
  - node.js
  - javascript
  - node-webkit
  - NW.js
---

## A peek under the hood of Teamwork Chat

The idea was to build a chat application of our own. A whole new standalone product to raise the bar for team communication and collaboration. From the beginning, [Teamwork Chat](https://www.teamwork.com/chat) was intended to tie our whole suite of products together. Being able to have a quick conversation about a project, seeing support tickets automatically as they came in, and creating a task, all without leaving the app.

The first prototype was put together by a small team in Cork roughly a year ago. While attending O’Reilly’s [Fluent Conference](http://fluentconf.com/) in San Francisco, this was fleshed out a bit more. Thousands and thousands of hours, way more lines of code, and even a complete redesign later; [Teamwork Chat was released to the world](https://blog.teamwork.com/announcing-teamwork-chat/).


:::figure a-peek-under-the-hood-of-teamwork-chat/teamwork-chat.png The Teamwork Chat logo
:::

From back to front, our stack begins with twenty MySQL shards. We have four Node.js `chat-server`s and an nginx load balancer per Amazon EC2 instance. The `chat-server`s communicate via Redis (pub/sub). In front of these EC2 instances we have an Elastic Load Balancer. We also have `chat-notify-server`s which listen for events over a Redis channel and handle the sending of email and push notifications. [Everything is written in CoffeeScript](http://adamlynch.com/coffeescript-at-teamwork/) and server updates are rolled out using a continuous deployment service once we push to `master`.

#### Crashy

We’ve been overly cautious. Load is quite thinly spread and everything is fault-tolerant. Our Node servers restart themselves on failure and connected clients migrate to other chat-servers. Errors and events like these are monitored using [Sentry](https://getsentry.com/). As some last-minute pre-release jitters were setting in, we added the following code to the chat-server to test the fault-tolerance again just to be safe:

If anyone sent a message containing exactly `crashy`, the chat-server they were connected to would die, anyone connected would be routed to a different chat-server and the server would restart. This bit of code was still there in production up to a week _after_ we released. Yep. We're human after all.

```coffeescript
if contents.body is 'crashy'
  throw new Error 'crashy crashy'
```

:::figure a-peek-under-the-hood-of-teamwork-chat/eek.gif Eek!
:::

#### The client(s)

We use Node on the server and the client. If that sounds crazy, have a look at [NW.js](https://github.com/nwjs/nw.js) (formerly known as node-webkit). NW.js combines chromium and [io.js](http://readwrite.com/2015/02/27/node-js-io-js-reconciliation-near). This enables you to quickly create a desktop application using HTML, CSS and JavaScript (just like you would be able to in Chrome) with access to the all of the power of io.js. As Web developers, this is a major win for us.

As NW.js (0.12.0) is basically Chrome (41), we can just put our desktop app on the Web and it will basically just work. That’s a simplification but you get the picture. Even further, we should be able to create Android and iOS apps by sticking our app in a WebView. We’re attempting to build a consistent experience across all platforms from the one codebase. It’s not as easy as I make out though; expect more posts to follow up on this.

For the client, we use Knockout.js (as does every Teamwork.com product) extensively, Browserify, jQuery, and many many more modules and libraries. Our clients and servers communicate back and forth via pure WebSockets. We’ve built a custom in-app auto-updater using [`node-webkit-updater`](https://github.com/edjafarov/node-webkit-updater).

Teamwork Chat is a mobile-first responsive app. Our stylesheets are written in LESS and are littered with mixins, variables, and `em` values. We tend to base a lot of our variables on common / base variables using color functions, mathematic operations, etc... This makes it very easy to tweak the interface significantly by changing a variable or two. There aren't any prefixes to be found (thanks to [`autoprefixer`](https://github.com/postcss/autoprefixer)), flexbox is used for layout where it really saves us hassle, and we also use SVGs exclusively. Teamwork Chat wasn't always responsive though. As I mentioned earlier, we completely changed the direction of Teamwork Chat at one point. While doing this, we also re-wrote the markup and styles, but more about that in a future post.

Our build system of choice is [gulp](http://www.adamlynch.com/rome-wasnt-built-with-gulp/). Teamwork Chat uses gulp heavily, including for building `.app`s and `.exe`s, creating installers, signing executables, as well as all of typical stuff like compilation.

We’ve contributed to a lot of open-source projects we’ve built Teamwork Chat on, including [`node-webkit-builder`](https://github.com/mllrsohn/node-webkit-builder) and `node-webkit-updater`, which I help maintain. We have open-sourced some of our own modules and plan to release even more. Watch this space.

#### One language, one platform

![The Java logo photoshopped to be a JavaScript logo](/images/blog-content/a-peek-under-the-hood-of-teamwork-chat/javascript.png)

Switching between writing client and server-side code is a breeze; everything is written in CoffeeScript on Node.js. This speeds up development and drastically reduces the amount of time it takes new developers to get up to speed.

Setting up an npm registry with [`sinopia`](https://www.npmjs.com/package/sinopia) allowed us to create private npm modules which can be used on both the client and server. This allowed us to break up our application into easily testable chunks for consumption by the client, chat-server, and the chat-notify server. Small tested modules which do one thing well and follow [semantic versioning](http://semver.org). That gives us a lot of confidence and ensures consistency across client and server.
