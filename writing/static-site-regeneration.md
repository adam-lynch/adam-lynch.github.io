---
date: 2018-02-04
tags:
  - writing
  - static-site-generation
  - headless-cms
  - jamstack
  - git
  - markdown
  - vue.js
  - nuxt.js
  - javascript
  - development
---

## Static site regeneration and focusing on what's important

:::summary

I've had my own site for years now but I haven't used it for much. A refresh was needed. I was focusing on the wrong things, trying to do everything, and getting nowhere slowly. It hasn't changed much in appearance, but that's just the tip of the iceberg. It has been completely redone beneath the surface. 

:::

The catalyst was writing; I miss it. I fell out of the habit. Maybe I was pre-occupied, I could've been a bit burned out. I haven't put pen to paper much since writing [my book](https://www.amazon.co.uk/Developing-Electron-Edge-Lynch-2016-06-17/dp/B01K160MV4), as well the follow-up [Smashing Magazine post](https://adamlynch.com/beyond-the-browser-from-web-apps-to-desktop-apps/) and talks. Even worse (read: harder to admit), I might've been content. *Ugh*. Forgive me, they were bucket list items after all.

I love learning. I've absorbed so much knowledge shared for knowledge sharing's sake. The altruism of the Web community in particular is truly amazing. This blog is an attempt at giving back, playing my part. 

It'll benefit me as well, of course. Writing forces me to further my understanding of topics, for example. I'm not ruling out writing for other blogs again, but I also want a blog that's *mine*. I want freedom, I want control. Plus, side projects are heathy right?


### Don't reinvent the wheel, unless you plan on learning more about wheels

I find static site generators fascinating. The end user experience is optimal because it's just static HTML pages, generated in a compile step. It's also a cheaper, more security, and the developer experience is generally better. 

I was compelled to write my own static generator using Gulp, Nunjucks templates, Markdown for content, an RSS feed, a pattern library (which is ridiculous looking back now), and more. The output was hosted on GitHub pages (plus CloudFlare HTTPS). This was the last version of my site. 

I wanted to do so much and perfect it all but it never got here. Once I had a proof of concept, everything slowed down and my attention went elsewhere. I didn't even get around to properly publishing a blog on the site but I had the proof of concept running locally. Never mind the writing style analyzer, responsive screenshot testing, and other things I had planned to do. I learned that rolling your own static site generator isn't as difficult as it sounds. I might write a post on that.

The following were my (unordered) requirements this time around.


#### Must have

- Doesn't need client-side JavaScript.
- Crawlable.
- Isn't restrictive on where the content comes from (e.g. files, API, DB, etc).
- Flexible (e.g. what if I want to plug sass-lint in?).
- Can be automated (i.e. continuous integration).
- Allows Markdown posts.
- Code can be embedded with CodePen, JSFiddle, etc.
- Allows for custom / non-blog pages. 
- Allows for multiple post templates / types.
- Open-source.
- Supports Linux, Mac, and Windows.


#### Nice to have

- Simple.
- Gives a head start on SEO.
- Allows you to push the data elsewhere (Medium).
- Uses tools I'm familiar with and am liking right now.
- Allows posts in other formats along side Markdown posts.
- Makes the client-side experience faster / better (progressive enhancement) and if it does, it's lightweight.
- Service worker head start.
- Not opinionated.
- Generates RSS feed.
- Head start on blog stuff.
- Content updates can be suggested by readers.
- Good development experience.
- Head start on comments.
- Head start on analytics.
- Generates sitemap.xml.


#### Unimportant

- Build speed.
- Popularity.
- Themes.

:::figure static-site-regeneration/nuxt.png
:::

### Winner

I won't bore you by going into detail on each option I considered. [Nuxt.js](https://nuxtjs.org/) won in the end. It's a minimal framework for creating "universal Vue.js apps," but hmm what does that mean? 

Well first there's [Vue.js](https://vuejs.org/), a modern JavaScript framework with Virtual DOM diffing, first-class Flux state management, and fantastic documentation. It's our frontend framework of choice at [Teamwork](https://www.teamwork.com/). But wait, that sounds like way too much for a blog. It doesn't need to be a web app, never mind a "universal Vue.js app." Trust me, it gets better. 

Next, there's Nuxt.js. It's a minimal (opinionated) framework which abstracts away Vue.js and Webpack for you. You don't need to set up routing or anything like that (although you can if you'd like). If you were to create a `hello` component inside the `pages` directory, you could run one command to generate a Vue.js web app in which `/hello` would resolve to that component (like [Next.js](https://github.com/zeit/next.js/)). Since it abstracts away Webpack, it has a great development mode, including hot module reloading and more, out of the box.

A "Universal Vue.js app" just means that it does some server-side rendering and client-side hydration. So let's say you go to a URL. Typically, the server would return a pretty much empty page which loads some JavaScript, which runs your Vue.js code, which hits an API, then renders a table and adds an event listener so that clicking on a table header would sort the table. A "universal Vue.js app" would instead run your Vue.js code on the server-side, which would hit the API, render the result, and return the table in the initial response to the browser. So you get the content as soon as possible, whether or not you've JavaScript enabled, whether or not the JavaScript has a fatal error, and so on. Then the JavaScript is loaded and continues from where the server-side rendering left off (i.e. client-side hydration). If you were to click on a table header, it should be ready and sort the table.

Since it can run and render your Vue.js code on the server-side, it supports static site generation. It's so powerful yet all I need to do is run a slightly different command and it'll spit out static assets. The Nuxt.js logo is also weirdly similar to my own.


### Content management

This doesn't mean I'm going to write blog posts in HTML though. You might've noticed this one interesting requirement: "Isn't restrictive on where the content comes from (e.g. files, API, DB, etc)." I wanted to explore other sources of content. A headless CMS, for example. Instead of hosting a CMS and having every request to my blog run through, let's say, Ghost or Wordpress, I could just use them to manage the content. It would be "headless" in that I'd only be using the administration panel.  I'd grab the posts by querying its database (or using its API if it has one). Since the phrase has been coined, purpose-built headless CMSs have popped up which only expose APIs and no frontend UI. 

"[JAMstack](https://jamstack.org/)" has since gained momentum; a "modern web development architecture based on client-side JavaScript, reusable APIs, and prebuilt Markup." Isn't that just static site generation? Well JAMstackers(?) don't like the term "static" because the API could return anything really and therefore the site can be pretty dynamic. I'd prefer to hit the API at compile-time, generate static files, and have less client-side JavaScript. So for my purposes, it is static site generation.

I've always wanted to play around with [Contentful](https://www.contentful.com/), a cloud-based headless CMS service. It seems really good, but I ended up choosing a Git-based approach again. Contentful doesn't support Markdown for one (EDIT: it does support Markdown, since February 2014 actually. I don't know how I missed this). Even though the editor is good, I would have no choice but to use it. I can use whatever I like with Git; a text editor, IDE, [Classeur](http://classeur.io/) (my favourite Markdown editor), etc. 

I get versioning for free, branching, and it works offline (up until actually publishing changes).
Since my site is hosted on GitHub (still), I can use its UI to not only edit files but add and delete blog posts too. Another thing I love is that everything is open-source so anyone could suggest improvements to a post. I even have a button at the top of the page for this. Right now it just brings you to the [source code](https://github.com/adam-lynch/adam-lynch.github.io/), but I'll make it so it brings you to the actual post's source content. It could even have quality checks via continuous integration services.

Contentful does have built-in responsive image support and search API endpoints though. I'm definitely going to use it somehow, I'm just looking for the right excuse.


### Markdown, meet Nuxt.js

So how do I actually write posts then? Nuxt.js allows you to build modules that tap into the build or generation steps to do custom stuff. A [blog module](https://github.com/nuxt-community/blog-module) already existed. It wasn't flexible enough so I took it and modified it to my needs (which we've found ourselves doing with most Vue.js related things at Teamwork). It looks for markdown files in a `writing` directory, compiles the Markdown, then generates the files, routes, and anything else. The Markdown compiler I've gone with this time is [markdown-it](https://github.com/markdown-it/markdown-it), plus some (third-party and custom) plugins for some additional capabilities. I might write a post on this someday.

The only downside really was that an RSS module didn't exist so I could match the functionality of my old site. I wrote one but ended up throwing it away when I ran into a tricky last-minute issue.


### Imperfection

I'm trying to be more open to shipping less than perfect things these days, so I've definitely left room for improvement. Some of the code is the most hacked together I've ever written. Especially the CSS, which is basically all in one `shame.scss` file. Although this route transition is nice.


:::figure static-site-regeneration/route-transition.gif The route [transition](https://nuxtjs.org/api/pages-transition/) when going from the list of posts to an individual one. It involves a bit of positioning logic, automated scrolling, animations, and [skeleton](https://www.lukew.com/ff/entry.asp?1797) text which is shown while the post's content is loading.
:::

One thing that's a challenge when going static are comments. You don't get built-in comments like you would with a typical CMS. I've used [Disqus](https://disqus.com/) for the time being but I'm not very happy with it. It's way too heavy. Expect a post on switching to an alternative solution or rolling my own. The workflow could be improved as well. I'd like to automate the asset generation as a continuous deployment step.

As far as content goes, expect me to publish a post a month, roughly. I'll mostly cover development but I might throw in a post every now and again about other stuff as well. There'll be short posts, deep detailed dives which I've have edited forty times, as well posts I've written in one go (sometimes they're my best). I've so many things I've been meaning to play around with. Now I've an outlet where I can write about them.
